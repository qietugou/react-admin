import React from 'react';
import { Drawer, Tag } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';

export type DetailProps = {
  showDetail: boolean;
  columns: API.UserListItem;
  onCancel: (flag?: boolean, formVals?: any) => void;
};

const Detail: React.FC<DetailProps> = (props) => {
  // @ts-ignore
  return (
    <Drawer
      width={600}
      visible={props.showDetail}
      onClose={() => {
        props.onCancel();
      }}
      closable={true}
    >
      <ProDescriptions<API.RuleListItem> column={1} title={props.columns?.name} tooltip="账号详情">
        <ProDescriptions.Item label="账户号" valueType="text">
          {props.columns?.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="手机号" valueType="text">
          {props.columns?.phone}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="状态" valueType="text">
          {props.columns?.status === 0 ? (
            <Tag color="green">启用</Tag>
          ) : (
            <Tag color="red">停用</Tag>
          )}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建日期" valueType="date">
          {props.columns?.created_at}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="更新日期" valueType="date">
          {props.columns?.updated_at}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="拥有角色" valueType="text">
          {props.columns?.roles?.map((role) => {
            return (
              <Tag key={role.id} color="#108ee9">
                {role.name}
              </Tag>
            );
          })}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="拥有权限" valueType="text">
          ...
        </ProDescriptions.Item>
      </ProDescriptions>
    </Drawer>
  );
};

export default Detail;
