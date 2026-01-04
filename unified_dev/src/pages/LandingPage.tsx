import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Image, Video, Code, Link as LinkIcon, Globe, TrendingUp, Users, MessageSquare, Bookmark, Trophy, Layout, UserPlus, Check } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { PostCard } from '../components/PostCard';
import { Sidebar } from '../components/Sidebar';
export function LandingPage() {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([{
    id: 1,
    author: {
      id: 2,
      name: 'Sarah Chen',
      role: 'Senior Frontend Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      time: '2h ago'
    },
    content: {
      text: 'Just shipped the new dashboard with React 18 and Framer Motion! 🚀 The performance improvements are insane. Check out this snippet for the staggered animation hook I created.',
      code: {
        language: 'typescript',
        snippet: `const useStagger = (delay: number = 0.1) => {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * delay }
    })
  };
};`
      }
    },
    stats: {
      likes: 243,
      comments: 42,
      shares: 12
    }
  }, {
    id: 2,
    author: {
      id: 3,
      name: 'David Miller',
      role: 'Full Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      time: '5h ago'
    },
    content: {
      text: 'Working on a new AI-powered code review tool. The neon theme is coming along nicely! What do you think about this color palette? 🎨',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    stats: {
      likes: 856,
      comments: 124,
      shares: 45
    }
  }]);
  const sidebarItems = [{
    name: 'My Feed',
    path: '/',
    icon: <Layout className="w-4 h-4" />
  }, {
    name: 'My Posts',
    path: '/profile',
    icon: <Users className="w-4 h-4" />
  }, {
    name: 'Saved',
    path: '/saved',
    icon: <Bookmark className="w-4 h-4" />,
    badge: '12'
  }, {
    name: 'My Contests',
    path: '/contests',
    icon: <Trophy className="w-4 h-4" />
  }, {
    name: 'Forums',
    path: '/forum',
    icon: <MessageSquare className="w-4 h-4" />
  }];
  const handleCreatePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: posts.length + 1,
      author: {
        id: 1,
        name: 'Madhan Annadurai',
        role: 'Full Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        time: 'Just now'
      },
      content: {
        text: postText
      },
      stats: {
        likes: 0,
        comments: 0,
        shares: 0
      }
    };
    setPosts([newPost, ...posts]);
    setPostText('');
  };
  return <div className="min-h-screen pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <GlassCard className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-br from-neon-violet to-neon-blue">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-navy-900" />
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-4 border-navy-900"></div>
              </div>
              <h2 className="text-lg font-bold text-white">Madhan Annadurai</h2>
              <p className="text-sm text-neon-blue mb-4">
                Full Stack Developer
              </p>

              <div className="flex justify-between text-sm text-gray-400 border-t border-white/10 pt-4 mb-4">
                <div className="text-center">
                  <div className="font-bold text-white">1.2k</div>
                  <div className="text-xs">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-white">450</div>
                  <div className="text-xs">Following</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-white">85</div>
                  <div className="text-xs">Projects</div>
                </div>
              </div>

              <Link to="/profile">
                <NeonButton variant="outline" size="sm" className="w-full">
                  View Profile
                </NeonButton>
              </Link>
            </GlassCard>

            <GlassCard className="p-2">
              <Sidebar items={sidebarItems} />
            </GlassCard>
          </div>

          {/* Center Feed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Create Post */}
            <GlassCard className="p-4">
              <div className="flex space-x-4">
                <Link to="/profile">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                </Link>
                <div className="flex-1">
                  <input type="text" value={postText} onChange={e => setPostText(e.target.value)} placeholder="Start a post..." className="w-full bg-navy-900/50 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-violet/50 transition-colors" />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-neon-blue hover:bg-white/5 rounded-lg transition-colors">
                        <Image className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-neon-violet hover:bg-white/5 rounded-lg transition-colors">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-pink-500 hover:bg-white/5 rounded-lg transition-colors">
                        <Code className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-yellow-500 hover:bg-white/5 rounded-lg transition-colors">
                        <LinkIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <NeonButton size="sm" onClick={handleCreatePost} disabled={!postText.trim()}>
                      Post
                    </NeonButton>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post, index) => <motion.div key={post.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }}>
                  <PostCard {...post} />
                </motion.div>)}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <GlassCard className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Trending Hackathons</h3>
                <TrendingUp className="w-4 h-4 text-neon-blue" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="group cursor-pointer">
                    <div className="text-sm font-medium text-white group-hover:text-neon-violet transition-colors">
                      Global AI Challenge 2024
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Starts in 2 days • 15k participants
                    </div>
                  </div>)}
              </div>
              <NeonButton variant="ghost" size="sm" className="w-full mt-4 text-xs">
                View All
              </NeonButton>
            </GlassCard>

            <GlassCard className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Suggested Mentors</h3>
                <Users className="w-4 h-4 text-neon-violet" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="flex items-center space-x-3">
                    <Link to={`/user/${i + 3}`}>
                      <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80`} alt="Mentor" className="w-10 h-10 rounded-full object-cover" />
                    </Link>
                    <div>
                      <Link to={`/user/${i + 3}`} className="text-sm font-medium text-white hover:text-neon-blue transition-colors">
                        {['Jane Doe', 'Mike Ross', 'Emily Zhang'][i - 1]}
                      </Link>
                      <div className="text-xs text-gray-400">
                        Google • Ex-Meta
                      </div>
                    </div>
                    <button className="ml-auto text-neon-blue hover:text-white text-xs font-medium">
                      Follow
                    </button>
                  </div>)}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>;
}