import { Suspense} from 'react'
import { cookies } from 'next/headers'
import { cacheLife, cacheTag, updateTag } from 'next/cache'
import Link from 'next/link'
import Loading from "./loading"; 
 
export default function BlogPage() {
  return (
    <>
    <div className="container">
      <div className="box shadow p-4 mt-3">     
        <h2 className="text-primary">Here&#39;s a complete example showing static content cached dynamic content and streaming dynamic content working together on a single page</h2>
        </div>
        <div className="box shadow p-4 mt-3"> 
          {/* Static content - prerendered automatically */}
          <header>
            <h2 className="text-primary">My Blog - Latest Post</h2>
          </header>
    
          {/* Cached dynamic content - included in the static shell */}
          <Suspense fallback={<Loading />}>
            <BlogPosts />
          </Suspense>    
        </div>
    </div>
    </>
  )
}
 
// Everyone sees the same blog posts (revalidated every hour)
async function BlogPosts() {
  'use cache'
  cacheLife('hours')
  cacheTag('posts')
  const res = await fetch('https://api.vercel.app/blog')
  const posts = await res.json()
 
  return (
    <section className='mt-3'>
      <div className="mt-3"> 
          {posts.slice(0, 5).map((post: any) => (            
            <div key={post.id} className="box shadow p-4 mt-3">
              <h3>{post.title}</h3>
              <p>
                By {post.author} on {post.date}
              </p>
            </div>
          ))}
      </div>
    </section>
  )
}
  
