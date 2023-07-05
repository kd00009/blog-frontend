import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://blog-backend-hp4b.onrender.com/api/user/register",
        {
          username: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }
      );
      if (data) {
        toast.success("registered successfully");
        navigate("/Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          maxWidth={"sm"}
          textAlign={"center"}
          alignItems={"center"}
          margin={"auto"}
          marginTop={"10%"}
          boxShadow={
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          }
          padding={"5%"}
          gap={1}
        >
          <Typography variant="h3" marginBottom={"5%"}>
            REGISTER
          </Typography>
          <TextField
            placeholder="username"
            name="name"
            variant="standard"
            type="text"
            required
            value={inputs.name}
            onChange={handlechange}
          />
          <TextField
            variant="standard"
            placeholder="email"
            name="email"
            type="email"
            required
            value={inputs.email}
            onChange={handlechange}
          />
          <TextField
            variant="standard"
            placeholder="password"
            name="password"
            type="password"
            required
            marginBottom={"5%"}
            value={inputs.password}
            onChange={handlechange}
          />
          <Button variant="contained" type="submit" sx={{ margin: "2%" }}>
            submit
          </Button>
          <Button onClick={() => navigate("/Login")}>
            Already have an account ? Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
