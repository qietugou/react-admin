import { message, Modal } from 'antd';
import { addMenu, deleteMenu, menu, updateMenu } from '@/services/system/menu/api';
import { renderTree } from '@/utils/func';

export default () => {
  const getRuleTree = async (callBack: (keys: number[], treeList: any[]) => void) => {
    const roleTree = await menu({});
    const treeList: any[] = [{ title: '无上级', id: 0, pid: -1, value: 0 }];
    callBack(renderTree(roleTree.data, [], treeList), treeList);
  };
  /**
   * 新增菜单
   * @param fields
   * @param callBack
   */
  const handleAdd = async (fields: API.MenuListItem, callBack: () => void) => {
    const hide = message.loading('正在添加');
    try {
      await addMenu({ ...fields, status: fields?.status === true ? 0 : 1 });
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
   * 更新菜单
   * @param id
   * @param fields
   * @param callBack
   */
  const handleUpdate = async (id: number, fields: API.MenuListItem, callBack: () => void) => {
    const hide = message.loading('正在更新');
    try {
      await updateMenu(id, { ...fields, status: fields?.status === true ? 0 : 1 });
      hide();
      message.success('更新成功！');
      callBack();
    } catch (error) {
      hide();
      message.error('更新失败, please try again!');
    }
  };

  /**
   * 删除菜单
   * @param row
   * @param callBack
   */
  const handleDelete = async (row: API.MenuListItem, callBack: () => void) => {
    Modal.confirm({
      title: `确认要删除菜单【${row.name}】吗?`,
      content: '数据无价，请谨慎操作。',
      async onOk() {
        if (row.id != null) {
          await deleteMenu(row.id);
          message.success('操作成功');
          callBack();
        }
      },
      onCancel() {},
    });
  };
  return {
    getRuleTree,
    handleAdd,
    handleDelete,
    handleUpdate,
  };
};
