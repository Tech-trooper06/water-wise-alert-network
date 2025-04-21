
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import WaterQualityCard from '@/components/dashboard/WaterQualityCard';
import SensorMap from '@/components/dashboard/SensorMap';
import AlertsList from '@/components/dashboard/AlertsList';
import WaterFlowChart from '@/components/dashboard/WaterFlowChart';
import RedistributionCard from '@/components/dashboard/RedistributionCard';
import ReuseSuggestionCard from '@/components/dashboard/ReuseSuggestionCard';
import { Droplet, Gauge, Monitor, Database } from 'lucide-react';
import {
  generateWaterFlowData,
  generateSensorLocations,
  generateWaterQualityData,
  generateAlerts,
  generateRedistributionPoints,
  generateRawSensorData,
  generateCleanedSensorData,
} from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [flowData, setFlowData] = useState(generateWaterFlowData(24));
  const [sensorLocations, setSensorLocations] = useState(generateSensorLocations(15));
  const [waterQuality, setWaterQuality] = useState(generateWaterQualityData());
  const [alerts, setAlerts] = useState(generateAlerts(5));
  const [redistributionPoints, setRedistributionPoints] = useState(generateRedistributionPoints(4));

  // For new: special pre- and post-treatment sensors
  const [rawSensor, setRawSensor] = useState(generateRawSensorData());
  const [cleanedSensor, setCleanedSensor] = useState(generateCleanedSensorData());

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

      // Simulate updates for the new sensors as well!
      // RAW sensor: simulate change in turbidity & status
      setRawSensor(prev => {
        const metrics = prev.metrics.map(m =>
          m.label === 'Turbidity'
            ? { ...m, value: Math.max(8, Math.min(16, Number((m.value + (Math.random() - 0.5) * 2).toFixed(1)))) }
            : m
        );
        return { ...prev, metrics, lastUpdated: new Date().toLocaleString() };
      });

      // Cleaned sensor: update status and suggestions
      setCleanedSensor(_prev => generateCleanedSensorData());

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
        
        {/* Raw / Pre-Treatment Sensor Card */}
        <div>
          <WaterQualityCard
            sensorId={rawSensor.sensorId}
            location={rawSensor.location}
            lastUpdated={rawSensor.lastUpdated}
            metrics={rawSensor.metrics}
          />
        </div>
        {/* Cleaned / Post-Treatment Sensor Card */}
        <div>
          <WaterQualityCard
            sensorId={cleanedSensor.sensorId}
            location={cleanedSensor.location}
            lastUpdated={cleanedSensor.lastUpdated}
            metrics={cleanedSensor.metrics}
          />
        </div>
        {/* Reuse Suggestion Card */}
        <div>
          <ReuseSuggestionCard
            suggestions={cleanedSensor.reuseSuggestions}
            status={cleanedSensor.overallStatus}
          />
        </div>
        <div>
          <RedistributionCard points={redistributionPoints} />
        </div>

        <div className="lg:col-span-1">
          <AlertsList alerts={alerts} />
        </div>
      </div>

      {/* Simple Report */}
      <div className="mt-8 text-sm text-center text-muted-foreground bg-muted p-4 rounded">
        <h3 className="font-bold mb-2">Summary Report</h3>
        <p>
          <span className="font-semibold">Raw Sensor:</span> Monitors contaminants in incoming wastewater. <br />
          <span className="font-semibold">Cleaned Water Sensor:</span> Tracks treated water quality, giving AI-powered reuse suggestions. <br />
          <span className="font-semibold">Current Reuse Status:</span>{" "}
          <span
            className={`${
              cleanedSensor.overallStatus === "good"
                ? "text-alert-low"
                : cleanedSensor.overallStatus === "warning"
                ? "text-alert-medium"
                : "text-alert-high"
            } font-semibold`}
          >
            {cleanedSensor.overallStatus === "good"
              ? "Safe for multiple reuse"
              : cleanedSensor.overallStatus === "warning"
              ? "Limited: irrigation/industry"
              : "Not recommended"}
          </span>
        </p>
        <p className="mt-2">
          <span className="font-semibold">Other Reports:</span>{" "}
          <span>
            Sensor map, alerts, and redistribution status update in real time.
          </span>
        </p>
      </div>
      <div className="mt-8 text-sm text-center text-muted-foreground">
        <p>WaterWise Alert Network • Prototype Version 1.0</p>
        <p className="mt-1">Monitoring and redistribution of wastewater since 2025</p>
      </div>
    </Layout>
  );
};

export default Index;
