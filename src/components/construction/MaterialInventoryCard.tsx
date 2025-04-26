
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockMaterials = [
  { id: 1, name: 'Cement', quantity: 500, unit: 'bags', status: 'In Stock' },
  { id: 2, name: 'Steel Bars', quantity: 1000, unit: 'pieces', status: 'Low Stock' },
  { id: 3, name: 'Bricks', quantity: 5000, unit: 'pieces', status: 'In Stock' },
  { id: 4, name: 'Sand', quantity: 200, unit: 'tons', status: 'Critical' },
];

const MaterialInventoryCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Material Inventory</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockMaterials.map((material) => (
            <div
              key={material.id}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div>
                <p className="font-medium">{material.name}</p>
                <p className="text-sm text-muted-foreground">
                  {material.quantity} {material.unit}
                </p>
              </div>
              <Badge
                variant="outline"
                className={
                  material.status === 'Critical'
                    ? 'bg-destructive/10 text-destructive'
                    : material.status === 'Low Stock'
                    ? 'bg-warning/10 text-warning'
                    : 'bg-success/10 text-success'
                }
              >
                {material.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialInventoryCard;
