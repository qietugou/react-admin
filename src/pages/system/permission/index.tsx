import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { permission } from '@/services/system/permission/api';
import UpdateForm from './components/UpdateForm';
import AddForm from './components/AddForm';
import Detail from './components/Detail';
import { useAccess, Access, useModel } from 'umi';

const TableList: React.FC = () => {
  const { OPTION_DELETE, STATUS_RW_ENUM } = useModel('global');
  const { getMenuTree, handleAdd, handleUpdate, handleDelete, handlerPermissionTree } =
    useModel('system.permission');

  const access = useAccess();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [treeMenuData, setTreeMenuData] = useState<any>([]);
  const [defaultExpanded, setDefaultExpanded] = useState<number[]>([]);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.MenuListItem>({});
  const [permissionTree, setPermissionTree] = useState<API.MenuListItem[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [loadPermissionTree, setLoadPermissionTree] = useState<boolean>(false);

  const handlerDetail = async () => {
    try {
      setLoadPermissionTree(true);
      const tree = await handlerPermissionTree();
      setShowDetail(true);
      setLoadPermissionTree(false);
      setPermissionTree(tree);
    } catch (e) {
      setLoadPermissionTree(false);
    }
  };

  useEffect(() => {
    getMenuTree((keys: number[], treeList: any) => {
      setDefaultExpanded(keys);
      setTreeMenuData(treeList);
    }).then();
  }, [getMenuTree]);

  const columns: ProColumns<API.PermissionItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      search: false,
      width: 70,
    },
    {
      title: '权限名称',
      dataIndex: 'name',
    },
    {
      title: '路由',
      dataIndex: 'router',
      search: false,
    },
    {
      title: '动作',
      dataIndex: 'action',
      search: false,
    },
    {
      title: '请求类型',
      dataIndex: 'method',
      search: false,
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
          <Access key="update" accessible={access.canButton('permission-update')}>
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
              { key: OPTION_DELETE, name: '删除', operation: 'permission-delete' },
            ])}
          />,
        ];
      },
    },
  ];
  return (
    <React.Fragment>
      <ProTable<API.PermissionItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        defaultSize="small"
        toolBarRender={() => [
          <Access accessible={access.canButton('permission-add')}>
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
          <Access accessible={access.canButton('permission-select-tree')}>
            <Button key="show" loading={loadPermissionTree} onClick={handlerDetail}>
              权限列表
            </Button>
          </Access>,
        ]}
        request={permission}
        columns={columns}
      />
      <AddForm
        createModalVisible={createModalVisible}
        handleModalVisible={handleModalVisible}
        defaultExpanded={defaultExpanded}
        treeMenuData={treeMenuData}
        addSubmit={async (value) => {
          await handleAdd(value, () => {
            handleModalVisible(false);
            actionRef.current?.reload();
          });
        }}
      />
      <UpdateForm
        columns={currentRow}
        updateModalVisible={updateModalVisible}
        handleUpdateModalVisible={handleUpdateModalVisible}
        defaultExpanded={defaultExpanded}
        treeMenuData={treeMenuData}
        onUpdateSubmit={async (value) => {
          if (currentRow?.id != null) {
            await handleUpdate(currentRow?.id, value as API.PermissionItem, () => {
              handleUpdateModalVisible(false);
              actionRef.current?.reload();
            });
          }
        }}
      />
      <Detail
        showDetail={showDetail}
        permissionTree={permissionTree}
        setShowDetail={setShowDetail}
      />
    </React.Fragment>
  );
};

export default TableList;
