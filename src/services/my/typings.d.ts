declare namespace API {
  type MyItem = API.UserListItem & {
    roles?: API.RoleListItem[];
    permissions?: API.PermissionItem[];
  };

  type CurrentUserInfo = Response & {
    data?: MyItem;
  };

  type MenuListWithPermission = Response & {
    data: {
      list: MenuListItem[];
    };
  };

  type Captcha = {
    appid?: string;
    ret?: number;
    ticket?: string;
    randstr?: string;
    bizState?: any;
  };

  type LoginUserItem = {
    name?: string;
    password?: string;
    ticket?: string;
    randstr?: string;
  };

  type SystemInfo = {
    server_os: string;
    go_version: string;
    gin_version: string;
    timezone: string;
    date_time: string;
    user_ip: string;
    user_os: string;
    user_browser: string;
  };

  type SystemInfoResponse = Response & {
    data: SystemInfo;
  };
}
