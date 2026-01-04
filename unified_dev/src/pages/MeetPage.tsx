import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, Users, PhoneOff, Settings, PenTool, Languages, Copy, Plus, Check, ArrowRight, Calendar, Clock, Link as LinkIcon, X } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
type MeetingMode = 'home' | 'create' | 'join' | 'meeting';
export function MeetPage() {
  const [mode, setMode] = useState<MeetingMode>('home');
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingCode, setMeetingCode] = useState('');
  const [generatedMeetingId, setGeneratedMeetingId] = useState('');
  const [copied, setCopied] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  // Generate random meeting ID
  const generateMeetingId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };
  const handleCreateMeeting = () => {
    const id = generateMeetingId();
    setGeneratedMeetingId(id);
    setMode('create');
  };
  const handleCopyLink = () => {
    const link = `https://devhub.meet/${generatedMeetingId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleStartMeeting = () => {
    setMode('meeting');
  };
  const handleJoinMeeting = () => {
    if (joinCode.length >= 6) {
      setIsJoining(true);
      // Simulate joining delay
      setTimeout(() => {
        setIsJoining(false);
        setMode('meeting');
      }, 1500);
    }
  };
  const handleLeaveMeeting = () => {
    setMode('home');
    setMeetingTitle('');
    setJoinCode('');
    setGeneratedMeetingId('');
  };
  // Home View
  if (mode === 'home') {
    return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Premium Video Meetings for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-blue">
                Developers
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Collaborate with your team using high-quality video, screen
              sharing, and real-time code whiteboard.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Create Meeting Card */}
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.1
          }}>
              <GlassCard className="p-8 h-full" hoverEffect>
                <div className="flex flex-col h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center mb-4">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Create Meeting
                  </h3>
                  <p className="text-gray-400 mb-6 flex-1">
                    Start an instant meeting or schedule one for later. Share
                    the link with your team.
                  </p>
                  <NeonButton onClick={handleCreateMeeting} className="w-full" icon={<Plus className="w-5 h-5" />}>
                    New Meeting
                  </NeonButton>
                </div>
              </GlassCard>
            </motion.div>

            {/* Join Meeting Card */}
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.2
          }}>
              <GlassCard className="p-8 h-full" hoverEffect>
                <div className="flex flex-col h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center mb-4">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Join Meeting
                  </h3>
                  <p className="text-gray-400 mb-6 flex-1">
                    Enter a meeting code to join an existing session.
                  </p>
                  <NeonButton onClick={() => setMode('join')} variant="secondary" className="w-full" icon={<ArrowRight className="w-5 h-5" />}>
                    Join with Code
                  </NeonButton>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>;
  }
  // Create Meeting View
  if (mode === 'create') {
    return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="max-w-2xl w-full">
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Create Meeting</h2>
              <button onClick={() => setMode('home')} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Meeting Title */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Meeting Title (Optional)
                </label>
                <input type="text" value={meetingTitle} onChange={e => setMeetingTitle(e.target.value)} placeholder="e.g., Team Standup, Code Review..." className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 transition-all" />
              </div>

              {/* Generated Meeting ID */}
              <div className="bg-navy-900/50 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Meeting ID</p>
                    <p className="text-2xl font-mono font-bold text-white tracking-wider">
                      {generatedMeetingId}
                    </p>
                  </div>
                  <button onClick={handleCopyLink} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all group">
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <LinkIcon className="w-4 h-4" />
                  <span className="font-mono">
                    https://devhub.meet/{generatedMeetingId}
                  </span>
                </div>
              </div>

              {/* Meeting Settings */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-400">
                  Join Settings
                </p>
                <div className="flex items-center justify-between p-4 bg-navy-900/50 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Mic className="w-5 h-5 text-neon-blue" />
                    <span className="text-white">Microphone</span>
                  </div>
                  <button onClick={() => setMicOn(!micOn)} className={`relative w-12 h-6 rounded-full transition-colors ${micOn ? 'bg-neon-blue' : 'bg-white/10'}`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${micOn ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-navy-900/50 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Video className="w-5 h-5 text-neon-violet" />
                    <span className="text-white">Camera</span>
                  </div>
                  <button onClick={() => setCameraOn(!cameraOn)} className={`relative w-12 h-6 rounded-full transition-colors ${cameraOn ? 'bg-neon-violet' : 'bg-white/10'}`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${cameraOn ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <NeonButton onClick={handleStartMeeting} className="flex-1" icon={<Video className="w-5 h-5" />}>
                  Start Meeting Now
                </NeonButton>
                <NeonButton variant="secondary" onClick={() => setMode('home')} className="px-6">
                  Cancel
                </NeonButton>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>;
  }
  // Join Meeting View
  if (mode === 'join') {
    return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="max-w-2xl w-full">
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Join Meeting</h2>
              <button onClick={() => setMode('home')} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Meeting Code Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Meeting Code
                </label>
                <input type="text" value={joinCode} onChange={e => setJoinCode(e.target.value.toLowerCase())} placeholder="Enter 10-digit meeting code" className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-4 text-white text-center text-2xl font-mono tracking-widest placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 transition-all" maxLength={10} />
                {joinCode.length > 0 && joinCode.length < 6 && <p className="text-sm text-red-400 mt-2">
                    Code must be at least 6 characters
                  </p>}
              </div>

              {/* Join Settings */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-400">
                  Join Settings
                </p>
                <div className="flex items-center justify-between p-4 bg-navy-900/50 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Mic className="w-5 h-5 text-neon-blue" />
                    <span className="text-white">Microphone</span>
                  </div>
                  <button onClick={() => setMicOn(!micOn)} className={`relative w-12 h-6 rounded-full transition-colors ${micOn ? 'bg-neon-blue' : 'bg-white/10'}`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${micOn ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-navy-900/50 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Video className="w-5 h-5 text-neon-violet" />
                    <span className="text-white">Camera</span>
                  </div>
                  <button onClick={() => setCameraOn(!cameraOn)} className={`relative w-12 h-6 rounded-full transition-colors ${cameraOn ? 'bg-neon-violet' : 'bg-white/10'}`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${cameraOn ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <NeonButton onClick={handleJoinMeeting} className="flex-1" disabled={joinCode.length < 6 || isJoining} isLoading={isJoining} icon={!isJoining ? <ArrowRight className="w-5 h-5" /> : undefined}>
                  {isJoining ? 'Joining...' : 'Join Meeting'}
                </NeonButton>
                <NeonButton variant="secondary" onClick={() => setMode('home')} className="px-6" disabled={isJoining}>
                  Cancel
                </NeonButton>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>;
  }
  // Meeting View
  return <div className="h-[calc(100vh-64px)] flex flex-col bg-navy-900">
      {/* Main Video Grid */}
      <div className="flex-1 p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
        {/* Active Speaker (Larger) */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="col-span-2 row-span-2 relative rounded-xl overflow-hidden border-2 border-neon-blue shadow-neon-blue">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Active Speaker" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-white text-sm font-medium flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Alex Coder (You)</span>
          </div>
        </motion.div>

        {/* Other Participants */}
        {[1, 2, 3, 4, 5].map(i => <motion.div key={i} initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: i * 0.1
      }} className="relative rounded-xl overflow-hidden border border-white/5 bg-navy-800">
            <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80`} alt="Participant" className="w-full h-full object-cover opacity-80" />
            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-white text-xs">
              Participant {i}
            </div>
            <div className="absolute top-3 right-3 bg-black/50 p-1 rounded-full">
              <MicOff className="w-3 h-3 text-red-500" />
            </div>
          </motion.div>)}
      </div>

      {/* Control Bar */}
      <div className="h-20 bg-navy-800/80 backdrop-blur-xl border-t border-white/5 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-white font-medium">
          <span>12:45 PM</span>
          <span className="text-gray-500">|</span>
          <span>{meetingTitle || 'Meeting'}</span>
          {generatedMeetingId && <>
              <span className="text-gray-500">|</span>
              <span className="font-mono text-sm text-gray-400">
                {generatedMeetingId}
              </span>
            </>}
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={() => setMicOn(!micOn)} className={`p-3 rounded-full transition-all ${micOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500/20 text-red-500 border border-red-500/50'}`}>
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          <button onClick={() => setCameraOn(!cameraOn)} className={`p-3 rounded-full transition-all ${cameraOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500/20 text-red-500 border border-red-500/50'}`}>
            {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>
          <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
            <Monitor className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
            <PenTool className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
            <Languages className="w-5 h-5" />
          </button>
          <button onClick={handleLeaveMeeting} className="px-6 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition-colors ml-4">
            Leave
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-all relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-neon-blue rounded-full"></span>
          </button>
          <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-all">
            <Users className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>;
}