import { request } from 'umi';

/** 获取规则列表 GET /api/menu */
export async function menu(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  const res: any = await request<API.MenuList>('module', {
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
export async function addMenu(options?: API.UserListItem) {
  return request<API.UserList>('module', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function deleteMenu(id: number) {
  return request<API.UserList>(`module/${id}`, {
    method: 'DELETE',
  });
}

export async function updateMenu(id: number, options: API.MenuListItem) {
  return request<API.UserList>(`module/${id}`, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}
