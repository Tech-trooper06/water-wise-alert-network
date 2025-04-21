import { faker } from '@faker-js/faker';

// Generate flow data for water chart
export const generateWaterFlowData = (points = 24) => {
  return Array.from({ length: points }).map((_, i) => {
    const inflow = faker.number.int({ min: 800, max: 1200 });
    const treated = faker.number.int({ min: Math.floor(inflow * 0.8), max: inflow });
    const redistributed = faker.number.int({ min: Math.floor(treated * 0.6), max: treated });
    
    let hour = i;
    if (points === 24) {
      hour = i; // 24 hour format
    } else if (points === 7) {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return {
        name: days[i % 7],
        inflow,
        treated,
        redistributed,
      };
    }
    
    return {
      name: `${hour}:00`,
      inflow,
      treated,
      redistributed,
    };
  });
};

// Generate sensor locations
export const generateSensorLocations = (count = 15) => {
  const types = ['sensor', 'treatment', 'redistribution'];
  const statuses = ['active', 'warning', 'critical', 'offline'];
  
  return Array.from({ length: count }).map((_, i) => {
    const typeIndex = i < 10 ? 0 : i < 13 ? 1 : 2; // More sensors than treatment/redistribution
    
    return {
      id: `sensor-${i + 1}`,
      lat: faker.number.float({ min: 10, max: 90, fractionDigits: 2 }),
      lng: faker.number.float({ min: 10, max: 90, fractionDigits: 2 }),
      status: faker.helpers.arrayElement(statuses) as 'active' | 'warning' | 'critical' | 'offline',
      name: `${types[typeIndex].charAt(0).toUpperCase() + types[typeIndex].slice(1)} ${i + 1}`,
      type: types[typeIndex] as 'sensor' | 'treatment' | 'redistribution',
    };
  });
};

// Generate pre-treatment (raw wastewater) sensor data
export const generateRawSensorData = () => {
  return {
    type: "pre-treatment" as const,
    sensorId: `RAW-${faker.number.int({ min: 1000, max: 9999 })}`,
    location: "Drainage Channel - Entry Point",
    lastUpdated: faker.date.recent().toLocaleString(),
    metrics: [
      {
        label: 'pH Level',
        value: faker.number.float({ min: 5.0, max: 8.0, fractionDigits: 1 }),
        max: 14,
        unit: 'pH',
        status: 'warning' as const,
      },
      {
        label: 'Turbidity',
        value: faker.number.float({ min: 8, max: 16, fractionDigits: 1 }),
        max: 20,
        unit: 'NTU',
        status: 'critical' as const,
      },
      {
        label: 'Conductivity',
        value: faker.number.int({ min: 1000, max: 3500 }),
        max: 4000,
        unit: 'μS/cm',
        status: 'warning' as const,
      },
    ]
  }
};

// Generate post-treatment (cleaned water) sensor data
export const generateCleanedSensorData = () => {
  // randomly decide status
  const overallStatusOpt = faker.helpers.arrayElement(['good', 'warning', 'critical']);
  // Suggestion logic: only allow reuse if not 'critical'
  let suggested;
  if (overallStatusOpt === 'good') {
    suggested = [
      "Irrigation",
      "Industrial use",
      "Groundwater recharge"
    ];
  } else if (overallStatusOpt === 'warning') {
    suggested = ["Irrigation", "Construction/Cooling"];
  } else {
    suggested = ["Not recommended"];
  }
  return {
    type: "post-treatment" as const,
    sensorId: `CLN-${faker.number.int({ min: 1000, max: 9999 })}`,
    location: "Wastewater Plant - Output",
    lastUpdated: faker.date.recent().toLocaleString(),
    metrics: [
      {
        label: 'pH Level',
        value: faker.number.float({ min: 6.5, max: 8.2, fractionDigits: 1 }),
        max: 14,
        unit: 'pH',
        status: overallStatusOpt as 'good' | 'warning' | 'critical',
      },
      {
        label: 'Turbidity',
        value: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        max: 20,
        unit: 'NTU',
        status: overallStatusOpt as 'good' | 'warning' | 'critical',
      },
      {
        label: 'Conductivity',
        value: faker.number.int({ min: 250, max: 900 }),
        max: 2000,
        unit: 'μS/cm',
        status: overallStatusOpt as 'good' | 'warning' | 'critical',
      },
    ],
    reuseSuggestions: suggested,
    overallStatus: overallStatusOpt
  }
};

