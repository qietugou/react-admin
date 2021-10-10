import { ModalForm, ProFormText, ProFormDigit, ProFormSelect } from '@ant-design/pro-form';
import React, { useRef, useEffect } from 'react';
import type { FormInstance } from 'antd';
import UploadImage from '@/components/UploadImage';
import { useModel } from 'umi';
import type { UploadFile } from 'antd/es/upload/interface';
import type { StatusTypeItem } from '../../settings';

export type UpdateFormProps = {
  updateModalVisible: boolean;
  columns: API.SettingsItem;
  typeLabel: StatusTypeItem[];
  handleUpdateModalVisible?: (visible: boolean) => void;
  onUpdateSubmit: (values: API.SettingsItem) => Promise<void>;
};
type UpdateSettings = API.SettingsItem & {
  file: UploadFile[];
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const formRef = useRef<FormInstance>();

  const { INPUT_TYPE_TEXT, INPUT_TYPE_IMAGE, INPUT_TYPE_NUMBER } = useModel('settings.setting');

  useEffect(() => {
    const data: UpdateSettings = { ...props.columns, file: [] };
    if (props.columns.input_type === INPUT_TYPE_IMAGE) {
      if (props.columns.field_value) {
        data.file = [
          {
            uid: `${props.columns.id}`,
            name: props.columns.field_title || '',
            status: 'done',
            url: props.columns.field_value,
            thumbUrl: props.columns.field_value,
          },
        ];
      }
    }
    formRef.current?.setFieldsValue({ ...data });
  }, [props.columns]); // 仅在 count 更改时更新

  return (
    <ModalForm
      title={`更新[${props.columns.field_title}]参数`}
      formRef={formRef}
      width="400px"
      visible={props.updateModalVisible}
      onVisibleChange={props.handleUpdateModalVisible}
      onFinish={async (values: UpdateSettings) => {
        if (props.columns.input_type === INPUT_TYPE_IMAGE) {
          return props.onUpdateSubmit({
            ...values,
            field_value: values.file[0] ? values.file[0].response : values.field_value,
          });
        }
        return props.onUpdateSubmit({ ...values });
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
            message: '参数描述',
          },
        ]}
        label="参数描述"
        tooltip="参数描述"
        placeholder="请输入参数描述"
        width="md"
        name="field_desc"
      />
      {props?.columns.input_type === INPUT_TYPE_TEXT ? (
        <ProFormText
          rules={[
            {
              required: true,
              message: '请输入参数值',
            },
          ]}
          label="参数值"
          tooltip="最长为 24 位"
          placeholder="请输入参数值"
          width="md"
          name="field_value"
        />
      ) : (
        ''
      )}
      {props?.columns.input_type === INPUT_TYPE_IMAGE ? <UploadImage name="field_value" /> : ''}
      {props?.columns.input_type === INPUT_TYPE_NUMBER ? (
        <ProFormDigit
          rules={[
            {
              required: true,
              message: '请输入参数值',
            },
          ]}
          label="参数值"
          tooltip="最长为 24 位"
          placeholder="请输入参数值"
          width="md"
          name="field_value"
        />
      ) : (
        ''
      )}
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
        options={props.typeLabel}
      />
    </ModalForm>
  );
};
export default UpdateForm;
