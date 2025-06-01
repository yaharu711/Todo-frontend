import axios from "axios";
import {
  CheckLineBotFriendResponse,
  GetLineNotificationStatusResponse,
} from "./types";

const ENDPOINT: string = import.meta.env.VITE_API_URL + "/api";

const getLineNotificationStatus =
  async (): Promise<GetLineNotificationStatusResponse> => {
    const res = await axios.get(ENDPOINT + "/line/notifications", {
      withCredentials: true,
    });
    return res.data;
  };

const switchLineNotificationStatus = async (
  is_notification: boolean
): Promise<void> => {
  const res = await axios.patch(
    ENDPOINT + "/line/notifications",
    { is_notification: is_notification },
    {
      withCredentials: true,
    }
  );
  return res.data;
};

const checkLineBotFriend = async (): Promise<CheckLineBotFriendResponse> => {
  const res = await axios.get(ENDPOINT + "/line/check-friend", {
    withCredentials: true,
  });

  return res.data;
};

export const LineApi = {
  getLineNotificationStatus,
  switchLineNotificationStatus,
  checkLineBotFriend,
};
