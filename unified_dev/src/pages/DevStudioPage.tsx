import React, { useState } from 'react';
import { Folder, FileCode, Settings, Play, Share2, MessageSquare, Terminal, Search, GitBranch, MoreVertical, Plus } from 'lucide-react';
import { NeonButton } from '../components/NeonButton';

export function DevStudioPage() {
  return <div className="h-[calc(100vh-64px)] flex flex-col bg-[#0d1117]">
      {/* Top Bar */}
      <div className="h-12 bg-navy-800 border-b border-white/5 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Folder className="w-4 h-4" />
            <span>project-neon</span>
            <span>/</span>
            <span className="text-white">src</span>
            <span>/</span>
            <span className="text-white">App.tsx</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select className="bg-navy-900 border border-white/10 text-white text-xs rounded px-2 py-1 focus:outline-none focus:border-neon-blue">
            <option>TypeScript</option>
            <option>JavaScript</option>
            <option>Python</option>
          </select>
          <NeonButton size="sm" icon={<Play className="w-3 h-3" />} className="h-8">
            Run
          </NeonButton>
          <NeonButton size="sm" variant="secondary" icon={<Share2 className="w-3 h-3" />} className="h-8">
            Share
          </NeonButton>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - File Explorer */}
        <div className="w-64 bg-navy-900 border-r border-white/5 flex flex-col">
          <div className="p-3 text-xs font-bold text-gray-400 uppercase tracking-wider flex justify-between items-center">
            <span>Explorer</span>
            <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {['src', 'components', 'pages', 'hooks', 'utils'].map(folder => <div key={folder} className="px-2 py-1">
                <div className="flex items-center space-x-2 text-gray-400 hover:text-white hover:bg-white/5 px-2 py-1 rounded cursor-pointer">
                  <Folder className="w-4 h-4 text-neon-blue" />
                  <span className="text-sm">{folder}</span>
                </div>
                <div className="pl-6 space-y-1 mt-1">
                  {['index.tsx', 'styles.css', 'types.ts'].map(file => <div key={file} className="flex items-center space-x-2 text-gray-500 hover:text-white hover:bg-white/5 px-2 py-1 rounded cursor-pointer">
                      <FileCode className="w-4 h-4" />
                      <span className="text-sm">{file}</span>
                    </div>)}
                </div>
              </div>)}
          </div>
        </div>

        {/* Center - Code Editor */}
        <div className="flex-1 flex flex-col bg-[#0d1117] relative">
          <div className="flex-1 p-4 font-mono text-sm overflow-auto">
            <div className="text-gray-400 select-none float-left pr-4 text-right border-r border-white/5 mr-4">
              {Array.from({
              length: 20
            }).map((_, i) => <div key={i} className="leading-6">
                  {i + 1}
                </div>)}
            </div>
            <div className="text-gray-300 leading-6">
              <span className="text-neon-violet">import</span> React{' '}
              <span className="text-neon-violet">from</span>{' '}
              <span className="text-green-400">'react'</span>;<br />
              <span className="text-neon-violet">import</span> {'{'} useState{' '}
              {'}'} <span className="text-neon-violet">from</span>{' '}
              <span className="text-green-400">'react'</span>;<br />
              <br />
              <span className="text-neon-blue">export function</span>{' '}
              <span className="text-yellow-400">App</span>() {'{'}
              <br />
              &nbsp;&nbsp;<span className="text-neon-violet">const</span>{' '}
              [count, setCount] ={' '}
              <span className="text-blue-400">useState</span>(0);
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-neon-violet">return</span> (
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;
              <span className="text-red-400">div</span> className=
              <span className="text-green-400">"app"</span>&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
              <span className="text-red-400">h1</span>&gt;Hello Neon World&lt;/
              <span className="text-red-400">h1</span>&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/
              <span className="text-red-400">div</span>&gt;
              <br />
              &nbsp;&nbsp;);
              <br />
              {'}'}
            </div>

            {/* Live Cursor */}
            <div className="absolute top-[120px] left-[300px] flex items-center">
              <div className="w-0.5 h-5 bg-yellow-500"></div>
              <div className="bg-yellow-500 text-black text-[10px] px-1 rounded-r font-bold">
                Sarah
              </div>
            </div>
          </div>

          {/* Bottom Panel - Terminal */}
          <div className="h-48 bg-navy-900 border-t border-white/5 flex flex-col">
            <div className="flex items-center space-x-6 px-4 py-2 border-b border-white/5 text-xs font-medium text-gray-400">
              <span className="text-white border-b-2 border-neon-blue pb-2 -mb-2.5">
                Terminal
              </span>
              <span className="hover:text-white cursor-pointer">Output</span>
              <span className="hover:text-white cursor-pointer">Problems</span>
            </div>
            <div className="flex-1 p-4 font-mono text-sm text-gray-300 overflow-auto">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">➜</span>
                <span className="text-blue-400">project-neon</span>
                <span className="text-gray-500">git:(</span>
                <span className="text-red-500">main</span>
                <span className="text-gray-500">)</span>
                <span>npm run dev</span>
              </div>
              <div className="mt-2 text-gray-400">
                &gt; dev-hub@0.1.0 dev
                <br />
                &gt; vite
                <br />
                <br />
                <span className="text-green-500"> VITE v4.4.9</span>{' '}
                <span className="text-green-500">ready in 245 ms</span>
                <br />
                <br />
                <span className="text-gray-500"> ➜</span>{' '}
                <span className="text-white font-bold">Local:</span>{' '}
                <span className="text-blue-400 underline">
                  http://localhost:5173/
                </span>
                <br />
                <span className="text-gray-500"> ➜</span>{' '}
                <span className="text-white font-bold">Network:</span> use
                --host to expose
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Collaborators */}
        <div className="w-16 bg-navy-900 border-l border-white/5 flex flex-col items-center py-4 space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="relative group cursor-pointer">
              <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80`} alt="Collaborator" className="w-10 h-10 rounded-full border-2 border-transparent hover:border-neon-blue transition-all" />
              <div className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full border-2 border-navy-900"></div>
            </div>)}
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>;
}