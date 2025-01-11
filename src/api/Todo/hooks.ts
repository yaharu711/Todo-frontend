import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import TodoApi from "./functions";
import { UpdateTodosRequest } from "./types";
import {
  createTodoErrorHandler,
  updateTodoDetailErrorHandler,
} from "./errorHandlers";
import {
  CreateTodoParams,
  UpdateTodoDetailParams,
} from "../../pages/Todo/types";

export const useGetTodos = () => {
  return useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: () => TodoApi.getTodos(),
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateTodoParams) =>
      TodoApi.createTodo(params.request),
    onError: (error: Error, { setInputError }) => {
      createTodoErrorHandler(setInputError, error);
    },
    onSettled: async () => {
      // 楽観的更新はisPendingの時にvariablesを表示しているのでinvalidateするまで待つ必要ある
      // 待たないと、isPendingはfalseとなり楽観的更新したものも消えて何も更新されていないuIが表示されてしまう
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateDetailTodos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdateTodoDetailParams) =>
      TodoApi.updateTodos(params.request),
    onError: (error: Error, { setInputError }) => {
      updateTodoDetailErrorHandler(setInputError, error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

export const useUpdateTodos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: UpdateTodosRequest) => TodoApi.updateTodos(request),
    onError: (error: Error) => {
      throw error;
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
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
