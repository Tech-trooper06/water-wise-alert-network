
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

const mockData = [
  { name: 'Week 1', cement: 100, steel: 150, bricks: 2000 },
  { name: 'Week 2', cement: 150, steel: 200, bricks: 2500 },
  { name: 'Week 3', cement: 80, steel: 180, bricks: 1800 },
  { name: 'Week 4', cement: 200, steel: 250, bricks: 3000 },
];

const MaterialUsageChart = () => {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-base">Material Usage Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            cement: { color: '#94a3b8' },
            steel: { color: '#64748b' },
            bricks: { color: '#475569' },
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cement" fill="#94a3b8" name="Cement (bags)" />
              <Bar dataKey="steel" fill="#64748b" name="Steel (pieces)" />
              <Bar dataKey="bricks" fill="#475569" name="Bricks (pieces)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MaterialUsageChart;
