import { DrawerForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import React, { useRef, useEffect } from 'react';
import { Form, Modal } from 'antd';
import type { FormInstance } from 'antd';
import Editor from '@/components/Editor';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export type UpdateFormProps = {
  updateModalVisible: boolean;
  columns: API.ArticleItem | undefined;
  tags: { label: string; value: number }[];
  handleUpdateModalVisible: (visible: boolean) => void;
  onUpdateSubmit: (values: API.ArticleStoreItem) => Promise<void>;
  onAddSubmit: (values: API.ArticleStoreItem) => Promise<void>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    if (props.columns) {
      formRef.current?.setFieldsValue({
        name: props.columns.title,
        content: props.columns.draft_content,
        tags: props.columns?.tags?.map((t) => t.id),
      });
    } else {
      formRef.current?.setFieldsValue({ name: '', content: '', tags: [] });
    }
  }, [props.columns]);

  const clearResetFields = () => {
    if (props.columns === undefined) {
      formRef.current?.resetFields();
    }
  };

  const visibleChange = (visible: boolean) => {
    if (!visible) {
      Modal.confirm({
        title: '离开此页面?',
        icon: <ExclamationCircleOutlined />,
        content: '系统可能不会保存您所做的更改。',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          props.handleUpdateModalVisible(false);
          clearResetFields();
        },
        onCancel() {},
      });
    }
  };

  return (
    <DrawerForm
      title={props.columns ? `更新【${props.columns?.title}】文章` : '新增文章'}
      formRef={formRef}
      width="80%"
      visible={props.updateModalVisible}
      onVisibleChange={visibleChange}
      onFinish={async (value) => {
        const numberTag: number[] = [];
        const stringTag: string[] = [];
        if (value.tags && Array.isArray(value.tags)) {
          value.tags.forEach((v: string | number) => {
            if (typeof v === 'number') {
              numberTag.push(v);
            } else {
              stringTag.push(v as string);
            }
          });
        }
        if (props.columns && props.columns.id) {
          await props.onUpdateSubmit({ ...value, tags: numberTag, add_tags: stringTag });
        } else {
          await props.onAddSubmit({ ...value, tags: numberTag, add_tags: stringTag });
        }
        clearResetFields();
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入文章标题',
          },
        ]}
        label="文章标题"
        tooltip="最长为 24 位"
        placeholder="请输入文章标题"
        name="name"
      />
      <ProFormSelect
        rules={[
          {
            required: true,
            message: '请选择标签',
          },
        ]}
        mode="tags"
        label="标签"
        tooltip="最长为 24 位"
        placeholder="请输入标签"
        name="tags"
        options={props.tags}
      />
      <Form.Item
        rules={[
          {
            required: true,
            message: '请输入文章内容',
          },
        ]}
        name="content"
        label="文章内容"
      >
        <Editor />
      </Form.Item>
    </DrawerForm>
  );
};
export default UpdateForm;
