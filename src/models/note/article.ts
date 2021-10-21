import { message, Modal } from 'antd';
import { addArticle, updateArticle, deleteArticle, changStatus } from '@/services/note/api';

export default () => {
  const handleAdd = async (fields: API.ArticleStoreItem, callBack: () => void) => {
    const hide = message.loading('正在添加');
    try {
      await addArticle({ ...fields });
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

  const handleUpdate = async (id: number, fields: API.ArticleStoreItem, callBack: () => void) => {
    const hide = message.loading('正在更新');
    try {
      await updateArticle(id, { ...fields });
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

  const handleDelete = async (row: API.ArticleItem, callBack: () => void) => {
    Modal.confirm({
      title: `确认要删除权限【${row.title}】吗?`,
      content: '数据无价，请谨慎操作。',
      async onOk() {
        if (row.id != null) {
          await deleteArticle(row.id);
          message.success('操作成功');
          callBack();
        }
      },
      onCancel() {},
    });
  };

  const handlePush = async (
    remark: string,
    title: string,
    id: number,
    status: number,
    callBack: () => void,
  ) => {
    Modal.confirm({
      title: `确认要${remark}【${title}】吗?`,
      content: '数据无价，请谨慎操作！',
      async onOk() {
        await changStatus(id, status);
        message.success('操作成功');
        callBack();
      },
      onCancel() {},
    });
  };

  return { handleAdd, handleUpdate, handleDelete, handlePush };
};
