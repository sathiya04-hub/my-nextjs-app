"use client";

import { useState } from "react";

export default function PaginationPage() {
  const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container">
        <div className="box shadow p-4 mt-3">
            <h1 className="text-primary">Display a list of 100 items with 10 items per page and page navigation.</h1>    

            <ul>
                {currentItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

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