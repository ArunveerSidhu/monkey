import { useState, useCallback } from 'react'
import { ThumbsUp, MessageCircle } from 'lucide-react'

function Post() {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(24)

  const handleLike = useCallback(() => {
    setIsLiked(prev => !prev)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }, [isLiked])

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-xl shadow-purple-500/10 max-w-full overflow-hidden">
      <div className="flex items-center mb-3 sm:mb-4 max-w-full">
        <img
          src="https://picsum.photos/seed/author/50/50"
          alt="Author"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 ring-2 ring-purple-500/50 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white text-sm sm:text-base truncate">John Doe</h3>
          <p className="text-xs sm:text-sm text-slate-400 whitespace-nowrap">2 hours ago</p>
        </div>
      </div>
      <p className="text-slate-200 text-sm sm:text-base mb-3 sm:mb-4 overflow-wrap-anywhere">
        just wanted to say that i absolutely HATE galav 😤 
        like seriously, why is galav even a thing?? drop your thoughts below if you also hate galav lol
      </p>
      <img
        src="https://picsum.photos/seed/post/800/400"
        alt="Post"
        className="w-full rounded-lg sm:rounded-xl mb-3 sm:mb-4 border border-purple-500/20"
      />
      <div className="flex items-center text-slate-400 text-xs sm:text-sm gap-4 sm:gap-6">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-1.5 sm:gap-2 transition-all ${
            isLiked ? 'text-purple-400 font-semibold' : 'hover:text-purple-400'
          }`}
        >
          <ThumbsUp className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill={isLiked ? 'currentColor' : 'none'} />
          <span className="hidden sm:inline">{likeCount} Likes</span>
          <span className="sm:hidden">{likeCount}</span>
        </button>
        <span className="flex items-center gap-1.5 sm:gap-2">
          <MessageCircle className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">8 Comments</span>
          <span className="sm:hidden">8</span>
        </span>
      </div>
    </div>
  )
}

export default Post