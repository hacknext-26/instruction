import { useState, useEffect, useCallback, useRef } from 'react';

// Web Screen Wake Lock API interface definition
interface WakeLockSentinel extends EventTarget {
  released: boolean;
  type: 'screen';
  release: () => Promise<void>;
  onrelease: ((this: WakeLockSentinel, ev: Event) => void) | null;
}

export function useWakeLock() {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    setIsSupported('wakeLock' in navigator);
  }, []);

  const requestLock = useCallback(async () => {
    if (!('wakeLock' in navigator)) {
      return false;
    }

    try {
      if (wakeLockRef.current && !wakeLockRef.current.released) {
        return true;
      }

      const navWithWakeLock = navigator as unknown as { wakeLock?: { request: (type: string) => Promise<WakeLockSentinel> } };
      if (!navWithWakeLock.wakeLock) return false;
      const sentinel = await navWithWakeLock.wakeLock.request('screen');
      wakeLockRef.current = sentinel;
      setIsLocked(true);

      sentinel.addEventListener('release', () => {
        setIsLocked(false);
        wakeLockRef.current = null;
      });

      return true;
    } catch (err) {
      console.warn('[WakeLock API] Request failed or permission denied:', err);
      setIsLocked(false);
      return false;
    }
  }, []);

  const releaseLock = useCallback(async () => {
    if (wakeLockRef.current && !wakeLockRef.current.released) {
      try {
        await wakeLockRef.current.release();
      } catch (err) {
        console.warn('[WakeLock API] Release failed:', err);
      }
    }
    wakeLockRef.current = null;
    setIsLocked(false);
  }, []);

  // Request lock automatically on mount and re-acquire on visibility change
  useEffect(() => {
    let mounted = true;

    const acquire = async () => {
      if (mounted && document.visibilityState === 'visible') {
        await requestLock();
      }
    };

    acquire();

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        await acquire();
      } else {
        await releaseLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      mounted = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      releaseLock();
    };
  }, [requestLock, releaseLock]);

  return {
    isLocked,
    isSupported,
    requestLock,
    releaseLock
  };
}
