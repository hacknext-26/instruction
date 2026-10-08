export type FloorNumber = 1 | 2 | 3;

export interface FloorEvent {
  id: string;
  floor_number: FloorNumber;
  event_title: string;
  event_description: string;
  updated_at: string;
}

export interface FloorStatus {
  floorNumber: FloorNumber;
  isLive: boolean;
  lastUpdated: string | null;
}
