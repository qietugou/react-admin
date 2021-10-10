import { DrawerForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import React, { useRef, useEffect } from 'react';
import type { FormInstance } from 'antd';
import Editor from '@/components/Editor';

export type UpdateFormProps = {
  updateModalVisible: boolean;
  columns: API.GithubTagItem | undefined;
  handleUpdateModalVisible?: (visible: boolean) => void;
  onUpdateSubmit: (values: API.GithubTagItem) => Promise<void>;
  onAddSubmit: (values: API.GithubTagItem) => Promise<void>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.setFieldsValue({ ...props.columns });
  }, [props.columns]); // 仅在 count 更改时更新

  return (
    <DrawerForm
      title={props.columns ? `更新【${props.columns?.name}】文章` : '新增文章'}
      formRef={formRef}
      width="80%"
      visible={props.updateModalVisible}
      onVisibleChange={props.handleUpdateModalVisible}
      onFinish={props.onUpdateSubmit}
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
        label="标签"
        tooltip="最长为 24 位"
        placeholder="请输入标签"
        name="alias"
      />
      <Editor />
    </DrawerForm>
  );
};
export default UpdateForm;
