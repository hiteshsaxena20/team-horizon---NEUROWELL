// Mock data for eRTMAC-NWIS - Nearby Wells Intelligence System
// This file can be replaced with real API calls later

export interface Well {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  depth: number;
  totalDepth: number;
  formation: string;
  formationAge: string;
  lithology: string;
  distance: number;
  drillingDuration: number;
  riskScore: number;
  similarityScore: number;
  status: 'Active' | 'Completed' | 'Suspended' | 'Planned' | 'Abandoned';
  wellType: 'Exploration' | 'Development' | 'Appraisal' | 'Injection';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  mudWeight: number;
  rop: number;
  wob: number;
  rpm: number;
  pumpPressure: number;
  torque: number;
  pressure: number;
  temperature: number;
  incidents: DrillingIncident[];
  completionStatus: string;
  field: string;
}

export interface DrillingIncident {
  id: string;
  type: string;
  depth: number;
  date: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  resolved: boolean;
  duration: number; // hours
}

export interface RiskItem {
  id: string;
  name: string;
  level: 'Low' | 'Medium' | 'High' | 'Critical';
  score: number;
  description: string;
  depthRange: string;
  mitigations: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: Date;
}

// Center coordinate for the field (offshore Gujarat, India)
export const FIELD_CENTER = { lat: 21.75, lng: 69.20 };

