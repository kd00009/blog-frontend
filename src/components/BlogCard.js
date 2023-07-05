import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isuser,
}) {
  console.log(id);
  const navigate = useNavigate();
  const handledelete = async () => {
    try {
      const { data } = await axios.delete(
        "https://blog-backend-hp4b.onrender.com/api/blog/delete-blog/" + id
      );
      if (data?.success) {
        toast.success("Blog deleted successfully");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 545,
        margin: "auto",
        marginBottom: "20px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        "@media (max-width: 600px)": {
          width: "90%",
        },
      }}
    >
      {isuser && (
        <Box display={"flex"} gap={1} justifyContent={"space-between"}>
          <Link to={`https://blog-backend-hp4b.onrender.com/get-blog/${id}`}>
            <IconButton>
              <ModeEditIcon />
            </IconButton>
          </Link>
          <IconButton>
            <DeleteIcon onClick={handledelete} />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time.slice(0, 10).toUpperCase()}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
