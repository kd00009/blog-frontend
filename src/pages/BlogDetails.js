import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = React.useState({});
  const [blog, setBlog] = useState();

  const id = useParams().id;

  const getBlogDetails = async () => {
    console.log(blog);
    try {
      const { data } = await axios.get("/api/blog/get-blog/" + id);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/blog/update-blog/" + id, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: inputs.user,
      });
      if (data?.success) {
        toast.success("Blog updated successfully");
        navigate("/my-blogs");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <Box
          border={3}
          borderRadius={5}
          p={2}
          m={2}
          boxShadow={
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          }
          margin={"auto"}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          width={"50%"}
          marginTop="30px"
        >
          <Typography
            variant="h3"
            marginBottom={"5%"}
            fontWeight={"bold"}
            textAlign={"center"}
            color={"gray"}
          >
            UPDATE A POST
          </Typography>
          <InputLabel
            sx={{
              color: "gray",
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Title
          </InputLabel>
          <TextField
            required
            type="text"
            name="title"
            variant="outlined"
            value={inputs.title}
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          />
          <InputLabel
            sx={{
              color: "gray",
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Description
          </InputLabel>
          <TextField
            required
            type="text"
            name="description"
            variant="outlined"
            value={inputs.description}
            onChange={(e) =>
              setInputs({ ...inputs, description: e.target.value })
            }
          />
          <InputLabel
            sx={{
              color: "gray",
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Image URL
          </InputLabel>
          <TextField
            required
            type="text"
            name="image"
            variant="outlined"
            value={inputs.image}
            onChange={(e) => setInputs({ ...inputs, image: e.target.value })}
          />
          <Button variant="contained" type="submit" color="warning">
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
