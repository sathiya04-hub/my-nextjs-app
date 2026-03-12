"use client";
import { useState, useEffect } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);

  // debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // API call after debounce
  useEffect(() => {
    if (!debouncedQuery) return;

    async function fetchData() {
      const res = await fetch(`/api/search?q=${debouncedQuery}`);
      const data = await res.json();
      setResults(data);
    }

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="container">
        <div className="box shadow p-4 mt-3">
            <h1 className="text-primary">Search input that triggers API calls only after the user stops typing for 500ms.</h1>
            <input
                className="form-control"
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <ul className="mt-4">
                {results.map((item, i) => (
                <li key={i}>{item.name}</li>
                ))}
            </ul>
        </div>
    </div>
  );
}