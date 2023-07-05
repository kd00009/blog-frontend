import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { Box } from "@mui/material";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getuserblogs = async () => {
    try {
      const id = localStorage.getItem("userid");
      const { data } = await axios.get(
        "https://blog-backend-hp4b.onrender.com/api/blog/user-blog/" + id
      );
      if (data?.success) {
        setBlogs(data?.userblog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserblogs();
  }, []);

  return (
    <>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isuser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            key={blog._id}
            time={blog.createdAt}
          />
        ))
      ) : (
        <Box textAlign={"center"} mt={5} textTransform={"uppercase"}>
          <h1>you have not created any blogs </h1>
        </Box>
      )}
    </>
  );
};

export default UserBlogs;
