import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { FCMApi } from "./functions";
import { SaveFCMTokenRequest } from "./types";
import { commonFCMApiErrorHandler } from "./errorHandlers";
import { useNavigate } from "react-router-dom";

export const useSaveFCMToken = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (request: SaveFCMTokenRequest) => FCMApi.saveFCMToken(request),
    onError: (error: Error) => commonFCMApiErrorHandler(error, navigate),
  });
};

export const useInvalidateLatestFCMToken = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => FCMApi.invalidateLatestFCMToken(),
    onError: (error: Error) => commonFCMApiErrorHandler(error, navigate),
  });
};

export const useCheckExistValidFCMToken = () => {
  return useSuspenseQuery({
    queryKey: ["check-exist-valid-fcm-token"],
    queryFn: async () => {
      const data = await FCMApi.checkExistValidFCMToken();
      return data.is_exist;
    },
  });
};
