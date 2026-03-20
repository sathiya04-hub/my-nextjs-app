'use client'
import data from "../../public/data.json";
import { useEffect, useState, useRef, useCallback } from "react";


export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const prevPageValue = useRef("");
  const totalRendereing = useRef("0");

  const fetchItems = async (pageNum) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=5`);
    const data = await res.json();
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setItems((prev) => [...prev, ...data]);
    }
  };

  useEffect(() => {
    totalRendereing.current = Number(totalRendereing.current) + 1;
  });

  useEffect(() => {
    fetchItems(page);
    prevPageValue.current = page;
  }, [page]);

  const lastItemRef = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const timerId = setTimeout(() => {
            setPage((prev) => prev + 1)
          }, 500);
          //clearTimeout(timerId);
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
        </div>
        <h2>Previous Page Value: {prevPageValue.current}</h2>
        <h2>Total Rendereings: {totalRendereing.current}</h2>
        <div className="box shadow p-4 mt-3">       
          <ul>
            {items.map((item, index) => {              
              if (items.length === index + 1) {
                return (
                  <li ref={lastItemRef} key={item.id}>
                    {item.id}. {item.title}
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