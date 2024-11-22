import { useQuery } from "@tanstack/react-query";
import TodoApi from "./functions";
import { useApiErrorHandles } from "../../App";

export const useGetHelloMessage = () => {
  const errorHandles = useApiErrorHandles();
  return useQuery({
    queryKey: ["hello-message"],
    queryFn: () => TodoApi.getHelloMessage(errorHandles),
  });
};
