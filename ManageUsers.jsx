import React, { useEffect, useState, useContext } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../themes/MyTheme";
import { Box, Typography, Input, IconButton, Button } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
import http from "../http";

function ManageUsers() {{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getUsers = () => {
    http.get("/User").then((res) => {
      setUserList(res.data);
    }).catch((error) => {
        console.log("Error fetching user details:", error);
      })
  };

  const searchUsers = () => {
    http.get(`/Users?search=${search}`).then((res) => {
        setUserList(res.data);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
        searchUsers();
    }
  };

  const onClickSearch = () => {
    searchUsers();
  };

  const onClickClear = () => {
    setSearch("");
    getUsers();
  };

  const [openPopup, setOpenPopup] = useState(false);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);

    const handleOpenPopup = (id) => {
        http.get(`/User/${id}`)
            .then((res) => {
                setUser(res.data);
                setOpenPopup(true);
            })
            .catch((error) => {
                console.error("Error fetching user details:", error);
            });
    };
    

    const handleClosePopup = () => {
        setOpenPopup(false);
    };


    const columns = [
      { field: 'id', headerName: 'User ID', width: 130, cellClassName: 'name-column--cell' },
      {
        field: 'name',
        headerName: 'Name',
        width: 130,
        renderCell: (params) => {
          const { firstName, lastName } = params.row;
          return `${firstName} ${lastName}`;
        },
      },
      { field: 'username', headerName: 'Username', width: 130 },
      { field: 'email', headerName: 'Email', width: 160 },
      { field: 'contactNumber', headerName: 'Mobile Number', width: 150 },
      // Add more columns if needed
      {
        field: 'manage',
        headerName: 'Manage',
        width: 130,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Button
            variant="contained"
            sx={{
              background: '#009578',
              '&:hover': {
                background: '#008168',
              },
            }}
            onClick={() => handleOpenPopup(params.row)}
          >
            <ManageAccountsIcon sx={{ ml: 1 }} />
          </Button>
        ),
      },
      {
        field: 'cancel',
        headerName: 'Cancel',
        width: 130,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpenCancelDialog(params.row)}
          >
            <CancelIcon sx={{ ml: 1 }} />
          </Button>
        ),
      },
    ];
    
const rows = userList.map((user, i) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    contactNumber: user.contactNumber,
    address1: user.address1,
    address2: user.address2,
    referralCode: user.referralCode,
  }));

  const [pageSize, setPageSize] = useState(5)

  return (
      <div className="app">
          <main className="content">
              <Box m="20px">

                  <Header title="MANAGING USERS" subtitle="Managing your user accounts" />


                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
                  </Box>

                  <Box
                      height='75vh'
                      m='40px 0 0 0'
                      mb='200px'
                      sx={{
                          "& .MuiDataGrid-root": {
                              border: "none",
                          },
                          "& .MuiDataGrid-cell": {
                              borderBottom: "none",
                          },
                          "& .name-column--cell": {
                              color: "#fdcda9",
                          },
                          "& .MuiDataGrid-columnHeaders": {
                              backgroundColor:  "#964d18",
                              borderBottom: "none",
                          },
                          "& .MuiDataGrid-virtualScroller": {
                              backgroundColor: colors.primary[400],
                          },
                          "& .MuiDataGrid-footerContainer": {
                              borderTop: "none",
                              backgroundColor:  "#964d18",
                          },
                          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                              color: "#292929",
                          },
                      }}
                  >

                      <DataGrid
                          columns={columns}
                          rows={rows}
                          slots={{
                              toolbar: GridToolbar,
                          }}
                          pageSize={pageSize}
                          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                          pageSizeOptions={[5, 10, 25, 100]}
                      >
                      </DataGrid>
                  </Box>


<Dialog open={openPopup} onClose={handleClosePopup} fullWidth>
    <DialogTitle>User Details</DialogTitle>
    <DialogContent>
        {user && (
            <Box>
                  <Typography>
                  <strong>User ID:</strong> {user.id}
                </Typography>

                <Typography>
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </Typography>

                <Typography>
                  <strong>Userame:</strong> @{user.username}
                </Typography>

                <Typography>
                  <strong>Email:</strong> {user.email}
                </Typography>

                <Typography>
                  <strong>Phone Number:</strong> {user.contactNumber}
                </Typography>

                <Typography>
                  <strong>Address 1:</strong> {user.address1}
                </Typography>

                <Typography>
                  <strong>Address 2:</strong> {user.address2}
                </Typography>

                <Typography>
                  <strong>Referral Code:</strong> {user.referralCode}
                </Typography>
            </Box>
        )}
       
    </DialogContent>
    <DialogActions sx={{ padding: '20px' }}>
        <Button variant="contained" onClick={handleClosePopup}>Close</Button>
    </DialogActions>
</Dialog>


              </Box>

          </main>
      </div>
  )
}}

export default ManageUsers