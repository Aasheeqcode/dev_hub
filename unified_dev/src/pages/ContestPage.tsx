import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirect after success
import { Trophy, Code2, Brain, Calendar, Upload, Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { API_BASE_URL } from '../config';

// --- TYPES ---
interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}

export default function ContestPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // --- FORM STATE ---
  const [contestType, setContestType] = useState<'coding' | 'hackathon' | 'quiz' | 'event'>('coding');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [resourceLink, setResourceLink] = useState(''); // For Hackathon
  
  // --- QUIZ STATE ---
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: '', options: ['', '', '', ''], correctIndex: 0 }
  ]);

  // --- HANDLERS ---
  
  const addQuestion = () => {
    setQuestions([
      ...questions, 
      { id: Date.now(), text: '', options: ['', '', '', ''], correctIndex: 0 }
    ]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestionText = (id: number, text: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, text } : q));
  };

  const updateOption = (qId: number, optIndex: number, val: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOpts = [...q.options];
        newOpts[optIndex] = val;
        return { ...q, options: newOpts };
      }
      return q;
    }));
  };

  const updateCorrectIndex = (qId: number, index: number) => {
    setQuestions(questions.map(q => q.id === qId ? { ...q, correctIndex: index } : q));
  };

  // --- API CALL ---
  const handlePublish = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You must be logged in to create a contest.");
        setLoading(false);
        return;
      }

      const payload = {
        title,
        description,
        type: contestType,
        startDate,
        endDate,
        // Only include special fields if relevant
        resourceLink: contestType === 'hackathon' ? resourceLink : undefined,
        questions: contestType === 'quiz' ? questions.map(q => ({
          questionText: q.text,
          options: q.options,
          correctOptionIndex: q.correctIndex
        })) : undefined
      };

      const res = await fetch(`${API_BASE_URL}/api/contests/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Contest Published Successfully!");
        navigate('/home'); // Redirect to home or contest list
      } else {
        alert(data.message || "Failed to create contest");
      }
    } catch (error) {
      console.error(error);
      alert("Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-slate-950 text-white font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Contest</h1>
            <p className="text-gray-400">Host coding challenges, hackathons, or quizzes.</p>
          </div>
          <div className="flex space-x-3">
            <NeonButton variant="secondary" onClick={() => navigate('/home')}>Cancel</NeonButton>
            <NeonButton onClick={handlePublish} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Contest"}
            </NeonButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Type Selection */}
          <div className="space-y-4">
            <GlassCard className="p-2">
              <div className="space-y-1">
                {[
                  { id: 'coding', label: 'Coding Contest', icon: <Code2 className="w-4 h-4" /> },
                  { id: 'hackathon', label: 'Hackathon', icon: <Trophy className="w-4 h-4" /> },
                  { id: 'quiz', label: 'Quiz Challenge', icon: <Brain className="w-4 h-4" /> },
                  { id: 'event', label: 'Online Event', icon: <Calendar className="w-4 h-4" /> }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setContestType(type.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      contestType === type.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {type.icon}
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 bg-gradient-to-br from-purple-900/20 to-transparent border-purple-500/20">
              <h3 className="text-white font-bold mb-2">Pro Tip</h3>
              <p className="text-sm text-gray-300">
                {contestType === 'quiz' 
                  ? "Quizzes with 10+ questions have higher engagement rates." 
                  : "Hackathons with clear problem statements get 3x more participation."}
              </p>
            </GlassCard>
          </div>

          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Basic Details */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">Basic Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Contest Title</label>
                  <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" 
                    placeholder="e.g. Summer Code Jam 2024" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4} 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" 
                    placeholder="Describe the contest rules and objectives..." 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
                    <input 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      type="datetime-local" 
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
                    <input 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      type="datetime-local" 
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" 
                    />
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* 2. Hackathon Specifics */}
            {contestType === 'hackathon' && (
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">Hackathon Resources</h2>
                <div className="space-y-4">
                   <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Problem Statement Link (URL)</label>
                    <input 
                      value={resourceLink}
                      onChange={(e) => setResourceLink(e.target.value)}
                      type="url" 
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none" 
                      placeholder="https://github.com/my-org/problem-statement" 
                    />
                  </div>
                  
                  <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-white font-medium">Or Upload PDF (Coming Soon)</p>
                    <p className="text-sm text-gray-500 mt-1">PDF, DOCX, or MD files</p>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* 3. Quiz Specifics (Dynamic) */}
            {contestType === 'quiz' && (
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Questions</h2>
                  <button 
                    onClick={addQuestion}
                    className="flex items-center gap-2 text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add Question
                  </button>
                </div>

                <div className="space-y-6">
                  {questions.map((q, index) => (
                    <div key={q.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 relative group">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-white font-medium">Question {index + 1}</h4>
                        <button 
                          onClick={() => removeQuestion(q.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Question Text */}
                      <input 
                        value={q.text}
                        onChange={(e) => updateQuestionText(q.id, e.target.value)}
                        type="text" 
                        placeholder="Enter question text..." 
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-white mb-3 focus:border-cyan-500 focus:outline-none" 
                      />
                      
                      {/* Options */}
                      <div className="space-y-2 pl-2 border-l-2 border-slate-800">
                        {q.options.map((opt, optIndex) => (
                          <div key={optIndex} className="flex items-center space-x-3">
                            <input 
                              type="radio" 
                              name={`q-${q.id}`} 
                              checked={q.correctIndex === optIndex}
                              onChange={() => updateCorrectIndex(q.id, optIndex)}
                              className="accent-cyan-500 h-4 w-4" 
                            />
                            <input 
                              type="text" 
                              value={opt}
                              onChange={(e) => updateOption(q.id, optIndex, e.target.value)}
                              placeholder={`Option ${String.fromCharCode(65 + optIndex)}`} 
                              className="flex-1 bg-transparent border-b border-slate-800 py-1 text-sm text-gray-300 focus:border-cyan-500 focus:outline-none transition-colors" 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}