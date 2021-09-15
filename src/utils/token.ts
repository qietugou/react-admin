const TOKEN_KEY = 'QIE-TU-GOU-TOKEN';

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string => {
  return localStorage.getItem(TOKEN_KEY) || '';
};
export const hasToken = (): boolean => {
  return !!getToken();
};
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
