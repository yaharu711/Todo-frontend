import { useQuery } from "@tanstack/react-query";
import TodoApi from "./functions";

export const useGetHelloMessage = () => {
  return useQuery({
    queryKey: ["hello-message"],
    queryFn: TodoApi.getHelloMessage,
  });
};
