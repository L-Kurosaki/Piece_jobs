import { useState, useEffect } from 'react';
import { getJobs, getJob, createJob, updateJob, subscribeToJobs } from '../utils/supabaseClient';
import { useProfile } from './useProfile';

export interface Job {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  location: any;
  customer_id: string;
  expected_duration: number;
  budget: any;
  status: string;
  posted_at: string;
  accepted_bid_id?: string;
  provider_id?: string;
  start_time?: string;
  end_time?: string;
  customer?: any;
  bids?: any[];
}

export const useJobs = (filters?: any) => {
  const { profile } = useProfile();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
    
    // Subscribe to real-time updates
    const subscription = subscribeToJobs((payload) => {
      if (payload.eventType === 'INSERT') {
        setJobs(prev => [payload.new, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setJobs(prev => prev.map(job => 
          job.id === payload.new.id ? payload.new : job
        ));
      } else if (payload.eventType === 'DELETE') {
        setJobs(prev => prev.filter(job => job.id !== payload.old.id));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [filters]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await getJobs(filters);
      
      if (error) {
        setError(error.message);
      } else {
        setJobs(data || []);
      }
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const createNewJob = async (jobData: Partial<Job>) => {
    if (!profile) return { success: false, error: 'No profile found' };

    try {
      const { data, error } = await createJob({
        customer_id: profile.id,
        ...jobData,
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (err) {
      return { success: false, error: 'Failed to create job' };
    }
  };

  const updateJobStatus = async (jobId: string, updates: Partial<Job>) => {
    try {
      const { data, error } = await updateJob(jobId, updates);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (err) {
      return { success: false, error: 'Failed to update job' };
    }
  };

  return {
    jobs,
    loading,
    error,
    createJob: createNewJob,
    updateJob: updateJobStatus,
    refreshJobs: loadJobs,
  };
};

export const useJob = (jobId: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (jobId) {
      loadJob();
    }
  }, [jobId]);

  const loadJob = async () => {
    try {
      setLoading(true);
      const { data, error } = await getJob(jobId);
      
      if (error) {
        setError(error.message);
      } else {
        setJob(data);
      }
    } catch (err) {
      setError('Failed to load job');
    } finally {
      setLoading(false);
    }
  };

  return {
    job,
    loading,
    error,
    refreshJob: loadJob,
  };
};