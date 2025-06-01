import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LineApi } from "./functions";

export const useGetLineNotificationStatus = () => {
  return useQuery({
    queryKey: ["get-line-notification-status"],
    queryFn: LineApi.getLineNotificationStatus,
  });
};

export const useSwitchLineNotificationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LineApi.switchLineNotificationStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-line-notification-status"],
      });
    },
  });
};

export const useCheckLineBotFriend = () => {
  return useQuery({
    queryKey: ["check-line-bot-friend"],
    queryFn: LineApi.checkLineBotFriend,
  });
};
