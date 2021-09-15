import { message, Modal } from 'antd';
import { addUser, changStatus, updateUser, deleteUser, saveRole } from '@/services/system/user/api';
import { role } from '@/services/system/role/api';

export default () => {
  /**
   * 新增账户
   * @param fields
   * @param callBack
   */
  const handleAdd = async (fields: API.UserListItem, callBack: () => void) => {
    const hide = message.loading('正在添加');
    try {
      await addUser({ ...fields });
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
   * 更新账户
   * @param id
   * @param fields
   * @param callBack
   */
  const handleUpdate = async (id: number, fields: API.UserListItem, callBack: () => void) => {
    const hide = message.loading('正在更新');
    await updateUser(id, { ...fields, status: !fields.status ? 1 : 0 });
    hide();
    message.success('更新成功！');
    callBack();
    return true;
  };

  /**
   * 更新状态
   * @param id
   * @param status
   * @param remark
   * @param name
   * @param callBack
   */
  const handlerOptionStatus = async (
    id: number,
    status: number,
    remark: string,
    name: string,
    callBack: () => void,
  ) => {
    Modal.confirm({
      title: `确认要${remark}账户【${name}】吗?`,
      content: '数据无价，请谨慎操作！',
      async onOk() {
        await changStatus(id, status);
        message.success('操作成功');
        callBack();
      },
      onCancel() {},
    });
  };

  const handleDelete = async (option: API.RoleListItem, callBack: () => void) => {
    Modal.confirm({
      title: `确认要删除用户【${option.name}】吗?`,
      content: '数据无价，请谨慎操作。',
      async onOk() {
        if (option.id != null) {
          await deleteUser(option.id);
          message.success('操作成功');
          callBack();
        }
      },
      onCancel() {},
    });
  };

  const handlerRole = async (callBack: (list: API.RoleListItem[]) => void) => {
    const res = await role();
    callBack(res.data);
  };

  const handleSaveRole = async (id: number, roles: string[], callBack: () => void) => {
    const hide = message.loading('请稍后...');
    await saveRole(id, roles);
    hide();
    message.success('更新成功');
    callBack();
  };

  return {
    handleAdd,
    handleUpdate,
    handlerOptionStatus,
    handleDelete,
    handlerRole,
    handleSaveRole,
  };
};
