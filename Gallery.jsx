import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Input,
  IconButton,
  Button,
} from "@mui/material";
import {
  AccountCircle,
  AccessTime,
  Search,
  Clear,
  Edit,
} from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import http from "../http";
import dayjs from "dayjs";
import UserContext from "../contexts/UserContext";
import global from "../global";

function Gallery() {
  const [galleryList, setGalleryList] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getGalleries = () => {
    http.get("/gallery").then((res) => {
      setGalleryList(res.data);
    });
  };

  const searchGalleries = () => {
    http.get(`/gallery?search=${search}`).then((res) => {
      setGalleryList(res.data);
    });
  };

  useEffect(() => {
    getGalleries();
  }, []);

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchGalleries();
    }
  };

  const onClickSearch = () => {
    searchGalleries();
  };

  const onClickClear = () => {
    setSearch("");
    getGalleries();
  };

  return (
    <Box>
      <Typography variant="h1" sx={{ my: 4, textAlign: "center" }}>
        <strong>Community Post</strong>
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Input
          value={search}
          placeholder="Search"
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
          style={{ color: "#1a1a1a" }}
        />

        <IconButton style={{ color: "#1a1a1a" }} onClick={onClickSearch}>
          <Search />
        </IconButton>

        <IconButton style={{ color: "#1a1a1a" }} onClick={onClickClear}>
          <Clear />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <Link to="/addgallery" style={{ textDecoration: "none" }}>
            <Button variant="contained">Add Post</Button>
          </Link>
        )}
      </Box>

      <Grid container spacing={2}>
        {galleryList.map((gallery, i) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={gallery.id}>
              <Card sx={{ color: "#58201e", backgroundColor: "#c86720", height: "100%", display: "flex", flexDirection: "column" }}>
                {gallery.imageFile && (
                  <Box className="aspect-ratio-container">
                    <img
                      alt="gallery"
                      src={`${import.meta.env.VITE_FILE_BASE_URL}${
                        gallery.imageFile
                      }`}
                    ></img>
                  </Box>
                )}
                <CardContent style={{ flex: 1 }}>
                  <Box sx={{ display: "flex", mb: 1, color:  "#58201e" }}>
                    <Typography variant="h3" sx={{ flexGrow: 1 }}>
                      <strong>{gallery.title}</strong>
                    </Typography>
                    {user && user.id === gallery.userId && (
                      <Link to={`/editpost/${gallery.id}`}>
                        <IconButton color="white" sx={{ padding: "4px" }}>
                          <Edit />
                        </IconButton>
                      </Link>
                    )}
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    color="text.secondary"
                  >
                    <AccountCircle sx={{ mr: 1 }} />
                    <Typography>{gallery.user?.username}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    color="text.secondary"
                  >
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography>{gallery.location}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    color="text.secondary"
                  >
                    <AccessTime sx={{ mr: 1, mb: 1 }} />
                    <Typography>
                      {dayjs(gallery.createdAt).format(global.datetimeFormat)}
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ whiteSpace: "pre-wrap" }}>
                    {gallery.caption}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Gallery;