export const mockWells: Well[] = [
  {
    id: 'well-a01', name: 'WELL-A01', latitude: 21.760, longitude: 69.195,
    depth: 3200, totalDepth: 3450, formation: 'Panna', formationAge: 'Eocene',
    lithology: 'Sandstone / Shale', distance: 0, drillingDuration: 45,
    riskScore: 42, similarityScore: 100, status: 'Active', wellType: 'Development',
    riskLevel: 'Medium', mudWeight: 10.5, rop: 18.2, wob: 22, rpm: 120,
    pumpPressure: 3200, torque: 12500, pressure: 4850, temperature: 142,
    completionStatus: 'In Progress', field: 'Field Alpha',
    incidents: [
      { id: 'inc-1', type: 'Lost Circulation', depth: 2480, date: '2025-08-15', severity: 'High', description: 'Partial lost circulation encountered at 2480m in Panna formation', resolved: true, duration: 12 },
      { id: 'inc-2', type: 'Wellbore Instability', depth: 2750, date: '2025-09-01', severity: 'Medium', description: 'Minor wellbore instability observed in shale section', resolved: true, duration: 6 },
    ]
  },
  {
    id: 'well-a02', name: 'WELL-A02', latitude: 21.748, longitude: 69.208,
    depth: 3100, totalDepth: 3380, formation: 'Panna', formationAge: 'Eocene',
    lithology: 'Sandstone / Limestone', distance: 1.2, drillingDuration: 52,
    riskScore: 58, similarityScore: 94, status: 'Completed', wellType: 'Development',
    riskLevel: 'Medium', mudWeight: 10.8, rop: 16.5, wob: 24, rpm: 115,
    pumpPressure: 3350, torque: 13200, pressure: 5020, temperature: 148,
    completionStatus: 'Completed', field: 'Field Alpha',
    incidents: [
      { id: 'inc-3', type: 'Lost Circulation', depth: 2520, date: '2024-11-20', severity: 'High', description: 'Severe lost circulation at 2520m, required LCM treatment', resolved: true, duration: 18 },
      { id: 'inc-4', type: 'Stuck Pipe', depth: 2890, date: '2024-12-05', severity: 'Medium', description: 'Differential sticking at 2890m, freed after 8 hours', resolved: true, duration: 8 },
      { id: 'inc-5', type: 'Kick', depth: 3100, date: '2024-12-18', severity: 'High', description: 'Gas kick detected at 3100m, well control procedures activated', resolved: true, duration: 4 },
    ]
  },
  {
    id: 'well-a03', name: 'WELL-A03', latitude: 21.772, longitude: 69.182,
    depth: 2950, totalDepth: 3200, formation: 'Panna', formationAge: 'Eocene',
    lithology: 'Sandstone / Shale', distance: 2.1, drillingDuration: 48,
    riskScore: 45, similarityScore: 89, status: 'Completed', wellType: 'Exploration',
    riskLevel: 'Low', mudWeight: 10.2, rop: 19.8, wob: 20, rpm: 125,
    pumpPressure: 3100, torque: 11800, pressure: 4680, temperature: 138,
    completionStatus: 'Completed', field: 'Field Alpha',
    incidents: [
      { id: 'inc-6', type: 'Wellbore Instability', depth: 2200, date: '2024-06-10', severity: 'Medium', description: 'Shale section instability between 2200-2350m', resolved: true, duration: 10 },
    ]
  },
  {
    id: 'well-a04', name: 'WELL-A04', latitude: 21.740, longitude: 69.215,
    depth: 3050, totalDepth: 3300, formation: 'Bassein', formationAge: 'Paleocene',
    lithology: 'Limestone / Dolomite', distance: 2.8, drillingDuration: 55,
    riskScore: 62, similarityScore: 78, status: 'Completed', wellType: 'Development',
    riskLevel: 'Medium', mudWeight: 11.2, rop: 14.2, wob: 26, rpm: 110,
    pumpPressure: 3500, torque: 14500, pressure: 5200, temperature: 155,
    completionStatus: 'Completed', field: 'Field Alpha',
    incidents: [
      { id: 'inc-7', type: 'Formation Pressure', depth: 2800, date: '2024-03-22', severity: 'High', description: 'Abnormal formation pressure at 2800m requiring mud weight increase', resolved: true, duration: 14 },
      { id: 'inc-8', type: 'Lost Circulation', depth: 2950, date: '2024-04-01', severity: 'Medium', description: 'Partial losses in fractured limestone zone', resolved: true, duration: 8 },
    ]
  },
  {
    id: 'well-a05', name: 'WELL-A05', latitude: 21.755, longitude: 69.230,
    depth: 2800, totalDepth: 3100, formation: 'Panna', formationAge: 'Eocene',
    lithology: 'Sandstone', distance: 3.2, drillingDuration: 40,
    riskScore: 35, similarityScore: 82, status: 'Completed', wellType: 'Appraisal',
    riskLevel: 'Low', mudWeight: 10.0, rop: 21.5, wob: 18, rpm: 130,
    pumpPressure: 2900, torque: 10500, pressure: 4400, temperature: 132,
    completionStatus: 'Completed', field: 'Field Alpha',
    incidents: []
  },
  {
    id: 'well-b01', name: 'WELL-B01', latitude: 21.730, longitude: 69.175,
    depth: 3400, totalDepth: 3650, formation: 'Bassein', formationAge: 'Paleocene',
    lithology: 'Limestone / Shale', distance: 3.4, drillingDuration: 62,
    riskScore: 72, similarityScore: 84, status: 'Completed', wellType: 'Exploration',
    riskLevel: 'High', mudWeight: 11.5, rop: 12.8, wob: 28, rpm: 105,
    pumpPressure: 3600, torque: 15200, pressure: 5500, temperature: 162,
    completionStatus: 'Completed', field: 'Field Beta',
    incidents: [
      { id: 'inc-9', type: 'Lost Circulation', depth: 2600, date: '2023-09-15', severity: 'Critical', description: 'Total lost circulation at 2600m, required cement squeeze', resolved: true, duration: 36 },
      { id: 'inc-10', type: 'Stuck Pipe', depth: 3100, date: '2023-10-08', severity: 'High', description: 'Pack-off and stuck pipe incident requiring fishing operations', resolved: true, duration: 48 },
      { id: 'inc-11', type: 'Kick', depth: 3350, date: '2023-10-22', severity: 'Critical', description: 'High-pressure gas kick at 3350m', resolved: true, duration: 6 },
    ]
  },
  {
    id: 'well-b02', name: 'WELL-B02', latitude: 21.735, longitude: 69.160,
    depth: 3250, totalDepth: 3500, formation: 'Bassein', formationAge: 'Paleocene',
    lithology: 'Limestone / Dolomite', distance: 4.1, drillingDuration: 58,
    riskScore: 65, similarityScore: 76, status: 'Suspended', wellType: 'Development',
    riskLevel: 'High', mudWeight: 11.8, rop: 13.5, wob: 25, rpm: 108,
    pumpPressure: 3450, torque: 14800, pressure: 5350, temperature: 158,
    completionStatus: 'Suspended - Awaiting Review', field: 'Field Beta',
    incidents: [
      { id: 'inc-12', type: 'Wellbore Instability', depth: 2400, date: '2024-01-10', severity: 'High', description: 'Severe borehole enlargement in shale section', resolved: true, duration: 20 },
      { id: 'inc-13', type: 'Formation Pressure', depth: 3000, date: '2024-01-28', severity: 'Medium', description: 'Pore pressure increase requiring mud weight adjustment', resolved: true, duration: 6 },
    ]
  },
  {
    id: 'well-c01', name: 'WELL-C01', latitude: 21.780, longitude: 69.210,
    depth: 2700, totalDepth: 2950, formation: 'Panna', formationAge: 'Eocene',
    lithology: 'Sandstone / Siltstone', distance: 2.5, drillingDuration: 38,
    riskScore: 30, similarityScore: 86, status: 'Completed', wellType: 'Development',
    riskLevel: 'Low', mudWeight: 9.8, rop: 22.0, wob: 19, rpm: 128,
    pumpPressure: 2850, torque: 10200, pressure: 4200, temperature: 128,
    completionStatus: 'Completed', field: 'Field Charlie',
    incidents: []
  },
  {
    id: 'well-c02', name: 'WELL-C02', latitude: 21.790, longitude: 69.195,
    depth: 2850, totalDepth: 3100, formation: 'Panna', formationAge: 'Eocene',
    lithology: 'Sandstone / Shale', distance: 3.5, drillingDuration: 42,
    riskScore: 48, similarityScore: 81, status: 'Completed', wellType: 'Exploration',
    riskLevel: 'Medium', mudWeight: 10.3, rop: 19.2, wob: 21, rpm: 122,
    pumpPressure: 3050, torque: 11500, pressure: 4550, temperature: 135,
    completionStatus: 'Completed', field: 'Field Charlie',
    incidents: [
      { id: 'inc-14', type: 'Lost Circulation', depth: 2500, date: '2024-07-05', severity: 'Medium', description: 'Partial losses while drilling through fractured sandstone', resolved: true, duration: 8 },
    ]
  },
  {
    id: 'well-c03', name: 'WELL-C03', latitude: 21.795, longitude: 69.225,
    depth: 2600, totalDepth: 2850, formation: 'Tapti', formationAge: 'Miocene',
    lithology: 'Shale / Siltstone', distance: 4.8, drillingDuration: 35,
    riskScore: 25, similarityScore: 68, status: 'Completed', wellType: 'Appraisal',
    riskLevel: 'Low', mudWeight: 9.5, rop: 24.0, wob: 17, rpm: 135,
    pumpPressure: 2700, torque: 9800, pressure: 4000, temperature: 122,
    completionStatus: 'Completed', field: 'Field Charlie',
    incidents: []
  },
  {
    id: 'well-d01', name: 'WELL-D01', latitude: 21.720, longitude: 69.200,
    depth: 3500, totalDepth: 3750, formation: 'Bassein', formationAge: 'Paleocene',
    lithology: 'Limestone / Marl', distance: 4.5, drillingDuration: 68,
    riskScore: 78, similarityScore: 72, status: 'Completed', wellType: 'Exploration',
    riskLevel: 'High', mudWeight: 12.0, rop: 11.5, wob: 30, rpm: 100,
    pumpPressure: 3700, torque: 16000, pressure: 5800, temperature: 168,
    completionStatus: 'Completed', field: 'Field Delta',
    incidents: [
      { id: 'inc-15', type: 'Kick', depth: 3400, date: '2023-05-12', severity: 'Critical', description: 'Unexpected high-pressure zone at 3400m', resolved: true, duration: 8 },
      { id: 'inc-16', type: 'Stuck Pipe', depth: 3200, date: '2023-05-20', severity: 'High', description: 'Key-seating and stuck pipe at 3200m', resolved: true, duration: 24 },
      { id: 'inc-17', type: 'Lost Circulation', depth: 2700, date: '2023-04-28', severity: 'High', description: 'Severe losses in vuggy limestone', resolved: true, duration: 16 },
    ]
  },
  {
    id: 'well-d02', name: 'WELL-D02', latitude: 21.715, longitude: 69.185,
    depth: 3300, totalDepth: 3550, formation: 'Bassein', formationAge: 'Paleocene',
    lithology: 'Limestone / Dolomite', distance: 5.2, drillingDuration: 60,
    riskScore: 70, similarityScore: 70, status: 'Abandoned', wellType: 'Exploration',
    riskLevel: 'High', mudWeight: 11.6, rop: 13.0, wob: 27, rpm: 107,
    pumpPressure: 3550, torque: 15000, pressure: 5400, temperature: 160,
    completionStatus: 'Plugged & Abandoned', field: 'Field Delta',
    incidents: [
      { id: 'inc-18', type: 'Wellbore Instability', depth: 2500, date: '2023-02-14', severity: 'Critical', description: 'Severe borehole collapse requiring sidetrack', resolved: true, duration: 72 },
      { id: 'inc-19', type: 'Formation Pressure', depth: 3100, date: '2023-03-01', severity: 'High', description: 'Subnormal pressure zone causing differential sticking', resolved: true, duration: 16 },
    ]
  },
  {
    id: 'well-e01', name: 'WELL-E01', latitude: 21.765, longitude: 69.240,
    depth: 2900, totalDepth: 3150, formation: 'Panna', formationAge: 'Eocene',
    lithology: 'Sandstone / Shale', distance: 4.0, drillingDuration: 44,
    riskScore: 40, similarityScore: 80, status: 'Completed', wellType: 'Development',
    riskLevel: 'Low', mudWeight: 10.1, rop: 20.0, wob: 20, rpm: 125,
    pumpPressure: 3000, torque: 11200, pressure: 4500, temperature: 136,
    completionStatus: 'Completed', field: 'Field Echo',
    incidents: [
      { id: 'inc-20', type: 'Lost Circulation', depth: 2550, date: '2024-05-18', severity: 'Low', description: 'Minor seepage losses, self-healed', resolved: true, duration: 2 },
    ]
  },
  {
    id: 'well-e02', name: 'WELL-E02', latitude: 21.770, longitude: 69.250,
    depth: 2750, totalDepth: 3000, formation: 'Tapti', formationAge: 'Miocene',
    lithology: 'Sandstone', distance: 5.5, drillingDuration: 36,
    riskScore: 28, similarityScore: 65, status: 'Completed', wellType: 'Appraisal',
    riskLevel: 'Low', mudWeight: 9.6, rop: 23.5, wob: 18, rpm: 132,
    pumpPressure: 2750, torque: 9500, pressure: 4100, temperature: 124,
    completionStatus: 'Completed', field: 'Field Echo',
    incidents: []
  },
  {
    id: 'well-f01', name: 'WELL-F01', latitude: 21.745, longitude: 69.155,
    depth: 3600, totalDepth: 3850, formation: 'Bassein', formationAge: 'Paleocene',
    lithology: 'Limestone / Shale / Marl', distance: 5.0, drillingDuration: 72,
    riskScore: 82, similarityScore: 68, status: 'Completed', wellType: 'Exploration',
    riskLevel: 'Critical', mudWeight: 12.2, rop: 10.8, wob: 32, rpm: 98,
    pumpPressure: 3800, torque: 16500, pressure: 6000, temperature: 175,
    completionStatus: 'Completed', field: 'Field Foxtrot',
    incidents: [
      { id: 'inc-21', type: 'Lost Circulation', depth: 2650, date: '2023-07-22', severity: 'Critical', description: 'Total losses requiring multiple cement squeezes', resolved: true, duration: 48 },
      { id: 'inc-22', type: 'Kick', depth: 3500, date: '2023-08-15', severity: 'Critical', description: 'Gas and fluid influx at 3500m', resolved: true, duration: 10 },
      { id: 'inc-23', type: 'Stuck Pipe', depth: 3200, date: '2023-08-05', severity: 'High', description: 'Mechanical sticking in undergauge hole', resolved: true, duration: 30 },
      { id: 'inc-24', type: 'Wellbore Instability', depth: 2900, date: '2023-08-01', severity: 'High', description: 'Tight hole conditions with reactive shale', resolved: true, duration: 18 },
    ]
  },
  {
    id: 'well-f02', name: 'WELL-F02', latitude: 21.738, longitude: 69.148,
    depth: 3450, totalDepth: 3700, formation: 'Bassein', formationAge: 'Paleocene',
    lithology: 'Limestone / Dolomite', distance: 5.8, drillingDuration: 65,
    riskScore: 75, similarityScore: 64, status: 'Completed', wellType: 'Development',
    riskLevel: 'High', mudWeight: 11.9, rop: 12.0, wob: 29, rpm: 102,
    pumpPressure: 3650, torque: 15500, pressure: 5700, temperature: 170,
    completionStatus: 'Completed', field: 'Field Foxtrot',
    incidents: [
      { id: 'inc-25', type: 'Formation Pressure', depth: 3100, date: '2024-02-10', severity: 'High', description: 'Abnormal pressure gradient requiring kill-weight mud', resolved: true, duration: 12 },
      { id: 'inc-26', type: 'Lost Circulation', depth: 2800, date: '2024-01-25', severity: 'Medium', description: 'Partial losses in fractured limestone interval', resolved: true, duration: 10 },
    ]
  },
  {
    id: 'well-g01', name: 'WELL-G01', latitude: 21.785, longitude: 69.170,
    depth: 2650, totalDepth: 2900, formation: 'Panna', formationAge: 'Eocene',
    lithology: 'Sandstone / Claystone', distance: 3.8, drillingDuration: 37,
    riskScore: 32, similarityScore: 77, status: 'Planned', wellType: 'Development',
    riskLevel: 'Low', mudWeight: 9.9, rop: 21.0, wob: 19, rpm: 127,
    pumpPressure: 2900, torque: 10800, pressure: 4300, temperature: 130,
    completionStatus: 'Planned', field: 'Field Golf',
    incidents: []
  },
  {
    id: 'well-g02', name: 'WELL-G02', latitude: 21.800, longitude: 69.185,
    depth: 2500, totalDepth: 2750, formation: 'Tapti', formationAge: 'Miocene',
    lithology: 'Sandstone / Siltstone', distance: 5.0, drillingDuration: 32,
    riskScore: 22, similarityScore: 62, status: 'Planned', wellType: 'Appraisal',
    riskLevel: 'Low', mudWeight: 9.4, rop: 25.0, wob: 16, rpm: 138,
    pumpPressure: 2650, torque: 9200, pressure: 3900, temperature: 118,
    completionStatus: 'Planned', field: 'Field Golf',
    incidents: []
  },
];

