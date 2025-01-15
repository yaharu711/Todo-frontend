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
  CompletedTodoType,
  CreateTodoParams,
  ImcompletedTodoType,
  UpdateTodoDetailParams,
} from "../../pages/Todo/types";
import { useNavigate } from "react-router-dom";

type useGetTodosResponse = {
  imcompletedTodosWithStatus: ImcompletedTodoType[];
  completedTodosWithStatus: CompletedTodoType[];
};

export const useGetTodos = () => {
  // 結局、updateをキャッシュ更新して、cancelQueriesを実行しても、invalidateは上書きされて、処理は完了している？？？だから、statusがdoneに書き換わっている？
  return useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const data = await TodoApi.getTodos();
      const imcompletedTodosWithStatus = data.imcompletedTodos.map(function (
        imcompletedTodo
      ) {
        return { ...imcompletedTodo, updateDetailStatus: "done" };
      });
      const completedTodosWithStatus = data.completedTodos.map(function (
        completedTodo
      ) {
        return { ...completedTodo, updateDetailStatus: "done" };
      });

      return { imcompletedTodosWithStatus, completedTodosWithStatus };
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (params: CreateTodoParams) =>
      TodoApi.createTodo(params.request),
    onError: (error: Error, { setInputError }) => {
      createTodoErrorHandler(setInputError, error, navigate);
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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (params: UpdateTodoDetailParams) =>
      TodoApi.updateTodos(params.request),
    onMutate: async ({ request }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["todos"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["todos"], (old: useGetTodosResponse) => {
        const newImcompletedTodos = old.imcompletedTodosWithStatus.map(
          function (imcompletedTodoWithStatus) {
            return imcompletedTodoWithStatus.id === request.id
              ? {
                  ...imcompletedTodoWithStatus,
                  name: request.name,
                  updateDetailStatus: "pending",
                }
              : imcompletedTodoWithStatus;
          }
        );
        return {
          imcompletedTodosWithStatus: newImcompletedTodos,
          completedTodosWithStatus: old.completedTodosWithStatus,
        };
      });

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (error: Error, { request, setInputError }) => {
      // エラーであることをstatus: errorにして伝えて、キャッシュは残すか？→この場合は、onSettledのinvalidateはしちゃだめだ
      // もう一度更新した時に成功すれば、invalidateで消えるしそれでよいかな？
      queryClient.setQueryData(["todos"], (old: useGetTodosResponse) => {
        const newImcompletedTodos = old.imcompletedTodosWithStatus.map(
          function (imcompletedTodoWithStatus) {
            return imcompletedTodoWithStatus.id === request.id
              ? {
                  ...imcompletedTodoWithStatus,
                  name: request.name,
                  updateDetailStatus: "error",
                }
              : imcompletedTodoWithStatus;
          }
        );
        return {
          imcompletedTodosWithStatus: newImcompletedTodos,
          completedTodosWithStatus: old.completedTodosWithStatus,
        };
      });
      updateTodoDetailErrorHandler(setInputError, error, navigate);
    },
    onSettled: async (_data, error) => {
      // 成功時のみrefetchする→エラーの時はキャッシュをそのままにしたいため→楽観的更新の部分が消えてしまってエラー状態が分かりにくい
      if (error === null)
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
