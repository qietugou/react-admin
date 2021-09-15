import { request } from 'umi';

/** 获取规则列表 GET /api/rule */
export async function role(options?: Record<string, any>) {
  const res: any = await request<API.RoleList>('role', {
    method: 'GET',
    params: {
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

export async function getRolePermission(id: number) {
  const res = await request<API.RolePermission>(`role/${id}/all/permissions`, {
    method: 'GET',
  });
  return res.data;
}

export async function putRolePermission(id: number, permissionIds: number[]) {
  return request<API.Response>(`role/${id}/permissions`, {
    method: 'PUT',
    data: {
      permissions: permissionIds.join(','),
    },
  });
}

export async function updateRole(id: number, option: API.RoleListItem) {
  return request<API.Response>(`role/${id}`, {
    method: 'PUT',
    data: {
      ...option,
    },
  });
}

export async function addRole(option: API.RoleListItem) {
  return request<API.Response>(`role`, {
    method: 'POST',
    data: {
      ...option,
    },
  });
}

export async function deleteRole(id: number) {
  return request<API.Response>(`role/${id}`, {
    method: 'DELETE',
  });
}
