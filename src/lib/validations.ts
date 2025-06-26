import * as yup from 'yup';

/**
 * Validation schema for login form
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

/**
 * Validation schema for registration form
 */
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

/**
 * Validation schema for workflow creation
 */
export const workflowSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().optional(), 
});

/**
 * Validation schema for user settings
 */
export const settingsSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address'),
  role: yup.string().oneOf(['admin', 'manager', 'user']),
});

