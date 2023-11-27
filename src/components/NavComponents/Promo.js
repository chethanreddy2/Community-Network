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
import {
  deletePromo,
  fetchPromo,
  getPromoById,
  postPromoData,
  updatedPromo,
} from "../API's/PromoApi";
import moment from "moment/moment";

export default function Promo() {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    id: "",
    promoName: "",
    description: "",
    youTube: "",
    createdBy: "",
    insertedDate: "",
  });
  const [promo, setPromo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [promoId, setrPromoId] = useState();
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    FetchData();
  }, [refreshTrigger]);

  const handleAddProduct = () => {
    setInitialValues({
      id: "",
      promoName: "",
      description: "",
      youTube: "",
      createdBy: "",
      insertedDate: "",
    });
    setOpen(true);
    setEditMode(false);
  };

  const [userdata, setUserData] = useState({
    promoName: "",
    description: "",
    youTube: "",
  });

  const [errors, setErrors] = useState({});

  const user = JSON.parse(sessionStorage.getItem("user"));
  const headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + user.accessToken,
  };

  const validateform = () => {
    const newErrors = {};

    if (!userdata.promoName || userdata.promoName.trim() === "") {
      newErrors.promoName = "Enter the Promo name";
    }

    if (!userdata.description || userdata.description.trim() === "") {
      newErrors.description = "Enter the product description";
    }

    if (!userdata.youTube || userdata.youTube.trim() === "") {
      newErrors.youTube = "Enter the YouTube link";
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
      createdBy: { userId: user.userId },
    });
  };

  //todo ==> POST PROMO DATA
  const postdata = (e) => {
    e.preventDefault();
    const formErrros = validateform();
    if (Object.keys(formErrros).length > 0) {
      setErrors(formErrros);
    } else {
      console.log(userdata);
      // console.log(headers);

      postPromoData(userdata, headers).then(() => {
        setUserData({ promoName: "", description: "", youTube: "" });
        setRefreshTrigger((prev) => !prev); // Trigger a refresh
        setOpen(false);
      });
    }
  };

  //Get Promo Data
  const FetchData = async () => {
    let res = await fetchPromo(headers);

    // Assuming res.content is where your data is stored
    var fetchedData = res.content;

    // console.log(fetchedData);

    if (fetchedData) {
      var tabledata = fetchedData.map((p) => ({
        promoId: p.promoId,
        promoName: p.promoName,
        description: p.description,
        youTube: p.youTube,
        insertedDate: moment(p.insertedDate).format("L"),
        createdBy: p.createdBy ? p.createdBy.userName : "No User",
      }));

      setPromo(tabledata);
    } else {
      setPromo([]);
    }
  };

  //todo ==> DELETE  PROMO DATA
  const handleDelete = async (id) => {
    await deletePromo(headers, id);
    FetchData();
  };

  //todo ==> GET DATA BY PROMO ID
  const handleEdit = async (id) => {
    //  console.log(id);
    setEditMode(true); // Set editMode to true
    setOpen(true);
    var res = await getPromoById(headers, id);
    console.log(res);

    let det = res.data;
    setrPromoId(det.promoId);
    setUserData({
      promoName: det.promoName,
      description: det.description,
      youTube: det.youTube,
    });
  };

  // todo==> UPDATE PROMO
  const updatedata = async (e) => {
    e.preventDefault();
    //  console.log(userdata);
    console.log(promoId);
    var updateddata = {
      ...userdata,
      promoId,
      updatedBy: { userId: user.userId },
    };
    //  console.log(updateddata)
    const resp = await updatedPromo(headers, updateddata);
    console.log(resp);
    FetchData();
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
            width: "700px", // Styles for tablet view (adjust the range and width as needed)
          },
        }}
      >
        <Typography sx={{ mb: 1 }} variant="h4">
          Promo
        </Typography>
        <Button
          startIcon={<AddCircle />}
          variant="contained"
          onClick={handleAddProduct}
        >
          {" "}
          Add Promo
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Promo ID</TableCell>
                <TableCell>Promo Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>YouTube</TableCell>
                <TableCell>Inserted Date</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promo.map((p) => (
                <TableRow key={p.promoId}>
                  <TableCell>{p.promoId}</TableCell>
                  <TableCell>{p.promoName}</TableCell>
                  <TableCell>{p.description}</TableCell>
                  <TableCell>
                    {p.youTube && (
                      <iframe
                        src={`https://www.youtube.com/embed/${p.youTube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        width="170px"
                        height="100px"
                      >
                        Watch Video
                      </iframe>
                    )}
                  </TableCell>
                  <TableCell>{p.insertedDate}</TableCell>
                  <TableCell>{p.createdBy}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        handleEdit(p.promoId);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleDelete(p.promoId);
                      }}
                    >
                      <DeleteForever sx={{ color: Colors.danger }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} fullWidth maxWidth="md">
          <DialogTitle>{editMode ? "Edit Promo" : "Add Promo"}</DialogTitle>

          <DialogContent>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Promo Name"
                    name="promoName"
                    value={userdata.promoName}
                    onChange={changehandler}
                    error={!!errors.promoName}
                    helperText={errors.promoName}
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

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="YouTube"
                    name="youTube"
                    value={userdata.youTube}
                    onChange={changehandler}
                    error={!!errors.youTube}
                    helperText={errors.youTube}
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
                      postdata(e);
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
