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

export async function getBookMarkList() {
  return request<API.BookmarkIndexList>('bookmark/list', {
    method: 'GET',
  });
}

export async function saveBookMarkById(id: number,  remark: string, file: any) {
  const formData = new FormData();
  formData.append('remark', remark);
  if (file) {
    formData.append("has_file", "1")
    formData.append('file', file);
  }
  return request<API.Response>(`bookmark/${id}`, {
    method: 'PUT',
    processData: false,
    data: formData,
  });
}
