import { request } from 'umi';

export async function settings(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  const res: any = await request<API.SettingsItemList>('settings', {
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

export async function addSettings(options: API.SettingsItem) {
  return request<API.SettingsItem>('settings', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function updateSettings(id: number, options: API.SettingsItem) {
  return request<API.Response>(`settings/${id}`, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}

export async function deleteSettings(id: number) {
  return request<API.Response>(`settings/${id}`, {
    method: 'DELETE',
  });
}

export async function info() {
  return request<API.SettingsInfo>(`info`, {
    method: 'GET',
  });
}
