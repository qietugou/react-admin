import { addSettings, updateSettings, deleteSettings } from '@/services/settings/api';
import { message, Modal } from 'antd';

export default () => {
  const INPUT_TYPE_TEXT = 'text';
  const INPUT_TYPE_IMAGE = 'image';
  const INPUT_TYPE_NUMBER = 'number';

  const handlerUpdateSetting = async (
    id: number,
    option: API.SettingsItem,
    callBack: () => void,
  ) => {
    const hide = message.loading('正在修改...');
    try {
      await updateSettings(id, { ...option });
      hide();
      message.success('参数修改成功');
      callBack();
    } catch {
      hide();
    }
  };

  const handleAddSetting = async (option: API.SettingsItem, callBack: () => void) => {
    const hide = message.loading('请稍后...');
    try {
      await addSettings({ ...option });
      hide();
      message.success('参数新增成功');
      callBack();
    } catch {
      hide();
    }
  };

  const handleDeleteSetting = async (option: API.SettingsItem, callBack: () => void) => {
    Modal.confirm({
      title: `确认要删除参数【${option.field_title}】吗?`,
      content: '数据无价，请谨慎操作。',
      async onOk() {
        if (option.id != null) {
          await deleteSettings(option.id);
          message.success('操作成功');
          callBack();
        }
      },
      onCancel() {},
    });
  };

  return {
    handlerUpdateSetting,
    handleAddSetting,
    handleDeleteSetting,
    INPUT_TYPE_TEXT,
    INPUT_TYPE_IMAGE,
    INPUT_TYPE_NUMBER,
  };
};
