import { request } from 'umi';

export async function getBookMarkByLevel(level: number, pid: number) {
  return request<API.BookmarkLevelList>('bookmark', {
    method: 'GET',
    params: {
      level,
      pid
    },
  });
}
