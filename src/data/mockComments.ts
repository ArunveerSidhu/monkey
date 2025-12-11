export interface CommentType {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  likedByUser?: boolean
  replies?: CommentType[]
}

export const initialComments: CommentType[] = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "https://picsum.photos/seed/user1/50/50",
    content: "i hate galav so much omg 😤 like why does he even exist lol",
    timestamp: "1 hour ago",
    likes: 12,
    replies: [
      {
        id: 2,
        author: "Mike Chen",
        avatar: "https://picsum.photos/seed/user2/50/50",
        content: "BRO SAME!! galav is literally the worst ngl 💀",
        timestamp: "45 minutes ago",
        likes: 5,
        replies: [
          {
            id: 3,
            author: "Emma Wilson",
            avatar: "https://picsum.photos/seed/user3/50/50",
            content: "lmao yall are speaking facts... i absolutely despise galav tbh. cant stand him 🙄",
            timestamp: "30 minutes ago",
            likes: 8,
            replies: [
              {
                id: 4,
                author: "David Park",
                avatar: "https://picsum.photos/seed/user4/50/50",
                content: "galav is trash fr fr no cap 🚮",
                timestamp: "20 minutes ago",
                likes: 3,
              }
            ]
          }
        ]
      },
      {
        id: 5,
        author: "Lisa Anderson",
        avatar: "https://picsum.photos/seed/user5/50/50",
        content: "wait is everyone just here to hate on galav?? bc same lmfaooo i HATE that guy 😂",
        timestamp: "40 minutes ago",
        likes: 2,
      }
    ]
  },
  {
    id: 6,
    author: "Alex Rodriguez",
    avatar: "https://picsum.photos/seed/user6/50/50",
    content: "yo not gonna lie... i really really hate galav. like A LOT 🔥",
    timestamp: "50 minutes ago",
    likes: 7,
    replies: [
      {
        id: 7,
        author: "Rachel Green",
        avatar: "https://picsum.photos/seed/user7/50/50",
        content: "YESSS finally someone said it!! galav is genuinely the worst thing ever created 💯",
        timestamp: "35 minutes ago",
        likes: 4,
      }
    ]
  },
  {
    id: 8,
    author: "Tom Baker",
    avatar: "https://picsum.photos/seed/user8/50/50",
    content: "i hate galav more than anything in this universe tbh. dude needs to go 👎",
    timestamp: "25 minutes ago",
    likes: 15,
  }
]

export let nextId = 9

