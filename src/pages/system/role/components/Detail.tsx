import React, { useRef, useState, useEffect } from 'react';
import { DrawerForm } from '@ant-design/pro-form';
import type { FormInstance } from 'antd';
import { Tree, message, Button, Row, Col } from 'antd';
import ProCard from '@ant-design/pro-card';
import { renderPermissionTree } from '@/utils/func';
import type { Tree as TreeType } from '@/utils/func';

export type DetailProps = {
  showDetail: boolean;
  permissionTree: API.MenuListItem[];
  setShowDetail?: (visible: boolean) => void;
  rolePermissions: API.PermissionItem[];
  roleItem: API.RoleListItem;
  onUpdateSubmit: (id: number, permissionIds: number[]) => Promise<void>;
};

const Detail: React.FC<DetailProps> = (props) => {
  const formRef = useRef<FormInstance>();
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>();
  const [treeData, setTreeData] = useState<TreeType[]>([]);
  // 存储所有上级
  const [treeKeys, setTreeKeys] = useState<string[]>([]);
  // 存储所有的权限节点
  const [treePermissionIds, setTreePermissionIds] = useState<Record<string, number>[]>([]);

  const changeRw = (rw: string): void => {
    const selectKey = treeKeys.filter((key) => {
      return key.indexOf(`-rw${rw}-`) !== -1;
    });
    setCheckedKeys(selectKey);
  };
  useEffect(() => {
    const treeTempData: TreeType[] = [];
    const treeTempKeys: string[] = [];
    const treeTempPermissionIds: Record<string, number>[] = [];
    renderPermissionTree(
      props.permissionTree,
      '0',
      treeTempData as TreeType[],
      treeTempKeys,
      treeTempPermissionIds,
    );
    setTreeData([{ title: '全部', key: '0', children: treeTempData }]);
    setTreeKeys(treeTempKeys);
    setTreePermissionIds(treeTempPermissionIds);
  }, [props.permissionTree]);

  useEffect(() => {
    const selectKey = treeKeys.filter((key) => {
      return props.rolePermissions?.find((p) => key.endsWith(`-${p.router}-${p.method}`));
    });
    setCheckedKeys(selectKey);
  }, [props.rolePermissions, treeKeys]);

  return (
    <DrawerForm
      title="分配权限"
      visible={props.showDetail}
      formRef={formRef}
      onVisibleChange={props.setShowDetail}
      onFinish={async () => {
        const permissionIds: number[] = [];
        checkedKeys?.forEach((id) => {
          treePermissionIds.forEach((p) => {
            if (p[id]) {
              permissionIds.push(p[id]);
            }
          });
        });
        if (permissionIds.length === 0) {
          message.error('未选中对应权限!');
          return false;
        }
        if (props.roleItem.id != null) {
          await props.onUpdateSubmit(props.roleItem.id, permissionIds);
        }
        return true;
      }}
    >
      <ProCard
        direction="column"
        gutter={[0, 16]}
        style={{ padding: 0 }}
        bodyStyle={{ padding: 0 }}
      >
        <Row style={{ marginBottom: 20 }}>
          <Col>
            <Button
              style={{ width: 70 }}
              size="small"
              onClick={() => {
                changeRw('0');
              }}
              type="primary"
            >
              只读
            </Button>
          </Col>
          <Col offset={1}>
            <Button
              style={{ width: 70 }}
              size="small"
              onClick={() => {
                changeRw('1');
              }}
              type="primary"
            >
              读写
            </Button>
          </Col>
        </Row>

        <Tree
          checkable
          onCheck={(checked: any) => {
            setCheckedKeys(checked);
          }}
          checkedKeys={checkedKeys}
          selectedKeys={[]}
          defaultExpandAll={true}
          treeData={treeData}
        />
      </ProCard>
    </DrawerForm>
  );
};

export default Detail;
