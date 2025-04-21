
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import WaterQualityCard from '@/components/dashboard/WaterQualityCard';
import SensorMap from '@/components/dashboard/SensorMap';
import AlertsList from '@/components/dashboard/AlertsList';
import WaterFlowChart from '@/components/dashboard/WaterFlowChart';
import RedistributionCard from '@/components/dashboard/RedistributionCard';
import { Droplet, Gauge, Monitor, Database, MapPin } from 'lucide-react';
import { 
  generateWaterFlowData, 
  generateSensorLocations, 
  generateWaterQualityData, 
  generateAlerts, 
  generateRedistributionPoints 
} from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [flowData, setFlowData] = useState(generateWaterFlowData(24));
  const [sensorLocations, setSensorLocations] = useState(generateSensorLocations(15));
  const [waterQuality, setWaterQuality] = useState(generateWaterQualityData());
  const [alerts, setAlerts] = useState(generateAlerts(5));
  const [redistributionPoints, setRedistributionPoints] = useState(generateRedistributionPoints(4));
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update water flow data
      setFlowData(prev => {
        const newData = [...prev];
        const lastEntry = newData[newData.length - 1];
        const inflow = lastEntry.inflow + Math.floor(Math.random() * 50) - 25;
        const treated = Math.floor(inflow * (0.8 + Math.random() * 0.1));
        const redistributed = Math.floor(treated * (0.7 + Math.random() * 0.2));
        
        newData[newData.length - 1] = {
          ...lastEntry,
          inflow,
          treated,
          redistributed
        };
        
        return newData;
      });
      
      // Randomly update a sensor status
      if (Math.random() > 0.8) {
        const sensorIndex = Math.floor(Math.random() * sensorLocations.length);
        const statuses = ['active', 'warning', 'critical', 'offline'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        setSensorLocations(prev => {
          const newLocations = [...prev];
          newLocations[sensorIndex] = {
            ...newLocations[sensorIndex],
            status: newStatus as 'active' | 'warning' | 'critical' | 'offline'
          };
          
          // Show toast notification for status change
          if (newStatus === 'warning' || newStatus === 'critical') {
            toast({
              title: `Sensor Alert`,
              description: `${newLocations[sensorIndex].name} is now in ${newStatus} state`,
              variant: newStatus === 'critical' ? 'destructive' : 'default',
            });
          }
          
          return newLocations;
        });
      }
      
      // Update water quality metrics randomly
      if (Math.random() > 0.7) {
        setWaterQuality(prev => {
          const metricIndex = Math.floor(Math.random() * prev.metrics.length);
          const metric = prev.metrics[metricIndex];
          const statuses = ['good', 'warning', 'critical'];
          const newValue = metric.value + (Math.random() * 0.4 - 0.2);
          
          const newMetrics = [...prev.metrics];
          newMetrics[metricIndex] = {
            ...metric,
            value: Number(newValue.toFixed(1)),
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'good' | 'warning' | 'critical'
          };
          
          return {
            ...prev,
            lastUpdated: new Date().toLocaleString(),
            metrics: newMetrics
          };
        });
      }
      
    }, 5000); // Update every 5 seconds
    
    // Show initial toast notification
    toast({
      title: "Dashboard Active",
      description: "Monitoring wastewater system in real-time",
    });
    
    // Simulate a new alert every 20 seconds
    const alertInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert = generateAlerts(1)[0];
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
        
        // Show toast for new alert
        if (newAlert.severity === 'high') {
          toast({
            title: "High Priority Alert",
            description: newAlert.message,
            variant: "destructive",
          });
        }
      }
    }, 20000);
    
    return () => {
      clearInterval(interval);
      clearInterval(alertInterval);
    };
  }, [toast]);
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">WaterWise Monitoring Dashboard</h1>
        <p className="text-muted-foreground">Real-time wastewater monitoring and redistribution system</p>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Water Processed" 
          value="28,492 gal" 
          icon={<Droplet className="h-4 w-4" />}
          trend="up"
          trendValue="2.4%"
          badgeText="Today"
        />
        
        <StatCard 
          title="Active Sensors" 
          value={`${sensorLocations.filter(s => s.status === 'active').length}/${sensorLocations.length}`}
          icon={<Gauge className="h-4 w-4" />}
          badgeText="4 offline"
          badgeVariant="outline"
        />
        
        <StatCard 
          title="Water Redistribution" 
          value="12,845 gal" 
          icon={<Database className="h-4 w-4" />}
          trend="up"
          trendValue="5.1%"
          badgeText="Recycled"
        />
        
        <StatCard 
          title="System Health" 
          value="98.2%" 
          icon={<Monitor className="h-4 w-4" />}
          trend="down"
          trendValue="0.3%"
          badgeText="Optimal"
          badgeVariant="secondary"
        />
      </div>
      
      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WaterFlowChart data={flowData} />
        </div>
        
        <div>
          <SensorMap locations={sensorLocations} />
        </div>
        
        <div>
          <WaterQualityCard {...waterQuality} />
        </div>
        
        <div>
          <RedistributionCard points={redistributionPoints} />
        </div>
        
        <div className="lg:col-span-1">
          <AlertsList alerts={alerts} />
        </div>
      </div>
      
      <div className="mt-8 text-sm text-center text-muted-foreground">
        <p>WaterWise Alert Network • Prototype Version 1.0</p>
        <p className="mt-1">Monitoring and redistribution of wastewater since 2025</p>
      </div>
    </Layout>
  );
};

export default Index;
