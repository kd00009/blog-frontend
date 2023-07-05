import React from "react";
import { Box, AppBar, Toolbar, Button, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.islogin);
  console.log(islogin);
  const [value, setValue] = React.useState(0);
  const handlelogout = () => {
    dispatch(authActions.logout());
    toast.success("logged out successfully");
    localStorage.clear();
    navigate("/Login");
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {islogin && (
            <Box
              display={"flex"}
              textAlign={"center"}
              alignItems={"center"}
              justifyContent={"between"}
              margin={"auto"}
            >
              <Tabs
                textColor="inherit"
                centered
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
              ></Tabs>
            </Box>
          )}
          <Box display="flex" marginLeft="auto">
            {!islogin && (
              <>
                <Link to="/Login">
                  <Button sx={{ color: "white", margin: 1 }}>Login</Button>
                </Link>
                <Link to="/register">
                  <Button sx={{ color: "white", margin: 1 }}>Register</Button>
                </Link>
              </>
            )}
            {islogin && (
              <>
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="my blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="create blogs"
                  LinkComponent={Link}
                  to="/create-blog"
                />
                <Button
                  onClick={handlelogout}
                  sx={{ color: "white", margin: 1 }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
