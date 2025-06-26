'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { User } from '@/types/user';
import { API_ENDPOINTS } from '@/lib/constants';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get<User>(`${API_ENDPOINTS.AUTH}/me`);
        setUser(response.data ?? null);  // <-- Fix here
      } catch (error) {
        console.error('Failed to fetch user', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
