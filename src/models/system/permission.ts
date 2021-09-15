import {
  addPermission,
  updatePermission,
  deletePermission,
  getPermissionTree,
} from '@/services/system/permission/api';
import { menu } from '@/services/system/menu/api';
import { renderTree } from '@/utils/func';
import { message, Modal } from 'antd';

export default () => {
  const getMenuTree = async (callBack: (keys: number[], treeList: any[]) => void) => {
    const roleTree = await menu({});
    const treeList: any[] = [];
    callBack(renderTree(roleTree.data, [], treeList), treeList);
  };

  /**
   * 新增权限
   * @param fields
   * @param callBack
   */
  const handleAdd = async (fields: API.PermissionItem, callBack: () => void) => {
    const hide = message.loading('正在添加');
    try {
      await addPermission({ ...fields });
      hide();
      message.success('Added successfully');
      callBack();
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };

  /**
   * 更新权限
   * @param id
   * @param fields
   * @param callBack
   */
  const handleUpdate = async (id: number, fields: API.MenuListItem, callBack: () => void) => {
    const hide = message.loading('正在更新');
    try {
      await updatePermission(id, { ...fields });
      hide();
      message.success('更新成功！');
      callBack();
    } catch (error) {
      hide();
      message.error('更新失败, please try again!');
    }
  };

  /**
   * 删除权限
   * @param row
   * @param callBack
   */
  const handleDelete = async (row: API.PermissionItem, callBack: () => void) => {
    Modal.confirm({
      title: `确认要删除权限【${row.name}】吗?`,
      content: '数据无价，请谨慎操作。',
      async onOk() {
        if (row.id != null) {
          await deletePermission(row.id);
          message.success('操作成功');
          callBack();
        }
      },
      onCancel() {},
    });
  };

  const handlerPermissionTree = async () => {
    const hide = message.loading('请稍后...');
    const tree = await getPermissionTree();
    hide();
    return tree.data;
  };
  return { getMenuTree, handleAdd, handleUpdate, handleDelete, handlerPermissionTree };
};
