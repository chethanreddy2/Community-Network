import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

//todo ==> GET USER DATA
export const fetchCustomer = async (headers, usedata) => {
  return await axios({
    method: "GET",
    url: `${BaseUrl}/customer/v1/getAllCustomersByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10`,
    headers: headers,
    data: JSON.stringify(usedata),
  });
};
