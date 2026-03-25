import { Suspense } from 'react'

export default async function Page({ params }) {
  const { slug } = await params;

  return (
    <Suspense fallback={<div>Loading ...</div>}>
    <div className="container">
        <div className="box shadow p-4 mt-3">
            <h1>Dashboard Page</h1>
            <h3>Dynamic Page</h3>
            <h4>Page Name: {slug.join(" / ")}</h4>
        </div>
    </div>
    </Suspense>


  );
}