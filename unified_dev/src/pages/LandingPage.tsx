import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Layout, Users, Bookmark, Trophy, 
  MessageSquare, X, Type, Image as ImageIcon 
} from 'lucide-react';

import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { PostCard, PostProps } from '../components/PostCard';
import { Sidebar } from '../components/Sidebar';

// Define User Interface matching backend response
interface UserProfile {
  _id: string;
  name: string;
  email: string;
  picturePath?: string;
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
}

export function LandingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Create Post Form State
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postType, setPostType] = useState('general');
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isPosting, setIsPosting] = useState(false);

  // Helper to get token
  const getToken = () => localStorage.getItem('token');

  // Fetch Initial Data
  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) return navigate('/login');

      try {
        // 1. Get User Profile (Auth Check)
        const userRes = await fetch('http://localhost:5000/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!userRes.ok) throw new Error("Auth Failed");
        const userData = await userRes.json();
        setUser(userData);

        // 2. Get News Feed
        const postsRes = await fetch('http://localhost:5000/api/posts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const postsData = await postsRes.json();
        setPosts(postsData);

      } catch (err) {
        console.error(err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // Handle Post Creation
  const handleCreatePost = async () => {
    if (!title.trim() || !description.trim()) return;
    setIsPosting(true);
    
    try {
      const token = getToken();
      const payload = {
        title,
        description,
        postType,
        codeSnippet: showCodeEditor ? codeSnippet : "",
        language: showCodeEditor ? language : "text",
        // Most backends extract userId from token, but sending it just in case
        userId: user?._id 
      };

      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts([newPost, ...posts]);
        
        // Reset form
        setTitle('');
        setDescription('');
        setCodeSnippet('');
        setPostType('general');
        setIsExpanded(false);
        setShowCodeEditor(false);
      }
    } catch (err) {
      console.error("Post failed:", err);
    } finally {
      setIsPosting(false);
    }
  };

  const sidebarItems = [
    { name: 'My Feed', path: '/home', icon: <Layout className="w-4 h-4" /> },
    { name: 'My Profile', path: '/profile', icon: <Users className="w-4 h-4" /> },
    { name: 'Saved', path: '/saved', icon: <Bookmark className="w-4 h-4" /> },
    { name: 'Contests', path: '/contests', icon: <Trophy className="w-4 h-4" /> },
    { name: 'Forum', path: '/forum', icon: <MessageSquare className="w-4 h-4" /> }
  ];
  const postTypes = [
    { id: 'general', label: 'General', color: 'bg-gray-500/20 text-gray-300' },
    { id: 'question', label: 'Question', color: 'bg-orange-500/20 text-orange-300' },
    { id: 'showcase', label: 'Showcase', color: 'bg-purple-500/20 text-purple-300' },
    { id: 'discussion', label: 'Discussion', color: 'bg-blue-500/20 text-blue-300' },
  ];
  
  return (
    <div className="min-h-screen pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT SIDEBAR */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <GlassCard className="p-0 overflow-hidden relative">
              <div className="h-20 bg-gradient-to-r from-neon-violet/20 to-neon-blue/20"></div>
              <div className="px-6 pb-6 text-center -mt-10">
                {user ? (
                  <>
                    <div className="relative inline-block mb-3">
                      <div className="p-1 bg-navy-900 rounded-full">
                        <img 
                          src={user.picturePath || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                          alt={user.name} 
                          className="w-20 h-20 rounded-full object-cover border-2 border-white/10 bg-navy-800" 
                        />
                      </div>
                      <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-navy-900 rounded-full"></div>
                    </div>
                    <h2 className="font-bold text-white text-lg">{user.name}</h2>
                    <p className="text-xs text-neon-blue uppercase mb-4">{user.occupation || "Developer"}</p>
                    
                    <div className="border-t border-white/5 pt-4">
                      <Link to="/profile" className="text-xs text-gray-400 hover:text-white flex justify-center gap-2">
                          View Full Profile →
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="animate-pulse pt-2 space-y-3">
                    <div className="w-20 h-20 bg-white/10 rounded-full mx-auto"></div>
                    <div className="h-4 bg-white/10 rounded w-1/2 mx-auto"></div>
                  </div>
                )}
              </div>
            </GlassCard>
            <GlassCard className="p-2"><Sidebar items={sidebarItems} /></GlassCard>
          </div>

          {/* MAIN FEED */}
          <div className="lg:col-span-6 space-y-6">
            <GlassCard className="p-4 relative overflow-hidden">
               {/* Post Creator UI */}
               {!isExpanded ? (
                 <div onClick={() => setIsExpanded(true)} className="flex items-center gap-4 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
                       <Type className="text-gray-400 w-5 h-5" />
                    </div>
                    <div className="flex-1 bg-navy-900/50 hover:bg-navy-900/80 transition-colors border border-white/5 rounded-full px-4 py-2.5">
                      <span className="text-gray-400 text-sm">Start a discussion...</span>
                    </div>
                 </div>
               ) : (
                 <AnimatePresence>
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="font-bold text-white">Create Post</span>
                        <button onClick={() => setIsExpanded(false)}><X className="text-gray-400 w-5 h-5 hover:text-white"/></button>
                      </div>
                      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full bg-transparent border-b border-white/10 p-2 text-white outline-none font-bold" autoFocus />
                      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description..." className="w-full bg-navy-900/30 p-3 rounded text-white outline-none h-24 resize-none border border-white/10"/>
                      
                      <div className="flex gap-2">
                          {['general', 'question', 'showcase'].map(t => (
                            <button key={t} onClick={() => setPostType(t)} className={`text-xs px-3 py-1 rounded-full border ${postType === t ? 'border-neon-blue text-neon-blue bg-neon-blue/10' : 'border-gray-700 text-gray-400'}`}>{t}</button>
                          ))}
                      </div>

                      {showCodeEditor && (
                        <div className="bg-[#0d1117] p-2 rounded border border-white/10">
                            <div className="flex justify-end mb-1">
                                <select 
                                  value={language} 
                                  onChange={e => setLanguage(e.target.value)} 
                                  className="bg-white/5 text-gray-400 text-xs rounded border-none cursor-pointer"
                                >
                                    <option value="text">Plain Text</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="cpp">C++</option>
                                    <option value="typescript">TypeScript</option>
                                    <option value="sql">SQL</option>
                                </select>
                            </div>
                            <textarea 
                                value={codeSnippet} onChange={e => setCodeSnippet(e.target.value)}
                                placeholder="// Paste your code here..."
                                className="w-full bg-transparent font-mono text-sm text-green-400 h-24 outline-none resize-none"
                            />
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-2">
                          <button onClick={() => setShowCodeEditor(!showCodeEditor)} className={`p-2 rounded hover:bg-white/5 ${showCodeEditor ? 'text-neon-blue' : 'text-gray-400'}`}><Code className="w-5 h-5"/></button>
                          <NeonButton size="sm" onClick={handleCreatePost} disabled={isPosting}>{isPosting ? 'Posting...' : 'Post'}</NeonButton>
                      </div>
                   </motion.div>
                 </AnimatePresence>
               )}
            </GlassCard>

            <div className="space-y-6">
              {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
              ) : (
                posts.map(post => (
                  <PostCard 
                    key={post._id} 
                    {...post} 
                    // PASSING REQUIRED AUTH DATA HERE
                    token={getToken()} 
                    currentUserId={user?._id}
                  />
                ))
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="hidden lg:block lg:col-span-3">
            <GlassCard className="p-4">
               <h3 className="text-white font-bold mb-3">Trending</h3>
               <div className="text-gray-400 text-sm">#WebDev</div>
            </GlassCard>
          </div>

        </div>
      </div>
    </div>
  );
}