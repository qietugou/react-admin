/**
 * 公共的变量
 */
export default () => {
  const MENU_LIST = [
    {
      path: '/welcome',
      name: '导航',
      icon: 'daohang',
    },
    {
      path: '/note',
      name: '随记',
      icon: 'note',
    },
    {
      path: '/yuque',
      name: '语雀',
      icon: 'yuqueicon',
    },
    {
      path: '/bookmark',
      name: '书签',
      icon: 'shuqian',
    },
  ];

  return {
    MENU_LIST,
  };
};
