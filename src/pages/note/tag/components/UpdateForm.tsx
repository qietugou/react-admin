import { ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-form';
import React, { useRef, useEffect } from 'react';
import type { FormInstance } from 'antd';

export type UpdateFormProps = {
  updateModalVisible: boolean;
  columns: API.TagItem;
  handleUpdateModalVisible?: (visible: boolean) => void;
  onUpdateSubmit: (values: API.RoleListItem) => Promise<void>;
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
  );
};
export default UpdateForm;
