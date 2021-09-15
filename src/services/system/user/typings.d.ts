declare namespace API {
  type UserListItem = ResponseDate & {
    id?: number;
    name?: string;
    phone?: number;
    created_at?: string;
    updated_at?: string;
    password?: string;
    status?: number;
    roles?: API.RoleListItem[];
  };

  type UserList = Response & {
    data?: UserListItem[];
  };
}
