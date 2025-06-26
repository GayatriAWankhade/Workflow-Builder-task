// src/components/ui/modal.tsx

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  // Close modal on Escape key press
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
      />

      {/* Modal content */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'fixed top-1/2 left-1/2 z-50 max-w-lg w-full p-6 bg-white rounded shadow-lg -translate-x-1/2 -translate-y-1/2',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        )}
      >
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        <div>{children}</div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-block rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </>
  );
}
