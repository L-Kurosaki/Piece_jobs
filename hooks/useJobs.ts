import { useState, useEffect } from 'react';
import { getJobs, createJob, getJobById } from '../utils/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useJobs = (filters?: any) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    loadJobs();
  }, []);

  const refetch = () => {
    loadJobs();
  };

  return { jobs, loading, error, refetch };
};

export const useJob = (jobId: string) => {
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true);
        const { data, error } = await getJobById(jobId);
        
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

    if (jobId) {
      loadJob();
    }
  }, [jobId]);

  return { job, loading, error };
};

export const useCreateJob = () => {
  const [loading, setLoading] = useState(false);
  const { profile } = useAuth();

  const createNewJob = async (jobData: any) => {
    try {
      setLoading(true);
      
      const jobPayload = {
        ...jobData,
        customer_id: profile?.id,
        posted_at: new Date().toISOString(),
        status: 'pending',
      };

      const { data, error } = await createJob(jobPayload);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { createJob: createNewJob, loading };
};