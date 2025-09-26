import apiClient from "../client/axios";
import {
  CheckLineBotFriendResponse,
  GetLineNotificationStatusResponse,
} from "./types";

const getLineNotificationStatus =
  async (): Promise<GetLineNotificationStatusResponse> => {
    const res = await apiClient.get("/api/line/notifications");
    return res.data;
  };

const switchLineNotificationStatus = async (
  is_notification: boolean
): Promise<void> => {
  const res = await apiClient.patch(
    "/api/line/notifications",
    { is_notification: is_notification },
    {}
  );
  return res.data;
};

const checkLineBotFriend = async (): Promise<CheckLineBotFriendResponse> => {
  const res = await apiClient.get("/api/line/check-friend");

  return res.data;
};

export const LineApi = {
  getLineNotificationStatus,
  switchLineNotificationStatus,
  checkLineBotFriend,
};
