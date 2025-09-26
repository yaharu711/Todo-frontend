import apiClient from "../client/axios";
import {
  CheckLineBotFriendResponse,
  GetLineNotificationStatusResponse,
} from "./types";

const ENDPOINT: string = import.meta.env.VITE_API_URL + "/api";

const getLineNotificationStatus =
  async (): Promise<GetLineNotificationStatusResponse> => {
    const res = await apiClient.get(ENDPOINT + "/line/notifications");
    return res.data;
  };

const switchLineNotificationStatus = async (
  is_notification: boolean
): Promise<void> => {
  const res = await apiClient.patch(
    ENDPOINT + "/line/notifications",
    { is_notification: is_notification },
    {}
  );
  return res.data;
};

const checkLineBotFriend = async (): Promise<CheckLineBotFriendResponse> => {
  const res = await apiClient.get(ENDPOINT + "/line/check-friend");

  return res.data;
};

export const LineApi = {
  getLineNotificationStatus,
  switchLineNotificationStatus,
  checkLineBotFriend,
};
