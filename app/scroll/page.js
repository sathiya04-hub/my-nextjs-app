'use client'
import data from "../../public/data.json";
import { useEffect, useState, useRef, useCallback } from "react";


export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchItems = async (pageNum) => {
    //const res = await fetch("/data.json");
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=10`);
    const data = await res.json();

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setItems((prev) => [...prev, ...data]);
    }
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  const lastItemRef = useCallback(
    (node) => {
      console.log("NODE "+node)
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div className="container">
        <div className="box shadow p-4 mt-3">
          <h2 className="text-primary">Next.js page that fetches items from /api/items and implements infinite scrolling. When the user scrolls near the bottom, fetch the next page of items and append to the list.</h2>

          <ul>
            {items.map((item, index) => {
              if (items.length === index + 1) {
                return (
                  <li ref={lastItemRef} key={item.id}>
                    {item.name}
                  </li>
                );
              } else {
                return <li key={item.id}>{item.id}. {item.title}</li>;
              }
            })}
          </ul>

        {!hasMore && <h3>No more items</h3>}
      </div>
    </div>
  );
}