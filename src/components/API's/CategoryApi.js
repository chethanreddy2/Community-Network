import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

//todo ==> GET  CATEGORY DATA
export const fetchCatergoryData = async (headers) => {
  return await axios({
    method: "GET",
    url: `${BaseUrl}/category/v1/queryAllCategory`,
    headers: headers,
  });
};

//todo ==> GET DATA BY  CATEGORY ID

export const getcategoryById = async (headers, id) => {
  return await axios({
    method: "GET",
    url: `${BaseUrl}/category/v1/getCategoryByCategoryId/{categoryId}?categoryId=${id}`,
    headers: headers,
  });
};

// todo==> UPDATE  CATEGORY
export const updatedCategory = async (headers, updateddata) => {
  await axios({
    method: "PUT",
    url: `${BaseUrl}/category/v1/updateCategory`,
    headers: headers,
    data: JSON.stringify(updateddata),
  }).then(function (res) {
    if (res.data.responseCode === 201) {
      alert("Category Successfully updated");
    } else if (res.data.responseCode === 400) {
      alert(res.data.errorMessage);
    }
  });
};
