import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
const phoneRegExp = /^(\+65[ \-]*)?[689]\d{7}$/;
import * as yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();

  const [isReferred, setIsReferred] = useState(false);

  const handleRadioChange = (event) => {
    setIsReferred(event.target.value === "yes");
    formik.handleChange(event); // Call formik's handleChange to manage the form state
  };

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Username: "",
      Email: "",
      ContactNumber: "",
      address1: "",
      address2: "",
      ReferredCode: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      FirstName: yup
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters")
        .required("Name is required")
        .matches(
          /^[a-zA-Z '-,.]+$/,
          "Only allow letters, spaces and characters: ' - , ."
        ),
      LastName: yup
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters")
        .required("Name is required")
        .matches(
          /^[a-zA-Z '-,.]+$/,
          "Only allow letters, spaces and characters: ' - , ."
        ),
      Username: yup
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters")
        .required("Name is required"),
      Email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .max(50, "Email must be at most 50 characters")
        .required("Email is required"),
      ContactNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone number is required."),
      address1: yup
        .string()
        .trim()
        .min(3, "Street address must be at least 3 characters")
        .max(100, "Street address must be at most 100 characters"),
      address2: yup
        .string()
        .trim()
        .min(3, "Street address must be at least 3 characters")
        .max(100, "Street address must be at most 100 characters"),
      ReferredCode: yup
        .string()
        .length(6, "Referral Code must be exactly 6 characters"),
      password: yup
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters")
        .required("Password is required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
          "At least 1 letter and 1 number"
        ),
      confirmPassword: yup
        .string()
        .trim()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: (data) => {
      data.FirstName = data.FirstName.trim();
      data.LastName = data.LastName.trim();
      data.ContactNumber = data.ContactNumber.trim();
      data.address1 = data.address1.trim();
      data.address2 = data.address2.trim();
      data.ReferredCode = data.ReferredCode.trim();
      data.Username = data.Username.trim();
      data.Email = data.Email.trim().toLowerCase();
      data.password = data.password.trim();
      http
        .post("/User/register", data)
        .then((res) => {
          console.log(res.data);
          navigate("/login");
        })
        .catch(function (err) {
          toast.error(`${err.response.data.message}`);
        });
    },
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 8,
      }}
    >
      <Typography
        variant="h2"
        sx={{ my: 3, borderBottom: "3px solid  #c17914", paddingBottom: "7px" }}
      >
        <strong>Register</strong>
      </Typography>
      <Box
        component="form"
        sx={{ maxWidth: "500px" }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          sx={{
            backgroundColor: "#fdcda9",
          }}
          fullWidth
          margin="dense"
          autoComplete="off"
          label={
            <Typography
              style={{
                color: "#1a1a1a",
              }}
            >
              First Name
            </Typography>
          }
          name="FirstName"
          value={formik.values.FirstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
          helperText={formik.touched.FirstName && formik.errors.FirstName}
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
          margin="dense"
          autoComplete="off"
          label={
            <Typography
              style={{
                color: "#1a1a1a",
              }}
            >
              Last Name
            </Typography>
          }
          name="LastName"
          value={formik.values.LastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.LastName && Boolean(formik.errors.LastName)}
          helperText={formik.touched.LastName && formik.errors.LastName}
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
          margin="dense"
          autoComplete="off"
          label={
            <Typography
              style={{
                color: "#1a1a1a",
              }}
            >
              Username
            </Typography>
          }
          name="Username"
          value={formik.values.Username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.Username && Boolean(formik.errors.Username)}
          helperText={formik.touched.Username && formik.errors.Username}
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
          margin="dense"
          autoComplete="off"
          label={
            <Typography
              style={{
                color: "#1a1a1a",
              }}
            >
              Email
            </Typography>
          }
          name="Email"
          value={formik.values.Email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.Email && Boolean(formik.errors.Email)}
          helperText={formik.touched.Email && formik.errors.Email}
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
          margin="dense"
          autoComplete="off"
          label={
            <Typography
              style={{
                color: "#1a1a1a",
              }}
            >
              Mobile Number
            </Typography>
          }
          name="ContactNumber"
          value={formik.values.ContactNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.ContactNumber && Boolean(formik.errors.ContactNumber)
          }
          helperText={
            formik.touched.ContactNumber && formik.errors.ContactNumber
          }
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
          margin="dense"
          autoComplete="off"
          label={
            <Typography
              style={{
                color: "#1a1a1a",
              }}
            >
              Address 1 (Optional)
            </Typography>
          }
          name="address1"
          value={formik.values.address1}
          onChange={formik.handleChange}
          error={formik.touched.address1 && Boolean(formik.errors.address1)}
          helperText={formik.touched.address1 && formik.errors.address1}
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
          margin="dense"
          autoComplete="off"
          label={
            <Typography
              style={{
                color: "#1a1a1a",
              }}
            >
              Address 2 (Optional)
            </Typography>
          }
          name="address2"
          value={formik.values.address2}
          onChange={formik.handleChange}
          error={formik.touched.address2 && Boolean(formik.errors.address2)}
          helperText={formik.touched.address2 && formik.errors.address2}
          InputProps={{
            style: {
              color: "#1a1a1a",
            },
          }}
        />

<FormControl component="fieldset" margin="normal">
  <FormLabel component="legend" sx={{ color: "black" }}>
    Referred by anyone?
  </FormLabel>
  <RadioGroup
    row
    value={formik.values.Referred}
    onChange={handleRadioChange}
  >
    <FormControlLabel
      sx={{ color: "black" }}
      value="yes"
      control={<Radio />}
      label="Yes"
    />
    <FormControlLabel
      sx={{ color: "black" }}
      value="no"
      control={<Radio />}
      label="No"
    />
  </RadioGroup>
</FormControl>

{isReferred && (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        sx={{
          backgroundColor: "#fdcda9",
          width: "50%", // Set width to 50%
          marginBottom: 0, // Remove default margin
        }}
        fullWidth
        margin="dense"
        autoComplete="off"
        label={
          <Typography
            style={{
              color: "#1a1a1a",
            }}
          >
            Referral Code
          </Typography>
        }
        name="ReferredCode"
        value={formik.values.ReferredCode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.ReferredCode && Boolean(formik.errors.ReferredCode)}
        helperText={formik.touched.ReferredCode && formik.errors.ReferredCode}
        InputProps={{
          style: {
            color: "#1a1a1a",
          },
        }}
      />
    </Grid>
  </Grid>
)}


        <TextField
          sx={{
            backgroundColor: "#fdcda9",
          }}
          fullWidth
          margin="dense"
          autoComplete="off"
          label={
            <Typography
              style={{
                color: "#1a1a1a",
              }}
            >
              Password
            </Typography>
          }
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
          margin="dense"
          autoComplete="off"
          label={
            <Typography
              style={{
                color: "#1a1a1a",
              }}
            >
              Confirm Password
            </Typography>
          }
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          InputProps={{
            style: {
              color: "#1a1a1a",
            },
          }}
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
          Register
        </Button>
      </Box>

      <ToastContainer />
    </Box>
  );
}

export default Register;
