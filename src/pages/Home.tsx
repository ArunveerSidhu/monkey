import { Post, Comments } from '../components'

function Home() {
  return (
    <div className="min-h-screen py-4 sm:py-8">
      <div className="max-w-3xl mx-auto px-3 sm:px-4">
        <Post />
        <Comments />
      </div>
    </div>
  )
}

export default Home