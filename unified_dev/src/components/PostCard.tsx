import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Copy, Check, Send } from 'lucide-react'; // Added Send
import { GlassCard } from './GlassCard';

export interface PostProps {
  _id: string;
  userId: string;
  name: string;
  userTitle?: string;
  userPicturePath?: string;
  description: string;
  title: string;
  picturePath?: string;
  postType?: 'general' | 'question' | 'showcase' | 'discussion';
  codeSnippet?: string;
  language?: string;
  likes: Record<string, boolean>;
  comments: any[];
  // New props needed for functionality
  token?: string | null;
  currentUserId?: string;
}

export const PostCard: React.FC<PostProps> = ({
  _id,
  name,
  userTitle,
  userPicturePath,
  title,
  description,
  picturePath,
  postType = 'general',
  codeSnippet,
  language,
  likes,
  comments,
  token,
  currentUserId,
}) => {
  // Initialize like state based on if currentUserId exists in the likes object
  const [isLiked, setIsLiked] = useState(Boolean(currentUserId && likes[currentUserId]));
  const [likeCount, setLikeCount] = useState(Object.keys(likes || {}).length);
  
  // Comment States
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [postComments, setPostComments] = useState(comments || []);
  const [isCommenting, setIsCommenting] = useState(false);
  
  const [copied, setCopied] = useState(false);

  // --- LIKE LOGIC ---
  const handleLike = async () => {
    // Optimistic UI Update
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${_id}/like`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUserId }),
      });

      if (!response.ok) {
        throw new Error("Failed to like post");
      }
      
      const updatedPost = await response.json();
      // Optional: Sync exact count from server if needed
      // setLikeCount(Object.keys(updatedPost.likes).length);
    } catch (err) {
      console.error("Like error:", err);
      // Revert UI on error
      setIsLiked(!isLiked);
      setLikeCount(prev => !isLiked ? prev - 1 : prev + 1);
    }
  };

  // --- COMMENT LOGIC ---
  const handleComment = async () => {
    if (!commentText.trim()) return;
    setIsCommenting(true);

    try {
      // Assuming endpoint is POST /api/posts/:id/comment based on your structure
      // NOTE: You might need to adjust the endpoint if your backend is different
      const response = await fetch(`http://localhost:5000/api/posts/${_id}/comment`, {
        method: "POST", // or PATCH depending on your backend
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUserId, comment: commentText }), 
      });

      if (response.ok) {
        const updatedPost = await response.json();
        // Update local comments list with the new data from server
        // Assuming server returns the full updated post or the comments array
        setPostComments(updatedPost.comments); 
        setCommentText("");
      }
    } catch (err) {
      console.error("Comment error:", err);
    } finally {
      setIsCommenting(false);
    }
  };

  const handleCopyCode = () => {
    if (codeSnippet) {
      navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
      case 'showcase': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      case 'discussion': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };
  
  return (
    <GlassCard className="p-0 overflow-hidden hover:border-white/20 transition-colors mb-6">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-navy-800 overflow-hidden border border-white/10">
              <img 
                src={userPicturePath || `https://ui-avatars.com/api/?name=${name}&background=random`} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">{name}</h3>
              <p className="text-xs text-gray-400">{userTitle || "Member"}</p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
        </div>

        {/* Content */}
        <div className="mb-4">
           <div className="flex items-center gap-3 mb-2">
             {postType !== 'general' && (
               <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wider font-medium ${getTypeColor(postType)}`}>
                 {postType}
               </span>
             )}
             <h2 className="text-lg font-bold text-white leading-tight">{title}</h2>
           </div>
          
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap mb-4">{description}</p>

          {/* Code Snippet Block */}
          {codeSnippet && (
            <div className="relative group rounded-lg overflow-hidden bg-[#0d1117] border border-white/10 mb-4">
              <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
                <span className="text-xs text-gray-400 font-mono">{language || 'text'}</span>
                <button 
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Image Attachment */}
          {picturePath && (
            <div className="rounded-lg overflow-hidden border border-white/10 mt-3">
              <img src={`http://localhost:5000/assets/${picturePath}`} alt="Post content" className="w-full h-auto" />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-6 pt-4 border-t border-white/5">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 text-sm transition-colors ${isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-400'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likeCount}</span>
          </button>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-2 text-sm transition-colors ${showComments ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'}`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>{postComments.length}</span>
          </button>

          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors ml-auto">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* --- NEW COMMENT SECTION --- */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
            {/* Comment List */}
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
              {postComments.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-2">No comments yet. Be the first!</p>
              ) : (
                postComments.map((comment: any, index: number) => (
                  <div key={index} className="bg-white/5 rounded p-3 text-sm border border-white/5">
                    <div className="flex justify-between items-baseline mb-1">
                      {/* Assuming comment structure, adjust based on your backend population */}
                      <span className="font-bold text-gray-200 text-xs">{comment.name || comment.userId || "User"}</span> 
                    </div>
                    <p className="text-gray-300 text-xs">{comment.comment || comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Comment Input */}
            <div className="flex gap-2 relative">
              <input 
                type="text" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-navy-900/50 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleComment()}
              />
              <button 
                onClick={handleComment}
                disabled={!commentText.trim() || isCommenting}
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </GlassCard>
  );
};