import ProForm, {ModalForm, ProFormText, ProFormSwitch, ProFormDigit} from "@ant-design/pro-form";
import React, {useRef, useEffect} from "react";
import type {FormInstance} from "antd";
import {Form, TreeSelect} from "antd";

export type UpdateFormProps = {
  updateModalVisible: boolean;
  columns: API.MenuListItem,
  treeData: any,
  handleUpdateModalVisible?: (visible: boolean) => void,
  onUpdateSubmit: (values: API.MenuListItem) => Promise<void>,
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.setFieldsValue({...props.columns, status: !props.columns.status})
  }, [props.columns]); // 仅在 count 更改时更新

  return (
    <ModalForm
      title={'更新菜单'}
      formRef={formRef}
      visible={props.updateModalVisible}
      onVisibleChange={props.handleUpdateModalVisible}
      onFinish={props.onUpdateSubmit}
    >
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: '菜单名称',
            },
          ]}
          label="菜单名称"
          tooltip="最长为 24 位"
          placeholder="请输入菜单名称"
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '前端路径',
            },
          ]}
          initialValue="/"
          label="前端路径"
          tooltip="请以 / 开头"
          placeholder="请输入前端路径"
          width="md"
          name="prefix"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              message: '菜单图标',
            },
          ]}
          label="菜单图标"
          tooltip="最长为 24 位"
          placeholder="请输入菜单图标"
          width="md"
          name="icon"
        />
        <Form.Item
          label="上级"
          tooltip="请选择上级"
          name="pid"
        >
          <TreeSelect
            style={{width: '328px'}}
            treeDataSimpleMode
            dropdownStyle={{overflow: 'auto'}}
            placeholder="请选择上级"
            treeDefaultExpandAll
            treeData={props.treeData}
          />
        </Form.Item>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          label="排序"
          tooltip="最长为 24 位"
          placeholder="请输入排序"
          width="md"
          name="weight"
        />
        <ProFormSwitch
          label="是否显示"
          name="status"
          checkedChildren="显示"
          unCheckedChildren="不显示"
          width="lg"
        />
      </ProForm.Group>
    </ModalForm>
  )
}
export default UpdateForm;
