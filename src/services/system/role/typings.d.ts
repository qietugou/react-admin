declare namespace API {
  type RoleListItem = ResponseDate & {
    id?: number;
    name?: string;
    status?: number;
    is_rw?: number;
    created_at?: string;
    updated_at?: string;
  };

  type RoleList = Response & {
    data?: RoleListItem[];
  };
  type Permission = {
    permissions: API.PermissionItem[];
  };
  type RolePermission = Response & {
    data: RoleListItem & Permission;
  };
}
