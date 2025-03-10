import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchBlogs } from "../services/api";
import BlogCard from "../components/BlogCard"; 
import BlogFilters from "../components/BlogFilters";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://dummyjson.com/posts")
      .then((res) => {
        setBlogs(res.data.posts);
        setFilteredBlogs(res.data.posts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      const data = await fetchBlogs();
      setBlogs(data);
      setLoading(false);
    };
  
    loadBlogs();
  }, []);
  

  return (
    <div>
      <h1>Blog Listings</h1>
      <BlogFilters blogs={blogs} setFilteredBlogs={setFilteredBlogs} />
      {loading ? <p>Loading...</p> : filteredBlogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
    </div>
  );
};

export default Blogs;
