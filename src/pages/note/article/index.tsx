import { PlusOutlined } from '@ant-design/icons';
import { Button, Image, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { article } from '@/services/note/api';
import UpdateForm from './components/UpdateForm';
import { useAccess, Access, useModel } from 'umi';

const TableList: React.FC = () => {
  const { OPTION_DELETE, STATUS_SHOW_ENUM, OPTION_DETAIL } = useModel('global');

  const access = useAccess();

  const { handleDelete } = useModel('note.github');

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.GithubTagItem | undefined>(undefined);

  const columns: ProColumns<API.ArticleItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      search: false,
      width: 70,
    },
    {
      title: '标签名称',
      dataIndex: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      search: false,
    },
    {
      title: '封面图',
      dataIndex: 'preview',
      render: (r, record) => {
        if (record.preview) {
          return <Image width={200} height={100} src={record.preview} />;
        }
        return r;
      },
    },
    {
      title: '点击数',
      dataIndex: 'views_count',
      search: false,
    },
    {
      title: '是否显示',
      dataIndex: 'status',
      search: false,
      render: (_, record) => {
        const status = STATUS_SHOW_ENUM[record?.is_show ? 1 : 0];
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
          <Access key="article-update" accessible={access.canButton('article-update')}>
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
              { key: OPTION_DETAIL, name: '详情', operation: 'article-detail' },
              { key: OPTION_DELETE, name: '删除', operation: 'article-delete' },
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
        defaultSize="small"
        toolBarRender={() => [
          <Access accessible={access.canButton('article-add')}>
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                setCurrentRow(undefined);
                handleUpdateModalVisible(true);
              }}
            >
              <PlusOutlined /> 新建
            </Button>
          </Access>,
        ]}
        request={article}
        columns={columns}
      />
      <UpdateForm
        updateModalVisible={updateModalVisible}
        columns={currentRow}
        handleUpdateModalVisible={handleUpdateModalVisible}
        onAddSubmit={async () => {}}
        onUpdateSubmit={async () => {}}
      />
    </React.Fragment>
  );
};

export default TableList;
