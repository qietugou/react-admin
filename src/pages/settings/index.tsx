import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, Image, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { settings } from '@/services/settings/api';
import UpdateForm from './components/UpdateForm';
import { useAccess, Access, useModel } from 'umi';

export type StatusTypeItem = {
  label: string;
  value: number;
};

const TableList: React.FC = () => {
  const { OPTION_DELETE } = useModel('global');

  const access = useAccess();

  /**
   * 是否显示
   */
  const STATUS_TYPE_ENUM = {
    0: {
      color: 'green',
      text: '默认类型',
      number: 0,
    },
    1: {
      color: 'green',
      text: '赞助商',
      number: 1,
    },
    2: {
      color: 'green',
      text: '友链',
      number: 2,
    },
  };

  const getTypeLabelArray = () => {
    const arrayType: StatusTypeItem[] = [];
    Object.keys(STATUS_TYPE_ENUM).forEach((key) => {
      arrayType.push({
        label: STATUS_TYPE_ENUM[key].text,
        value: STATUS_TYPE_ENUM[key].number,
      });
    });
    return arrayType;
  };

  const {
    handlerUpdateSetting,
    handleAddSetting,
    handleDeleteSetting,
    INPUT_TYPE_TEXT,
    INPUT_TYPE_IMAGE,
    INPUT_TYPE_NUMBER,
  } = useModel('settings.setting');

  const formRef = useRef<FormInstance>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RoleListItem>({});

  const columns: ProColumns<API.SettingsItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      search: false,
      width: 70,
    },
    {
      title: '参数名称',
      dataIndex: 'field_title',
    },
    {
      title: '参数key',
      dataIndex: 'field_key',
    },
    {
      title: '参数类型',
      dataIndex: 'type',
      search: false,
      render: (_, record) => {
        const status = STATUS_TYPE_ENUM[record?.type || 0];
        return <Tag color={status.color}>{status.text}</Tag>;
      },
    },
    {
      title: '参数表单类型',
      dataIndex: 'input_type',
    },
    {
      title: '参数描述',
      dataIndex: 'field_desc',
    },
    {
      title: '参数值',
      dataIndex: 'field_value',
      render: (r, record) => {
        if (record.input_type === INPUT_TYPE_IMAGE && record.field_value) {
          return <Image width={200} height={100} src={record.field_value} />;
        }
        return r;
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
          <Access key="update" accessible={access.canButton('settings-update')}>
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
                  await handleDeleteSetting(record, () => {
                    actionRef.current?.reload();
                  });
                }
              }
              return false;
            }}
            menus={access.canOperation([
              { key: OPTION_DELETE, name: '删除', operation: 'settings-delete' },
            ])}
          />,
        ];
      },
    },
  ];
  return (
    <React.Fragment>
      <ProTable<API.RoleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        pagination={false}
        defaultSize="small"
        toolBarRender={() => [
          <Access accessible={access.canButton('settings-add')}>
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
        request={settings}
        columns={columns}
      />
      <ModalForm
        title={'新建参数类型'}
        formRef={formRef}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          await handleAddSetting(value as API.SettingsItem, () => {
            handleModalVisible(false);
            actionRef.current?.reload();
          });
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '参数标题',
            },
          ]}
          label="参数标题"
          tooltip="参数标题"
          placeholder="请输入参数标题"
          width="md"
          name="field_title"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '参数Key',
            },
          ]}
          label="参数Key"
          tooltip="参数Key"
          placeholder="请输入参数Key"
          width="md"
          name="field_key"
        />
        <ProFormSelect
          label="表单类型"
          tooltip="表单类型"
          width="md"
          rules={[
            {
              required: true,
              message: '表单类型',
            },
          ]}
          name="input_type"
          options={[
            { label: 'Text', value: INPUT_TYPE_TEXT },
            { label: 'Number', value: INPUT_TYPE_NUMBER },
            { label: 'Image', value: INPUT_TYPE_IMAGE },
          ]}
        />
        <ProFormSelect
          label="类型"
          tooltip="类型"
          width="md"
          rules={[
            {
              required: true,
              message: '类型',
            },
          ]}
          name="type"
          options={getTypeLabelArray()}
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
        typeLabel={getTypeLabelArray()}
        updateModalVisible={updateModalVisible}
        columns={currentRow}
        handleUpdateModalVisible={handleUpdateModalVisible}
        onUpdateSubmit={async (r) => {
          if (currentRow.id != null) {
            await handlerUpdateSetting(currentRow.id, { ...r }, () => {
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