export const targetWell = mockWells[0]; // WELL-A01 is the current/target well

export const riskItems: RiskItem[] = [
  {
    id: 'risk-1', name: 'Lost Circulation', level: 'High', score: 82,
    description: 'High probability of lost circulation based on 8 nearby wells experiencing losses between 2400m-2700m in similar formations.',
    depthRange: '2400m - 2700m',
    mitigations: ['Pre-treat mud with LCM before entering loss zone', 'Maintain optimal mud weight at 10.5-11.0 ppg', 'Have cement squeeze materials on standby', 'Monitor flow-in vs flow-out closely']
  },
  {
    id: 'risk-2', name: 'Stuck Pipe', level: 'Medium', score: 58,
    description: 'Moderate risk of differential sticking in permeable sandstone intervals and pack-off in shale sections.',
    depthRange: '2800m - 3200m',
    mitigations: ['Maintain short trip schedule', 'Keep pipe moving during connections', 'Monitor drag trends', 'Use adequate lubricant concentration']
  },
  {
    id: 'risk-3', name: 'Wellbore Instability', level: 'Medium', score: 55,
    description: 'Reactive shale sections may cause borehole enlargement and tight hole conditions.',
    depthRange: '2200m - 2600m',
    mitigations: ['Use inhibitive mud system', 'Monitor caliper logs', 'Maintain adequate mud weight for wellbore stability', 'Minimize open-hole exposure time']
  },
  {
    id: 'risk-4', name: 'Kick', level: 'Low', score: 32,
    description: 'Low but notable risk of gas influx based on 2 nearby wells experiencing kicks at deeper intervals.',
    depthRange: '3200m - 3500m',
    mitigations: ['Monitor pit volume closely', 'Conduct regular kick drills', 'Maintain well control equipment readiness', 'Monitor gas shows while drilling']
  },
  {
    id: 'risk-5', name: 'Formation Pressure', level: 'High', score: 75,
    description: 'Abnormal pressure gradients expected based on offset well data. Pressure ramp observed in nearby wells below 2800m.',
    depthRange: '2800m - 3400m',
    mitigations: ['Monitor d-exponent trends', 'Use PWD (Pressure While Drilling) tool', 'Plan casing points to accommodate pressure transitions', 'Have contingency mud weight available']
  },
];

