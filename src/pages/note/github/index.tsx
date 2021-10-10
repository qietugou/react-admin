import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button } from 'antd';
import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { githubTags } from '@/services/note/api';
import UpdateForm from './components/UpdateForm';
import { useAccess, Access, useModel } from 'umi';

const TableList: React.FC = () => {
  const { OPTION_DELETE } = useModel('global');

  const access = useAccess();

  const { handleUpdate, handleAdd, handleDelete } = useModel('note.github');

  const formRef = useRef<FormInstance>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.GithubTagItem>({});

  const columns: ProColumns<API.GithubTagItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      search: false,
      width: 70,
    },
    {
      title: 'github用户名',
      dataIndex: 'name',
    },
    {
      title: '昵称',
      dataIndex: 'alias',
      search: false,
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
          <Access key="github-update" accessible={access.canButton('github-update')}>
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
              return false;
            }}
            menus={access.canOperation([
              { key: OPTION_DELETE, name: '删除', operation: 'github-delete' },
            ])}
          />,
        ];
      },
    },
  ];
  return (
    <React.Fragment>
      <ProTable<API.GithubTagItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        pagination={false}
        defaultSize="small"
        toolBarRender={() => [
          <Access accessible={access.canButton('github-add')}>
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
        request={githubTags}
        columns={columns}
      />
      <ModalForm
        title={'新建关注用户'}
        formRef={formRef}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          await handleAdd(value as API.GithubTagItem, () => {
            handleModalVisible(false);
            actionRef.current?.reload();
          });
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '请输入 Github 用户',
            },
          ]}
          label="Github用户"
          tooltip="最长为 24 位"
          placeholder="请输入 Github 用户"
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '请输入昵称',
            },
          ]}
          label="昵称"
          tooltip="最长为 24 位"
          placeholder="请输入昵称"
          width="md"
          name="alias"
        />
        <ProFormDigit
          label="排序"
          tooltip="最长为 4 位"
          placeholder="请输入排序"
          width="md"
          name="sort"
        />
      </ModalForm>
      <UpdateForm
        updateModalVisible={updateModalVisible}
        columns={currentRow}
        handleUpdateModalVisible={handleUpdateModalVisible}
        onUpdateSubmit={async (r) => {
          if (currentRow.id != null) {
            await handleUpdate(currentRow.id, r, () => {
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
