import { useCallback, useState } from 'react';
import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';

export function useWorkflow() {
  const [loading, setLoading] = useState(false);

  const fetchWorkflows = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(API_ENDPOINTS.WORKFLOWS);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch workflows:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createWorkflow = useCallback(async (workflow: { name: string; description?: string }) => {
    setLoading(true);
    try {
      const response = await apiClient.post(API_ENDPOINTS.WORKFLOWS, workflow);
      return response.data;
    } catch (error) {
      console.error('Failed to create workflow:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchWorkflows, createWorkflow, loading };
}
