import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

//todo ==> POST BULK NOTIFICATION DATA
export const postBulkNotification = (ndata, headers) => {
  try {
    axios({
      method: "POST",
      url: `${BaseUrl}/bulknotification/v1/createBulkNotification`,
      headers: headers,
      data: JSON.stringify(ndata),
    }).then(function (res) {
      console.log(res);
      if (res.data.responseCode === 201) {
        alert(" Bulk Notification Successfully Created");
      } else {
        alert(res);
      }
    });
  } catch (error) {
    alert(error);
  }
};

//todo ==> GET  NOTIFICATION DATA
export const fetchNofication = async (headers) => {
  return await axios({
    method: "GET",
    // url: `${BaseUrl}/bulknotification/v1/queryAllBulkNotification`,
    url: `${BaseUrl}/bulknotification/v1/getAllBulkNotificationByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10`,
    headers,
  });
};

//todo ==> GET DATA BY NOTIFICATION  ID
export const getNotoficationById = async (headers, id) => {
  return await axios({
    method: "GET",
    url: `${BaseUrl}/bulknotification/v1/queryBulkNotificationById/{bulkNotificationId}?bulkNotificationId/${id}`,
    headers: headers,
  });
};

// todo==> Delete NOTIFICATION
export const deleteNotofication = async (headers, id) => {
  await axios({
    method: "DELETE",
    url: `${BaseUrl}/bulknotification/v1/deleteBulkNotificationById/${id}`,
    headers: headers,
  })
    .then((res) => {
      if (res.data.responseCode === 200) {
        alert(res.data.message);
      } else if (res.data.responseCode === 400) {
        alert(res.data.errorMessage);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
