'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface NodeConfigFormProps {
  initialData: {
    label: string;
    description?: string;
  };
  onSave: (data: { label: string; description?: string }) => void;
}

export default function NodeConfigForm({ initialData, onSave }: NodeConfigFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData,
  });

  const submit = (data: { label: string; description?: string }) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium">Label</label>
        <Input
          {...register('label', { required: 'Label is required' })}
          className={cn(errors.label && 'border-red-500')}
        />
        {errors.label && <p className="text-xs text-red-600">{errors.label.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <Input {...register('description')} />
      </div>

      <Button type="submit" className="mt-2" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}
