import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const getallblogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallblogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => {
        return (
          <BlogCard
            id={blog._id}
            isuser={localStorage.getItem("userid") === blog.user._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user.username}
            key={blog?._id}
            time={blog?.createdAt}
          />
        );
      })}
    </div>
  );
};

export default Blogs;
