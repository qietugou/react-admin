import { request } from 'umi';

export async function tags(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  const res: any = await request('tag', {
    method: 'GET',
    params: {
      ...params,
      ...(options || {}),
    },
  });
  return {
    data: res?.data,
    // success 请返回 true，
    // 不然 table 会停止解析数据，即使有数据
    success: res.success,
    // 不传会使用 data 的长度，如果是分页一定要传
    total: res?.data?.total,
  };
}

export async function outLogin() {
  return request<API.Response>('logout', {
    method: 'POST',
  });
}

export async function addTag(options: API.TagItem) {
  return request<API.TagItem>('tag', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function updateTag(id: number, options: API.TagItem) {
  return request<API.TagItem>(`tag/${id}`, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}

export async function deleteTag(id: number) {
  return request<API.TagItem>(`tag/${id}`, {
    method: 'DELETE',
  });
}