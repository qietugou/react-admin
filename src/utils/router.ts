import type { MenuDataItem } from '@umijs/route-utils';
import * as Icon from '@ant-design/icons';
import { HomeRoutes } from '../../config/routes';
import React from 'react';

export const loginPath = '/q/welcome?q=login';
export const homePath = '/';

export const notLoginRouter: any = (route: string) => {
  if (homePath === route) {
    return !route;
  }
  return !HomeRoutes.routes.find((r) => r.path === route);
};

export const filterNotLogin = (menuData: MenuDataItem[]): MenuDataItem[] => {
  return menuData.filter((m) => {
    return !m.login;
  });
};

const searchRoute = (menuList: API.MenuListItem[], menuData: MenuDataItem[]) => {
  return menuData.map((item) => {
    let route: MenuDataItem = item;
    const menu = menuList?.find((m) => m.prefix === item.path);
    if (menu) {
      route = { ...item, ...menu };
      if (item.children && item.routes) {
        route.routes = searchRoute(menuList, item.routes);
      }
      if (menu.icon) {
        route.icon = React.createElement(Icon[route.icon]);
      }
    } else if (!item.require) {
      route = { ...item, hideInMenu: true };
    }
    return route;
  });
};

const sortRoute = (menuData: MenuDataItem[]) => {
  const menuDataSortList = menuData.map((item) => {
    const route: MenuDataItem = item;
    if (item.children && item.routes) {
      route.routes = sortRoute(item.routes);
    }
    return route;
  });
  return menuDataSortList.sort((a, b) => b.weight - a.weight);
};

const routeMenu = (menuList: API.MenuListItem[], menuData: MenuDataItem[]): MenuDataItem[] => {
  const routeList = searchRoute(menuList, menuData);
  return sortRoute(routeList);
};

export default routeMenu;