export const aiResponses: Record<string, { answer: string; sources: string[] }> = {
  'default': {
    answer: "I'm the eRTMAC AI Drilling Assistant. I can help you analyze nearby wells, identify drilling risks, and provide recommendations based on historical data. Try asking about specific wells, formations, or depth-related challenges.",
    sources: ['System Knowledge Base']
  },
  'problems': {
    answer: "Based on analysis of 18 nearby wells, the most common drilling problems were:\n\n1. **Lost Circulation** (12 incidents) — Most frequent between 2400m-2700m, particularly in the Panna and Bassein formations. 4 incidents were classified as Critical.\n\n2. **Stuck Pipe** (5 incidents) — Primarily differential sticking in permeable sandstone intervals (2800m-3200m). Average time to free: 22 hours.\n\n3. **Wellbore Instability** (4 incidents) — Concentrated in shale sections (2200m-2600m), with reactive clay causing borehole enlargement.\n\n4. **Kick** (3 incidents) — Gas influx events at deeper intervals (3200m-3500m), all successfully controlled.\n\n5. **Formation Pressure** (3 incidents) — Abnormal pressure zones encountered below 2800m.\n\nRecommendation: Pre-plan LCM and cementing materials for the 2400m-2700m interval.",
    sources: ['WELL-A02 Drilling Report', 'WELL-B01 Incident Log', 'WELL-D01 End-of-Well Report', 'WELL-F01 Drilling Summary', 'Field Alpha Historical Database']
  },
  'similar': {
    answer: "The AI similarity engine has identified **WELL-A02** as the most similar well to your target (WELL-A01) with a **94% similarity score**.\n\nKey similarity factors:\n- **Same formation** (Panna, Eocene)\n- **Geographic proximity** (1.2 km)\n- **Similar total depth** (3380m vs 3450m)\n- **Comparable drilling parameters** (ROP, WOB, mud weight)\n\nTop 3 similar wells:\n1. WELL-A02 — 94% similarity, 1.2 km\n2. WELL-A03 — 89% similarity, 2.1 km  \n3. WELL-C01 — 86% similarity, 2.5 km\n\nAll three wells are in the Panna formation and share similar lithological characteristics.",
    sources: ['AI Similarity Engine v2.1', 'WELL-A02 Geological Report', 'WELL-A03 Drilling Summary', 'WELL-C01 Completion Report']
  },
  'depth': {
    answer: "At **2500m depth**, based on data from 8 nearby wells in similar formations, you should expect:\n\n**Primary Risks:**\n- **Lost Circulation** (High probability) — 6 of 8 wells experienced partial to total losses between 2400m-2700m\n- **Wellbore Instability** (Medium probability) — Reactive shale intervals present\n\n**Expected Drilling Parameters:**\n- Mud Weight: 10.5-11.0 ppg\n- ROP: 15-20 m/hr\n- WOB: 20-24 klbs\n\n**Recommended Actions:**\n1. Pre-treat drilling fluid with fine/medium LCM\n2. Increase monitoring frequency for flow checks\n3. Have cementing crew on standby\n4. Consider controlled drilling rate through loss zone",
    sources: ['WELL-A02 Drilling Report (2480m section)', 'WELL-A03 Geological Data', 'WELL-C02 Lost Circulation Report', 'Formation X Pressure Analysis']
  },
  'lost_circulation': {
    answer: "**Wells with Lost Circulation Problems:**\n\n| Well | Depth | Severity | Formation | Duration |\n|------|-------|----------|-----------|----------|\n| WELL-A01 | 2480m | High | Panna | 12 hrs |\n| WELL-A02 | 2520m | High | Panna | 18 hrs |\n| WELL-A04 | 2950m | Medium | Bassein | 8 hrs |\n| WELL-B01 | 2600m | Critical | Bassein | 36 hrs |\n| WELL-C02 | 2500m | Medium | Panna | 8 hrs |\n| WELL-D01 | 2700m | High | Bassein | 16 hrs |\n| WELL-E01 | 2550m | Low | Panna | 2 hrs |\n| WELL-F01 | 2650m | Critical | Bassein | 48 hrs |\n| WELL-F02 | 2800m | Medium | Bassein | 10 hrs |\n\n**Pattern Analysis:** Lost circulation is most concentrated in the **2400m-2800m** depth range. Panna formation losses tend to be less severe than Bassein formation losses. The Bassein limestone/dolomite sections show more severe and prolonged loss events.",
    sources: ['Field Alpha Incident Database', 'Field Beta Lost Circulation Report', 'Field Delta Drilling Summary', 'Regional Loss Zone Analysis']
  },
  'lessons': {
    answer: "**Key Lessons from WELL-A02:**\n\n1. **Lost Circulation at 2520m:** Severe losses encountered in Panna formation. LCM treatment was required with 18 hours of NPT. **Lesson:** Pre-treat mud with fine/medium LCM before reaching 2400m.\n\n2. **Stuck Pipe at 2890m:** Differential sticking in permeable sandstone. Freed after 8 hours using jarring and spotting oil-based pill. **Lesson:** Maintain short trip schedule and monitor drag trends through permeable sections.\n\n3. **Gas Kick at 3100m:** Unexpected gas influx requiring well control procedures. Successfully controlled within 4 hours. **Lesson:** Maintain vigilant monitoring below 3000m, ensure BOP equipment is tested and ready.\n\n4. **Drilling Performance:** Average ROP of 16.5 m/hr with optimal WOB of 24 klbs. Drilling duration was 52 days (7 days over plan due to incidents).\n\n**Overall Recommendation:** Budget 50-55 days for similar depth targets in this area with contingency for lost circulation events.",
    sources: ['WELL-A02 End-of-Well Report', 'WELL-A02 Drilling Incident Log', 'WELL-A02 Lessons Learned Document', 'WELL-A02 Daily Drilling Reports']
  },
  'historical': {
    answer: "**Historical Wells to Consider Before Drilling:**\n\nBased on AI analysis of geological, geographical, and drilling parameter similarities, these wells should be reviewed:\n\n**Must-Review (>85% similarity):**\n1. **WELL-A02** (94%) — Same formation, closest proximity. Critical for understanding lost circulation and kick risks.\n2. **WELL-A03** (89%) — Similar formation and depth. Good reference for drilling parameters.\n3. **WELL-C01** (86%) — Similar lithology. Clean drilling history provides optimistic benchmark.\n\n**Should-Review (70-85%):**\n4. **WELL-B01** (84%) — Different field but similar formation. Important for understanding severe drilling problems.\n5. **WELL-A05** (82%) — Clean well with good performance data.\n6. **WELL-C02** (81%) — Similar formation with minor lost circulation.\n\n**Optional Review (<70%):**\n7. **WELL-A04** (78%) — Bassein formation, useful for deeper section planning.\n8. **WELL-G01** (77%) — Planned well with similar characteristics.\n\nPrioritize reviewing WELL-A02 and WELL-B01 incident reports for risk mitigation planning.",
    sources: ['AI Similarity Engine v2.1', 'Regional Well Database', 'Field Correlation Study 2024', 'Geological Formation Atlas']
  }
};

