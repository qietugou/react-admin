import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import type { RequestOptionsInit } from 'umi-request';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { getUserMenu } from '@/services/system/user/api';
import { queryCurrentUser } from '@/services/my/api';
import routeMenu, { filterNotLogin, notLoginRouter, loginPath } from './utils/router';
import React from 'react';
import { history } from 'umi';
import { getToken } from '@/utils/token';
// const isDev = process.env.NODE_ENV === 'development';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: (
    <React.Fragment>
      <PageLoading />
    </React.Fragment>
  ),
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.MyItem;
  fetchUserInfo?: () => Promise<API.MyItem | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (notLoginRouter(history.location.pathname)) {
    const currentUser = await fetchUserInfo();
    return {
      settings: {},
      currentUser,
      fetchUserInfo,
    };
  }
  return {
    settings: {},
    fetchUserInfo,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: async () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (notLoginRouter(location.pathname) && !initialState?.currentUser) {
        try {
          // 首页跳转获取用户信息。
          if (initialState?.fetchUserInfo) {
            const userInfo = await initialState?.fetchUserInfo();
            if (userInfo) {
              await setInitialState((s) => ({ ...s, currentUser: userInfo }));
            }
          }
        } catch (e) {
          history.push(loginPath);
        }
      }
    },
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.id,
      },
      request: async (params, menuData) => {
        if (!initialState?.currentUser) {
          return filterNotLogin(menuData);
        }
        try {
          const menuList = await getUserMenu();
          return routeMenu(menuList || [], menuData);
        } catch (error) {
          return filterNotLogin(menuData);
        }
      },
    },
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

const apiRequestInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader = { Authorization: `Bearer ${getToken()}` };
  return {
    url: `/api/v1/${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

// const apiResponseInterceptor = (response: Response, options: RequestOptionsInit) => {
//   return response;
// };

/**
 * 异常处理程序
 */
// const errorHandler = (error: ResponseError) => {
//   const { response } = error;
//   if (!response) {
//     notification.error({
//       description: '您的网络发生异常，无法连接服务器',
//       message: '网络异常',
//     });
//   }
//   throw error;
// };

export const request: RequestConfig = {
  // errorHandler,
  errorConfig: {
    adaptor: (resData: any) => {
      return {
        success: resData.success,
        errorMessage: resData.msg,
        errorCode: resData.code,
      };
    },
  },
  requestInterceptors: [apiRequestInterceptor],
};
