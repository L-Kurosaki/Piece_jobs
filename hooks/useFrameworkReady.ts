import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  const hasCalledRef = useRef(false);
  
  useEffect(() => {
    if (!hasCalledRef.current && typeof window !== 'undefined') {
      hasCalledRef.current = true;
      window.frameworkReady?.();
    }
  }, []);
}