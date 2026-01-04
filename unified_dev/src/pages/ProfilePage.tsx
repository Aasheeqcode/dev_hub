import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Mail, Edit3, Layout, Users, Bookmark } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { PostCard, PostProps } from '../components/PostCard';
import { Sidebar } from '../components/Sidebar';
import { API_BASE_URL } from '../config';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  location?: string;
  occupation?: string;
  picturePath?: string;
  createdAt: string;
}

export function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        // 1. Fetch Profile
        const userRes = await fetch(`${API_BASE_URL}/api/users/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!userRes.ok) throw new Error("Failed to load profile");
        const userData = await userRes.json();
        setUser(userData);

        // 2. Fetch ALL Posts & Filter (Temporary Solution)
        const postsRes = await fetch(`${API_BASE_URL}/api/posts`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const allPosts = await postsRes.json();
        
        // Filter: Keep only posts where post.userId === currentUser._id
        const myPosts = allPosts.filter((p: PostProps) => p.userId === userData._id);
        setPosts(myPosts);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const sidebarItems = [
    { name: 'My Feed', path: '/home', icon: <Layout className="w-4 h-4" /> },
    { name: 'My Profile', path: '/profile', icon: <Users className="w-4 h-4" /> },
    { name: 'Saved', path: '/saved', icon: <Bookmark className="w-4 h-4" /> },
  ];

  if (loading) return <div className="text-center pt-20 text-gray-500">Loading Profile...</div>;

  return (
    <div className="min-h-screen pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="hidden lg:block lg:col-span-3">
             <GlassCard className="p-2"><Sidebar items={sidebarItems} /></GlassCard>
          </div>

          <div className="lg:col-span-9 space-y-6">
            <GlassCard className="relative overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-neon-blue/20 to-neon-violet/20"></div>
              <div className="px-6 pb-6">
                <div className="relative flex justify-between items-end -mt-12 mb-4">
                  <div className="p-1 bg-navy-900 rounded-full">
                    <img 
                       src={user?.picturePath || `https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
                       alt={user?.name}
                       className="w-24 h-24 rounded-full object-cover border-4 border-navy-900 bg-navy-800"
                    />
                  </div>
                  <NeonButton size="sm" icon={<Edit3 className="w-4 h-4"/>}>Edit Profile</NeonButton>
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                  <p className="text-neon-blue font-medium">{user?.occupation || "Software Developer"}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {user?.location || "Remote"}</div>
                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4"/> Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</div>
                    <div className="flex items-center gap-1"><Mail className="w-4 h-4"/> {user?.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 border-t border-white/5 pt-6 text-center">
                   <div><div className="text-xl font-bold text-white">{posts.length}</div><div className="text-xs text-gray-500">POSTS</div></div>
                   <div className="border-l border-white/5"><div className="text-xl font-bold text-white">1.2k</div><div className="text-xs text-gray-500">FOLLOWERS</div></div>
                   <div className="border-l border-white/5"><div className="text-xl font-bold text-white">450</div><div className="text-xs text-gray-500">FOLLOWING</div></div>
                </div>
              </div>
            </GlassCard>

            <h3 className="text-lg font-bold text-white pl-1">My Activity</h3>
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map(post => <PostCard key={post._id} {...post} />)
              ) : (
                <GlassCard className="p-8 text-center text-gray-500">No posts yet.</GlassCard>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}