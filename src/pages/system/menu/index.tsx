import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, Form, Tag, TreeSelect } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormText, ProFormDigit, ProFormSwitch } from '@ant-design/pro-form';
import { menu } from '@/services/system/menu/api';
import UpdateForm from './components/UpdateForm';
import { useAccess, Access, useModel } from 'umi';

const TableList: React.FC = () => {
  const { OPTION_DELETE, STATUS_SHOW_ENUM } = useModel('global');
  const access = useAccess();
  const { handleAdd, handleUpdate, handleDelete, getRuleTree } = useModel('system.menu');

  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const [initRender, setRender] = useState<boolean>(false);
  const [treeData, setTreeData] = useState<any>([]);

  const [defaultExpanded, setDefaultExpanded] = useState<number[]>([]);

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.MenuListItem>({});

  useEffect(() => {
    getRuleTree((keys, treeList) => {
      setDefaultExpanded(keys);
      setRender(true);
      setTreeData(treeList);
    }).then();
  }, []);

  const columns: ProColumns<API.MenuListItem>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '前端路径',
      dataIndex: 'prefix',
      search: false,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      search: false,
    },
    {
      title: '是否显示',
      dataIndex: 'status',
      search: false,
      render: (_, record) => {
        const status = STATUS_SHOW_ENUM[record?.status ? 1 : 0];
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
      key: 'updated_at',
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
          <Access key="update" accessible={access.canButton('module-update')}>
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
              if (key === OPTION_DELETE) {
                if (record?.id != null) {
                  await handleDelete(record, () => {
                    actionRef.current?.reload();
                  });
                }
              }
            }}
            menus={access.canOperation([
              { key: OPTION_DELETE, name: '删除', operation: 'module-delete' },
            ])}
          />,
        ];
      },
    },
  ];
  return (
    <React.Fragment>
      {initRender ? (
        <ProTable<API.MenuListItem, API.PageParams>
          actionRef={actionRef}
          rowKey="id"
          search={false}
          expandable={{ defaultExpandedRowKeys: defaultExpanded }}
          pagination={false}
          defaultSize="small"
          toolBarRender={() => [
            <Access accessible={access.canButton('module-add')}>
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
          request={menu}
          columns={columns}
        />
      ) : (
        '暂无数据'
      )}
      <ModalForm
        title={'新建菜单'}
        formRef={formRef}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          await handleAdd(value as API.MenuListItem, () => {
            handleModalVisible(false);
            actionRef.current?.reload();
          });
        }}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
                message: '菜单名称',
              },
            ]}
            label="菜单名称"
            tooltip="最长为 24 位"
            placeholder="请输入菜单名称"
            width="md"
            name="name"
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: '前端路径',
              },
            ]}
            initialValue="/"
            label="前端路径"
            tooltip="请以 / 开头"
            placeholder="请输入前端路径"
            width="md"
            name="prefix"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                message: '菜单图标',
              },
            ]}
            label="菜单图标"
            tooltip="最长为 24 位"
            placeholder="请输入菜单图标"
            width="md"
            name="icon"
          />
          <Form.Item label="上级" tooltip="请选择上级" name="pid">
            <TreeSelect
              style={{ width: '328px' }}
              treeDataSimpleMode
              dropdownStyle={{ overflow: 'auto' }}
              placeholder="请选择上级"
              treeDefaultExpandAll
              treeData={treeData}
            />
          </Form.Item>
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit
            label="排序"
            tooltip="最长为 24 位"
            placeholder="请输入排序"
            width="md"
            name="weight"
          />
          <ProFormSwitch
            initialValue={true}
            label="是否显示"
            name="status"
            checkedChildren="显示"
            unCheckedChildren="不显示"
            width="lg"
          />
        </ProForm.Group>
      </ModalForm>
      <UpdateForm
        columns={currentRow}
        treeData={treeData}
        updateModalVisible={updateModalVisible}
        handleUpdateModalVisible={handleUpdateModalVisible}
        onUpdateSubmit={async (value) => {
          if (currentRow?.id != null) {
            await handleUpdate(currentRow?.id, value as API.MenuListItem, () => {
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
