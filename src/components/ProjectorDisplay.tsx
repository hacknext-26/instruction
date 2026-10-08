import React from 'react';
import { FloorNumber, FloorEvent } from '../types/event';
import { useFloorEvent } from '../hooks/useFloorEvent';
import { useWakeLock } from '../hooks/useWakeLock';
import { AmbientBackground } from './AmbientBackground';
import { Header } from './Header';
import { PortalSection } from './PortalSection';
import { EventSection } from './EventSection';
import { MascotSection } from './MascotSection';
import { WifiSection } from './WifiSection';
import { FullscreenButton } from './FullscreenButton';

interface ProjectorDisplayProps {
  floorNumber: FloorNumber;
  overrideEvent?: FloorEvent;
  isPreview?: boolean;
}

export const ProjectorDisplay: React.FC<ProjectorDisplayProps> = ({
  floorNumber,
  overrideEvent,
  isPreview = false,
}) => {
  // Wake lock prevents projector screen from sleeping during the event
  useWakeLock();

  // Real-time event subscriber hook (or live override if inside admin preview)
  const { event, lastUpdated } = useFloorEvent(floorNumber, overrideEvent);

  const containerClasses = isPreview
    ? "relative w-full aspect-video bg-white overflow-hidden rounded-xl border border-slate-300 shadow-md flex flex-col justify-between select-none"
    : "projector-viewport bg-white flex flex-col justify-between select-none";

  return (
    <main 
      className={containerClasses}
      role="main"
      aria-label={`HackNext'26 Floor ${floorNumber} Live Projector Display`}
    >
      {/* Luminous Animated Background */}
      <AmbientBackground />

      {/* Fullscreen Button Prompt (hidden when isPreview is true) */}
      <FullscreenButton isPreview={isPreview} />

      {/* TOP: Fixed College Branding, Neon Glitch Logo Image & Centered Live Clock */}
      <Header floorNumber={floorNumber} />

      {/* MIDDLE: 3 Separate columns - |QR|Event|Mascot|
          QR and Mascot same width separated, center has maximum space */}
      <div className="relative z-10 flex-1 flex items-center justify-between px-8 xl:px-16 py-3 w-full max-w-[1920px] mx-auto overflow-hidden">
        
        {/* Left: Problem Statement QR Portal Box */}
        <div className="w-[280px] xl:w-[340px] shrink-0 flex flex-col items-center justify-center">
          <PortalSection />
        </div>

        {/* Center: Dominant Event Title & Description (has MORE space) */}
        <div className="flex-1 flex items-center justify-center h-full px-6 xl:px-12">
          <EventSection
            title={event.event_title}
            description={event.event_description}
            lastUpdated={lastUpdated}
          />
        </div>

        {/* Right: Coding Team Mascot (Same width as QR: 280px - 340px) */}
        <div className="w-[280px] xl:w-[340px] shrink-0 flex items-center justify-center">
          <MascotSection />
        </div>
      </div>

      {/* BOTTOM: Fixed Venue Wi-Fi Credentials */}
      <WifiSection />
    </main>
  );
};
