import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { FloorEvent, FloorNumber } from '../types/event';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('your-project-id')
);

// Fallback seed events matching requirements
export const INITIAL_SEED_EVENTS: Record<FloorNumber, FloorEvent> = {
  1: {
    id: '11111111-1111-1111-1111-111111111111',
    floor_number: 1,
    event_title: "Welcome to HackNext'26",
    event_description: "Welcome participants to HackNext'26 Series 2.0.",
    updated_at: new Date().toISOString()
  },
  2: {
    id: '22222222-2222-2222-2222-222222222222',
    floor_number: 2,
    event_title: "Development Phase",
    event_description: "Teams are building innovative solutions.",
    updated_at: new Date().toISOString()
  },
  3: {
    id: '33333333-3333-3333-3333-333333333333',
    floor_number: 3,
    event_title: "Mentoring Session",
    event_description: "Mentors are available to guide participating teams.",
    updated_at: new Date().toISOString()
  }
};

// Real Supabase client instance (if configured)
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : null;

// Local fallback store using BroadcastChannel & LocalStorage for dev / offline demo
const BROADCAST_CHANNEL_NAME = 'hacknext_floor_events_channel';
const STORAGE_PREFIX = 'hacknext_floor_event_';

function getFallbackEvent(floorNumber: FloorNumber): FloorEvent {
  try {
    const cached = localStorage.getItem(`${STORAGE_PREFIX}${floorNumber}`);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // ignore localStorage errors
  }
  return INITIAL_SEED_EVENTS[floorNumber];
}

function saveFallbackEvent(event: FloorEvent): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${event.floor_number}`, JSON.stringify(event));
  } catch {
    // ignore localStorage errors
  }
}

/**
 * Fetch the current event for a floor.
 */
export async function fetchFloorEvent(floorNumber: FloorNumber): Promise<FloorEvent> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('floor_events')
        .select('*')
        .eq('floor_number', floorNumber)
        .single();

      if (error) {
        console.warn(`[Supabase] Error fetching floor ${floorNumber}, falling back to cache:`, error.message);
        return getFallbackEvent(floorNumber);
      }

      if (data) {
        const event = data as FloorEvent;
        saveFallbackEvent(event);
        return event;
      }
    } catch (err) {
      console.warn(`[Supabase] Network exception fetching floor ${floorNumber}:`, err);
      return getFallbackEvent(floorNumber);
    }
  }

  return getFallbackEvent(floorNumber);
}

/**
 * Update event for a specific floor.
 */
export async function updateFloorEvent(
  floorNumber: FloorNumber, 
  title: string, 
  description: string
): Promise<{ success: boolean; data?: FloorEvent; error?: string }> {
  const updatedRecord: FloorEvent = {
    id: (getFallbackEvent(floorNumber).id) || crypto.randomUUID(),
    floor_number: floorNumber,
    event_title: title.trim(),
    event_description: description.trim(),
    updated_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('floor_events')
        .upsert(
          {
            floor_number: floorNumber,
            event_title: title.trim(),
            event_description: description.trim(),
            updated_at: updatedRecord.updated_at
          },
          { onConflict: 'floor_number' }
        )
        .select()
        .single();

      if (error) {
        console.error('[Supabase] Failed to update floor event:', error.message);
        return { success: false, error: error.message };
      }

      const saved = data as FloorEvent;
      saveFallbackEvent(saved);
      return { success: true, data: saved };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Network error';
      console.error('[Supabase] Exception publishing update:', errorMsg);
      return { success: false, error: errorMsg };
    }
  }

  // Fallback mode: save locally and broadcast via BroadcastChannel
  saveFallbackEvent(updatedRecord);
  try {
    const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    channel.postMessage({ type: 'UPDATE_FLOOR_EVENT', payload: updatedRecord });
    channel.close();
  } catch {
    // ignore
  }

  return { success: true, data: updatedRecord };
}

/**
 * Update all floors at once
 */
export async function updateAllFloors(
  events: Array<{ floorNumber: FloorNumber; title: string; description: string }>
): Promise<{ success: boolean; errors?: string[] }> {
  const errors: string[] = [];
  for (const item of events) {
    const res = await updateFloorEvent(item.floorNumber, item.title, item.description);
    if (!res.success && res.error) {
      errors.push(`Floor ${item.floorNumber}: ${res.error}`);
    }
  }
  return { success: errors.length === 0, errors };
}

/**
 * Subscribe to realtime updates for a specific floor.
 */
export function subscribeToFloorEvent(
  floorNumber: FloorNumber,
  onUpdate: (event: FloorEvent) => void
): () => void {
  // If Supabase is connected, subscribe via Supabase Realtime
  if (supabase) {
    const channel = supabase
      .channel(`floor_events_realtime_${floorNumber}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'floor_events',
          filter: `floor_number=eq.${floorNumber}`
        },
        (payload) => {
          if (payload.new && (payload.new as FloorEvent).floor_number === floorNumber) {
            const updated = payload.new as FloorEvent;
            saveFallbackEvent(updated);
            onUpdate(updated);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`[Supabase Realtime] Subscribed to floor ${floorNumber}`);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }

  // Fallback mode: BroadcastChannel & window storage events
  let bc: BroadcastChannel | null = null;
  try {
    bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    bc.onmessage = (msgEvent) => {
      if (
        msgEvent.data?.type === 'UPDATE_FLOOR_EVENT' &&
        msgEvent.data?.payload?.floor_number === floorNumber
      ) {
        onUpdate(msgEvent.data.payload as FloorEvent);
      }
    };
  } catch {
    // BroadcastChannel unsupported
  }

  const storageHandler = (e: StorageEvent) => {
    if (e.key === `${STORAGE_PREFIX}${floorNumber}` && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        onUpdate(parsed);
      } catch {
        // ignore
      }
    }
  };
  window.addEventListener('storage', storageHandler);

  return () => {
    if (bc) {
      bc.close();
    }
    window.removeEventListener('storage', storageHandler);
  };
}
