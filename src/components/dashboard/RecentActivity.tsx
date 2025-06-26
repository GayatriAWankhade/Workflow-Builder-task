import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { 
  Workflow, 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle,
  Clock
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'workflow_created' | 'workflow_executed' | 'workflow_paused' | 'workflow_completed' | 'workflow_failed';
  workflowName: string;
  timestamp: string;
  user: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'workflow_created',
    workflowName: 'Employee Onboarding',
    timestamp: '2024-01-15T10:30:00Z',
    user: 'John Doe',
  },
  {
    id: '2',
    type: 'workflow_executed',
    workflowName: 'Invoice Processing',
    timestamp: '2024-01-15T09:15:00Z',
    user: 'Jane Smith',
  },
  {
    id: '3',
    type: 'workflow_completed',
    workflowName: 'Leave Approval',
    timestamp: '2024-01-15T08:45:00Z',
    user: 'System',
  },
  {
    id: '4',
    type: 'workflow_failed',
    workflowName: 'Data Backup',
    timestamp: '2024-01-15T08:00:00Z',
    user: 'System',
  },
];

const activityConfig = {
  workflow_created: {
    icon: Workflow,
    color: 'bg-blue-100 text-blue-800',
    label: 'Created',
  },
  workflow_executed: {
    icon: Play,
    color: 'bg-green-100 text-green-800',
    label: 'Executed',
  },
  workflow_paused: {
    icon: Pause,
    color: 'bg-yellow-100 text-yellow-800',
    label: 'Paused',
  },
  workflow_completed: {
    icon: CheckCircle,
    color: 'bg-green-100 text-green-800',
    label: 'Completed',
  },
  workflow_failed: {
    icon: XCircle,
    color: 'bg-red-100 text-red-800',
    label: 'Failed',
  },
};

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => {
            const config = activityConfig[activity.type];
            const Icon = config.icon;
            
            return (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.workflowName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.user} • {formatDate(activity.timestamp)}
                  </p>
                </div>
                <Badge variant="secondary" className={config.color}>
                  {config.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}