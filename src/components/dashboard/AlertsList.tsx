
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, DropletIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: 'quality' | 'overflow' | 'system';
  severity: 'low' | 'medium' | 'high';
  message: string;
  location: string;
  timestamp: string;
  acknowledged: boolean;
}

interface AlertsListProps {
  alerts: Alert[];
}

const AlertItem = ({ alert }: { alert: Alert }) => {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-md",
      alert.acknowledged ? "bg-background" : "bg-muted"
    )}>
      <div className="flex items-start space-x-3">
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
          alert.severity === 'high' ? "bg-alert-high/10 text-alert-high" : 
          alert.severity === 'medium' ? "bg-alert-medium/10 text-alert-medium" : 
          "bg-alert-low/10 text-alert-low"
        )}>
          <Bell className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center">
            <h4 className="font-medium text-sm">{alert.message}</h4>
            <Badge 
              className={cn(
                "ml-2 text-xs",
                alert.severity === 'high' ? "bg-alert-high" : 
                alert.severity === 'medium' ? "bg-alert-medium" : 
                "bg-alert-low"
              )}
            >
              {alert.severity}
            </Badge>
          </div>
          <div className="flex text-xs text-muted-foreground mt-1">
            <span>{alert.location}</span>
            <span className="mx-1">•</span>
            <span>{alert.timestamp}</span>
          </div>
        </div>
      </div>
      
      {!alert.acknowledged && (
        <Button size="sm" variant="outline" className="text-xs h-7">
          Acknowledge
        </Button>
      )}
    </div>
  );
};

const AlertsList = ({ alerts }: AlertsListProps) => {
  const unacknowledged = alerts.filter(a => !a.acknowledged);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Recent Alerts</CardTitle>
          {unacknowledged.length > 0 && (
            <Badge className="bg-alert-high text-white">
              {unacknowledged.length} Unacknowledged
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.length > 0 ? (
          <div className="space-y-2">
            {alerts.map(alert => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p>No alerts to display</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsList;
