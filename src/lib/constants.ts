export const NODE_TYPES = {
  START: 'start',
  ACTION: 'action',
  CONDITION: 'condition',
  END: 'end',
  EMAIL: 'email',
  DATABASE: 'database',
  API: 'api',
  APPROVAL: 'approval',
} as const;

export const WORKFLOW_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
} as const;

export const NODE_COLORS = {
  start: '#10b981', // green
  action: '#3b82f6', // blue
  condition: '#f59e0b', // amber
  end: '#ef4444', // red
  email: '#8b5cf6', // violet
  database: '#06b6d4', // cyan
  api: '#f97316', // orange
  approval: '#ec4899', // pink
};

export const ANIMATION_DURATION = 200;

export const API_ENDPOINTS = {
  WORKFLOWS: '/workflows',
  TEMPLATES: '/templates',
  AUTH: '/auth',
  USERS: '/users',
  ANALYTICS: '/analytics',
} as const;