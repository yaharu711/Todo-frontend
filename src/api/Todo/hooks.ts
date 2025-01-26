import {
  QueryClient,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import TodoApi from "./functions";
import { UpdateTodosRequest } from "./types";
import {
  createTodoErrorHandler,
  updateTodoDetailErrorHandler,
  updateTodoErrorHandler,
} from "./errorHandlers";
import {
  CompletedTodoType,
  CreateTodoParams,
  ImcompletedTodoType,
  SortTodosParams,
  UpdateTodoDetailParams,
} from "../../pages/Todo/types";
import { useNavigate } from "react-router-dom";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

type useGetTodosResponse = {
  imcompletedTodosWithStatus: ImcompletedTodoType[];
  completedTodosWithStatus: CompletedTodoType[];
};

export const useGetTodos = () => {
  // 結局、updateをキャッシュ更新して、cancelQueriesを実行しても、invalidateは上書きされて、処理は完了している？？？だから、statusがdoneに書き換わっている？
  return useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: async (): Promise<useGetTodosResponse> => {
      const data = await TodoApi.getTodos();
      const imcompletedTodosWithStatus = data.imcompletedTodos.map(function (
        imcompletedTodo
      ) {
        return {
          ...imcompletedTodo,
          updateDetailStatus: "done",
          updateTodoStatus: "done",
        };
      });
      const completedTodosWithStatus = data.completedTodos.map(function (
        completedTodo
      ) {
        return {
          ...completedTodo,
          updateTodoStatus: "done",
        };
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
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      updateCacheForUpdateTodoDetail({
        queryClient,
        request,
        updateDetailStatus: "pending",
      });

      return { previousTodos };
    },
    onError: (error: Error, { request, setInputError }, context) => {
      const updateCache = () =>
        updateCacheForUpdateTodoDetail({
          queryClient,
          request,
          updateDetailStatus: "error",
        });
      const updateCacheToPrevious = () => {
        if (context === undefined) return;
        queryClient.setQueryData(["todos"], context.previousTodos);
      };
      updateTodoDetailErrorHandler(
        setInputError,
        error,
        navigate,
        updateCache,
        updateCacheToPrevious
      );
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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (request: UpdateTodosRequest) => TodoApi.updateTodos(request),
    onMutate: async (request) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      if (request.is_completed) {
        // 完了にする時
        updateCacheForCompleteTodo({ queryClient, request });
      } else {
        // 未完了にする時
        updateCacheForImcompleteTodo({ queryClient, request });
      }
      return { previousTodos };
    },
    onError: (error: Error, _variables, context) => {
      updateTodoErrorHandler(error, navigate);
      if (context === undefined) return;
      queryClient.setQueryData(["todos"], context.previousTodos);
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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (id: number) => TodoApi.deleteTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old: useGetTodosResponse) => {
        const newImcompletedTodos: ImcompletedTodoType[] =
          old.imcompletedTodosWithStatus.map(function (
            imcompletedTodoWithStatus
          ) {
            return imcompletedTodoWithStatus.id === id
              ? {
                  ...imcompletedTodoWithStatus,
                  updateTodoStatus: "delete_pending",
                }
              : imcompletedTodoWithStatus;
          });
        return {
          imcompletedTodosWithStatus: newImcompletedTodos,
          completedTodosWithStatus: old.completedTodosWithStatus,
        };
      });

      return { previousTodos };
    },
    onError: (error: Error, _variables, context) => {
      updateTodoErrorHandler(error, navigate);
      if (context === undefined) return;
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

export const useSortTodosMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (params: SortTodosParams) => {
      const { active, over } = params.event;

      // APIリクエストする前に並び替えられた値でキャッシュを更新する
      if (active.id !== over?.id) {
        queryClient.setQueryData(
          ["todos"],
          (previousTodos: useGetTodosResponse): useGetTodosResponse => {
            const previousTodoIds =
              previousTodos.imcompletedTodosWithStatus.map(
                (previousTodo) => previousTodo.id
              );
            // number型が適切なので型変換をする
            const oldIndex = previousTodoIds.indexOf(Number(active.id));
            const newIndex = previousTodoIds.indexOf(Number(over?.id));

            const newImcompletedTodo = arrayMove(
              previousTodos.imcompletedTodosWithStatus,
              oldIndex,
              newIndex
            );
            return {
              imcompletedTodosWithStatus: newImcompletedTodo,
              completedTodosWithStatus: previousTodos.completedTodosWithStatus,
            };
          }
        );
      }
      // キャッシュを取得
      const sortedTodos: useGetTodosResponse | undefined =
        queryClient.getQueryData(["todos"]);
      console.log(sortedTodos);
      if (!sortedTodos) return;
      const sortedTodoIds = sortedTodos?.imcompletedTodosWithStatus.map(
        (imcompletedTodoWithStatus) => imcompletedTodoWithStatus.id
      );
      TodoApi.sortTodos(sortedTodoIds);
    },
  });
};

