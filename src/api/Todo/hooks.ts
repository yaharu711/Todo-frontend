import { useSuspenseQuery } from "@tanstack/react-query";
import TodoApi from "./functions";
import { useApiErrorHandles } from "../common/ErrorHanleHook";

export const useGetHelloMessage = () => {
  const errorHandles = useApiErrorHandles();
  return useSuspenseQuery({
    queryKey: ["hello-message"],
    queryFn: () => TodoApi.getHelloMessage(errorHandles),
  });
};
