import {
  getRolePermission,
  putRolePermission,
  updateRole,
  addRole,
  deleteRole,
} from '@/services/system/role/api';
import { message, Modal } from 'antd';

export default () => {
  const rolePermission = async (
    id: number,
    callBack: (permissions: API.PermissionItem[]) => void,
  ) => {
    const hide = message.loading('请稍后...');
    const res = await getRolePermission(id);
    hide();
    callBack(res.permissions);
  };

  const handlerPutRolePermission = async (
    id: number,
    permissionIds: number[],
    callBack: () => void,
  ) => {
    const hide = message.loading('请稍后...');
    await putRolePermission(id, permissionIds);
    hide();
    message.success('权限变更成功。');
    callBack();
  };

  const handlerUpdateRole = async (id: number, option: API.RoleListItem, callBack: () => void) => {
    const hide = message.loading('正在修改...');
    try {
      await updateRole(id, { ...option, status: option.status ? 0 : 1 });
      hide();
      message.success('角色修改成功');
      callBack();
    } catch {
      hide();
    }
  };

  const handleAddRole = async (option: API.RoleListItem, callBack: () => void) => {
    const hide = message.loading('请稍后...');
    try {
      await addRole({ ...option, status: 0 });
      hide();
      message.success('角色新增成功');
      callBack();
    } catch {
      hide();
    }
  };

  const handleDeleteRole = async (option: API.RoleListItem, callBack: () => void) => {
    Modal.confirm({
      title: `确认要删除角色【${option.name}】吗?`,
      content: '数据无价，请谨慎操作。',
      async onOk() {
        if (option.id != null) {
          await deleteRole(option.id);
          message.success('操作成功');
          callBack();
        }
      },
      onCancel() {},
    });
  };

  return {
    rolePermission,
    handlerPutRolePermission,
    handlerUpdateRole,
    handleAddRole,
    handleDeleteRole,
  };
};
