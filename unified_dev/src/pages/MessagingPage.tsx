import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, Phone, Video, MoreVertical, Image, Paperclip, Smile } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
interface Message {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
}
interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage: string;
  unread: number;
}
export function MessagingPage() {
  const [activeContact, setActiveContact] = useState<number>(1);
  const [messageInput, setMessageInput] = useState('');
  const contacts: Contact[] = [{
    id: 1,
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    status: 'online',
    lastMessage: 'Hey, did you check the PR?',
    unread: 2
  }, {
    id: 2,
    name: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    status: 'offline',
    lastMessage: 'Thanks for the help!',
    unread: 0
  }, {
    id: 3,
    name: 'Alex Coder',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    status: 'online',
    lastMessage: 'Meeting in 5 mins',
    unread: 0
  }];
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    sender: 'them',
    text: 'Hey Madhan! How is the new project coming along?',
    time: '10:30 AM'
  }, {
    id: 2,
    sender: 'me',
    text: 'Going great! Just finishing up the landing page workflows.',
    time: '10:32 AM'
  }, {
    id: 3,
    sender: 'them',
    text: "Awesome, can't wait to see it live!",
    time: '10:33 AM'
  }]);
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'me',
      text: messageInput,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };
  const activeUser = contacts.find(c => c.id === activeContact);
  return <div className="h-[calc(100vh-64px)] p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
        {/* Contacts List */}
        <GlassCard className="md:col-span-4 flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input type="text" placeholder="Search messages..." className="w-full bg-navy-900/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-neon-blue/50 focus:outline-none" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map(contact => <div key={contact.id} onClick={() => setActiveContact(contact.id)} className={`p-4 flex items-center space-x-3 cursor-pointer transition-colors ${activeContact === contact.id ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                <div className="relative">
                  <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                  {contact.status === 'online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-navy-900"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-white font-medium truncate">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-gray-500">10:30 AM</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    {contact.lastMessage}
                  </p>
                </div>
                {contact.unread > 0 && <div className="w-5 h-5 bg-neon-blue rounded-full flex items-center justify-center text-xs font-bold text-navy-900">
                    {contact.unread}
                  </div>}
              </div>)}
          </div>
        </GlassCard>

        {/* Chat Area */}
        <GlassCard className="md:col-span-8 flex flex-col h-full overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-navy-900/50">
            <div className="flex items-center space-x-3">
              <img src={activeUser?.avatar} alt={activeUser?.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="text-white font-bold">{activeUser?.name}</h3>
                <span className="text-xs text-green-400 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                  Online
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-900/30">
            {messages.map(msg => <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-2xl p-4 ${msg.sender === 'me' ? 'bg-gradient-to-r from-neon-violet to-neon-blue text-white rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none'}`}>
                  <p>{msg.text}</p>
                  <span className={`text-[10px] mt-1 block ${msg.sender === 'me' ? 'text-white/70' : 'text-gray-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>)}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-navy-900/50">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <div className="flex-1 relative">
                <input type="text" value={messageInput} onChange={e => setMessageInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Type a message..." className="w-full bg-navy-800 border border-white/10 rounded-full pl-4 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50" />
                <button className="absolute right-2 top-2 p-1 text-gray-400 hover:text-white">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <button onClick={handleSendMessage} className="p-3 bg-neon-blue text-navy-900 rounded-full hover:bg-white transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>;
}