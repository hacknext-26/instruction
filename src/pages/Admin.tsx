import React, { useState, useEffect } from 'react';
import { FloorNumber, FloorEvent } from '../types/event';
import { 
  fetchFloorEvent, 
  updateFloorEvent, 
  updateAllFloors, 
  isSupabaseConfigured,
  INITIAL_SEED_EVENTS 
} from '../lib/supabase';
import { ProjectorDisplay } from '../components/ProjectorDisplay';
import { 
  Send, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  Eye,
  Sliders
} from 'lucide-react';

export const Admin: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<FloorNumber>(1);
  const [previewFloor, setPreviewFloor] = useState<FloorNumber>(1);

  // Form draft state for each floor
  const [formData, setFormData] = useState<Record<FloorNumber, { title: string; description: string; id: string }>>({
    1: { title: INITIAL_SEED_EVENTS[1].event_title, description: INITIAL_SEED_EVENTS[1].event_description, id: INITIAL_SEED_EVENTS[1].id },
    2: { title: INITIAL_SEED_EVENTS[2].event_title, description: INITIAL_SEED_EVENTS[2].event_description, id: INITIAL_SEED_EVENTS[2].id },
    3: { title: INITIAL_SEED_EVENTS[3].event_title, description: INITIAL_SEED_EVENTS[3].event_description, id: INITIAL_SEED_EVENTS[3].id },
  });

  // Track published state to indicate dirty changes
  const [publishedData, setPublishedData] = useState<Record<FloorNumber, { title: string; description: string }>>({
    1: { title: INITIAL_SEED_EVENTS[1].event_title, description: INITIAL_SEED_EVENTS[1].event_description },
    2: { title: INITIAL_SEED_EVENTS[2].event_title, description: INITIAL_SEED_EVENTS[2].event_description },
    3: { title: INITIAL_SEED_EVENTS[3].event_title, description: INITIAL_SEED_EVENTS[3].event_description },
  });

  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishStatus, setPublishStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Load existing records on mount
  useEffect(() => {
    const loadFloors = async () => {
      const floors: FloorNumber[] = [1, 2, 3];
      const initial: Record<FloorNumber, { title: string; description: string; id: string }> = { ...formData };
      const published: Record<FloorNumber, { title: string; description: string }> = { ...publishedData };

      for (const floor of floors) {
        try {
          const res = await fetchFloorEvent(floor);
          if (res) {
            initial[floor] = {
              title: res.event_title,
              description: res.event_description,
              id: res.id
            };
            published[floor] = {
              title: res.event_title,
              description: res.event_description
            };
          }
        } catch (e) {
          console.warn(`Could not fetch floor ${floor} data:`, e);
        }
      }

      setFormData(initial);
      setPublishedData(published);
    };

    loadFloors();
  }, []);

  // When changing editor floor, also sync preview floor unless operator toggled preview
  const handleSelectFloor = (floor: FloorNumber) => {
    setSelectedFloor(floor);
    setPreviewFloor(floor);
    setPublishStatus(null);
  };

  const handleInputChange = (field: 'title' | 'description', value: string) => {
    setFormData(prev => ({
      ...prev,
      [selectedFloor]: {
        ...prev[selectedFloor],
        [field]: value
      }
    }));
  };

  const handlePublishCurrentFloor = async () => {
    setIsPublishing(true);
    setPublishStatus(null);

    const current = formData[selectedFloor];
    const res = await updateFloorEvent(selectedFloor, current.title, current.description);

    setIsPublishing(false);
    if (res.success) {
      setPublishedData(prev => ({
        ...prev,
        [selectedFloor]: {
          title: current.title,
          description: current.description
        }
      }));
      setPublishStatus({
        type: 'success',
        message: `Floor ${selectedFloor} published successfully! Projectors updated in real-time.`
      });
      setTimeout(() => setPublishStatus(null), 5000);
    } else {
      setPublishStatus({
        type: 'error',
        message: 'Unable to publish update. Please try again.'
      });
    }
  };

  const handlePublishAllFloorsWithCurrentEvent = async () => {
    setIsPublishing(true);
    setPublishStatus(null);

    const activeTitle = formData[selectedFloor].title;
    const activeDescription = formData[selectedFloor].description;

    // Apply the active event to all 3 floors at once
    const floorsToUpdate: Array<{ floorNumber: FloorNumber; title: string; description: string }> = [
      { floorNumber: 1, title: activeTitle, description: activeDescription },
      { floorNumber: 2, title: activeTitle, description: activeDescription },
      { floorNumber: 3, title: activeTitle, description: activeDescription },
    ];

    const res = await updateAllFloors(floorsToUpdate);

    setIsPublishing(false);
    if (res.success) {
      // Sync local form state and published state for all floors
      setFormData(prev => ({
        1: { ...prev[1], title: activeTitle, description: activeDescription },
        2: { ...prev[2], title: activeTitle, description: activeDescription },
        3: { ...prev[3], title: activeTitle, description: activeDescription },
      }));
      setPublishedData({
        1: { title: activeTitle, description: activeDescription },
        2: { title: activeTitle, description: activeDescription },
        3: { title: activeTitle, description: activeDescription },
      });
      setPublishStatus({
        type: 'success',
        message: 'All 3 venue floors updated to this event with 1 click!'
      });
      setTimeout(() => setPublishStatus(null), 5000);
    } else {
      setPublishStatus({
        type: 'error',
        message: 'Unable to publish update to all floors. Please try again.'
      });
    }
  };

  // Live preview override based on current draft for previewFloor
  const previewDraftEvent: FloorEvent = {
    id: formData[previewFloor]?.id || 'preview-id',
    floor_number: previewFloor,
    event_title: formData[previewFloor]?.title || '',
    event_description: formData[previewFloor]?.description || '',
    updated_at: new Date().toISOString()
  };

  const isCurrentDirty = 
    formData[selectedFloor].title !== publishedData[selectedFloor].title ||
    formData[selectedFloor].description !== publishedData[selectedFloor].description;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans select-auto">
      {/* Top Admin Navigation Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-xs sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
                  HACKNEXT'26 CONTROLLER
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] font-bold border border-slate-200">
                  ADMIN 98427
                </span>
              </div>
              <p className="text-xs text-slate-500">
                SNS College of Technology · Live Projector Broadcast System
              </p>
            </div>
          </div>

          {/* Quick links & Status badge */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              isSupabaseConfigured 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{isSupabaseConfigured ? 'Supabase Realtime Connected' : 'Local Broadcast Channel Active'}</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Obscure Route Mode</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Responsive Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Controls & Editor */}
        <div className="w-full lg:w-[480px] shrink-0 flex flex-col gap-6">
          
          {/* Floor Selection Tabs with ● LIVE Indicators */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Venue Floor Channels
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {([1, 2, 3] as FloorNumber[]).map((floor) => {
                const isSelected = selectedFloor === floor;
                return (
                  <button
                    key={floor}
                    onClick={() => handleSelectFloor(floor)}
                    className={`relative p-3.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 shadow-sm text-blue-700 font-extrabold ring-2 ring-blue-500/20'
                        : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100 font-bold'
                    }`}
                  >
                    <span className="text-sm font-display">FLOOR {floor}</span>
                    <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-emerald-600 font-semibold font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>LIVE</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editor Form */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <h2 className="text-base font-bold text-slate-900 font-display uppercase">
                  Edit Floor {selectedFloor} Event
                </h2>
              </div>
              {isCurrentDirty && (
                <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Unpublished Edits
                </span>
              )}
            </div>

            {/* Event Title Input - Two-Line Typing */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="event_title_input"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5"
                >
                  <span>Event Title</span>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">2-Line Typing</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {formData[selectedFloor].title.length}/100 chars
                </span>
              </div>
              <textarea
                id="event_title_input"
                rows={2}
                value={formData[selectedFloor].title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., PROBLEM STATEMENT&#10;REVEAL"
                className={`w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 text-slate-900 font-bold ${
                  formData[selectedFloor].title.length <= 25 
                    ? 'text-lg' 
                    : formData[selectedFloor].title.length <= 50 
                    ? 'text-base' 
                    : 'text-sm'
                } transition-all outline-none resize-none leading-snug`}
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Type across two lines. Font size scales down automatically as characters increase.
              </p>
            </div>

            {/* Event Description Input - Three-Line Typing */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="event_desc_input"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5"
                >
                  <span>Description</span>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">3-Line Typing</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {formData[selectedFloor].description.length}/180 chars
                </span>
              </div>
              <textarea
                id="event_desc_input"
                rows={3}
                value={formData[selectedFloor].description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="e.g., Problem statements are now available for all participating teams.&#10;Please check the official portal link for instructions."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 text-slate-800 font-medium text-sm transition-all outline-none resize-none leading-relaxed"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Supports up to three clean lines for event instructions.
              </p>
            </div>

            {/* Status Feedback Toast */}
            {publishStatus && (
              <div className={`p-3.5 rounded-xl flex items-center gap-2.5 text-xs font-semibold ${
                publishStatus.type === 'success' 
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}>
                {publishStatus.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{publishStatus.message}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handlePublishCurrentFloor}
                disabled={isPublishing}
                className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm tracking-wide uppercase shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                {isPublishing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>PUBLISH ONLY FLOOR {selectedFloor}</span>
              </button>

              <button
                onClick={handlePublishAllFloorsWithCurrentEvent}
                disabled={isPublishing}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-black text-sm tracking-wide uppercase shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                {isPublishing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Layers className="w-4 h-4" />
                )}
                <span>PUBLISH TO ALL FLOORS (1 CLICK)</span>
              </button>
            </div>
          </div>

          {/* Public Projector Direct Links (Operator Quick Access) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Venue Screen URL Shortcuts (Open on Projector PCs)
            </h3>
            <div className="space-y-2">
              {([1, 2, 3] as FloorNumber[]).map((floor) => (
                <a
                  key={floor}
                  href={`/floor${floor}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-blue-600 font-bold">/floor{floor}</span>
                    <span className="text-slate-400">·</span>
                    <span>Floor {floor} Projector Screen</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Exact 16:9 Live Preview */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900 font-display uppercase">
                  Live Projector Display Preview (16:9)
                </h2>
              </div>

              {/* Preview Floor Switcher */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold">
                <span className="text-[11px] text-slate-500 px-2 uppercase">Preview:</span>
                {([1, 2, 3] as FloorNumber[]).map((floor) => (
                  <button
                    key={floor}
                    onClick={() => setPreviewFloor(floor)}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      previewFloor === floor
                        ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    F{floor}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-2 mb-4">
              Real-time mirror of the public display. Updates instantaneously as you type before clicking Publish.
            </p>

            {/* 16:9 Aspect Ratio Display Container */}
            <div className="w-full bg-slate-900/5 rounded-2xl p-2 border border-slate-200 shadow-inner flex items-center justify-center">
              <div className="w-full max-w-full">
                <ProjectorDisplay
                  floorNumber={previewFloor}
                  overrideEvent={previewDraftEvent}
                  isPreview={true}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Aspect Ratio: 16:9 (1920 × 1080 native scale)</span>
              <span>Zero-Scroll Guaranteed</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Admin;
