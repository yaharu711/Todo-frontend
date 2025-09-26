import apiClient from "../client/axios";
import { checkExistValidFCMTokenResponse, SaveFCMTokenRequest } from "./types";

const ENDPOINT: string = import.meta.env.VITE_API_URL;

const saveFCMToken = async (request: SaveFCMTokenRequest) => {
  await apiClient.post(ENDPOINT + "/api/fcm", request);
};

const invalidateLatestFCMToken = async () => {
  await apiClient.post(
    ENDPOINT + "/api/fcm/invalidate",
    {}
  );
};

const checkExistValidFCMToken =
  async (): Promise<checkExistValidFCMTokenResponse> => {
    const response = await apiClient.get(
      ENDPOINT + "/api/fcm/check-exist-valid-token",
      {}
    );
    return response.data;
  };

export const FCMApi = {
  saveFCMToken,
  invalidateLatestFCMToken,
  checkExistValidFCMToken,
};
