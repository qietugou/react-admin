import ProForm, {ModalForm, ProFormText, ProFormDigit, ProFormSelect} from "@ant-design/pro-form";
import React, {useRef, useEffect} from "react";
import type {FormInstance} from "antd";
import {Form, TreeSelect} from "antd";

export type AddFormProps = {
  createModalVisible: boolean;
  handleModalVisible?: (visible: boolean) => void,
  addSubmit: (values: API.PermissionItem) => Promise<void>,
  treeMenuData: any,
  defaultExpanded: number[]
};

const AddForm: React.FC<AddFormProps> = (props) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    formRef.current?.resetFields();
  }, [props.createModalVisible]); // 仅在 count 更改时更新

  return (
    <ModalForm
      title={'新建权限'}
      formRef={formRef}
      visible={props.createModalVisible}
      onVisibleChange={props.handleModalVisible}
      onFinish={props.addSubmit}
    >
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: '权限名称',
            },
          ]}
          label="权限名称"
          tooltip="最长为 24 位"
          placeholder="请输入权限名称"
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '路由',
            },
          ]}
          label="路由"
          tooltip="后端请求路由权限"
          placeholder="请输入路由"
          width="md"
          name="router"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: '动作',
            },
          ]}
          label="动作"
          tooltip="前端鉴权"
          placeholder="请输入动作"
          width="md"
          name="action"
        />
        <ProFormSelect
          label="请求类型"
          tooltip="HTTP类型"
          width="md"
          rules={[
            {
              required: true,
              message: '请求类型',
            },
          ]}
          name="method"
          options={[
            { label: 'GET', value: 'GET' },
            { label: 'POST', value: 'POST' },
            { label: 'PUT', value: 'PUT' },
            { label: 'DELETE', value: 'DELETE' },
            { label: 'PATCH', value: 'PATCH' },
          ]}
        >
        </ProFormSelect>
      </ProForm.Group>
      <ProForm.Group>
        <Form.Item
          label="菜单模块"
          tooltip="请选择菜单模块"
          name="module_id"
          rules={[
            {
              required: true,
              message: '菜单模块',
            },
          ]}
        >
          <TreeSelect
            style={{width: '328px'}}
            treeDataSimpleMode
            dropdownStyle={{overflow: 'auto'}}
            placeholder="请选择关联模块"
            treeDefaultExpandAll
            treeData={props.treeMenuData}
          />
        </Form.Item>
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
        >
        </ProFormSelect>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          label="排序"
          tooltip="最长为 24 位"
          placeholder="请输入排序"
          width="md"
          name="sort"
        />
      </ProForm.Group>
    </ModalForm>
  )
}
export default AddForm;
