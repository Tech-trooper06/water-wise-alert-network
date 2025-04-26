
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockDeliveries = [
  {
    id: 1,
    material: 'Cement',
    supplier: 'ABC Suppliers',
    eta: '2024-04-27 14:30',
    status: 'In Transit',
  },
  {
    id: 2,
    material: 'Steel Bars',
    supplier: 'Steel Corp',
    eta: '2024-04-27 16:00',
    status: 'Scheduled',
  },
  {
    id: 3,
    material: 'Sand',
    supplier: 'QuickSand Ltd',
    eta: '2024-04-27 12:00',
    status: 'Delivered',
  },
];

const DeliveryTracker = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          <div className="flex items-center space-x-2">
            <Truck className="h-4 w-4" />
            <span>Upcoming Deliveries</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div>
                <p className="font-medium">{delivery.material}</p>
                <p className="text-sm text-muted-foreground">{delivery.supplier}</p>
                <p className="text-xs text-muted-foreground">ETA: {delivery.eta}</p>
              </div>
              <Badge
                variant="outline"
                className={
                  delivery.status === 'Delivered'
                    ? 'bg-success/10 text-success'
                    : delivery.status === 'In Transit'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted'
                }
              >
                {delivery.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryTracker;
