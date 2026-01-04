import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Link as LinkIcon, Calendar, Mail, Github, Twitter, Linkedin, Edit2 } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { PostCard } from '../components/PostCard';
export function ProfilePage() {
  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'Tailwind CSS'];
  const projects = [{
    title: 'Neon DevHub',
    description: 'A unified developer platform with a cyberpunk aesthetic.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }, {
    title: 'AI Code Assistant',
    description: 'VS Code extension for real-time code suggestions.',
    tags: ['TypeScript', 'OpenAI', 'VS Code API'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }];
  return <div className="min-h-screen pb-12">
      {/* Cover Image */}
      <div className="h-64 w-full bg-gradient-to-r from-neon-violet/20 via-navy-900 to-neon-blue/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-neon-violet to-neon-blue mx-auto">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-navy-900" />
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-navy-800 rounded-full border border-white/10 text-white hover:text-neon-blue transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <h1 className="text-2xl font-bold text-white mb-1">Alex Coder</h1>
              <p className="text-neon-blue font-medium mb-4">
                Senior Full Stack Developer
              </p>

              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Building the future of web development. Passionate about UI/UX,
                performance, and developer tools. Open source contributor and
                tech speaker.
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {skills.map(skill => <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                    {skill}
                  </span>)}
              </div>

              <div className="space-y-3 text-sm text-gray-400 text-left border-t border-white/10 pt-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-neon-violet" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <LinkIcon className="w-4 h-4 text-neon-violet" />
                  <a href="#" className="hover:text-neon-blue transition-colors">
                    alexcoder.dev
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-neon-violet" />
                  <span>Joined March 2021</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-neon-violet" />
                  <span>alex@devhub.io</span>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-white/10">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-bold text-white mb-4">Achievements</h3>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="aspect-square rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-neon-violet/50 transition-colors cursor-pointer group">
                    <div className="text-2xl group-hover:scale-110 transition-transform">
                      🏆
                    </div>
                  </div>)}
              </div>
            </GlassCard>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tabs */}
            <div className="flex space-x-1 bg-navy-800/50 p-1 rounded-xl backdrop-blur-md border border-white/5 overflow-x-auto">
              {['About', 'Posts', 'Projects', 'Contests', 'Activity'].map((tab, i) => <button key={tab} className={`
                    px-6 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                    ${i === 1 ? 'bg-gradient-to-r from-neon-violet to-neon-blue text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}>
                    {tab}
                  </button>)}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => <GlassCard key={index} className="group cursor-pointer" hoverEffect>
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent opacity-60 z-10"></div>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5 relative z-20 -mt-12">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => <span key={tag} className="text-xs font-medium text-neon-blue bg-neon-blue/10 px-2 py-1 rounded">
                          {tag}
                        </span>)}
                    </div>
                  </div>
                </GlassCard>)}
            </div>

            {/* Recent Posts */}
            <div className="space-y-6">
              <h3 className="font-bold text-white text-lg">Recent Posts</h3>
              <PostCard author={{
              name: 'Alex Coder',
              role: 'Senior Full Stack Developer',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
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