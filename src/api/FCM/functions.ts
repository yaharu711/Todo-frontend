import apiClient from "../client/axios";
import { checkExistValidFCMTokenResponse, SaveFCMTokenRequest } from "./types";

const saveFCMToken = async (request: SaveFCMTokenRequest) => {
  await apiClient.post("/api/fcm", request);
};

const invalidateLatestFCMToken = async () => {
  await apiClient.post("/api/fcm/invalidate", {});
};

const checkExistValidFCMToken =
  async (): Promise<checkExistValidFCMTokenResponse> => {
    const response = await apiClient.get("/api/fcm/check-exist-valid-token", {});
    return response.data;
  };

export const FCMApi = {
  saveFCMToken,
  invalidateLatestFCMToken,
  checkExistValidFCMToken,
};
