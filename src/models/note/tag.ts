import { message, Modal } from 'antd';
import { addTag, updateTag, deleteTag } from '@/services/note/api';

export default () => {
  const handleAdd = async (fields: API.TagItem, callBack: () => void) => {
    const hide = message.loading('正在添加');
    try {
      await addTag({ ...fields });
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

  const handleUpdate = async (id: number, fields: API.TagItem, callBack: () => void) => {
    const hide = message.loading('正在更新');
    try {
      await updateTag(id, { ...fields });
      hide();
      message.success('修改成功');
      callBack();
      return true;
    } catch (error) {
      hide();
      message.error('failed, please try again!');
      return false;
    }
  };

  const handleDelete = async (row: API.TagItem, callBack: () => void) => {
    Modal.confirm({
      title: `确认要删除权限【${row.name}】吗?`,
      content: '数据无价，请谨慎操作。',
      async onOk() {
        if (row.id != null) {
          await deleteTag(row.id);
          message.success('操作成功');
          callBack();
        }
      },
      onCancel() {},
    });
  };
  return { handleAdd, handleUpdate, handleDelete };
};
