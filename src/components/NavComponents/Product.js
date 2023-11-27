import { AddCircle, DeleteForever, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../../styles/theme";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  addProdData,
  deleteProduct,
  fetchProduct,
  getProductById,
  getRoles,
  updatedProduct,
} from "../API's/ProductApi";
import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

export default function Product() {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    productName: "",
    specification: "",
    productMrp: "",
    sellingcost: "",
    discount: "",
    cgst: "",
    gst: "",
    sgst: "",
  });
  const [userdata, setUserData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [productId, setProductId] = useState();

  const [editMode, setEditMode] = useState(false); // Add this state variable
  const [products, setProducts] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  //! initiazing state for roles
  const [roles, setRoles] = useState([]);
  const [categoryId, setCategoryId] = useState();
  // const [roleValid, setRoleValid] = useState(true);
  const [selectedRole, setSelectedRole] = useState({
    value: "0",
    label: "Select.....",
  });

  //!State Initialzation For FILE UPLOAD
  const [fileName, setFileName] = useState("");
  const [selectedFile, setselectedFile] = useState("");
  const inputRef = useRef(null);

  //!Tokens and Headers
  const user = JSON.parse(sessionStorage.getItem("user"));
  // console.log(user)
  const headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + user.accessToken,
  };

  //! OnChange for ROLE(DROPDOWN)
  const handleRoleChange = (value) => {
    setSelectedRole(value);
    console.log(value);
    setUserData({
      ...userdata,
      productCategoryDto: {
        categoryId: value,
        categoryName: value.label,
      },
    });
    setCategoryId(value.value);
  };

  // todo==> GET ROLES(dropdown)
  const FetchRole = async () => {
    let response = await getRoles(headers);
    // console.log(response);

    var down = response.data;
    // console.log(down);
    var mdata = down.map((a) => {
      return { value: a.categoryId, label: a.categoryName };
    });
    console.log(mdata);
    setRoles(mdata);
  };

  //!onchange for upload file
  const onFileChange = (e) => {
    setFileName(e.target.files[0].name);
    setselectedFile(e.target.files[0]);
    if (!selectedFile) {
      alert("image is selected");
      return false;
    }
  };

  //!FILE UPLOAD
  const onFileUpload = async (e) => {
    e.preventDefault();

    console.log(fileName);
    const data = new FormData();
    data.append("file", selectedFile);
    setUserData({ ...userdata, fileName: fileName });

    await axios({
      origin: "*",
      method: "post",
      url: `${BaseUrl}/file/uploadFile`,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + user.accessToken,
      },
      data,
    })
      .then(function (res) {
        setFileName(res.data.fileName);
        alert(res.data.message);
        setUserData({ ...userdata, productPic: fileName });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddProduct = () => {
    setInitialValues({
      id: 1,
      productName: "",
      specification: "",
      productMrp: "",
      sellingcost: "",
      discount: "",
      cgst: "",
      gst: "",
      sgst: "",
      productPic: "",
    });
    setOpen(true);
  };

  //!onchange for submit data
  const changehandler = (e) => {
    setUserData({
      ...userdata,
      [e.target.name]: e.target.value,
      createdBy: { userId: user.userId },
    });

    // Set errors for the field being changed
    setErrors({
      ...errors,
      [e.target.name]: null, // Clear any previous error for this field
    });
  };

  //!form validation
  const validateform = () => {
    const newErrors = {};

    if (!userdata.productName || userdata.productName === "") {
      newErrors.productName = "Enter the product name";
    }

    if (!userdata.productMrp || userdata.productMrp === "") {
      newErrors.productMrp = "Enter the product mrp";
    }

    if (!userdata.sellingcost || userdata.sellingcost === "") {
      newErrors.sellingcost = "Enter the selling cost";
    }

    if (!userdata.specification || userdata.specification === "") {
      newErrors.specification = "Enter the specification";
    }

    if (!userdata.discount || userdata.discount === "") {
      newErrors.discount = "Enter the discount";
    }

    if (!userdata.cgst || userdata.cgst === "") {
      newErrors.cgst = "Enter the cgst";
    }

    if (!userdata.gst || userdata.gst === "") {
      newErrors.gst = "Enter the gst";
    }

    if (!userdata.sgst || userdata.sgst === "") {
      newErrors.sgst = "Enter the sgst";
    }

    if (selectedRole.label === "Select.....") {
      newErrors.selectedRole = "Please select a role";
    }

    return newErrors;
  };

  //!setFiled
  const setField = (field) => {
    if (!!errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  //!Download image file
  const ImageUrl =
    "https://virtullearning.cloudjiffy.net/ecommerce/file/downloadFile/?filePath=";

  //!useEffect
  useEffect(() => {
    FetchRole();
    FetchData();
  }, [refreshTrigger]);

  //todo ==> DELETE  PRODUCT DATA
  const handleDelete = async (id) => {
    console.log(id);
    await deleteProduct(headers, id); 
    FetchData();
  };

  //todo ==> GET DATA BY PRODUCT ID
  const handleEdit = async (productId) => {
    setEditMode(true); // Set editMode to true
    setOpen(true);
    console.log(productId);
    let res = await getProductById(productId, headers);
    console.log(res);

    let det = res.data;
    setProductId(det.productId);
    setUserData({
      cgst: det.cgst,
      discount: det.discount,
      gst: det.gst,
      productName: det.productName,
      productMrp: det.productMrp,
      sellingcost: det.sellingcost,
      sgst: det.sgst,
      specification: det.specification,
    });
  };

  // todo==> UPDATE PRODUCT
  const updatedata = async (e) => {
    console.log("hi");
    e.preventDefault();
    console.log(userdata);
    console.log(productId);

    var updateddata = {
      ...userdata,
      productId,
      updatedBy: { userId: user.userId },
      productCategoryDto: { role: categoryId },
    };
    console.log(updateddata);

    const respp = await updatedProduct(headers, updateddata);
    // console.log(respp)
    setSelectedRole({ value: "0", label: "Select..." });
    setProductId("");
    FetchData();
  };

  // todo ==> GET PRODUCT DATA
  const FetchData = async () => {
    let response = await fetchProduct(headers);
    // console.log(response.data.content);
    var bdata = response.data.content;
    var tableArry = [];
    bdata.map((p) => {
      // console.log(p);
      tableArry.push({
        productId: p.productId,
        productName: p.productName,
        productCategoryDto:
          p.productCategoryDto === null
            ? "No Category"
            : p.productCategoryDto.categoryName,
        productPic:
          p.productPic === null ? (
            "NO IMAGE FOUND"
          ) : (
            <img
              src={ImageUrl + p.productPicPath}
              alt={p.fileName}
              style={{ width: 100, height: 60 }}
            />
          ),
        cgst: p.cgst,
        gst: p.gst,
        sgst: p.sgst,
        discount: p.discount,
        productMrp: p.productMrp,
        sellingcost: p.sellingcost,
        specification: p.specification,
      });
    });

    // console.log(tableArry);
    setProducts(tableArry);
  };

  //todo ==> POST PRODUCT DATA
  const postdata = async (e) => {
    e.preventDefault();
    const formErrors = validateform();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Create a new product object
      console.log(userdata);

      await addProdData(userdata, headers);
      setUserData({
        productName: "",
        specification: "",
        productMrp: "",
        sellingcost: "",
        discount: "",
        cgst: "",
        gst: "",
        sgst: "",
        createdBy: { userId: user.userId },
      });
    }
    setSelectedRole({ value: "0", label: "select....." });
    setCategoryId("");
    setCategoryId(true);
    setRefreshTrigger((prev) => !prev); // Trigger a refresh
  };

  return (
    <>
      <Box
        // sx={{
        //   "@media (max-width: 1000px)": {
        //     width: "270px",
        //   },
        // }}

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
          Products
        </Typography>
        <Button
          startIcon={<AddCircle />}
          variant="contained"
          onClick={handleAddProduct}
        >
          {" "}
          Add Product
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Product Category</TableCell>
                <TableCell>ProductPic</TableCell>
                <TableCell>GST</TableCell>
                <TableCell>CGST</TableCell>
                <TableCell>SGST</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Specification</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.productId}>
                  <TableCell>{p.productId}</TableCell>
                  <TableCell>{p.productName}</TableCell>
                  <TableCell>{p.productCategoryDto}</TableCell>
                  <TableCell>{p.productPic}</TableCell>
                  <TableCell>{p.gst}</TableCell>
                  <TableCell>{p.cgst}</TableCell>
                  <TableCell>{p.sgst}</TableCell>
                  <TableCell>{p.productMrp}</TableCell>
                  <TableCell>{p.sellingcost}</TableCell>
                  <TableCell>{p.discount}</TableCell>
                  <TableCell>{p.specification}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        handleEdit(p.productId);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton>
                      <DeleteForever
                        sx={{ color: Colors.danger }}
                        onClick={() => {
                          handleDelete(p.productId);
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* //Form // */}
        <Dialog open={open} fullWidth maxWidth="md">
          <DialogTitle>{editMode ? "Edit Product" : "Add Product"}</DialogTitle>

          <Container>
            <form>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="productName"
                    value={userdata.productName}
                    onChange={(e) => {
                      changehandler(e);
                      setField("productName");
                    }}
                    error={!!errors.productName}
                    helperText={errors.productName}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    label="Specification"
                    name="specification"
                    value={userdata.specification}
                    onChange={(e) => {
                      changehandler(e);
                      setField("specification");
                    }}
                    error={!!errors.specification}
                    helperText={errors.specification}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    label="Product MRP"
                    name="productMrp"
                    value={userdata.productMrp}
                    onChange={(e) => {
                      changehandler(e);
                      setField("productMrp");
                    }}
                    error={!!errors.productMrp}
                    helperText={errors.productMrp}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    label="Selling Cost"
                    name="sellingcost"
                    value={userdata.sellingcost}
                    onChange={(e) => {
                      changehandler(e);
                      setField("sellingcost");
                    }}
                    error={!!errors.sellingcost}
                    helperText={errors.sellingcost}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    label="Discount"
                    name="discount"
                    value={userdata.discount}
                    onChange={(e) => {
                      changehandler(e);
                      setField("discount");
                    }}
                    error={!!errors.discount}
                    helperText={errors.discount}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    label="CGST"
                    name="cgst"
                    value={userdata.cgst}
                    onChange={(e) => {
                      changehandler(e);
                      setField("cgst");
                    }}
                    error={!!errors.cgst}
                    helperText={errors.cgst}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    label="GST"
                    name="gst"
                    value={userdata.gst}
                    onChange={(e) => {
                      changehandler(e);
                      setField("gst");
                    }}
                    error={!!errors.gst}
                    helperText={errors.gst}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    label="SGST"
                    name="sgst"
                    value={userdata.sgst}
                    onChange={(e) => {
                      changehandler(e);
                      setField("sgst");
                    }}
                    error={!!errors.sgst}
                    helperText={errors.sgst}
                  />
                </Grid>
                <Grid item md={8}>
                  <TextField
                    fullWidth
                    type="file"
                    label="Select File"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => onFileChange(e)}
                    accept=".pdf, .jpg, .png"
                    ref={inputRef}
                  />
                </Grid>
                <Button variant="primary" onClick={onFileUpload} type="submit">
                  Upload
                </Button>

                <Grid item md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={selectedRole}
                      onChange={(e) => handleRoleChange(e.target.value)}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role.value} value={role.value}>
                          {role.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                      setOpen(false);
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
          </Container>
        </Dialog>
      </Box>
    </>
  );
}
