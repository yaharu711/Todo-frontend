import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import TodoApi from "./functions";
import { CreateTodoRequest, UpdateTodosRequest } from "./types";

export const useGetTodos = () => {
  return useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: () => TodoApi.getTodos(),
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateTodoRequest) => TodoApi.createTodo(params),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ params }: { params: UpdateTodosRequest }) =>
      TodoApi.updateTodos(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => TodoApi.deleteTodo(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};
