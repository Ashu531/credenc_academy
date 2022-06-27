import { apiRequest } from "./api";
import constant from "../../config/constant";

export const getCardData = (queryParam) => {
    return apiRequest({
      method: "get",
      url: `batch/search/`,
      queryParams: queryParam,
    });
  };