export interface SecurityAlert {
  id: string;
  jobId: string;
  type: 'duration_exceeded' | 'no_response' | 'emergency' | 'manual';
  timestamp: number;
  status: 'pending' | 'acknowledged' | 'resolved';
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  description: string;
  securityTeamId?: string;
  responseTime?: number;
}

export interface JobTimer {
  jobId: string;
  startTime: number;
  expectedDuration: number; // in hours
  warningThreshold: number; // in hours (e.g., 4.5 hours)
  maxDuration: number; // in hours (e.g., 5 hours)
  lastCheckIn?: number;
  status: 'active' | 'completed' | 'overdue' | 'emergency';
}

export interface SecurityTeam {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceArea: {
    latitude: number;
    longitude: number;
    radius: number; // in km
  };
  responseTime: number; // average response time in minutes
  available: boolean;
}

export interface EmergencyContact {
  id: string;
  userId: string;
  name: string;
  phone: string;
  relationship: string;
  priority: number; // 1 = primary, 2 = secondary, etc.
}