import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { upload } from '@/services/my/api';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/lib/upload/interface';
import type { UploadFile } from 'antd/lib/upload/interface';

type UploadProps = {
  max?: number;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const UploadImage: React.FC<UploadProps> = (props) => {
  const [fileList, handleFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    handleFileList([
      {
        uid: `${props.value}`,
        name: '预览',
        status: 'done',
        url: props.value,
        thumbUrl: props.value,
      },
    ]);
  }, [props.value]);

  const handleUpload = async (option: any) => {
    const file = option.file as File;

    try {
      // 使用第三方服务进行文件上传
      const result = await upload(file);
      option.onSuccess(result);
      if (props.onChange) {
        props.onChange(`${result.data.path}`);
      }
      handleFileList([
        {
          uid: `${result.data.path}`,
          name: '预览',
          status: 'done',
          url: result.data.url,
          thumbUrl: result.data.url,
        },
      ]);
    } catch (error) {
      option.onError(error);
    }
  };

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      handleFileList(info.fileList);
    }
  };

  const handleCRemove = () => {
    if (props.onChange) {
      props.onChange('');
    }
    handleFileList([]);
  };

  return (
    <div className={`${styles.uploadImage} ${props.className || ''}`}>
      <Upload
        name="file"
        listType={'picture'}
        accept="image/png, image/jpeg"
        maxCount={props.max || 1}
        customRequest={handleUpload}
        onChange={handleChange}
        onRemove={handleCRemove}
        fileList={fileList}
      >
        {fileList.length === (props.max || 1) ? (
          ''
        ) : (
          <Button icon={<UploadOutlined />}>上传图片</Button>
        )}
      </Upload>
    </div>
  );
};

export default UploadImage;