// Generate standard water quality data
export const generateWaterQualityData = () => {
  return {
    sensorId: `WQ-${faker.number.int({ min: 1000, max: 9999 })}`,
    location: faker.location.streetAddress(),
    lastUpdated: faker.date.recent().toLocaleString(),
    metrics: [
      {
        label: 'pH Level',
        value: faker.number.float({ min: 6.0, max: 8.5, fractionDigits: 1 }),
        max: 14,
        unit: 'pH',
        status: faker.helpers.arrayElement(['good', 'warning', 'critical']) as 'good' | 'warning' | 'critical',
      },
      {
        label: 'Turbidity',
        value: faker.number.float({ min: 0.5, max: 10, fractionDigits: 1 }),
        max: 20,
        unit: 'NTU',
        status: faker.helpers.arrayElement(['good', 'warning', 'critical']) as 'good' | 'warning' | 'critical',
      },
      {
        label: 'Dissolved Oxygen',
        value: faker.number.float({ min: 2, max: 12, fractionDigits: 1 }),
        max: 15,
        unit: 'mg/L',
        status: faker.helpers.arrayElement(['good', 'warning', 'critical']) as 'good' | 'warning' | 'critical',
      },
      {
        label: 'Conductivity',
        value: faker.number.int({ min: 200, max: 1500 }),
        max: 2000,
        unit: 'μS/cm',
        status: faker.helpers.arrayElement(['good', 'warning', 'critical']) as 'good' | 'warning' | 'critical',
      },
    ],
  };
};

// Generate alerts
export const generateAlerts = (count = 5) => {
  const types = ['quality', 'overflow', 'system'];
  const severities = ['low', 'medium', 'high'];
  const messages = [
    'High turbidity detected',
    'pH level out of normal range',
    'Overflow risk detected',
    'Low dissolved oxygen',
    'Conductivity exceeded threshold',
    'System maintenance required',
    'Sensor communication error',
    'Battery level low',
    'Flow rate abnormal',
    'Contamination risk detected'
  ];
  
  return Array.from({ length: count }).map((_, i) => {
    return {
      id: `alert-${faker.string.uuid()}-${i}`,
      type: faker.helpers.arrayElement(types) as 'quality' | 'overflow' | 'system',
      severity: faker.helpers.arrayElement(severities) as 'low' | 'medium' | 'high',
      message: faker.helpers.arrayElement(messages),
      location: faker.location.streetAddress(),
      timestamp: faker.date.recent().toLocaleString(),
      acknowledged: i > 2 ? true : false, // First 3 are unacknowledged
    };
  });
};

// Generate redistribution points
export const generateRedistributionPoints = (count = 4) => {
  const statuses = ['active', 'maintenance', 'offline'];
  const names = [
    'Community Garden',
    'City Park',
    'Industrial Park',
    'Golf Course',
    'Agricultural Zone',
    'Public Fountains',
    'Recreational Area'
  ];
  
  return Array.from({ length: count }).map((_, i) => {
    const capacity = faker.number.int({ min: 2000, max: 10000 });
    
    return {
      id: `redist-${i}`,
      name: faker.helpers.arrayElement(names),
      usage: faker.number.int({ min: 500, max: capacity }),
      capacity,
      status: faker.helpers.arrayElement(statuses) as 'active' | 'maintenance' | 'offline',
    };
  });
};
