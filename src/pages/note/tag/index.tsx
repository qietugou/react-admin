import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button } from 'antd';
import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { tags } from '@/services/note/api';
import UpdateForm from './components/UpdateForm';
import { useAccess, Access, useModel } from 'umi';

const TableList: React.FC = () => {
  const { OPTION_DELETE } = useModel('global');

  const access = useAccess();

  const { handleUpdate, handleAdd, handleDelete } = useModel('note.tag');

  const formRef = useRef<FormInstance>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.TagItem>({});

  const columns: ProColumns<API.TagItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      search: false,
      width: 70,
    },
    {
      title: 'Tag',
      dataIndex: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
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
          <Access key="tag-update" accessible={access.canButton('tag-update')}>
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
              { key: OPTION_DELETE, name: '删除', operation: 'tag-delete' },
            ])}
          />,
        ];
      },
    },
  ];
  return (
    <React.Fragment>
      <ProTable<API.TagItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        pagination={false}
        defaultSize="small"
        toolBarRender={() => [
          <Access accessible={access.canButton('tag-add')}>
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
        request={tags}
        columns={columns}
      />
      <ModalForm
        title={'新建Tag'}
        formRef={formRef}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          await handleAdd(value as API.TagItem, () => {
            handleModalVisible(false);
            actionRef.current?.reload();
          });
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Tag',
            },
          ]}
          label="Tag"
          tooltip="最长为 24 位"
          placeholder="请输入 Tag"
          width="md"
          name="name"
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
