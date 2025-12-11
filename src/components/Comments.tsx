import { useState, memo, useCallback } from 'react'
import { ThumbsUp, MessageCircle, ChevronDown, ChevronRight, Send } from 'lucide-react'
import type { CommentType } from '../data/mockComments'
import { initialComments, nextId as initialNextId } from '../data/mockComments'

const RenderComments = memo(({ 
  comments, 
  index = 0, 
  depth = 0,
  onToggleLike,
  onAddReply 
}: { 
  comments: CommentType[]
  index?: number
  depth?: number
  onToggleLike: (commentId: number) => void
  onAddReply: (parentId: number, content: string) => void
}) => {
  if (index >= comments.length) return null

  return (
    <>
      <Comment 
        comment={comments[index]} 
        depth={depth}
        onToggleLike={onToggleLike}
        onAddReply={onAddReply}
      />
      <RenderComments 
        comments={comments} 
        index={index + 1} 
        depth={depth}
        onToggleLike={onToggleLike}
        onAddReply={onAddReply}
      />
    </>
  )
})

const Comment = memo(({ 
  comment, 
  depth = 0,
  onToggleLike,
  onAddReply
}: { 
  comment: CommentType
  depth?: number
  onToggleLike: (commentId: number) => void
  onAddReply: (parentId: number, content: string) => void
}) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyText, setReplyText] = useState("")

  const hasReplies = (comment.replies?.length ?? 0) > 0

  const handleReply = useCallback(() => {
    if (!replyText.trim()) return
    onAddReply(comment.id, replyText)
    setReplyText("")
    setShowReplyForm(false)
    setIsExpanded(true)
  }, [replyText, comment.id, onAddReply])

  const handleLikeClick = useCallback(() => {
    onToggleLike(comment.id)
  }, [comment.id, onToggleLike])

  const toggleReplyForm = useCallback(() => {
    setShowReplyForm(prev => !prev)
  }, [])

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  return (
    <div className={`${depth > 0 ? 'ml-3 sm:ml-6 md:ml-8 mt-3 md:mt-4' : 'mt-3 md:mt-4'} max-w-full`}>
      <div className="flex gap-2 sm:gap-3 max-w-full overflow-hidden">
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0 ring-2 ring-purple-500/30"
        />
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg sm:rounded-xl p-2.5 sm:p-3 max-w-full overflow-hidden">
            <div className="flex items-center justify-between mb-1 gap-2">
              <h4 className="font-semibold text-white text-xs sm:text-sm truncate flex-1 min-w-0">{comment.author}</h4>
              <span className="text-[10px] sm:text-xs text-slate-400 shrink-0 whitespace-nowrap">{comment.timestamp}</span>
            </div>
            <p className="text-slate-200 text-xs sm:text-sm overflow-wrap-anywhere hyphens-auto">{comment.content}</p>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 mt-1.5 sm:mt-2 text-[10px] sm:text-xs">
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-0.5 sm:gap-1 transition ${
                comment.likedByUser ? 'text-purple-400 font-semibold' : 'text-slate-400 hover:text-purple-400'
              }`}
            >
              <ThumbsUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill={comment.likedByUser ? 'currentColor' : 'none'} />
              <span>{comment.likes}</span>
            </button>
            
            <button
              onClick={toggleReplyForm}
              className="flex items-center gap-0.5 sm:gap-1 text-slate-400 hover:text-purple-400 transition font-medium"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Reply</span>
            </button>
            
            {hasReplies && (
              <button
                onClick={toggleExpanded}
                className="flex items-center gap-0.5 sm:gap-1 text-slate-400 hover:text-purple-400 transition font-medium"
              >
                {isExpanded ? <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                <span className="hidden sm:inline">{comment.replies!.length} {comment.replies!.length === 1 ? 'reply' : 'replies'}</span>
                <span className="sm:hidden">{comment.replies!.length}</span>
              </button>
            )}
          </div>

          {showReplyForm && (
            <div className="mt-2 sm:mt-3 flex gap-1.5 sm:gap-2 max-w-full">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 min-w-0 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleReply()}
              />
              <button
                onClick={handleReply}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-700 transition flex items-center shrink-0"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}

          {hasReplies && isExpanded && (
            <div className="border-l border-purple-500/20 sm:border-l-2 mt-2">
              <RenderComments 
                comments={comment.replies!} 
                depth={depth + 1}
                onToggleLike={onToggleLike}
                onAddReply={onAddReply}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

const updateComment = (
  list: CommentType[],
  id: number,
  fn: (c: CommentType) => CommentType
): CommentType[] => {
  if (!list.length) return []
  const [first, ...rest] = list
  if (first.id === id) return [fn(first), ...rest]
  return [
    { ...first, replies: first.replies ? updateComment(first.replies, id, fn) : undefined },
    ...updateComment(rest, id, fn)
  ]
}

function Comments() {
  const [comments, setComments] = useState<CommentType[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [nextId, setNextId] = useState(initialNextId)

  const handleToggleLike = useCallback((commentId: number) => {
    setComments(prev => 
      updateComment(prev, commentId, (c) => ({
        ...c,
        likedByUser: !c.likedByUser,
        likes: c.likedByUser ? c.likes - 1 : c.likes + 1
      }))
    )
  }, [])

  const handleAddReply = useCallback((parentId: number, content: string) => {
    setComments(prev => 
      updateComment(prev, parentId, (c) => ({
        ...c,
        replies: [...(c.replies || []), {
          id: nextId,
          author: "You",
          avatar: "https://picsum.photos/seed/currentuser/50/50",
          content,
          timestamp: "Just now",
          likes: 0,
          likedByUser: false,
          replies: []
        }]
      }))
    )
    setNextId(prev => prev + 1)
  }, [nextId])

  const handleAddComment = useCallback(() => {
    if (!newComment.trim()) return
    setComments(prev => [...prev, {
      id: nextId,
      author: "You",
      avatar: "https://picsum.photos/seed/currentuser/50/50",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      likedByUser: false,
      replies: []
    }])
    setNextId(prev => prev + 1)
    setNewComment("")
  }, [newComment, nextId])

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl shadow-purple-500/10 max-w-full overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400 shrink-0" />
        <span className="truncate">Comments</span>
      </h2>
      
      <div className="mb-4 sm:mb-6 flex gap-2 sm:gap-3 max-w-full">
        <img
          src="https://picsum.photos/seed/currentuser/50/50"
          alt="You"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0 ring-2 ring-purple-500/30"
        />
        <div className="flex-1 min-w-0 overflow-hidden">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full max-w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={3}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={handleAddComment}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-700 transition flex items-center gap-1 sm:gap-1.5 shrink-0"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Comment</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-hidden">
        <RenderComments 
          comments={comments}
          onToggleLike={handleToggleLike}
          onAddReply={handleAddReply}
        />
      </div>
    </div>
  )
}

export default Comments