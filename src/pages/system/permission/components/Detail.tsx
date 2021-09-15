import React, { useRef } from 'react';
import { DrawerForm } from '@ant-design/pro-form';
import type { FormInstance } from 'antd';
import { Badge } from 'antd';
import ProCard from '@ant-design/pro-card';

export type DetailProps = {
  showDetail: boolean;
  permissionTree: API.MenuListItem[];
  setShowDetail?: (visible: boolean) => void;
};

const Detail: React.FC<DetailProps> = (props) => {
  const formRef = useRef<FormInstance>();

  const htmlChildTree = (data: API.PermissionItem[]) => {
    return data
      ? data.map((p) => {
          return (
            <React.Fragment key={p.id}>
              <Badge
                style={{ margin: '10px 24px' }}
                color={p.is_rw ? 'red' : 'green'}
                text={p.name}
              />
            </React.Fragment>
          );
        })
      : '';
  };

  const htmlChildrenTree = (data: API.MenuListItem[]) => {
    return data.map((menu) => {
      return (
        <React.Fragment key={menu.id}>
          <ProCard
            headStyle={{ padding: 8 }}
            bodyStyle={{ padding: 10 }}
            title={<div style={{ fontSize: 14 }}>{menu.name}</div>}
            type="inner"
          >
            {menu.children
              ? htmlChildrenTree(menu.children)
              : htmlChildTree(menu.permissions || [])}
          </ProCard>
        </React.Fragment>
      );
    });
  };
  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title="权限列表"
      visible={props.showDetail}
      formRef={formRef}
      onVisibleChange={props.setShowDetail}
      submitter={{
        resetButtonProps: {
          type: 'dashed',
        },
        submitButtonProps: {
          style: {
            display: 'none',
          },
        },
      }}
    >
      <ProCard
        direction="column"
        gutter={[0, 16]}
        style={{ padding: 0 }}
        bodyStyle={{ padding: 0 }}
      >
        {props.permissionTree.map((item) => {
          return (
            <ProCard
              key={item.id}
              headStyle={{ padding: 10 }}
              bodyStyle={{ padding: 10 }}
              title={item.name}
              type="inner"
              bordered
            >
              {htmlChildrenTree(item.children || [])}
              {htmlChildTree(item.permissions || [])}
            </ProCard>
          );
        })}
      </ProCard>
    </DrawerForm>
  );
};

export default Detail;
