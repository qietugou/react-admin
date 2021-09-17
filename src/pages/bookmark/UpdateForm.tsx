import React, { useEffect, useRef } from "react";
import {
  ProFormUploadButton,
  ProFormTextArea, ModalForm,
} from '@ant-design/pro-form';
import { message } from "antd";
import type { FormInstance } from "antd";
import { saveBookMarkById } from "@/services/bookmark/api";
import type {RcFile} from "antd/lib/upload";

export type UpdateFormProps = {
  updateModalVisible: boolean;
  columns: API.Bookmark,
  handleUpdateModalVisible?: (visible: boolean) => void,
  onUpdateSubmit: () => void,
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const formRef = useRef<FormInstance>();

  const uploadFile: {
    obj?: RcFile | undefined
  } = {
    obj: undefined
  }

  useEffect(() => {
    formRef.current?.setFieldsValue({...props.columns, file: [{
        uid: props.columns.id,
        name: props.columns.name,
        status: 'done',
        url: props.columns.icon,
        thumbUrl: props.columns.icon,
      },]})
  }, [props.columns]); // 仅在 count 更改时更新

  const HandlerFile = (file: RcFile): boolean => {
    uploadFile.obj = file
    return false
  }
  if (props.handleUpdateModalVisible) {
    props.handleUpdateModalVisible(false)
  }
  return (
    <ModalForm
      width={400}
      title={`更新书签【${props.columns.name}】` }
      formRef={ formRef }
      visible={ props.updateModalVisible }
      onVisibleChange={ props.handleUpdateModalVisible }
      onFinish={ async (value: any) => {
        await saveBookMarkById(props.columns.id as number, value.remark, uploadFile.obj)
        message.success("更新成功")
        if (props.handleUpdateModalVisible) {
          props.handleUpdateModalVisible(false)
        }
        if (props.onUpdateSubmit) {
          props.onUpdateSubmit()
        }
      }}
    >
        <ProFormUploadButton
          fieldProps={{
            beforeUpload:(file: RcFile) => {
              return HandlerFile(file)
            }
          }}
          label="上传 Icon"
          max={1}
          name="file"
          title="上传文件"
        />
        <ProFormTextArea width="xl" label="备注" name="remark"/>
    </ModalForm>
  )
}

export default UpdateForm
