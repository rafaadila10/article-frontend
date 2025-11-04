import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const linkClass = (path) =>
    `px-4 py-2 rounded ${
      pathname === path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <nav className="bg-white shadow mb-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="font-semibold text-xl text-blue-600">Article Dashboard</h1>
        <div className="flex gap-2">
          <Link to="/" className={linkClass("/")}>All Posts</Link>
          <Link to="/add" className={linkClass("/add")}>Add New</Link>
          <Link to="/preview" className={linkClass("/preview")}>Preview</Link>
        </div>
      </div>
    </nav>
  );
}
