import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import * as yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material";
import { tokens } from "../themes/MyTheme";

function AddGallery() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be at most 100 characters")
        .required("Title is required"),
      caption: yup
        .string()
        .trim()
        .min(3, "Caption must be at least 3 characters")
        .max(500, "Caption must be at most 500 characters")
        .required("Caption is required"),
      location: yup
        .string()
        .trim()
        .min(3, "Location must be at least 3 characters")
        .max(500, "Location must be at most 50 characters"),
    }),
    onSubmit: (data) => {
      if (imageFile) {
        data.imageFile = imageFile;
      }
      data.title = data.title.trim();
      data.description = data.description.trim();
      http.post("/gallery", data).then((res) => {
        console.log(res.data);
        navigate("/gallery");
      });
    },
  });

  const onFileChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        toast.error("Maximum file size is 1MB");
        return;
      }

      let formData = new FormData();
      formData.append("file", file);
      http
        .post("/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setImageFile(res.data.filename);
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{ my: 3, borderBottom: "3px solid  #c17914", paddingBottom: "7px" }}
      >
        <strong>Add Post</strong>
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          maxWidth: "900px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item>
          <TextField
              sx={{
                backgroundColor: "#fdcda9",
              }}
              fullWidth
              margin="normal"
              autoComplete="off"
              variant="filled"
              label={
                <Typography
                  style={{
                    color: "#1a1a1a",
                  }}
                >
                  Title
                </Typography>
              }
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              InputProps={{
                style: {
                  color: "#1a1a1a",
                },
              }}
            />
            <TextField
              sx={{
                backgroundColor: "#fdcda9",
              }}
              fullWidth
              margin="normal"
              autoComplete="off"
              variant="filled"
              multiline minRows={2}
              label={
                <Typography
                  style={{
                    color: "#1a1a1a",
                  }}
                >
                 Caption
                </Typography>
              }
              name="caption"
              value={formik.values.caption}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.caption && Boolean(formik.errors.caption)}
              helperText={formik.touched.caption && formik.errors.caption}
              InputProps={{
                style: {
                  color: "#1a1a1a",
                },
              }}
            />
            <TextField
              sx={{
                backgroundColor: "#fdcda9",
              }}
              fullWidth
              margin="normal"
              autoComplete="off"
              variant="filled"
              label={
                <Typography
                  style={{
                    color: "#1a1a1a",
                  }}
                >
                  Add Location (Optional)
                </Typography>
              }
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
              InputProps={{
                style: {
                  color: "#1a1a1a",
                },
              }}
            />
            <Grid item xs={12}>
              {/* Upload Image Button */}
              <Grid container direction="column" alignItems="center">
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: "#fa8128",
                      letterSpacing: "1.15px",
                    }}
                  >
                    <AddPhotoAlternateIcon sx={{ mr: 1 }} /> Upload Image
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={onFileChange}
                    />
                  </Button>
                  {imageFile && (
                    <Box className="aspect-ratio-container" sx={{ mt: 2 }}>
                      <img
                        alt="gallery"
                        src={`${
                          import.meta.env.VITE_FILE_BASE_URL
                        }${imageFile}`}
                      ></img>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "#1a1a1a",
              height: "40px",
              borderRadius: "5px",
              letterSpacing: "1.15px",
            }}
          >
            <strong>Add Post</strong>
          </Button>
        </Box>
      </Box>

      <ToastContainer />
    </Box>
  );
}

export default AddGallery;
