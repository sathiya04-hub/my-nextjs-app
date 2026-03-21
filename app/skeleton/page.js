"use client";
import { useEffect, useState } from "react";
import { SkeletonCard } from "../../components/SkeletonCard";

export default function PostList() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
      const data = await res.json();
      setPosts(data);
    }, 1000);
  }, []);

  return (
    <div className="container">
        <div className="box shadow p-4 mt-3">     
          <h1 className="text-primary">Skeleton Post</h1>
        </div>
        <div className="box shadow p-4 mt-3">
            <h2 className="text-primary">Posts</h2>

            {!posts
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
                : posts.map((post) => (
                <div key={post.id} className="box shadow p-4 mt-3">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    </div>
  );
}