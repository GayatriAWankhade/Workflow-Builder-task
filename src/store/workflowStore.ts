import create from 'zustand';
import { Workflow } from '@/types/workflow'; // You should have this type defined

interface WorkflowState {
  workflows: Workflow[];
  setWorkflows: (workflows: Workflow[]) => void;
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (updatedWorkflow: Workflow) => void;
  removeWorkflow: (id: string) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  workflows: [],
  setWorkflows: (workflows) => set({ workflows }),
  addWorkflow: (workflow) =>
    set((state) => ({ workflows: [...state.workflows, workflow] })),
  updateWorkflow: (updatedWorkflow) =>
    set((state) => ({
      workflows: state.workflows.map((w) =>
        w.id === updatedWorkflow.id ? updatedWorkflow : w
      ),
    })),
  removeWorkflow: (id) =>
    set((state) => ({
      workflows: state.workflows.filter((w) => w.id !== id),
    })),
}));
