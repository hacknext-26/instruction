-- ============================================================
-- HACKNEXT'26 SERIES 2.0
-- Live Hackathon Projector Display System
-- Supabase PostgreSQL Schema & Realtime Setup
-- ============================================================

-- 1. Create table for floor events
CREATE TABLE IF NOT EXISTS public.floor_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    floor_number INTEGER UNIQUE NOT NULL CHECK (floor_number IN (1, 2, 3)),
    event_title TEXT NOT NULL,
    event_description TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Insert initial seed rows for all 3 venue floors
INSERT INTO public.floor_events (floor_number, event_title, event_description, updated_at)
VALUES 
    (1, 'Welcome to HackNext''26', 'Welcome participants to HackNext''26 Series 2.0.', NOW()),
    (2, 'Development Phase', 'Teams are building innovative solutions.', NOW()),
    (3, 'Mentoring Session', 'Mentors are available to guide participating teams.', NOW())
ON CONFLICT (floor_number) DO UPDATE 
SET 
    event_title = EXCLUDED.event_title,
    event_description = EXCLUDED.event_description,
    updated_at = NOW();

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.floor_events ENABLE ROW LEVEL SECURITY;

-- 4. Create policies for anonymous access
-- Policy: Allow anyone (projector displays & admin) to read events
DROP POLICY IF EXISTS "Public can view floor events" ON public.floor_events;
CREATE POLICY "Public can view floor events" 
ON public.floor_events 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- Policy: Allow the event admin (via obscure admin URL) to update floor events
DROP POLICY IF EXISTS "Admin can update floor events" ON public.floor_events;
CREATE POLICY "Admin can update floor events" 
ON public.floor_events 
FOR UPDATE 
TO anon, authenticated 
USING (true)
WITH CHECK (true);

-- Policy: Allow insert if needed
DROP POLICY IF EXISTS "Admin can insert floor events" ON public.floor_events;
CREATE POLICY "Admin can insert floor events" 
ON public.floor_events 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- 5. Enable Supabase Realtime publication for floor_events table
-- Note: Ensure "supabase_realtime" publication exists, then add the table.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND schemaname = 'public' 
        AND tablename = 'floor_events'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.floor_events;
    END IF;
END $$;

-- 6. Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_floor_events_updated_at ON public.floor_events;
CREATE TRIGGER trigger_floor_events_updated_at
BEFORE UPDATE ON public.floor_events
FOR EACH ROW
EXECUTE FUNCTION public.set_current_timestamp_updated_at();
