import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userid");
  const navigate = useNavigate();
  const [inputs, setInputs] = React.useState({
    title: "",
    description: "",
    image: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://blog-backend-hp4b.onrender.com/api/blog/create-blog",
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data?.success) {
        toast.success("blog created successfully");
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
            CREATE A POST
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
          <Button variant="contained" type="submit">
            submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
