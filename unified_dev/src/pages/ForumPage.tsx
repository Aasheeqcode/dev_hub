import React from 'react';
import { MessageSquare, ThumbsUp, Eye, MessageCircle, Search, Plus } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
export function ForumPage() {
  const discussions = [{
    id: 1,
    title: 'Best practices for React Query v5?',
    author: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    tags: ['React', 'Frontend', 'State Management'],
    stats: {
      votes: 45,
      views: 1200,
      replies: 12
    },
    time: '2h ago'
  }, {
    id: 2,
    title: 'How to optimize Next.js images for LCP?',
    author: 'Mike Ross',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    tags: ['Next.js', 'Performance', 'SEO'],
    stats: {
      votes: 32,
      views: 850,
      replies: 8
    },
    time: '4h ago'
  }, {
    id: 3,
    title: 'Rust vs Go for microservices in 2024',
    author: 'Alex Coder',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    tags: ['Backend', 'Rust', 'Go'],
    stats: {
      votes: 128,
      views: 5400,
      replies: 45
    },
    time: '1d ago'
  }];
  return <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Community Forum
          </h1>
          <p className="text-gray-400">
            Discuss, ask questions, and share knowledge with 50k+ developers.
          </p>
        </div>
        <NeonButton icon={<Plus className="w-4 h-4" />}>
          New Discussion
        </NeonButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Filters */}
        <div className="space-y-6">
          <GlassCard className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input type="text" placeholder="Search topics..." className="w-full bg-navy-900/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-neon-blue/50 focus:outline-none" />
            </div>

            <div className="space-y-1">
              {['All Discussions', 'General', 'Frontend', 'Backend', 'DevOps', 'Career', 'Showcase'].map((filter, i) => <button key={filter} className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${i === 0 ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}>
                  {filter}
                </button>)}
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['javascript', 'react', 'python', 'css', 'node', 'aws', 'docker'].map(tag => <span key={tag} className="px-2 py-1 rounded text-xs font-medium bg-navy-900 border border-white/10 text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 cursor-pointer transition-colors">
                  #{tag}
                </span>)}
            </div>
          </GlassCard>
        </div>

        {/* Main List */}
        <div className="lg:col-span-3 space-y-4">
          {discussions.map(discussion => <GlassCard key={discussion.id} className="p-6" hoverEffect>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center space-y-1 min-w-[60px]">
                  <button className="p-1 hover:text-neon-violet transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                  <span className="font-bold text-white">
                    {discussion.stats.votes}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white hover:text-neon-blue cursor-pointer transition-colors mb-2">
                    {discussion.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {discussion.tags.map(tag => <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium bg-white/5 text-neon-blue border border-neon-blue/20">
                        {tag}
                      </span>)}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <img src={discussion.avatar} alt="" className="w-5 h-5 rounded-full" />
                      <span className="hover:text-white cursor-pointer">
                        {discussion.author}
                      </span>
                      <span>•</span>
                      <span>{discussion.time}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{discussion.stats.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{discussion.stats.replies}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>)}
        </div>
      </div>
    </div>;
}