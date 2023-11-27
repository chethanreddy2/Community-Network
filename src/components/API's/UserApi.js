import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

//todo ==> GET USER DATA
export const fetchUser = async (headers, usedata) => {
  return await axios({
    method: "GET",
    url: `${BaseUrl}/userprofile/v1/getAllUserProfileByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10`,
    headers: headers,
    data: JSON.stringify(usedata),
  });
};
