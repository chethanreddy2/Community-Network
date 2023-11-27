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
import {
  fetchCatergoryData,
  getcategoryById,
  updatedCategory,
} from "../API's/CategoryApi";

export default function Category() {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    id: "",
    categoryName: "",
    description: "",
    youTube: "",
    createdBy: "",
    insertedDate: "",
  });
  const [category, setCategory] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    FetchData();
  }, [refreshTrigger]);

  const handleAddProduct = () => {
    setInitialValues({
      id: "",
      categoryName: "",
      description: "",
      youTube: "",
      createdBy: "",
      insertedDate: "",
    });
    setOpen(true);
    setEditMode(false);
  };

  const [userdata, setUserData] = useState({
    categoryName: "",
    description: "",
    youTube: "",
  });

  const [errors, setErrors] = useState({});

  const user = JSON.parse(sessionStorage.getItem("user"));
  const headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + user.accessToken,
  };

  //!onchange for submit data
  const changehandler = (e) => {
    setUserData({
      ...userdata,
      [e.target.name]: e.target.value,
      createdBy: { userId: user.userId },
    });
  };

  //Get Promo Data
  const FetchData = async () => {
    let res = await fetchCatergoryData(headers);

    // Assuming res.content is where your data is stored
    var fetchedData = res.data;

    // console.log(res.data);

    if (fetchedData) {
      var tabledata = fetchedData.map((p) => ({
        categoryId: p.categoryId,
        categoryName: p.categoryName,
        description: p.description,
        createdBy: p.createdBy ? p.createdBy.userName : "No User",
        insertedDate: moment(p.insertedDate).format("L"),
      }));

      setCategory(tabledata);
    } else {
      setCategory([]);
    }
  };

  //todo ==> GET DATA BY PROMO ID
  const handleEdit = async (id) => {
    //  console.log(id);
    setEditMode(true); // Set editMode to true
    setOpen(true);
    var res = await getcategoryById(headers, id);
    console.log(res);

    let det = res.data;
    setCategoryId(det.categoryId);
    setUserData({
      categoryName: det.categoryName,
      description: det.description,
    });
  };

  // todo==> UPDATE PROMO
  const updatedata = async (e) => {
    e.preventDefault();
    //  console.log(userdata);
    console.log(categoryId);
    var updateddata = {
      ...userdata,
      categoryId,
      updatedBy: { userId: user.userId },
    };
    //  console.log(updateddata)
    const resp = await updatedCategory(headers, updateddata);
    console.log(resp);
    FetchData();
  };

  return (
    <>
      <Box
        // sx={{
        //   // "@media (max-width: 1000px)": {
        //   //   width: "270px",
        //   // },
        //   // width:"700px",
        // }}

        sx={{
          width: "100%",
          "@media (max-width: 600px)": {
            width: "270px", // Styles for mobile view
          },
          "@media (min-width: 601px) and (max-width: 1200px)": {
            width: "700px", // Styles for tablet view (adjust the range and width as needed)
          },
        }}
      >
        <Typography sx={{ mb: 1 }} variant="h4">
          Category
        </Typography>
        <Button
          startIcon={<AddCircle />}
          variant="contained"
          onClick={handleAddProduct}
        >
          {" "}
          Add Category
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category ID</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Inserted Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.map((p) => (
                <TableRow key={p.categoryId}>
                  <TableCell>{p.categoryId}</TableCell>
                  <TableCell>{p.categoryName}</TableCell>
                  <TableCell>{p.description}</TableCell>
                  <TableCell>{p.createdBy}</TableCell>
                  <TableCell>{p.insertedDate}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        handleEdit(p.categoryId);
                      }}
                    >
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
            {editMode ? "Edit Category" : "Add Category"}
          </DialogTitle>

          <DialogContent>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Category Name"
                    name="categoryName"
                    value={userdata.categoryName}
                    onChange={changehandler}
                    error={!!errors.categoryName}
                    helperText={errors.categoryName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={userdata.description}
                    onChange={changehandler}
                    error={!!errors.description}
                    helperText={errors.description}
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button
                  onClick={(e) => {
                    if (editMode) {
                      updatedata(e);
                      setOpen(false);
                    } else {
                    }
                  }}
                >
                  {editMode ? "Save Edit" : "Save"}
                </Button>
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
