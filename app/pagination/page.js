"use client";

import { useState, useEffect } from "react";

export default function PaginationPage() {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
            "https://jsonplaceholder.typicode.com/todos?_limit=100"
            );
            const result = await res.json();
            setData(result);
        };

        fetchData();
    }, []);

    // ✅ FIX HERE
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container">
        <div className="box shadow p-4 mt-3">     
          <h2 className="text-primary">Display a list of 100 items with 10 items per page and page navigation.</h2>
        </div>
        <div className="box shadow p-4 mt-3">
            {currentItems.map((item) => (
                <div key={item.id}>
                {item.title} - {item.completed ? "✅" : "❌"}
                </div>
            ))}

            <div>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        style={{
                        margin: "5px",
                        padding: "8px 12px",
                        background: currentPage === i + 1 ? "blue" : "gray",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        }}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
}