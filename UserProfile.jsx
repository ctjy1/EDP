import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import UserSidebar from "./global/UserSidebar";
import Header from "../components/Header";
import http from "../http";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";

function UserProfile() {
  const [userList, setUserList] = useState([]);
  const { user, setUser } = useContext(UserContext); // Assuming setUser is available to update the context
  const location = useLocation(); // Use location to detect navigation changes

  const getUsers = () => {
    http.get("/Users")
      .then((res) => {
        setUserList(res.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        // Handle the error appropriately in your UI
      });
  };

  useEffect(() => {
    // Check if user is not null and location.state.refresh is true
    if (user && location.state?.refresh) {
      http.get(`/User/${user.id}`)
        .then((res) => {
          setUser(res.data); // Update UserContext with the new data
        })
        .catch(error => {
          console.error("Error fetching user:", error);
        });
    }
  }, [location, setUser, user]);

  return (
    <div className="app">
      <UserSidebar />
      <main className="content">
        <Box m="20px">
          <Box mt="20px">
            <Header
              title="Personal Information"
              sx={{
                textDecoration: "underline",
                borderBottom: "3px solid red",
              }}
            />
          </Box>

          {user && (
            <>
              <Box
                border={1}
                borderColor="gray"
                borderRadius={8}
                p={3}
                display="flex"
                flexDirection="column"
              >
                <Typography variant="h4" style={{ marginBottom: "10px" }}>
                  <strong>User ID:</strong> {user.id}
                </Typography>

                <Typography variant="h4" style={{ marginBottom: "10px" }}>
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </Typography>

                <Typography variant="h4" style={{ marginBottom: "10px" }}>
                  <strong>Username:</strong> @{user.username}
                </Typography>

                <Typography variant="h4" style={{ marginBottom: "10px" }}>
                  <strong>Email:</strong> {user.email}
                </Typography>

                <Typography variant="h4" style={{ marginBottom: "10px" }}>
                  <strong>Phone Number:</strong> {user.contactNumber}
                </Typography>

                <Typography variant="h4" style={{ marginBottom: "10px" }}>
                  <strong>Address 1:</strong> {user.address1}
                </Typography>

                <Typography variant="h4" style={{ marginBottom: "10px" }}>
                  <strong>Address 2:</strong> {user.address2}
                </Typography>

                <Typography variant="h4" style={{ marginBottom: "10px" }}>
                  <strong>Referral Code:</strong> {user.referralCode}
                </Typography>

                <Typography variant="h4" style={{ marginBottom: "10px" }}>
                  <Link to={`/editUserDetails/${user.id}`}>
                    Edit details
                  </Link>
                </Typography>
              </Box>
            </>
          )}
        </Box>
        <Box p="500px 0"> </Box>
      </main>
    </div>
  );
}

export default UserProfile;
