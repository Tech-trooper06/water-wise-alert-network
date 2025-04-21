
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WaterMetricProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
}

const WaterMetric = ({ label, value, max, unit, status }: WaterMetricProps) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <div className="flex items-center space-x-2">
          <span>
            {value} {unit}
          </span>
          <Badge 
            className={cn(
              "text-xs h-5",
              status === 'good' ? 'bg-alert-low' : 
              status === 'warning' ? 'bg-alert-medium' : 'bg-alert-high'
            )}
          >
            {status === 'good' ? 'Normal' : status === 'warning' ? 'Warning' : 'Critical'}
          </Badge>
        </div>
      </div>
      <Progress 
        value={percentage} 
        className={cn(
          status === 'good' ? 'text-alert-low' : 
          status === 'warning' ? 'text-alert-medium' : 'text-alert-high'
        )}
      />
    </div>
  );
};

interface WaterQualityCardProps {
  sensorId: string;
  location: string;
  lastUpdated: string;
  metrics: WaterMetricProps[];
}

const WaterQualityCard = ({ sensorId, location, lastUpdated, metrics }: WaterQualityCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">Water Quality</CardTitle>
            <p className="text-sm text-muted-foreground">Sensor ID: {sensorId}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {location}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <WaterMetric key={index} {...metric} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Last updated: {lastUpdated}</p>
      </CardContent>
    </Card>
  );
};

export default WaterQualityCard;
