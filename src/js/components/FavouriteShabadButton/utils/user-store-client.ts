/* globals KHALIS_USER_STORE_API */
import { LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN } from '@/constants';

// Favourites live in the khalis-user-store (the same API sttm-next uses). It
// accepts the SSO token the app already keeps in localStorage.
const BASE_URL = KHALIS_USER_STORE_API.replace(/\/+$/, '');

type Options = {
  method?: 'GET' | 'POST' | 'DELETE';
  data?: Record<string, unknown>;
};

export interface UserStoreError {
  statusCode: number;
  message: string;
}

export const userStoreClient = async <T = unknown>(
  path: string,
  { method, data }: Options = {}
): Promise<T> => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_KEY_FOR_SESSION_TOKEN);
  const response = await window.fetch(`${BASE_URL}${path}`, {
    method: method ?? (data ? 'POST' : 'GET'),
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    },
  });

  // DELETE answers 204 with no body.
  const body = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const error: UserStoreError = {
      statusCode: response.status,
      message: body?.message ?? response.statusText,
    };
    return Promise.reject(error);
  }
  return body as T;
};
