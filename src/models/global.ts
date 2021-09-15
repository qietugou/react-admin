/**
 * 公共的变量
 */
export default () => {
  const OPTION_DETAIL = 'detail';
  const OPTION_DELETE = 'delete';
  const OPTION_STATUS = 'status';
  const OPTION_ROLE = 'role';
  const OPTION_PERMISSION = 'permission';
  const APP_ID_CAPTCHA = '2002264428';

  /**
   * 是否显示
   */
  const STATUS_SHOW_ENUM = {
    0: {
      color: 'green',
      text: '显示',
      number: 0,
    },
    1: {
      color: 'red',
      text: '不显示',
      number: 1,
    },
  };

  const STATUS_ACTION_ENUM = {
    0: {
      color: 'green',
      text: '启用',
      number: 0,
    },
    1: {
      color: 'red',
      text: '停用',
      number: 1,
    },
  };

  const STATUS_RW_ENUM = {
    0: {
      color: 'orange',
      text: '只读',
      number: 0,
    },
    1: {
      color: 'cyan',
      text: '读写',
      number: 1,
    },
  };

  return {
    APP_ID_CAPTCHA,
    OPTION_STATUS,
    OPTION_DETAIL,
    OPTION_DELETE,
    OPTION_ROLE,
    OPTION_PERMISSION,
    STATUS_SHOW_ENUM,
    STATUS_ACTION_ENUM,
    STATUS_RW_ENUM,
  };
};
