import {ModalForm, ProFormText, ProFormSwitch} from "@ant-design/pro-form";
import React, {useRef, useEffect} from "react";
import type {FormInstance} from "antd";

export type UpdateFormProps = {
  updateModalVisible: boolean;
  columns: API.UserListItem,
  handleUpdateModalVisible?: (visible: boolean) => void,
  onUpdateSubmit: (values: API.UserListItem) => Promise<void>,
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.setFieldsValue({...props.columns, password: '', password2: '', status: !props.columns.status})
  }, [props.columns]); // 仅在 count 更改时更新

  return (
    <ModalForm
      title={'更新用户'}
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
            message: '账户号为必填项',
          },
        ]}
        label="账户号"
        tooltip="最长为 24 位"
        placeholder="请输入账户号"
        width="md"
        name="name"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '手机号为必填项',
          },
        ]}
        label="手机号"
        tooltip="最长为 13 位"
        placeholder="请输入手机号"
        width="md"
        name="phone"
      />
      <ProFormText.Password
        rules={[
          {
            required: false,
            message: '密码不填不修改',
          },
        ]}
        label="密码"
        tooltip="随意"
        placeholder="请输入密码"
        width="md"
        name="password"
      />
      <ProFormText.Password
        rules={[
          {
            required: false,
            message: '重复密码不填不修改',
          },
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码不一致'));
            },
          }),
        ]}
        label="重复密码"
        tooltip="随意"
        placeholder="请输入重复密码"
        width="md"
        name="password2"
      />
      <ProFormSwitch
        label="状态"
        checkedChildren="启用"
        unCheckedChildren="停用"
        name="status"
        width="lg"
      />
    </ModalForm>
  )
}
export default UpdateForm;
