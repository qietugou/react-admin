import { request } from 'umi';

export async function queryCurrentUser(options?: API.UserListItem) {
  return request<API.CurrentUserInfo>('my', {
    method: 'GET',
    data: {
      ...(options || {}),
    },
  });
}
export async function outLogin() {
  return request<API.Response>('logout', {
    method: 'POST',
  });
}

export async function login(options: API.LoginUserItem) {
  return request<API.Response>('login', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function upload(file: any) {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  return request<API.Response & { data: API.ImageResponse }>('my/upload', {
    method: 'POST',
    processData: false,
    data: formData,
  });
}
