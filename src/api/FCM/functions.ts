import axios from "axios";
import { checkExistValidFCMTokenResponse, SaveFCMTokenRequest } from "./types";

const ENDPOINT: string = import.meta.env.VITE_API_URL;

const saveFCMToken = async (request: SaveFCMTokenRequest) => {
  await axios.post(ENDPOINT + "/api/fcm", request, {
    withCredentials: true,
  });
};

const invalidateLatestFCMToken = async () => {
  await axios.post(
    ENDPOINT + "/api/fcm/invalidate",
    {},
    {
      withCredentials: true,
    }
  );
};

const checkExistValidFCMToken =
  async (): Promise<checkExistValidFCMTokenResponse> => {
    const response = await axios.get(
      ENDPOINT + "/api/fcm/check-exist-valid-token",
      {
        withCredentials: true,
      }
    );
    return response.data;
  };

export const FCMApi = {
  saveFCMToken,
  invalidateLatestFCMToken,
  checkExistValidFCMToken,
};
