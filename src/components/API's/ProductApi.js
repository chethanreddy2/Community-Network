import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

//todo ==> POST PRODUCT DATA
export const addProdData = async (userdata, headers) => {
  try {
    await axios({
      method: "POST",
      url: `${BaseUrl}/product/v1/createProduct`,
      headers: headers,
      data: JSON.stringify(userdata),
    }).then(function (res) {
      console.log(res);
      if (res.data.responseCode === 201) {
        alert("Product Successfully Created");
      } else if (res.data.responseCode === 400) {
        alert(res.data.errorMessage);
      }
    });
  } catch (error) {
    alert(error);
  }
};

//todo ==> GET  PRODUCT DATA
export const fetchProduct = async (headers) => {
  return await axios({
    method: "GET",
    url: `${BaseUrl}/product/v1/getAllProductsByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10`,
    headers: headers,
  });
};

//todo ==> GET DATA BY PRODUCT ID
export const getProductById = async (id, headers) => {
  return await axios({
    method: "GET",
    url: `${BaseUrl}/product/v1/getProductByProductId/{productId}?productId=${id}`,
    headers: headers,
  });
};

// todo==> UPDATE PRODUCTS
export const updatedProduct = async (headers, updateddata) => {
  await axios({
    method: "PUT",
    url: `${BaseUrl}/product/v1/updateProduct`,
    headers: headers,
    data: updateddata,
  })
    .then(function (res) {
      console.log(res);
      if (res.data.responseCode === 201) {
        alert(res.data.message);
      } else if (res.data.responseCode === 400) {
        alert(res.data.errorMessage);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

//todo ==> DELETE  PRODUCT DATA

export const deleteProduct = async (headers, id) => {
  await axios({
    method: "DELETE",
    url: `${BaseUrl}/product/v1/deleteProductById/${id}`,
    headers: headers,
  })
    .then((res) => {
      if (res.data.responseCode === 200) {
        // alert(res.data.message);
        alert("product deleted");
      } else if (res.data.responseCode === 400) {
        alert(res.data.errorMessage);
        alert("something wrong");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//todo ==> GET ROLES (DROPDOWN)
export const getRoles = async (headers) => {
  return await axios({
    method: "GET",
    url: `${BaseUrl}/category/v1/queryAllCategory`,
    headers,
    body: JSON.stringify(),
  });
};
