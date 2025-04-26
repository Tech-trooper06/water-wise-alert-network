
import React from 'react';
import Layout from '@/components/layout/Layout';
import MaterialInventoryCard from '@/components/construction/MaterialInventoryCard';
import MaterialLocationMap from '@/components/construction/MaterialLocationMap';
import MaterialUsageChart from '@/components/construction/MaterialUsageChart';
import DeliveryTracker from '@/components/construction/DeliveryTracker';

const MaterialTracking = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Material Tracking System</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MaterialInventoryCard />
          <DeliveryTracker />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MaterialLocationMap />
          <MaterialUsageChart />
        </div>
      </div>
    </Layout>
  );
};

export default MaterialTracking;
