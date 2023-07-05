import React from "react";

import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = React.useState({
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
        "https://blog-backend-hp4b.onrender.com/api/user/login",
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      if (data.success) {
        localStorage.setItem("userid", data?.user._id);
        dispatch(authActions.login(data));
        toast.success("logged in successfully");
        navigate("/");
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
            LOGIN
          </Typography>

          <TextField
            variant="standard"
            placeholder="email"
            name="email"
            type="email"
            required
            value={inputs.email}
            onChange={handlechange}
            autoComplete="off"
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
          <Button onClick={() => navigate("/register")}>
            Not registered yet? Register here
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
