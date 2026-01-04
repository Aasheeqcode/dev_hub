import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Link as LinkIcon, Calendar, Mail, Github, Twitter, Linkedin, MessageSquare, UserPlus, Check } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { PostCard } from '../components/PostCard';
export function UserProfilePage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  // Mock data - in a real app this would fetch based on ID
  const user = {
    name: 'Sarah Chen',
    role: 'Senior Frontend Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    bio: 'Frontend enthusiast. React Core Team contributor. Building accessible web experiences.',
    location: 'New York, NY',
    website: 'sarahchen.dev',
    joined: 'March 2020',
    email: 'sarah@example.com',
    followers: '12.5k',
    following: '892',
    projects: '45'
  };
  const skills = ['React', 'TypeScript', 'Next.js', 'WebGL', 'Three.js', 'Design Systems'];
  const handleMessage = () => {
    navigate('/messages');
  };
  return <div className="min-h-screen pb-12">
      {/* Cover Image */}
      <div className="h-64 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent z-10"></div>
        <img src={user.cover} alt="Cover" className="w-full h-full object-cover opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-neon-violet to-neon-blue mx-auto">
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover border-4 border-navy-900" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-white mb-1">
                {user.name}
              </h1>
              <p className="text-neon-blue font-medium mb-4">{user.role}</p>

              <div className="flex space-x-3 justify-center mb-6">
                <NeonButton onClick={() => setIsFollowing(!isFollowing)} variant={isFollowing ? 'outline' : 'primary'} className="flex-1" icon={isFollowing ? <Check className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}>
                  {isFollowing ? 'Following' : 'Follow'}
                </NeonButton>
                <NeonButton onClick={handleMessage} variant="secondary" className="flex-1" icon={<MessageSquare className="w-4 h-4" />}>
                  Message
                </NeonButton>
              </div>

              <p className="text-gray-300 text-sm mb-6 leading-relaxed text-left">
                {user.bio}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {skills.map(skill => <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                    {skill}
                  </span>)}
              </div>

              <div className="space-y-3 text-sm text-gray-400 text-left border-t border-white/10 pt-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-neon-violet" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <LinkIcon className="w-4 h-4 text-neon-violet" />
                  <a href="#" className="hover:text-neon-blue transition-colors">
                    {user.website}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-neon-violet" />
                  <span>Joined {user.joined}</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <GlassCard className="p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {user.followers}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Followers
                </div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {user.following}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Following
                </div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {user.projects}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Projects
                </div>
              </GlassCard>
            </div>

            {/* Recent Posts */}
            <div className="space-y-6">
              <h3 className="font-bold text-white text-lg">Recent Activity</h3>
              <PostCard author={{
              name: user.name,
              role: user.role,
              avatar: user.avatar,
              time: '2 days ago'
            }} content={{
              text: 'Just open sourced my new React component library! It features a complete set of glassmorphism components with built-in dark mode support. Check it out on GitHub! 🌟',
              image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            }} stats={{
              likes: 124,
              comments: 18,
              shares: 5
            }} />
            </div>
          </div>
        </div>
      </div>
    </div>;
}