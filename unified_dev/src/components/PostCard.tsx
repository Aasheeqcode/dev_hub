import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Code, Send, UserPlus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from './GlassCard';
import { NeonButton } from './NeonButton';
interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  time: string;
}
interface PostProps {
  id?: number;
  author: {
    id?: number;
    name: string;
    role: string;
    avatar: string;
    time: string;
  };
  content: {
    text: string;
    image?: string;
    code?: {
      language: string;
      snippet: string;
    };
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  onComment?: (postId: number, text: string) => void;
}
export function PostCard({
  id = 0,
  author,
  content,
  stats,
  onComment
}: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(stats.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState<Comment[]>([{
    id: 1,
    author: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    text: 'This looks amazing! Great work.',
    time: '1h ago'
  }]);
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };
  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: comments.length + 1,
      author: 'Madhan Annadurai',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      text: commentText,
      time: 'Just now'
    };
    setComments([...comments, newComment]);
    setCommentText('');
    if (onComment) onComment(id, commentText);
  };
  return <GlassCard className="p-0 mb-6" hoverEffect>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Link to={`/user/${author.id || 1}`} className="relative group">
              <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover border border-white/10 group-hover:border-neon-blue transition-colors" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-navy-900"></div>
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <Link to={`/user/${author.id || 1}`} className="font-semibold text-white text-sm hover:text-neon-blue cursor-pointer transition-colors">
                  {author.name}
                </Link>
                <button onClick={() => setIsFollowing(!isFollowing)} className={`text-xs font-medium transition-colors ${isFollowing ? 'text-green-400' : 'text-neon-blue hover:text-white'}`}>
                  {isFollowing ? '• Following' : '• Follow'}
                </button>
              </div>
              <p className="text-xs text-gray-400">{author.role}</p>
              <p className="text-xs text-gray-500 mt-0.5">{author.time}</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line mb-3">
            {content.text}
          </p>

          {content.code && <div className="bg-navy-900/80 rounded-lg p-4 font-mono text-xs border border-white/10 overflow-x-auto mb-3 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-gray-300">
                  <Code className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between text-gray-500 text-[10px] uppercase mb-2 border-b border-white/5 pb-2">
                <span>{content.code.language}</span>
              </div>
              <pre className="text-neon-blue/90">
                <code>{content.code.snippet}</code>
              </pre>
            </div>}

          {content.image && <div className="rounded-lg overflow-hidden border border-white/5">
              <img src={content.image} alt="Post content" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
            </div>}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center space-x-6">
            <button onClick={handleLike} className={`flex items-center space-x-2 text-sm transition-colors ${isLiked ? 'text-neon-violet' : 'text-gray-400 hover:text-white'}`}>
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-neon-violet' : ''}`} />
              <span>{likeCount}</span>
            </button>
            <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{comments.length}</span>
            </button>
            <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Share2 className="w-5 h-5" />
              <span>{stats.shares}</span>
            </button>
          </div>
          <button className="text-gray-400 hover:text-neon-blue transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }} className="mt-4 pt-4 border-t border-white/5">
              <div className="space-y-4 mb-4">
                {comments.map(comment => <div key={comment.id} className="flex space-x-3">
                    <img src={comment.avatar} alt={comment.author} className="w-8 h-8 rounded-full object-cover" />
                    <div className="flex-1 bg-white/5 rounded-lg p-3">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-sm font-semibold text-white">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-500">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{comment.text}</p>
                    </div>
                  </div>)}
              </div>

              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="My Avatar" className="w-8 h-8 rounded-full object-cover" />
                <div className="flex-1 relative">
                  <input type="text" value={commentText} onChange={e => setCommentText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleCommentSubmit()} placeholder="Write a comment..." className="w-full bg-navy-900/50 border border-white/10 rounded-full pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:border-neon-blue/50" />
                  <button onClick={handleCommentSubmit} className="absolute right-2 top-1.5 text-neon-blue hover:text-white transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>
    </GlassCard>;
}