const updateCacheForUpdateTodoDetail = ({
  queryClient,
  request,
  updateDetailStatus,
}: {
  queryClient: QueryClient;
  request: UpdateTodosRequest;
  updateDetailStatus: string;
}) => {
  queryClient.setQueryData(["todos"], (old: useGetTodosResponse) => {
    const newImcompletedTodos = old.imcompletedTodosWithStatus.map(function (
      imcompletedTodoWithStatus
    ) {
      return imcompletedTodoWithStatus.id === request.id
        ? {
            ...imcompletedTodoWithStatus,
            name: request.name,
            updateDetailStatus,
          }
        : imcompletedTodoWithStatus;
    });
    return {
      imcompletedTodosWithStatus: newImcompletedTodos,
      completedTodosWithStatus: old.completedTodosWithStatus,
    };
  });
};

const updateCacheForCompleteTodo = ({
  queryClient,
  request,
}: {
  queryClient: QueryClient;
  request: UpdateTodosRequest;
}) => {
  queryClient.setQueryData(["todos"], (old: useGetTodosResponse) => {
    const newImcompletedTodos: ImcompletedTodoType[] =
      old.imcompletedTodosWithStatus.map(function (imcompletedTodoWithStatus) {
        return imcompletedTodoWithStatus.id === request.id
          ? {
              ...imcompletedTodoWithStatus,
              name: request.name || "",
              updateTodoStatus: "delete_pending",
            }
          : imcompletedTodoWithStatus;
      });
    const newCompletedTodos: CompletedTodoType[] = [
      {
        id: request.id,
        name: request.name || "",
        created_at: "",
        completed_at: "",
        imcompleted_at: "",
        updateTodoStatus: "add_pending",
      },
      ...old.completedTodosWithStatus,
    ];
    return {
      imcompletedTodosWithStatus: newImcompletedTodos,
      completedTodosWithStatus: newCompletedTodos,
    };
  });
};

const updateCacheForImcompleteTodo = ({
  queryClient,
  request,
}: {
  queryClient: QueryClient;
  request: UpdateTodosRequest;
}) => {
  queryClient.setQueryData(["todos"], (old: useGetTodosResponse) => {
    const newCompletedTodos: CompletedTodoType[] =
      old.completedTodosWithStatus.map(function (completedTodoWithStatus) {
        return completedTodoWithStatus.id === request.id
          ? {
              ...completedTodoWithStatus,
              name: request.name || "",
              updateTodoStatus: "delete_pending",
            }
          : completedTodoWithStatus;
      });
    const newImcompletedTodos: ImcompletedTodoType[] = [
      {
        id: request.id,
        name: request.name || "",
        created_at: "",
        completed_at: "",
        imcompleted_at: "",
        updateDetailStatus: "done",
        updateTodoStatus: "add_pending",
      },
      ...old.imcompletedTodosWithStatus,
    ];
    return {
      imcompletedTodosWithStatus: newImcompletedTodos,
      completedTodosWithStatus: newCompletedTodos,
    };
  });
};
