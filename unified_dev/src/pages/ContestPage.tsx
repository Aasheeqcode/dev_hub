import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code2, Brain, Calendar, Upload, Plus, Trash2, Save } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
export function ContestPage() {
  const [contestType, setContestType] = useState<'coding' | 'hackathon' | 'quiz' | 'event'>('coding');
  return <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Contest
            </h1>
            <p className="text-gray-400">
              Host coding challenges, hackathons, or quizzes for the community.
            </p>
          </div>
          <div className="flex space-x-3">
            <NeonButton variant="secondary">Save Draft</NeonButton>
            <NeonButton>Publish Contest</NeonButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Type Selection */}
          <div className="space-y-4">
            <GlassCard className="p-2">
              <div className="space-y-1">
                {[{
                id: 'coding',
                label: 'Coding Contest',
                icon: <Code2 className="w-4 h-4" />
              }, {
                id: 'hackathon',
                label: 'Hackathon',
                icon: <Trophy className="w-4 h-4" />
              }, {
                id: 'quiz',
                label: 'Quiz Challenge',
                icon: <Brain className="w-4 h-4" />
              }, {
                id: 'event',
                label: 'Online Event',
                icon: <Calendar className="w-4 h-4" />
              }].map(type => <button key={type.id} onClick={() => setContestType(type.id as any)} className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                      ${contestType === type.id ? 'bg-gradient-to-r from-neon-violet to-neon-blue text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                    `}>
                    {type.icon}
                    <span>{type.label}</span>
                  </button>)}
              </div>
            </GlassCard>

            <GlassCard className="p-6 bg-gradient-to-br from-neon-violet/10 to-transparent border-neon-violet/20">
              <h3 className="text-white font-bold mb-2">Pro Tip</h3>
              <p className="text-sm text-gray-300">
                Hackathons with clear problem statements and starter code
                repositories get 3x more participation.
              </p>
            </GlassCard>
          </div>

          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Basic Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Contest Title
                  </label>
                  <input type="text" className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-neon-blue/50 focus:outline-none" placeholder="e.g. Summer Code Jam 2024" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea rows={4} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-neon-blue/50 focus:outline-none" placeholder="Describe the contest rules and objectives..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Start Date
                    </label>
                    <input type="datetime-local" className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-neon-blue/50 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      End Date
                    </label>
                    <input type="datetime-local" className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-neon-blue/50 focus:outline-none" />
                  </div>
                </div>
              </div>
            </GlassCard>

            {contestType === 'hackathon' && <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Hackathon Resources
                </h2>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-neon-blue/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-white font-medium">
                      Upload Problem Statement
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PDF, DOCX, or MD files allowed
                    </p>
                  </div>
                </div>
              </GlassCard>}

            {contestType === 'quiz' && <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Questions</h2>
                  <NeonButton size="sm" icon={<Plus className="w-4 h-4" />}>
                    Add Question
                  </NeonButton>
                </div>

                <div className="space-y-4">
                  {[1, 2].map(i => <div key={i} className="bg-navy-900/50 rounded-lg p-4 border border-white/5">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-white font-medium">Question {i}</h4>
                        <button className="text-gray-500 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input type="text" placeholder="Enter question text..." className="w-full bg-navy-800 border border-white/10 rounded px-3 py-2 text-sm text-white mb-3" />
                      <div className="space-y-2">
                        {['Option A', 'Option B', 'Option C', 'Option D'].map(opt => <div key={opt} className="flex items-center space-x-3">
                              <input type="radio" name={`q${i}`} className="text-neon-violet focus:ring-neon-violet bg-navy-900 border-white/20" />
                              <input type="text" placeholder={opt} className="flex-1 bg-transparent border-b border-white/10 py-1 text-sm text-gray-300 focus:border-neon-blue focus:outline-none" />
                            </div>)}
                      </div>
                    </div>)}
                </div>
              </GlassCard>}
          </div>
        </div>
      </div>
    </div>;
}