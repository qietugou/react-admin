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
