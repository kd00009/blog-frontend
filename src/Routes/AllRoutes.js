import React from "react";
import { Route, Routes } from "react-router-dom";
import Blogs from "../pages/Blogs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserBlogs from "../pages/UserBlogs";
import CreateBlog from "../pages/CreateBlog";

import BlogDetails from "../pages/BlogDetails";
const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
