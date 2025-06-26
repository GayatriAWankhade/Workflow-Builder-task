// src/components/ui/toast.tsx

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number; // ms, default 3000
  onClose: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div
      className={cn(
        'fixed bottom-5 right-5 max-w-xs rounded p-4 text-white shadow-lg flex items-center justify-between space-x-4',
        typeColors[type]
      )}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-white font-bold hover:text-gray-200"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
