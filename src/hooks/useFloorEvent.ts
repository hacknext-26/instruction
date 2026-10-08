import { useState, useEffect, useRef } from 'react';
import { FloorEvent, FloorNumber } from '../types/event';
import { fetchFloorEvent, subscribeToFloorEvent, INITIAL_SEED_EVENTS } from '../lib/supabase';

export function useFloorEvent(floorNumber: FloorNumber, initialOverride?: FloorEvent) {
  const [event, setEvent] = useState<FloorEvent>(() => {
    return initialOverride || INITIAL_SEED_EVENTS[floorNumber];
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isConnected, setIsConnected] = useState<boolean>(true);

  // Store last known good event in ref to prevent ever showing empty screen
  const lastKnownEventRef = useRef<FloorEvent>(event);

  useEffect(() => {
    if (initialOverride) {
      setEvent(initialOverride);
      lastKnownEventRef.current = initialOverride;
      return;
    }

    let isMounted = true;

    // 1. Initial Database Fetch
    const loadInitial = async () => {
      try {
        const fetched = await fetchFloorEvent(floorNumber);
        if (isMounted && fetched) {
          setEvent(fetched);
          lastKnownEventRef.current = fetched;
          setLastUpdated(new Date(fetched.updated_at));
          setLoading(false);
          setIsConnected(true);
        }
      } catch (err) {
        console.warn(`[useFloorEvent] Initial fetch failed for floor ${floorNumber}:`, err);
        if (isMounted) {
          // Keep showing last known event
          setEvent(lastKnownEventRef.current);
          setLoading(false);
        }
      }
    };

    loadInitial();

    // 2. Realtime Subscription
    const unsubscribe = subscribeToFloorEvent(floorNumber, (newEvent) => {
      if (isMounted && newEvent && newEvent.floor_number === floorNumber) {
        // Direct React state update - zero page reload!
        setEvent(newEvent);
        lastKnownEventRef.current = newEvent;
        setLastUpdated(new Date(newEvent.updated_at || Date.now()));
        setIsConnected(true);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [floorNumber, initialOverride]);

  return {
    event,
    loading,
    lastUpdated,
    isConnected
  };
}
