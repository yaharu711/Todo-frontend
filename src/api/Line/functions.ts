import axios from "axios";
import { GetLineNotificationStatusResponse } from "./types";

const ENDPOINT: string = import.meta.env.VITE_API_URL + "/api";

const getLineNotificationStatus =
  async (): Promise<GetLineNotificationStatusResponse> => {
    const res = await axios.get(ENDPOINT + "/line/notifications", {
      withCredentials: true,
    });
    return res.data;
  };

export const LineApi = {
  getLineNotificationStatus,
};
