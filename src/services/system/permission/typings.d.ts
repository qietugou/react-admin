declare namespace API {
  type PermissionItem = ResponseDate & {
    id?: number;
    level?: number;
    name?: string;
    action?: string;
    is_rw?: number;
    sort?: number;
    module_id?: number;
    router?: string;
    method?: string;
  };

  type PermissionList = Response & {
    data?: PermissionItem[];
  };
}
