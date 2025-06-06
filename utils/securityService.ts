import { SecurityAlert, JobTimer, SecurityTeam, EmergencyContact } from '../types/Security';
import { Job } from '../types/Job';

class SecurityService {
  private activeTimers: Map<string, JobTimer> = new Map();
  private securityTeams: SecurityTeam[] = [
    {
      id: 'security1',
      name: 'Cape Town Security Services',
      phone: '+27123456789',
      email: 'dispatch@ctss.co.za',
      serviceArea: {
        latitude: -33.9249,
        longitude: 18.4241,
        radius: 25,
      },
      responseTime: 15,
      available: true,
    },
    {
      id: 'security2',
      name: 'Johannesburg Rapid Response',
      phone: '+27987654321',
      email: 'emergency@jrr.co.za',
      serviceArea: {
        latitude: -26.2041,
        longitude: 28.0473,
        radius: 30,
      },
      responseTime: 12,
      available: true,
    },
  ];

  startJobTimer(job: Job): void {
    const timer: JobTimer = {
      jobId: job.id,
      startTime: Date.now(),
      expectedDuration: job.expectedDuration,
      warningThreshold: job.expectedDuration - 0.5, // 30 minutes before expected end
      maxDuration: 5, // 5 hours maximum
      status: 'active',
    };

    this.activeTimers.set(job.id, timer);
    
    // Set warning timer
    setTimeout(() => {
      this.checkJobStatus(job.id);
    }, timer.warningThreshold * 60 * 60 * 1000);

    // Set emergency timer
    setTimeout(() => {
      this.triggerEmergencyAlert(job.id);
    }, timer.maxDuration * 60 * 60 * 1000);
  }

  checkJobStatus(jobId: string): void {
    const timer = this.activeTimers.get(jobId);
    if (!timer || timer.status !== 'active') return;

    const currentTime = Date.now();
    const elapsedHours = (currentTime - timer.startTime) / (1000 * 60 * 60);

    if (elapsedHours >= timer.warningThreshold) {
      this.sendWarningNotification(jobId);
    }

    if (elapsedHours >= timer.maxDuration) {
      this.triggerEmergencyAlert(jobId);
    }
  }

  private sendWarningNotification(jobId: string): void {
    // Send notification to both customer and provider
    console.log(`Warning: Job ${jobId} is approaching time limit`);
    
    // In a real app, this would send push notifications
    // this.notificationService.sendWarning(jobId);
  }

  private triggerEmergencyAlert(jobId: string): void {
    const timer = this.activeTimers.get(jobId);
    if (!timer) return;

    timer.status = 'emergency';
    
    const alert: SecurityAlert = {
      id: `alert-${Date.now()}`,
      jobId,
      type: 'duration_exceeded',
      timestamp: Date.now(),
      status: 'pending',
      description: `Job ${jobId} has exceeded maximum duration of ${timer.maxDuration} hours`,
    };

    this.dispatchSecurityTeam(alert);
  }

  private dispatchSecurityTeam(alert: SecurityAlert): void {
    // Find nearest available security team
    const nearestTeam = this.findNearestSecurityTeam(alert.location);
    
    if (nearestTeam) {
      alert.securityTeamId = nearestTeam.id;
      console.log(`Dispatching ${nearestTeam.name} to job ${alert.jobId}`);
      
      // In a real app, this would:
      // 1. Send SMS/call to security team
      // 2. Update alert status
      // 3. Notify customer and provider
      // 4. Log the incident
    }
  }

  private findNearestSecurityTeam(location?: { latitude: number; longitude: number }): SecurityTeam | null {
    if (!location) return this.securityTeams.find(team => team.available) || null;

    // Calculate distance and find nearest available team
    let nearestTeam: SecurityTeam | null = null;
    let shortestDistance = Infinity;

    for (const team of this.securityTeams) {
      if (!team.available) continue;

      const distance = this.calculateDistance(
        location.latitude,
        location.longitude,
        team.serviceArea.latitude,
        team.serviceArea.longitude
      );

      if (distance <= team.serviceArea.radius && distance < shortestDistance) {
        shortestDistance = distance;
        nearestTeam = team;
      }
    }

    return nearestTeam;
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  completeJob(jobId: string): void {
    const timer = this.activeTimers.get(jobId);
    if (timer) {
      timer.status = 'completed';
      this.activeTimers.delete(jobId);
    }
  }

  getActiveTimers(): JobTimer[] {
    return Array.from(this.activeTimers.values());
  }

  triggerEmergencyButton(userId: string, location: { latitude: number; longitude: number }): void {
    const alert: SecurityAlert = {
      id: `emergency-${Date.now()}`,
      jobId: '', // Emergency not tied to specific job
      type: 'emergency',
      timestamp: Date.now(),
      status: 'pending',
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        address: 'Emergency location',
      },
      description: `Emergency button pressed by user ${userId}`,
    };

    this.dispatchSecurityTeam(alert);
    
    // Also notify emergency contacts
    this.notifyEmergencyContacts(userId);
  }

  private notifyEmergencyContacts(userId: string): void {
    // In a real app, this would fetch and notify emergency contacts
    console.log(`Notifying emergency contacts for user ${userId}`);
  }
}

export const securityService = new SecurityService();