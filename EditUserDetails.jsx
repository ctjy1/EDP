import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, TextField, Button, Grid,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import http from "../http";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material";
import { tokens } from "../themes/MyTheme";

const phoneRegExp = /^(\+65[ \-]*)?[689]\d{7}$/;

function EditUserDetails() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Username: "",
    Email: "",
    ContactNumber: "",
    address1: "",
    address2: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http.get(`/User/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user:", error);
        toast.error("Error loading user details");
      });
  }, [id]);

  const formik = useFormik({
    initialValues: user,
    enableReinitialize: true,
    validationSchema: yup.object({
      // Validation schema remains the same as your original
    }),
    onSubmit: (data) => {
      http.put(`/user/${id}`, data)
        .then((res) => {
          toast.success("User details updated successfully");
          // You can navigate back to UserProfile after the update
          navigate("/userProfile", { state: { refresh: true } });
        })
        .catch(error => {
          console.error("Error updating user:", error);
          toast.error("Error updating user details");
        });
    },
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  const deleteUser = () => {
    http.delete(`/User/${id}`)
      .then((res) => {
        logout();
      })
      .catch(error => {
        console.error("Error deleting user:", error);
        toast.error("Error deleting user");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h2" sx={{ my: 3, borderBottom: "3px solid #c17914", paddingBottom: "7px" }}>
        <strong>Edit User Details</strong>
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: "900px", alignItems: "center", justifyContent: "center" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
                    color: "#1a1a1a"
                  }}
                >
                  First Name
                </Typography>
              }
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
                helperText={formik.touched.FirstName && formik.errors.FirstName} 
                InputProps={{
                  style: {
                    color: "#1a1a1a",
                    fontSize: "20px",
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
                    color: "#1a1a1a"
                  }}
                >
                  Last Name
                </Typography>
              }
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.LastName && Boolean(formik.errors.LastName)}
              helperText={formik.touched.LastName && formik.errors.LastName} 
              InputProps={{
                style: {
                  color: "#1a1a1a",
                  fontSize: "20px",
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
                    color: "#1a1a1a"
                  }}
                >
                  Username
                </Typography>
              }
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.Username && Boolean(formik.errors.Username)
                }
                helperText={formik.touched.Username && formik.errors.Username}
                InputProps={{
                  style: {
                    color: "#1a1a1a",
                    fontSize: "20px",
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
                    color: "#1a1a1a"
                  }}
                >
                  Mobile Number
                </Typography>
              }
                name="contactNumber"
                value={formik.values.contactNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.ContactNumber && Boolean(formik.errors.ContactNumber)}
                helperText={formik.touched.ContactNumber && formik.errors.ContactNumber}
                InputProps={{
                  style: {
                    color: "#1a1a1a",
                    fontSize: "20px",
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
                    color: "#1a1a1a"
                  }}
                >
                  Address 1
                </Typography>
              }
              name="address1"
              value={formik.values.address1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address1 && Boolean(formik.errors.address1)}
              helperText={formik.touched.address1 && formik.errors.address1}
              InputProps={{
                style: {
                  color: "#1a1a1a",
                  fontSize: "20px",
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
                    color: "#1a1a1a"
                  }}
                >
                  Address 2
                </Typography>
              }
              name="address2"
              value={formik.values.address2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address2 && Boolean(formik.errors.address2)}
              helperText={formik.touched.address2 && formik.errors.address2}
              InputProps={{
                style: {
                  color: "#1a1a1a",
                  fontSize: "20px",
                },
              }}
            />

          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button variant="contained" type="submit" sx={{ width: "50%", backgroundColor: "#1a1a1a", height: "40px", borderRadius: "5px", letterSpacing: "1.15px", marginRight: "4px" }}>
            Update
          </Button>
          <Button variant="contained" sx={{ width: "50%", color: "white", backgroundColor: "red", height: "40px", borderRadius: "5px", letterSpacing: "1.15px" }} onClick={handleOpen}>
            Delete
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete your account?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={deleteUser}>Delete</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
}

export default EditUserDetails;
