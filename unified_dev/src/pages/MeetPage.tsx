import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, 
  Users, Settings, PenTool, Copy, Plus, ArrowRight, Link as LinkIcon 
} from 'lucide-react';

import { API_BASE_URL } from '../config';
// Stream Imports
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

// --- CONFIGURATION ---
const API_KEY = "g8yr2x3wgybz"; // Replace with your actual key

// --- HELPER: Get User Safe ---
const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    
    const parsed = JSON.parse(userStr);
    
    // CRITICAL: Handle both 'id' (Stream) and '_id' (MongoDB)
    const validId = parsed.id || parsed._id; 

    if (!validId) return null;

    return {
      id: validId.toString(),
      name: parsed.name || "Unknown",
      image: parsed.image || `https://getstream.io/random_png/?id=${validId}&name=${parsed.name}`,
    };
  } catch (err) {
    console.error("Error reading user from storage", err);
    return null;
  }
};

type MeetingMode = 'home' | 'create' | 'join' | 'meeting';

export default function MeetPage() {
  const [mode, setMode] = useState<MeetingMode>('home');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [generatedMeetingId, setGeneratedMeetingId] = useState('');
  const [copied, setCopied] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  
  // Stream State
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
  
  // Settings
  const [initialMicOn, setInitialMicOn] = useState(true);
  const [initialCamOn, setInitialCamOn] = useState(true);

  // --- LOGIC: Initialize Call ---
  const initializeCall = async (callId: string) => {
    const storedUser = getUserFromStorage();
    
    if (!storedUser) {
      alert("User not found. Please Log In.");
      return; 
    }

    setIsJoining(true);

    try {
      // 1. Setup Client
      const newClient = new StreamVideoClient({ apiKey: API_KEY });

      // 2. Token Provider (Fetches from your Backend)
      const tokenProvider = async () => {
        const response = await fetch(`${API_BASE_URL}/api/auth/stream-token`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        
        if (!response.ok) throw new Error("Failed to get token");
        
        const data = await response.json();
        return data.token;
      };

      // 3. Connect User
      await newClient.connectUser(storedUser, tokenProvider);

      // 4. Create/Join Call
      const newCall = newClient.call("default", callId);
      await newCall.join({ create: true });

      // 5. Apply Initial Settings
      if (!initialMicOn) await newCall.microphone.disable();
      if (!initialCamOn) await newCall.camera.disable();

      setClient(newClient);
      setCall(newCall);
      setMode('meeting');

    } catch (error) {
      console.error("Failed to join meeting", error);
      alert(`Connection Failed: ${(error as Error).message}`);
    } finally {
      setIsJoining(false);
    }
  };

  // --- HANDLERS ---
  const generateMeetingId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
    return id;
  };

  const handleCreateSetup = () => {
    const id = generateMeetingId();
    setGeneratedMeetingId(id);
    setMode('create');
  };

  const handleStartMeeting = () => {
    initializeCall(generatedMeetingId);
  };

  const handleJoinMeeting = () => {
    if (joinCode.length >= 1) {
      initializeCall(joinCode);
    }
  };

  const handleLeaveMeeting = async () => {
    if (call) await call.leave();
    if (client) await client.disconnectUser();
    setCall(null);
    setClient(null);
    setMode('home');
    setMeetingTitle('');
    setJoinCode('');
    setGeneratedMeetingId('');
  };

  const handleCopyLink = () => {
    const link = `https://devhub.meet/${generatedMeetingId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  // --- VIEW: MEETING ROOM (Active Call) ---
  if (mode === 'meeting' && client && call) {
    return (
      <StreamVideo client={client}>
        <StreamCall call={call}>
           <CustomMeetingRoom 
              meetingTitle={meetingTitle}
              meetingId={generatedMeetingId || joinCode}
              onLeave={handleLeaveMeeting}
           />
        </StreamCall>
      </StreamVideo>
    );
  }

  // --- VIEW: LOADING SCREEN ---
  if (isJoining) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
         <div className="text-cyan-400 text-xl font-mono animate-pulse">Connecting to Secure Channel...</div>
      </div>
    );
  }

  // --- VIEW: HOME / CREATE / JOIN ---
  return (
    <div className="min-h-[calc(100vh-64px)] p-6 bg-slate-950 text-white font-sans">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center h-full">
        
        {/* Left Side: Hero Text */}
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Secure HD Video Conferencing</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
            Connect with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              DevHub Meet
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-lg">
            Crystal clear video, immersive collaboration tools, and secure channels built for developers.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleCreateSetup}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Meeting
            </button>
            
            <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
              <div className="pl-4">
                <LinkIcon className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Enter code to join"
                className="bg-transparent border-none focus:ring-0 text-white w-40 placeholder:text-slate-600"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
              />
              <button 
                onClick={handleJoinMeeting}
                disabled={!joinCode}
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-cyan-400 transition-colors disabled:opacity-50"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Cards */}
        <div className="relative h-[600px] hidden lg:flex items-center justify-center">
          
          {/* Background Blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px]" />

          <AnimatePresence mode="wait">
            {mode === 'home' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 w-full max-w-md"
              >
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 mb-6 flex items-center justify-center border border-white/5">
                    <div className="flex gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-12 h-12 rounded-full bg-slate-700/50 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-800 rounded w-3/4" />
                    <div className="h-4 bg-slate-800 rounded w-1/2" />
                  </div>
                </div>
              </motion.div>
            )}

            {mode === 'create' && (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="relative z-10 w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-bold mb-6">Meeting Ready</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Meeting ID</label>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-slate-950 p-4 rounded-xl font-mono text-cyan-400 border border-slate-800">
                        {generatedMeetingId}
                      </div>
                      <button 
                        onClick={handleCopyLink}
                        className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-white"
                      >
                        {copied ? <CheckIcon /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Meeting Title (Optional)</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                      placeholder="e.g. Daily Standup"
                      value={meetingTitle}
                      onChange={(e) => setMeetingTitle(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                     <button 
                       onClick={() => setInitialMicOn(!initialMicOn)}
                       className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-2 border transition-all ${initialMicOn ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                     >
                        {initialMicOn ? <Mic className="w-5 h-5"/> : <MicOff className="w-5 h-5"/>}
                        {initialMicOn ? "Mic On" : "Mic Off"}
                     </button>
                     <button 
                       onClick={() => setInitialCamOn(!initialCamOn)}
                       className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-2 border transition-all ${initialCamOn ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                     >
                        {initialCamOn ? <Video className="w-5 h-5"/> : <VideoOff className="w-5 h-5"/>}
                        {initialCamOn ? "Cam On" : "Cam Off"}
                     </button>
                  </div>

                  <button 
                    onClick={handleStartMeeting}
                    className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                  >
                    Join Now
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: Custom Meeting Room UI ---
const CustomMeetingRoom = ({ meetingTitle, meetingId, onLeave }: { meetingTitle: string, meetingId: string, onLeave: () => void }) => {
  const call = useCall();
  const { useMicrophoneState, useCameraState, useParticipantCount } = useCallStateHooks();
  
  const { isEnabled: isMicEnabled } = useMicrophoneState();
  const { isEnabled: isCamEnabled } = useCameraState();
  const participantCount = useParticipantCount();

  const toggleMic = () => call?.microphone.toggle();
  const toggleCam = () => call?.camera.toggle();

  return (
    <div className="h-screen w-full flex flex-col bg-slate-950 text-white">
      
      {/* 1. Main Video Grid */}
      <div className="flex-1 w-full relative overflow-hidden">
         <StreamTheme>
            {/* Stream's SpeakerLayout handles the complex grid logic */}
            <SpeakerLayout participantsBarPosition="bottom" />
         </StreamTheme>
      </div>

      {/* 2. Custom Control Bar */}
      <div className="h-20 bg-slate-900/90 backdrop-blur-md border-t border-white/5 px-6 flex items-center justify-between z-50">
        
        {/* Left: Meeting Info */}
        <div className="flex items-center space-x-4 text-white font-medium hidden md:flex">
          <span className="text-slate-400 font-mono text-sm">{meetingId}</span>
          <span className="text-slate-600">|</span>
          <span>{meetingTitle || 'Untitled Meeting'}</span>
        </div>

        {/* Center: Controls */}
        <div className="flex items-center gap-4">
          <ControlButton 
             isActive={isMicEnabled} 
             onClick={toggleMic} 
             onIcon={<Mic className="w-5 h-5" />} 
             offIcon={<MicOff className="w-5 h-5" />}
             dangerOff
          />
          
          <ControlButton 
             isActive={isCamEnabled} 
             onClick={toggleCam} 
             onIcon={<Video className="w-5 h-5" />} 
             offIcon={<VideoOff className="w-5 h-5" />}
             dangerOff
          />

          <button onClick={() => call?.screenShare.toggle()} className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-all">
            <Monitor className="w-5 h-5" />
          </button>

          <button onClick={onLeave} className="px-8 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold transition-colors ml-4 shadow-lg shadow-red-500/20">
            Leave
          </button>
        </div>

        {/* Right: Info */}
        <div className="flex items-center space-x-3">
          <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span className="text-sm font-bold">{participantCount}</span>
          </button>
          
          <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all">
             <Settings className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

// Simple Helper Component for Buttons
const ControlButton = ({ isActive, onClick, onIcon, offIcon, dangerOff }: any) => (
  <button 
    onClick={onClick} 
    className={`p-4 rounded-full transition-all duration-200 ${
      isActive 
        ? 'bg-slate-800 hover:bg-slate-700 text-white' 
        : dangerOff 
          ? 'bg-red-500/20 text-red-500 border border-red-500/50' 
          : 'bg-slate-800 text-slate-500'
    }`}
  >
    {isActive ? onIcon : offIcon}
  </button>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);