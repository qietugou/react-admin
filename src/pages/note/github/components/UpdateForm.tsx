import { ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-form';
import React, { useRef, useEffect } from 'react';
import type { FormInstance } from 'antd';

export type UpdateFormProps = {
  updateModalVisible: boolean;
  columns: API.GithubTagItem;
  handleUpdateModalVisible?: (visible: boolean) => void;
  onUpdateSubmit: (values: API.GithubTagItem) => Promise<void>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.setFieldsValue({ ...props.columns });
  }, [props.columns]); // 仅在 count 更改时更新

  return (
    <ModalForm
      title={`更新${props.columns.name} Tag`}
      formRef={formRef}
      width="400px"
      visible={props.updateModalVisible}
      onVisibleChange={props.handleUpdateModalVisible}
      onFinish={props.onUpdateSubmit}
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
  );
};
export default UpdateForm;
