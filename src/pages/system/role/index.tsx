import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { role } from '@/services/system/role/api';
import Detail from './components/Detail';
import UpdateForm from './components/UpdateForm';
import { useAccess, Access, useModel } from 'umi';

const TableList: React.FC = () => {
  const { OPTION_PERMISSION, STATUS_ACTION_ENUM, STATUS_RW_ENUM, OPTION_DELETE } =
    useModel('global');

  const access = useAccess();
  const { handlerPermissionTree } = useModel('system.permission');

  const {
    rolePermission,
    handlerPutRolePermission,
    handlerUpdateRole,
    handleAddRole,
    handleDeleteRole,
  } = useModel('system.role');

  const formRef = useRef<FormInstance>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RoleListItem>({});
  const [permissionTree, setPermissionTree] = useState<API.MenuListItem[]>([]);
  const [rolePermissions, setRolePermissions] = useState<API.PermissionItem[]>([]);

  /**
   * 渲染详情页面权限
   * @param record
   */
  const handlerRolePermission = async (record: API.RoleListItem) => {
    if (record.id != null) {
      setCurrentRow(record);
      await rolePermission(record.id, (permissions: API.PermissionItem[]) => {
        setShowDetail(true);
        setRolePermissions(permissions);
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const tree = await handlerPermissionTree();
      setPermissionTree(tree);
    }
    fetchData().then();
  }, [handlerPermissionTree]);

  const columns: ProColumns<API.RoleListItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      search: false,
      width: 70,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      render: (dom, record) => {
        return (
          <Access accessible={access.canButton('role-update-permissions')} fallback={dom}>
            <a
              onClick={async () => {
                await handlerRolePermission(record);
              }}
            >
              {dom}
            </a>
          </Access>
        );
      },
    },
    {
      title: '只读|读写',
      dataIndex: 'is_rw',
      search: false,
      render: (_, record) => {
        const status = STATUS_RW_ENUM[record?.is_rw || 0];
        return <Tag color={status.color}>{status.text}</Tag>;
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
      search: false,
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
        return [
          <Access key="update" accessible={access.canButton('role-update')}>
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
              if (key === OPTION_PERMISSION) {
                await handlerRolePermission(record);
              }
              if (key === OPTION_DELETE) {
                if (record?.id != null) {
                  await handleDeleteRole(record, () => {
                    actionRef.current?.reload();
                  });
                }
              }
              return false;
            }}
            menus={access.canOperation([
              { key: OPTION_PERMISSION, name: '权限', operation: 'role-update-permissions' },
              { key: OPTION_DELETE, name: '删除', operation: 'role-delete' },
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
        search={false}
        pagination={false}
        defaultSize="small"
        toolBarRender={() => [
          <Access accessible={access.canButton('role-add')}>
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
                formRef.current?.resetFields();
              }}
            >
              <PlusOutlined /> 新建
            </Button>{' '}
          </Access>,
        ]}
        request={role}
        columns={columns}
      />
      <ModalForm
        title={'新建角色'}
        formRef={formRef}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          await handleAddRole(value as API.RoleListItem, () => {
            handleModalVisible(false);
            actionRef.current?.reload();
          });
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '角色名称',
            },
          ]}
          label="角色名称"
          tooltip="最长为 24 位"
          placeholder="请输入角色名称"
          width="md"
          name="name"
        />
        <ProFormSelect
          label="读写类型"
          tooltip="权限是否只读"
          width="md"
          rules={[
            {
              required: true,
              message: '读写类型',
            },
          ]}
          name="is_rw"
          options={[
            { label: '只读', value: 0 },
            { label: '读写', value: 1 },
          ]}
        />
      </ModalForm>
      <Detail
        showDetail={showDetail}
        permissionTree={permissionTree}
        setShowDetail={setShowDetail}
        rolePermissions={rolePermissions}
        roleItem={currentRow}
        onUpdateSubmit={async (id: number, permissionIds: number[]) => {
          await handlerPutRolePermission(id, permissionIds, () => {});
        }}
      />
      <UpdateForm
        updateModalVisible={updateModalVisible}
        columns={currentRow}
        handleUpdateModalVisible={handleUpdateModalVisible}
        onUpdateSubmit={async (r) => {
          if (currentRow.id != null) {
            await handlerUpdateRole(currentRow.id, r, () => {
              handleUpdateModalVisible(false);
              actionRef.current?.reload();
            });
          }
        }}
      />
    </React.Fragment>
  );
};

export default TableList;
