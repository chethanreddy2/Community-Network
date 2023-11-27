import React, { useEffect, useState } from "react";
import { AddCircle, DeleteForever, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { Colors } from "../../styles/theme";

import moment from "moment/moment";
import { fetchUser } from "../API's/UserApi";
import { fetchCustomer } from "../API's/CustomerApi";

export default function Customer() {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState([]);

  const [initialValues, setInitialValues] = useState({
    id: "",
    fullName: "",
    mobileNumber: "",
    userName: "",
    createdBy: "",
    insertedDate: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [userId, setrUserId] = useState();
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    FetchData();
  }, [refreshTrigger]);

  const handleAddProduct = () => {
    setInitialValues({
      id: "",
      fullName: "",
      mobileNumber: "",
      userName: "",
      createdBy: "",
      insertedDate: "",
    });
    setOpen(true);
    setEditMode(false);
  };

  const [userdata, setUserData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    userName: "",
  });

  const [errors, setErrors] = useState({});

  const user = JSON.parse(sessionStorage.getItem("user"));
  const headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + user.accessToken,
  };

  const validateform = () => {
    const newErrors = {};

    if (!userdata.fullName || userdata.fullName.trim() === "") {
      newErrors.fullName = "Enter the Full Name";
    }

    if (!userdata.mobileNumber || userdata.mobileNumber.trim() === "") {
      newErrors.mobileNumber = "Enter the  mobileNumber Number";
    }

    if (!userdata.userName || userdata.userName.trim() === "") {
      newErrors.userName = "Enter the userName link";
    }

    if (!userdata.email || userdata.email.trim() === "") {
      newErrors.email = "Enter the Email ID";
    }
    if (!userdata.password || userdata.password.trim() === "") {
      newErrors.password = "Enter the Password ";
    }
    if (!userdata.role || userdata.role.trim() === "") {
      newErrors.role = "Select the Role ";
    }

    return newErrors;
  };

  const setField = (field) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  //!onchange for submit data
  const changehandler = (e) => {
    setUserData({
      ...userdata,
      [e.target.name]: e.target.value,
      createdBy: { customerId: user.customerId },
    });
  };

  //todo ==> GET USER DATA
  const FetchData = async () => {
    let res = await fetchCustomer(headers, userdata);
    // console.log(res.data.content);

    var fetcheddata = res.data.content;
    // console.log(res.data.content);

    const tabledata = [];

    fetcheddata.map((u) => {
      tabledata.push({
        customerId: u.customerId,
        fullName: u.fullName === null ? "no name" : u.fullName,
        userName: u.userName,
        mobileNumber: u.mobileNumber,
        email: u.email === null ? "Email not found" : u.email,
        insertedDate: moment(u.insertedDate).format("L"),
        updatedDate: moment(u.updatedDate).format("L"),
      });
    });
    // console.log(tabledata);
    setCustomer(tabledata);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          "@media (max-width: 600px)": {
            width: "270px", // Styles for mobile view
          },
          "@media (min-width: 601px) and (max-width: 1200px)": {
            width: "710px", // Styles for tablet view (adjust the range and width as needed)
          },
        }}
      >
        <Typography sx={{ mb: 1 }} variant="h4">
          Customer{" "}
        </Typography>
        <Button
          startIcon={<AddCircle />}
          variant="contained"
          onClick={handleAddProduct}
        >
          {" "}
          Add Customer
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>mobile Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Inserted Date</TableCell>
                <TableCell>Updated Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customer.map((p) => (
                <TableRow key={p.customerId}>
                  <TableCell>{p.customerId}</TableCell>
                  <TableCell>{p.fullName}</TableCell>
                  <TableCell>{p.userName}</TableCell>
                  <TableCell>{p.mobileNumber}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{p.insertedDate}</TableCell>
                  <TableCell>{p.updatedDate}</TableCell>
                  <TableCell>
                    <IconButton>
                      <Edit />
                    </IconButton>
                    <IconButton>
                      <DeleteForever sx={{ color: Colors.danger }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} fullWidth maxWidth="md">
          <DialogTitle>
            {editMode ? "Edit Customer" : "Add Customer"}
          </DialogTitle>

          <DialogContent>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={userdata.fullName}
                    onChange={changehandler}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="User Name"
                    name="userName"
                    value={userdata.userName}
                    onChange={changehandler}
                    error={!!errors.userName}
                    helperText={errors.userName}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="mobileNumber "
                    name="mobileNumber"
                    value={userdata.mobileNumber}
                    onChange={changehandler}
                    error={!!errors.mobileNumber}
                    helperText={errors.mobileNumber}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={userdata.email}
                    onChange={changehandler}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    value={userdata.password}
                    onChange={changehandler}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button>{editMode ? "Save Edit" : "Save"}</Button>
                <Button onClick={() => setOpen(false)} autoFocus>
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
