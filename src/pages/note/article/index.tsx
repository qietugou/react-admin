import { PlusOutlined } from '@ant-design/icons';
import { Button, Image, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { article, tags } from '@/services/note/api';
import UpdateForm from './components/UpdateForm';
import { useAccess, Access, useModel } from 'umi';

const TableList: React.FC = () => {
  const { OPTION_DELETE, STATUS_SHOW_ENUM, OPTION_STATUS } = useModel('global');

  const STATUS_DRAFT_ENUM = {
    0: {
      color: 'orange',
      text: '新草稿',
      number: 0,
    },
    1: {
      color: 'green',
      text: '已发布',
      number: 1,
    },
  };

  const access = useAccess();

  const { handleDelete, handleUpdate, handleAdd, handlePush } = useModel('note.article');

  const [tagList, handleTagList] = useState<{ label: string; value: number }[]>([]);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ArticleItem | undefined>(undefined);

  const showUpdateForm = async (record: API.ArticleItem | undefined) => {
    if (tagList.length === 0) {
      const res = await tags();
      if (res.data) {
        const tempTagList: { label: string; value: number }[] = [];
        res.data.forEach((item: API.TagItem) => {
          tempTagList.push({
            label: item.name || '',
            value: item.id || 0,
          });
        });
        handleTagList(tempTagList);
      }
    }
    setCurrentRow(record);
    handleUpdateModalVisible(true);
  };

  const columns: ProColumns<API.ArticleItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      search: false,
      width: 70,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      search: false,
    },
    {
      title: '封面图',
      search: false,
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
      title: '标签',
      dataIndex: 'tags',
      search: false,
      render: (_, record) => {
        return record.tags?.map((tag) => {
          return (
            <React.Fragment key={tag.id}>
              <Tag color="green">{tag.name}</Tag>
              <br />
            </React.Fragment>
          );
        });
      },
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
      title: '是否草稿',
      dataIndex: 'status',
      search: false,
      render: (_, record) => {
        const status = STATUS_DRAFT_ENUM[record?.is_draft ? 1 : 0];
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
              onClick={async () => {
                await showUpdateForm(record);
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
              if (key === OPTION_STATUS) {
                if (record?.id != null) {
                  await handlePush(
                    record.is_show === 0 ? '下架' : '发布',
                    `${record.title}`,
                    record.id,
                    record.is_show === 0 ? 1 : 0,
                    () => {
                      actionRef.current?.reload();
                    },
                  );
                }
              }
              return false;
            }}
            menus={access.canOperation([
              {
                key: OPTION_STATUS,
                name: record.is_show === 0 ? '下架' : '发布',
                operation: 'article-status',
              },
              { key: OPTION_DELETE, name: '删除', operation: 'article-delete' },
            ])}
          />,
        ];
      },
    },
  ];
  return (
    <React.Fragment>
      <ProTable<API.ArticleItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        defaultSize="small"
        toolBarRender={() => [
          <Access accessible={access.canButton('article-add')}>
            <Button
              type="primary"
              key="primary"
              onClick={async () => {
                await showUpdateForm(undefined);
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
        tags={tagList}
        updateModalVisible={updateModalVisible}
        columns={currentRow}
        handleUpdateModalVisible={handleUpdateModalVisible}
        onAddSubmit={async (value) => {
          await handleAdd(value, () => {
            handleUpdateModalVisible(false);
            actionRef.current?.reload();
          });
        }}
        onUpdateSubmit={async (value) => {
          if (currentRow && currentRow.id) {
            await handleUpdate(currentRow.id, value, () => {
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
