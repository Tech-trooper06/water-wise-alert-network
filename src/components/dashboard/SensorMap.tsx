
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SensorLocation {
  id: string;
  lat: number;
  lng: number;
  status: 'active' | 'warning' | 'critical' | 'offline';
  name: string;
  type: 'sensor' | 'treatment' | 'redistribution';
}

interface SensorMapProps {
  locations: SensorLocation[];
}

const SensorMap = ({ locations }: SensorMapProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Network Map</CardTitle>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-alert-low text-primary-foreground text-xs">
              Active: {locations.filter(l => l.status === 'active').length}
            </Badge>
            <Badge variant="outline" className="bg-alert-medium text-primary-foreground text-xs">
              Warning: {locations.filter(l => l.status === 'warning').length}
            </Badge>
            <Badge variant="outline" className="bg-alert-high text-primary-foreground text-xs">
              Critical: {locations.filter(l => l.status === 'critical').length}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[300px] bg-muted rounded-md overflow-hidden">
          {/* Placeholder for map - in a real app, this would be a proper map implementation */}
          <div className="absolute inset-0 bg-[url('https://via.placeholder.com/800x600/e0f7fa/006064?text=Map+Background')] bg-cover bg-center opacity-50"></div>
          
          {/* Render sensor dots */}
          {locations.map((location) => (
            <div 
              key={location.id}
              className={cn(
                "absolute w-3 h-3 rounded-full sensor-pulse",
                location.status === 'active' ? 'bg-alert-low' :
                location.status === 'warning' ? 'bg-alert-medium' :
                location.status === 'critical' ? 'bg-alert-high' : 'bg-gray-400',
                location.type === 'sensor' ? 'border-2 border-white' :
                location.type === 'treatment' ? 'border-2 border-blue-300' : 'border-2 border-green-300'
              )}
              style={{
                top: `${(1 - location.lat / 100) * 300}px`,
                left: `${(location.lng / 100) * 100}%`,
              }}
              title={`${location.name} (${location.type})`}
            ></div>
          ))}
          
          <div className="absolute bottom-2 right-2 bg-background/80 p-2 rounded-md text-xs space-y-1">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-alert-low border border-white mr-1"></div>
              <span>Sensor</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-water-600 border border-blue-300 mr-1"></div>
              <span>Treatment</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-water-400 border border-green-300 mr-1"></div>
              <span>Redistribution</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorMap;
