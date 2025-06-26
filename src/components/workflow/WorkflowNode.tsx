'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { 
  Play, 
  Square, 
  Diamond, 
  Mail, 
  Database, 
  Globe, 
  CheckCircle,
  Settings
} from 'lucide-react';
import { WorkflowNode as WorkflowNodeType } from '@/types/workflow';
import { NODE_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const iconMap = {
  start: Play,
  end: Square,
  condition: Diamond,
  action: Settings,
  email: Mail,
  database: Database,
  api: Globe,
  approval: CheckCircle,
};

function WorkflowNode({ data, selected, type }: NodeProps<WorkflowNodeType['data']>) {
  const Icon = iconMap[type as keyof typeof iconMap] || Settings;
  const color = NODE_COLORS[type as keyof typeof NODE_COLORS] || '#6b7280';

  return (
    <div
      className={cn(
        'px-4 py-2 shadow-md rounded-lg bg-white border-2 min-w-[150px]',
        selected ? 'border-blue-500' : 'border-gray-200',
        data.isConfigured ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-gray-300'
      )}
      style={{ borderTopColor: color }}
    >
      <div className="flex items-center space-x-2">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: color }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900">{data.label}</div>
          {data.description && (
            <div className="text-xs text-gray-500 mt-1">{data.description}</div>
          )}
        </div>
      </div>

      {type !== 'start' && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-gray-400 border-2 border-white"
        />
      )}
      
      {type !== 'end' && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-gray-400 border-2 border-white"
        />
      )}
    </div>
  );
}

export default memo(WorkflowNode);