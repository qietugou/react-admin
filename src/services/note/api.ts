import { request } from 'umi';

export async function tags(
  params?: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  const res: any = await request<API.TagItemList>('tag', {
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

export async function githubTags(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  const res: any = await request('github', {
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

export async function addGithubTag(options: API.TagItem) {
  return request<API.TagItem>('github', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function updateGithubTag(id: number, options: API.TagItem) {
  return request<API.TagItem>(`github/${id}`, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}

export async function deleteGithubTag(id: number) {
  return request<API.TagItem>(`github/${id}`, {
    method: 'DELETE',
  });
}

export async function article(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  const res: any = await request<API.ArticleItemList>('article', {
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

export async function addArticle(options?: API.ArticleStoreItem) {
  return request<API.UserList>('article', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function updateArticle(id: number, options?: API.ArticleStoreItem) {
  return request<API.UserList>(`article/${id}`, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}

export async function deleteArticle(id: number) {
  return request<API.UserList>(`article/${id}`, {
    method: 'DELETE',
  });
}

export async function changStatus(id: number, status: number) {
  return request<API.UserList>(`article/${id}/status`, {
    method: 'PUT',
    data: {
      status,
    },
  });
}

export async function tagList() {
  return request<API.TagItemList>(`tag/list`, {
    method: 'GET',
  });
}

export async function articleList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  const res: any = await request<API.ArticleItemList>('article/list', {
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
