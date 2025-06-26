'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { workflowSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/Textarea';
import * as yup from 'yup';

// ✅ Infer type directly from the schema
type WorkflowFormData = yup.InferType<typeof workflowSchema>;

interface WorkflowFormProps {
  initialData?: WorkflowFormData;
  onSubmit: (data: WorkflowFormData) => Promise<void> | void;
}

export default function WorkflowForm({ initialData, onSubmit }: WorkflowFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkflowFormData>({
    resolver: yupResolver(workflowSchema) as any, // ✅ Fix type mismatch
    defaultValues: initialData || { name: '', description: '' },
  });

  const submit: SubmitHandler<WorkflowFormData> = async (data) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6 p-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Workflow Name</label>
        <Input
          {...register('name')}
          className={cn(errors.name && 'border-red-500')}
        />
        {errors.name && (
          <p className="text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <Textarea
          {...register('description')}
          className={cn(errors.description && 'border-red-500')}
        />
        {errors.description && (
          <p className="text-xs text-red-600">{errors.description.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? initialData
            ? 'Updating...'
            : 'Creating...'
          : initialData
          ? 'Update Workflow'
          : 'Create Workflow'}
      </Button>
    </form>
  );
}
