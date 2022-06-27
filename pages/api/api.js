import axios from "axios";
import constant from "../../config/constant";

let ENV = constant.ENV;
let API_BASE_URL = "";
if (ENV === 2) {
  API_BASE_URL = constant.API_URL.STAGE;
} else {
  API_BASE_URL = constant.API_URL.DEV;
}

export const apiRequest = async ({
  method,
  service,
  version,
  url,
  queryParams = {},
  data = null,
  headers = {},
  onUploadProgress,
  onDownloadProgress,
  responseType = "json",
}) => {
  try {
    const token = localStorage.getItem("token");
    if (token === null) {
      // move to login
    }
    if (typeof token === "string") {
      headers.authorization = token;
    }

    console.log(
      "New Request: ",
      method,
      API_BASE_URL + service + version + url,
      "headers: ",
      headers,
      "data: ",
      data,
      "queryParams: ",
      queryParams
    );

    const response = await axios.request({
      baseURL: API_BASE_URL + service + version,
      method,
      url,
      params: queryParams,
      data,
      headers,
      onUploadProgress,
      onDownloadProgress,
      timeout: 3600 * 1000, //3600 seconds
    });
    console.log(response.data, "response");
    return response.data;
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */

      console.log("data", error.response.data);
      console.log("status", error.response.status);
      if (error?.response?.status === 401) {
        throw Error("auth error");
      }
      console.log("headers", error.response.headers);
      if (error && error.response && error.response.data) {
        return error.response.data;
      }
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log(error.request);
      if (error.request.status === 0) {
        // alert("No Internet");
      }
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log("Error", error.message);
    }
  }
};