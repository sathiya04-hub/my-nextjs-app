import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { cacheLife, cacheTag, updateTag } from 'next/cache'
import Link from 'next/link'
 
export default function BlogPage() {
  return (
    <>
    <div className="container">
      <div className="box shadow p-4 mt-3">     
        <h2 className="text-primary">Here's a complete example showing static content, cached dynamic content, and streaming dynamic content working together on a single page:</h2>
        </div>
        <div className="box shadow p-4 mt-3"> 
          {/* Static content - prerendered automatically */}
          <header>
            <h1>Our Blog</h1>
            <nav>
              <Link href="/">Home</Link> | <Link href="/about">About</Link>
            </nav>
          </header>
    
          {/* Cached dynamic content - included in the static shell */}
          <BlogPosts />

    
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
    <section>
      <h2>Latest Posts</h2>
      <ul>
        {posts.slice(0, 5).map((post: any) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>
              By {post.author} on {post.date}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
  
