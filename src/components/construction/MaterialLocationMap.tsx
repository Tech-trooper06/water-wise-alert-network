
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const MaterialLocationMap = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Material Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted h-[300px] rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">Map visualization would go here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialLocationMap;
