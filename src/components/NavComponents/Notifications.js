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
import {
  deleteNotofication,
  fetchNofication,
  getNotoficationById,
  postBulkNotification,
} from "../API's/NotificationApi";

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    id: "",
    title: "",
    message: "",
    topic: "",
    createdBy: "",
    insertedDate: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [bulkNotificationId, setBulkNotificationId] = useState("");
  const [bulkNotification, setBulkNotification] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    FetchData();
  }, [refreshTrigger]);

  const handleAddProduct = () => {
    setInitialValues({
      id: "",
      title: "",
      message: "",
      topic: "",
      createdBy: "",
      insertedDate: "",
    });
    setOpen(true);
    setEditMode(false);
  };

  const [userdata, setUserData] = useState({
    title: "",
    message: "",
    topic: "",
  });

  const [errors, setErrors] = useState({});

  const user = JSON.parse(sessionStorage.getItem("user"));
  const headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + user.accessToken,
  };

  const validateform = () => {
    const newErrors = {};

    if (!userdata.title || userdata.title.trim() === "") {
      newErrors.title = "Enter the Notification Title";
    }

    if (!userdata.message || userdata.message.trim() === "") {
      newErrors.message = "Enter the  message";
    }

    if (!userdata.topic || userdata.topic.trim() === "") {
      newErrors.topic = "Enter the topic ";
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

  //todo ==> POST BULK NOTIFICATION DATA
  const postdata = async (e) => {
    e.preventDefault();

    const formErrors = validateform();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log(userdata);
      await postBulkNotification(userdata, headers);
      setUserData({ message: "", title: "", topic: "" });
      setRefreshTrigger((prev) => !prev); // Trigger a refresh
    }
    FetchData();
  };

  //todo ==> GET  NOTIFICATION DATA
  const FetchData = async () => {
    let res = await fetchNofication(headers);
    console.log(res.data);

    var fetchedData = res.data.content;
    console.log(fetchedData);

    var tabledata = [];
    fetchedData.map((b) => {
      tabledata.push({
        bulkNotificationId: b.bulkNotificationId,
        title: b.title,
        message: b.message,
        topic: b.topic,
        updatedBy: b.updatedBy === null ? "No User" : b.updatedBy.userName,
        createdBy: b.createdBy ? b.createdBy.userName : "No User",
        insertedDate: moment(b.insertedDate).format("L"),
        updatedDate: moment(b.updatedDate).format("L"),
      });
    });
    setBulkNotification(tabledata);
  };

  //todo ==> GET DATA BY NOTIFICATION  ID

  //   const handleEdit = async (id) => {
  //     var res = getNotoficationById(headers, id);
  //     console.log(res);
  //     let det = res.data;
  //     console.log(det);
  //     setBulkNotificationId(det.bulkNotificationId);
  //     setUserData({ message: det.message, title: det.title, topic: det.topic });
  //   };

  // todo==> Delete NOTIFICATION
  const handleDelete = async (id) => {
    await deleteNotofication(headers, id);
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
            width: "710px", // Styles for tablet view (adjust the range and width as needed)
          },
        }}
      >
        <Typography sx={{ mb: 1 }} variant="h4">
          Notifications
        </Typography>
        <Button
          startIcon={<AddCircle />}
          variant="contained"
          onClick={handleAddProduct}
        >
          {" "}
          Add Notifications
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Updated By</TableCell>
                <TableCell>Inserted Date</TableCell>
                <TableCell>Updated Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bulkNotification.map((p) => (
                <TableRow key={p.bulkNotificationId}>
                  <TableCell>{p.bulkNotificationId}</TableCell>
                  <TableCell>{p.title}</TableCell>
                  <TableCell>{p.message}</TableCell>
                  <TableCell>{p.topic}</TableCell>
                  <TableCell>{p.createdBy}</TableCell>
                  <TableCell>{p.updatedBy}</TableCell>
                  <TableCell>{p.insertedDate}</TableCell>
                  <TableCell>{p.updatedDate}</TableCell>
                  <TableCell>
                    <IconButton
                    //   onClick={() => {
                    //     handleEdit(p.bulkNotificationId);
                    //   }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleDelete(p.bulkNotificationId);
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
          <DialogTitle>
            {editMode ? "Edit Notification" : "Add Notification"}
          </DialogTitle>

          <DialogContent>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notification Title"
                    name="title"
                    value={userdata.title}
                    onChange={changehandler}
                    error={!!errors.title}
                    helperText={errors.title}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={userdata.message}
                    onChange={changehandler}
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="topic"
                    name="topic"
                    value={userdata.topic}
                    onChange={changehandler}
                    error={!!errors.topic}
                    helperText={errors.topic}
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button
                  onClick={(e) => {
                    postdata(e);
                    setOpen(false);
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
