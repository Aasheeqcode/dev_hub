import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Trash2, Download, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
interface Message {
  id: number;
  role: 'user' | 'bot';
  content: string;
  code?: string;
}
export function ChatbotPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    role: 'bot',
    content: "Hello! I'm your AI coding assistant. How can I help you build something amazing today?"
  }, {
    id: 2,
    role: 'user',
    content: 'Can you show me how to create a glassmorphism card in Tailwind CSS?'
  }, {
    id: 3,
    role: 'bot',
    content: "Certainly! Here's a production-ready glassmorphism card component using Tailwind CSS utility classes.",
    code: `<div className="
  backdrop-blur-md 
  bg-white/10 
  border border-white/20 
  rounded-xl 
  shadow-lg 
  p-6
">
  <h2 className="text-white font-bold">Glass Card</h2>
  <p className="text-gray-200">Content goes here...</p>
</div>`
  }]);
  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input
    };
    setMessages([...messages, newMessage]);
    setInput('');
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: 'bot',
        content: 'I am processing your request...'
      }]);
    }, 1000);
  };
  return <div className="h-[calc(100vh-64px)] flex flex-col max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">DevBot AI</h1>
            <p className="text-xs text-neon-blue">Always online</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <GlassCard className="flex-1 mb-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(msg => <motion.div key={msg.id} initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                  ${msg.role === 'user' ? 'ml-3 bg-neon-blue' : 'mr-3 bg-neon-violet'}
                `}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>

                {/* Bubble */}
                <div className={`
                  p-4 rounded-2xl
                  ${msg.role === 'user' ? 'bg-neon-blue/20 border border-neon-blue/30 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'}
                `}>
                  <p className="leading-relaxed">{msg.content}</p>

                  {msg.code && <div className="mt-3 relative group">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-gray-300">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <pre className="bg-navy-900/80 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-white/10">
                        <code className="text-neon-blue">{msg.code}</code>
                      </pre>
                    </div>}

                  {msg.role === 'bot' && <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-white/5">
                      <button className="text-gray-500 hover:text-green-500 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button className="text-gray-500 hover:text-red-500 transition-colors">
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>}
                </div>
              </div>
            </motion.div>)}
        </div>
      </GlassCard>

      {/* Input Area */}
      <div className="relative">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="Ask anything about code..." className="w-full bg-navy-800/80 backdrop-blur-md border border-white/10 rounded-xl pl-6 pr-14 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-violet/50 shadow-lg" />
        <button onClick={handleSend} className="absolute right-2 top-2 p-2 bg-gradient-to-r from-neon-violet to-neon-blue rounded-lg text-white hover:shadow-neon-violet transition-shadow">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>;
}