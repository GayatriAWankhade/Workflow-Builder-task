'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const executionData = [
  { date: '2024-01-01', executions: 65, success: 58, failed: 7 },
  { date: '2024-01-02', executions: 78, success: 72, failed: 6 },
  { date: '2024-01-03', executions: 90, success: 85, failed: 5 },
  { date: '2024-01-04', executions: 81, success: 76, failed: 5 },
  { date: '2024-01-05', executions: 95, success: 89, failed: 6 },
  { date: '2024-01-06', executions: 87, success: 82, failed: 5 },
  { date: '2024-01-07', executions: 102, success: 98, failed: 4 },
];

const categoryData = [
  { name: 'HR', value: 45 },
  { name: 'Finance', value: 32 },
  { name: 'IT', value: 28 },
  { name: 'Operations', value: 19 },
  { name: 'Marketing', value: 15 },
];

export function ExecutionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Executions</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={executionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Line 
              type="monotone" 
              dataKey="executions" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Total Executions"
            />
            <Line 
              type="monotone" 
              dataKey="success" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Successful"
            />
            <Line 
              type="monotone" 
              dataKey="failed" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Failed"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function CategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflows by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}