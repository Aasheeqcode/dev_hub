import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Users, Bookmark, Trophy, MessageSquare } from 'lucide-react';

import { GlassCard } from '../components/GlassCard'; // Adjust path if needed
import { PostCard, PostProps } from '../components/PostCard'; // Adjust path if needed
import { Sidebar } from '../components/Sidebar'; // Adjust path if needed

// Interface for User
interface UserProfile {
  _id: string;
  name: string;
  email: string;
  picturePath?: string;
  occupation?: string;
}

export function SavedPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [savedPosts, setSavedPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) return navigate('/login');

      try {
        // 1. Fetch User Profile first (We need the ID to check likes)
        const userRes = await fetch('http://localhost:5000/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!userRes.ok) throw new Error("Auth Failed");
        const userData = await userRes.json();
        setUser(userData);

        // 2. Fetch All Posts
        // ( Ideally, your backend should have an endpoint like /api/posts/liked, 
        //   but we can filter client-side to make it work immediately without backend changes )
        const postsRes = await fetch('http://localhost:5000/api/posts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const allPosts: PostProps[] = await postsRes.json();

        // 3. Filter: Keep only posts where likes[userId] is true
        // The structure of 'likes' is Record<string, boolean>
        const likedPosts = allPosts.filter(post => 
          post.likes && post.likes[userData._id] === true
        );

        setSavedPosts(likedPosts);

      } catch (err) {
        console.error(err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Sidebar config (kept same as LandingPage for consistency)
  const sidebarItems = [
    { name: 'My Feed', path: '/home', icon: <Layout className="w-4 h-4" /> },
    { name: 'My Profile', path: '/profile', icon: <Users className="w-4 h-4" /> },
    { name: 'Saved', path: '/saved', icon: <Bookmark className="w-4 h-4" /> }, // Active path
    { name: 'Contests', path: '/contests', icon: <Trophy className="w-4 h-4" /> },
    { name: 'Forum', path: '/forum', icon: <MessageSquare className="w-4 h-4" /> }
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
                    </div>
                    <h2 className="font-bold text-white text-lg">{user.name}</h2>
                    <p className="text-xs text-neon-blue uppercase mb-4">{user.occupation || "Developer"}</p>
                  </>
                ) : (
                  <div className="h-20 bg-white/5 animate-pulse"></div>
                )}
              </div>
            </GlassCard>
            <GlassCard className="p-2">
              <Sidebar items={sidebarItems} />
            </GlassCard>
          </div>

          {/* MAIN CONTENT - SAVED POSTS */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-pink-500/20 rounded-lg border border-pink-500/30">
                 <Bookmark className="w-6 h-6 text-pink-500" />
               </div>
               <div>
                 <h1 className="text-2xl font-bold text-white">Saved Posts</h1>
                 <p className="text-gray-400 text-sm">Posts you have liked</p>
               </div>
            </div>

            {loading ? (
              <div className="text-center text-gray-500 py-10">Loading your saved collection...</div>
            ) : savedPosts.length === 0 ? (
              <GlassCard className="p-10 text-center">
                <Bookmark className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-300">No saved posts yet</h3>
                <p className="text-gray-500 mt-2">Like posts in your feed to see them here.</p>
                <Link to="/home" className="inline-block mt-6 text-neon-blue hover:underline">
                  Go to Feed
                </Link>
              </GlassCard>
            ) : (
              savedPosts.map(post => (
                <PostCard 
                  key={post._id} 
                  {...post} 
                  token={getToken()} 
                  currentUserId={user?._id}
                />
              ))
            )}
          </div>

          {/* RIGHT SIDEBAR (Optional - keeping it to balance layout) */}
          <div className="hidden lg:block lg:col-span-3">
             {/* Empty or suggestions can go here */}
          </div>

        </div>
      </div>
    </div>
  );
}