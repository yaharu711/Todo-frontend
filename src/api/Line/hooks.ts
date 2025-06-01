import { useQuery } from "@tanstack/react-query";
import { LineApi } from "./functions";

export const useGetLineNotificationStatus = () => {
  return useQuery({
    queryKey: ["users", "get-line-notification-status"],
    queryFn: LineApi.getLineNotificationStatus,
  });
};