// ROP data for charts
export const ropChartData = [
  { depth: 500, rop: 32, wob: 12, torque: 6500, mudWeight: 9.2, pumpPressure: 2200 },
  { depth: 750, rop: 28, wob: 14, torque: 7200, mudWeight: 9.4, pumpPressure: 2350 },
  { depth: 1000, rop: 25, wob: 16, torque: 8000, mudWeight: 9.6, pumpPressure: 2500 },
  { depth: 1250, rop: 24, wob: 17, torque: 8500, mudWeight: 9.8, pumpPressure: 2600 },
  { depth: 1500, rop: 22, wob: 18, torque: 9200, mudWeight: 10.0, pumpPressure: 2750 },
  { depth: 1750, rop: 21, wob: 19, torque: 9800, mudWeight: 10.1, pumpPressure: 2850 },
  { depth: 2000, rop: 20, wob: 20, torque: 10500, mudWeight: 10.3, pumpPressure: 2950 },
  { depth: 2250, rop: 19, wob: 21, torque: 11200, mudWeight: 10.4, pumpPressure: 3050 },
  { depth: 2500, rop: 16, wob: 23, torque: 12800, mudWeight: 10.6, pumpPressure: 3200 },
  { depth: 2750, rop: 15, wob: 24, torque: 13500, mudWeight: 10.8, pumpPressure: 3300 },
  { depth: 3000, rop: 14, wob: 25, torque: 14200, mudWeight: 11.0, pumpPressure: 3400 },
  { depth: 3200, rop: 12, wob: 26, torque: 15000, mudWeight: 11.2, pumpPressure: 3500 },
];
