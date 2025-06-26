export interface WorkflowNode {
  id: string;
  type: 'start' | 'action' | 'condition' | 'end' | 'email' | 'database' | 'api' | 'approval';
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    config?: Record<string, any>;
    isConfigured?: boolean;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  label?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  status: 'draft' | 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  tags?: string[];
  category?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  thumbnail?: string;
  usageCount: number;
}

export interface WorkflowStats {
  totalWorkflows: number;
  activeWorkflows: number;
  completedTasks: number;
  pendingTasks: number;
  successRate: number;
}