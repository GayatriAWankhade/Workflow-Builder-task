import { useCallback } from 'react';
import { apiClient } from '@/lib/api';

export function useApi() {
  const get = useCallback(apiClient.get, []);
  const post = useCallback(apiClient.post, []);
  const put = useCallback(apiClient.put, []);
  const remove = useCallback(apiClient.delete, []);

  return { get, post, put, delete: remove };
}
