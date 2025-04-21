
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DropletIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RedistributionPoint {
  id: string;
  name: string;
  usage: number;
  capacity: number;
  status: 'active' | 'maintenance' | 'offline';
}

interface RedistributionCardProps {
  points: RedistributionPoint[];
}

const RedistributionCard = ({ points }: RedistributionCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Water Redistribution Points</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {points.map((point) => {
            const usagePercentage = (point.usage / point.capacity) * 100;
            
            return (
              <div key={point.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <DropletIcon className={cn(
                      "h-4 w-4 mr-2",
                      point.status === 'active' ? "text-water-600" :
                      point.status === 'maintenance' ? "text-alert-medium" : "text-muted-foreground"
                    )} />
                    <h4 className="font-medium text-sm">{point.name}</h4>
                  </div>
                  <Badge 
                    variant={point.status === 'active' ? 'default' : 'outline'} 
                    className={cn(
                      "text-xs",
                      point.status === 'maintenance' ? "bg-alert-medium" : 
                      point.status === 'offline' ? "bg-destructive" : ""
                    )}
                  >
                    {point.status}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Usage</span>
                    <span>{point.usage} / {point.capacity} gal</span>
                  </div>
                  <Progress value={usagePercentage} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RedistributionCard;
