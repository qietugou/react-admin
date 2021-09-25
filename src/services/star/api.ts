import { request } from 'umi';

export async function getSubGitHubUser() {
  return request<API.GitHubUserList>('github/users', {
    method: 'GET',
  });
}

export async function getGitHubUserStarList(user: string) {
  return request<API.GitHubSubUserStarList>(`github/${user}`, {
    method: 'GET',
  });
}
