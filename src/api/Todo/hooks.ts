import { useSuspenseQuery } from "@tanstack/react-query";
import TodoApi from "./functions";

export const useGetHelloMessage = () => {
  // const errorHnadlers = useApiErrorHandles();
  return useSuspenseQuery({
    queryKey: ["hello-message"],
    queryFn: () => TodoApi.getHelloMessage(),
  });
};
