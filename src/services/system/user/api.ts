import { request } from 'umi';

/** 获取规则列表 GET /api/rule */
export async function user(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  const res: any = await request<API.UserList>('admin', {
    method: 'GET',
    params: {
      ...params,
      ...(options || {}),
    },
  });

  return {
    data: res?.data?.list,
    // success 请返回 true，
    // 不然 table 会停止解析数据，即使有数据
    success: res.success,
    // 不传会使用 data 的长度，如果是分页一定要传
    total: res?.data?.total,
  };
}

/** 新建规则 POST /api/addUser */
export async function addUser(options?: API.UserListItem) {
  return request<API.UserList>('admin', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

/** 更新状态 POST /api/addUser */
export async function changStatus(id: number, status: number) {
  return request<API.UserList>(`admin/${id}/change/${status}`, {
    method: 'PUT',
  });
}

/** 更新状态 POST /api/addUser */
export async function updateUser(id: number, options: API.UserListItem) {
  return request<API.UserList>(`admin/${id}`, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}

export async function getUserMenu() {
  const res: API.MenuList = await request<API.MenuList>(`my/all/module`, {
    method: 'GET',
  });
  return res.data;
}

export async function deleteUser(id: number) {
  return request<any>(`/admin/${id}`, {
    method: 'DELETE',
  });
}

export async function saveRole(id: number, roles: string[]) {
  return request<any>(`/admin/${id}/role/${roles.join(',')}`, {
    method: 'POST',
  });
}
