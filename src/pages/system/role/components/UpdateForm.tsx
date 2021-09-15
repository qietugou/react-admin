import { ModalForm, ProFormText, ProFormSwitch, ProFormSelect } from '@ant-design/pro-form';
import React, { useRef, useEffect } from 'react';
import type { FormInstance } from 'antd';

export type UpdateFormProps = {
  updateModalVisible: boolean;
  columns: API.RoleListItem;
  handleUpdateModalVisible?: (visible: boolean) => void;
  onUpdateSubmit: (values: API.RoleListItem) => Promise<void>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.setFieldsValue({ ...props.columns, status: !props.columns.status });
  }, [props.columns]); // 仅在 count 更改时更新

  return (
    <ModalForm
      title={`更新${props.columns.name}角色`}
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
            message: '角色名称为必填项',
          },
        ]}
        label="角色名称"
        tooltip="最长为 24 位"
        placeholder="请输入角色名称"
        width="md"
        name="name"
      />
      <ProFormSelect
        label="读写类型"
        tooltip="权限是否只读"
        width="md"
        rules={[
          {
            required: true,
            message: '读写类型',
          },
        ]}
        name="is_rw"
        options={[
          { label: '只读', value: 0 },
          { label: '读写', value: 1 },
        ]}
      />
      <ProFormSwitch
        label="状态"
        checkedChildren="启用"
        unCheckedChildren="停用"
        name="status"
        width="lg"
      />
    </ModalForm>
  );
};
export default UpdateForm;
