import React from 'react';
import styles from './index.less';
import { ProFormUploadButton } from '@ant-design/pro-form';
import { upload } from '@/services/my/api';

type UploadProps = {
  name: string;
  title?: string;
  max?: number;
  label?: string;
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg' | undefined;
  className?: string;
};

const UploadImage: React.FC<UploadProps> = (props) => {
  const handleUpload = async (option: any) => {
    const file = option.file as File;

    try {
      // 使用第三方服务进行文件上传
      const result = await upload(file);
      option.onSuccess(result.data.path);
    } catch (error) {
      option.onError(error);
    }
  };

  return (
    <div className={`${styles.uploadImage} ${props.className || ''}`}>
      <ProFormUploadButton
        rules={[
          {
            required: true,
            message: '请输入参数值',
          },
        ]}
        accept="image/png, image/jpeg"
        label={props.label || '上传图片'}
        max={props.max || 1}
        width={props.width || 'md'}
        fieldProps={{
          customRequest: handleUpload,
        }}
        name="file"
        title={props.title || '上传图片'}
      />
    </div>
  );
};

export default UploadImage;
