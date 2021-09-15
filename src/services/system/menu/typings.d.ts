declare namespace API {
  type MenuListItem = ResponseDate & {
    id?: number;
    level?: number;
    name?: string;
    pid?: number;
    status?: number | boolean;
    icon?: string;
    prefix?: string;
    weight?: number;
    permissions?: API.PermissionItem[];
    children?: MenuListItem[];
  };

  type MenuList = Response & {
    data?: MenuListItem[];
  };

  type MenuListWithPermission = Response & {
    data: {
      list: MenuListItem[];
    };
  };
}
