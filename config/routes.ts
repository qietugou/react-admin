/**
 * 首页路由
 */
export const HomeRoutes = {
  path: '/q',
  layout: false,
  component: './home/Layout/index',
  require: true,
  login: false,
  routes: [
    {
      path: '/q/welcome',
      name: '导航',
      component: './home/welcome',
      icon: 'daohang',
      require: true,
    },
    {
      path: '/q/note',
      name: '随记',
      component: './TableList',
      icon: 'note',
      require: true,
    },
    {
      path: '/q/articles/:type/:id',
      name: '详情',
      component: './TableList',
      hideInMenu: true,
      highlights: ['/note', '/yuque'], //可能会被匹配到
      require: true,
    },
    {
      path: '/q/yuque',
      name: '语雀',
      component: './TableList',
      icon: 'yuqueicon',
      require: true,
    },
    {
      path: '/q/bookmark',
      name: '书签',
      component: './404',
      icon: 'shuqian',
      require: true,
    },
    { component: './404', redirect: '/q/welcome', require: true },
  ],
};

export default [
  {
    path: '/',
    redirect: '/q/welcome',
  },
  HomeRoutes,
  {
    path: '/admin',
    name: '欢迎',
    icon: 'smile',
    component: './Welcome',
    require: true,
    login: true,
  },
  {
    path: '/system',
    name: '系统',
    icon: 'crown',
    component: './content',
    login: true,
    routes: [
      { path: '/system/user', name: '用户管理', component: './system/user' },
      { path: '/system/role', name: '角色管理', component: './system/role' },
      { path: '/system/menu', name: '菜单管理', component: './system/menu' },
      { path: '/system/permission', name: '权限管理', component: './system/permission' },
      { component: './404', require: true },
    ],
  },
  {
    path: '/note',
    name: '随记随录',
    component: './content',
    login: true,
    routes: [
      { path: '/note/tag', name: '标签管理', component: './note/tag' },
      { path: '/note/article', name: '文章管理', component: './system/role' },
      { component: './404', require: true },
    ],
  },
  {
    path: '/bookmark',
    name: '书签',
    component: './bookmark',
    icon: 'BookOutlined',
    login: true,
  },
  {
    path: '/bookmark/detail',
    name: '书签列表',
    component: './bookmark/detail',
    login: true,
    hideInMenu: false,
  },
  { component: './404', require: true },
];
