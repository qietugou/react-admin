import { request } from 'umi';

/** 获取规则列表 GET /api/permission */
export async function permission(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  const res: any = await request<API.PermissionItem>('permission', {
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

/** 新建规则 POST /api/addPermission */
export async function addPermission(options?: API.PermissionItem) {
  return request<API.PermissionItem>('permission', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function deletePermission(id: number) {
  return request<API.PermissionItem>(`permission/${id}`, {
    method: 'DELETE',
  });
}

export async function updatePermission(id: number, options: API.MenuListItem) {
  return request<API.PermissionItem>(`permission/${id}`, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}

export async function getPermissionTree() {
  const res = await request<API.MenuListWithPermission>(`permission/tree`, {
    method: 'GET',
  });
  return {
    data: res.data.list,
  };
}
