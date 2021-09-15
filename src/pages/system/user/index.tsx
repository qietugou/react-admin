import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance, CheckboxOptionType } from 'antd';
import { Button, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { user } from '@/services/system/user/api';
import Detail from './components/Detail';
import UpdateForm from './components/UpdateForm';
import { useAccess, Access, useModel } from 'umi';

const TableList: React.FC = () => {
  const { OPTION_DETAIL, OPTION_DELETE, OPTION_STATUS, OPTION_ROLE, STATUS_ACTION_ENUM } =
    useModel('global');

  const access = useAccess();
  const formRef = useRef<FormInstance>();
  const formRoleRef = useRef<FormInstance>();

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const [createRoleModalVisible, handleRoleModalVisible] = useState<boolean>(false);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const [currentRow, setCurrentRow] = useState<API.UserListItem>({});

  const [roleList, setRoleList] = useState<CheckboxOptionType[]>([]);
  const {
    handleAdd,
    handleUpdate,
    handlerOptionStatus,
    handleDelete,
    handlerRole,
    handleSaveRole,
  } = useModel('system.user');

  useEffect(() => {
    async function fetchData() {
      await handlerRole((list) => {
        const rList: CheckboxOptionType[] = [];
        list.forEach((r) => {
          const checkOption = { label: r.name, value: r.id };
          rList.push(checkOption as CheckboxOptionType);
        });
        setRoleList(rList);
      });
    }

    fetchData().then();
  }, [handlerRole]);

  const columns: ProColumns<API.UserListItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      search: false,
      width: 70,
    },
    {
      title: '账户号',
      dataIndex: 'name',
      render: (dom, record) => {
        return (
          <Access accessible={access.canButton('admin-detail')} fallback={dom}>
            <a
              onClick={() => {
                setCurrentRow(record as API.UserListItem);
                setShowDetail(true);
              }}
            >
              {dom}
            </a>
          </Access>
        );
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'roles',
      hideInSearch: true,
      width: 300,
      render: (_, record) => {
        if (record.id === 1) {
          return <Tag color="red">宇宙无敌VIP</Tag>;
        }
        return record.roles?.map((role) => {
          return (
            <Tag key={role.id} color="#108ee9">
              {role.name}
            </Tag>
          );
        });
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => {
        const status = STATUS_ACTION_ENUM[record?.status || 0];
        return <Tag color={status.color}>{status.text}</Tag>;
      },
    },
    {
      title: '创建时间',
      key: 'created_at',
      dataIndex: 'created_at',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            start_date: value[0],
            end_date: value[1],
          };
        },
      },
    },
    {
      title: '修改时间',
      key: 'created_at',
      dataIndex: 'updated_at',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (record.id === 1) return '-';
        const status = STATUS_ACTION_ENUM[(record?.status || 0) === 0 ? 1 : 0];
        return [
          <Access key="update" accessible={access.canButton('admin-update')}>
            <a
              key="editable"
              onClick={() => {
                setCurrentRow(record);
                handleUpdateModalVisible(true);
              }}
            >
              编辑
            </a>
          </Access>,
          <TableDropdown
            key="actionGroup"
            onSelect={async (key) => {
              if (key === OPTION_STATUS) {
                if (record.id != null && record.name != null) {
                  await handlerOptionStatus(
                    record.id,
                    status.number,
                    status.text,
                    record.name,
                    () => {
                      actionRef.current?.reload();
                    },
                  );
                }
              }
              if (key === OPTION_DETAIL) {
                setCurrentRow(record);
                setShowDetail(true);
              }
              if (key === OPTION_DELETE) {
                await handleDelete(record, () => {
                  actionRef.current?.reload();
                });
              }
              if (key === OPTION_ROLE) {
                setCurrentRow(record);
                formRoleRef.current?.setFieldsValue({ roles: record.roles?.map((r) => r.id) });
                handleRoleModalVisible(true);
              }
              return false;
            }}
            menus={access.canOperation([
              { key: OPTION_ROLE, name: '分配角色', operation: 'admin-add-roles' },
              { key: OPTION_STATUS, name: status.text, operation: 'admin-update-status' },
              { key: OPTION_DETAIL, name: '详情', operation: 'admin-detail' },
              { key: OPTION_DELETE, name: '删除', operation: 'admin-delete' },
            ])}
          />,
        ];
      },
    },
  ];
  return (
    <React.Fragment>
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        defaultSize="small"
        toolBarRender={() => [
          <Access accessible={access.canButton('admin-add')}>
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
                formRef.current?.resetFields();
              }}
            >
              <PlusOutlined /> 新建
            </Button>
          </Access>,
        ]}
        request={user}
        columns={columns}
      />
      <ModalForm
        title={'新建用户'}
        formRef={formRef}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          await handleAdd(value as API.UserListItem, () => {
            handleModalVisible(false);
            actionRef.current?.reload();
          });
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '账户号为必填项',
            },
          ]}
          label="账户号"
          tooltip="最长为 24 位"
          placeholder="请输入账户号"
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '手机号为必填项',
            },
          ]}
          label="手机号"
          tooltip="最长为 13 位"
          placeholder="请输入手机号"
          width="md"
          name="phone"
        />
        <ProFormText.Password
          rules={[
            {
              required: true,
              message: '密码为必填项',
            },
          ]}
          label="密码"
          tooltip="随意"
          placeholder="请输入密码"
          width="md"
          name="password"
        />
        <ProFormText.Password
          rules={[
            {
              required: true,
              message: '重复密码为必填项',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码不一致'));
              },
            }),
          ]}
          label="重复密码"
          tooltip="随意"
          placeholder="请输入重复密码"
          width="md"
          name="password2"
        />
      </ModalForm>
      <Detail
        showDetail={showDetail}
        columns={currentRow}
        onCancel={() => {
          setShowDetail(false);
        }}
      />
      <UpdateForm
        columns={currentRow}
        updateModalVisible={updateModalVisible}
        handleUpdateModalVisible={handleUpdateModalVisible}
        onUpdateSubmit={async (value) => {
          if (currentRow.id != null) {
            await handleUpdate(currentRow.id, value as API.UserListItem, () => {
              handleUpdateModalVisible(false);
              actionRef.current?.reload();
            });
          }
        }}
      />
      <ModalForm
        title={'分配角色'}
        formRef={formRoleRef}
        width="400px"
        visible={createRoleModalVisible}
        onVisibleChange={handleRoleModalVisible}
        onFinish={async (value) => {
          if (currentRow.id != null) {
            await handleSaveRole(currentRow.id, value.roles, () => {
              handleRoleModalVisible(false);
              actionRef.current?.reload();
            });
          }
        }}
      >
        <ProFormCheckbox.Group
          name="roles"
          rules={[
            {
              required: true,
              message: '角色必须选中',
            },
          ]}
          tooltip="分配角色"
          layout="horizontal"
          label="角色"
          options={roleList}
        />
      </ModalForm>
    </React.Fragment>
  );
};

export default TableList;
