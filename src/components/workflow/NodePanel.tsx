'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Square, 
  Diamond, 
  Mail, 
  Database, 
  Globe, 
  CheckCircle,
  Settings,
  Plus
} from 'lucide-react';
import { NODE_TYPES, NODE_COLORS } from '@/lib/constants';

const nodeTypes = [
  { type: NODE_TYPES.START, label: 'Start', icon: Play, description: 'Workflow trigger' },
  { type: NODE_TYPES.ACTION, label: 'Action', icon: Settings, description: 'Perform an action' },
  { type: NODE_TYPES.CONDITION, label: 'Condition', icon: Diamond, description: 'Decision point' },
  { type: NODE_TYPES.EMAIL, label: 'Email', icon: Mail, description: 'Send email' },
  { type: NODE_TYPES.DATABASE, label: 'Database', icon: Database, description: 'Database operation' },
  { type: NODE_TYPES.API, label: 'API Call', icon: Globe, description: 'External API call' },
  { type: NODE_TYPES.APPROVAL, label: 'Approval', icon: CheckCircle, description: 'Require approval' },
  { type: NODE_TYPES.END, label: 'End', icon: Square, description: 'Workflow end' },
];

interface NodePanelProps {
  onNodeAdd: (nodeType: string) => void;
}

export default function NodePanel({ onNodeAdd }: NodePanelProps) {
  const [draggedNode, setDraggedNode] = useState<string | null>(null);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    setDraggedNode(nodeType);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card className="w-80 h-full">
      <CardHeader>
        <CardTitle className="text-lg">Workflow Nodes</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        {nodeTypes.map((node) => {
          const Icon = node.icon;
          const color = NODE_COLORS[node.type as keyof typeof NODE_COLORS];
          
          return (
            <div
              key={node.type}
              draggable
              onDragStart={(e) => onDragStart(e, node.type)}
              className="flex items-center p-3 border rounded-lg cursor-move hover:bg-gray-50 transition-colors"
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white mr-3"
                style={{ backgroundColor: color }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{node.label}</div>
                <div className="text-xs text-gray-500">{node.description}</div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onNodeAdd(node.type)}
                className="ml-2"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
