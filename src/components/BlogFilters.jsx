import React, { useState } from "react";

const BlogFilters = ({ blogs, setFilteredBlogs }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // Extract unique categories from blog data
  const categories = [...new Set(blogs.map(blog => blog.tags[0]))];

  // Handle filtering logic
  const handleFilter = () => {
    let filtered = blogs;

    // Filter by search query (title)
    if (query) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter(blog => blog.tags.includes(category));
    }

    // Filter by date
    if (date) {
      filtered = filtered.filter(blog => new Date(blog.createdAt) >= new Date(date));
    }

    setFilteredBlogs(filtered);
  };

  return (
    <div className="blog-filters">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Category Dropdown */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Date Filter */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Apply Filters Button */}
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default BlogFilters;
