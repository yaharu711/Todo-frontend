import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
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
  UpdateTodoDetailParams,
} from "../../pages/Todo/types";
import { useNavigate } from "react-router-dom";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export type useGetTodosResponse = {
  imcompletedTodosWithStatus: ImcompletedTodoType[];
};
export type useGetCompletedTodosResponse = {
  completedTodosWithStatus: CompletedTodoType[];
};

export const useGetTodos = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async (): Promise<useGetTodosResponse> => {
      const data = await TodoApi.getTodos();
      const imcompletedTodosWithStatus = data.todos.map(function (
        imcompletedTodo
      ) {
        return {
          ...imcompletedTodo,
          updateDetailStatus: "done",
          updateTodoStatus: "done",
        };
      });

      return { imcompletedTodosWithStatus };
    },
  });

  return {
    data: data || {
      imcompletedTodosWithStatus: [],
    },
    isPending,
    error,
  };
};

export const useGetCompletedTodos = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["completed-todos"],
    queryFn: async (): Promise<useGetCompletedTodosResponse> => {
      const data = await TodoApi.getCompletedTodos();
      const completedTodosWithStatus = data.todos.map(function (completedTodo) {
        return {
          ...completedTodo,
          updateTodoStatus: "done",
        };
      });

      return { completedTodosWithStatus };
    },
  });

  return {
    data: data || {
      completedTodosWithStatus: [],
    },
    isPending,
    error,
  };
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

export const useCompleteTodo = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (id: number) =>
      TodoApi.updateTodos({
        id,
        notificate_at: null,
        is_completed: true,
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      const request: UpdateTodosRequest = {
        id,
        notificate_at: null,
        is_completed: true,
      };
      // 楽観的更新
      updateCacheForCompleteTodo({ queryClient, request });

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

export const useImcompleteTodo = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (id: number) =>
      TodoApi.updateTodos({
        id,
        notificate_at: null,
        is_completed: false,
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["completed-todos"] });

      const previousTodos = queryClient.getQueryData(["completed-todos"]);

      const request: UpdateTodosRequest = {
        id,
        notificate_at: null,
        is_completed: false,
      };
      // 楽観的更新
      updateCacheForImcompleteTodo({ queryClient, request });

      return { previousTodos };
    },
    onError: (error: Error, _variables, context) => {
      updateTodoErrorHandler(error, navigate);
      if (context === undefined) return;
      queryClient.setQueryData(["completed-todos"], context.previousTodos);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["completed-todos"],
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
  // const navigate = useNavigate();
  return useMutation({
    mutationFn: (sorted_imcompleted_todo_ids: number[]) =>
      TodoApi.sortTodos(sorted_imcompleted_todo_ids),
    onSettled: async () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

export const useSortImcompletedTodoQueryCache = () => {
  const queryClient = useQueryClient();

  return (event: DragEndEvent) => {
    const { active, over } = event;
    // APIリクエストする前に並び替えられた値でキャッシュを更新する
    if (active.id !== over?.id) {
      queryClient.setQueryData(
        ["todos"],
        (previousTodos: useGetTodosResponse): useGetTodosResponse => {
          const previousTodoIds = previousTodos.imcompletedTodosWithStatus.map(
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
          };
        }
      );
    }
  };
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
              name: request.name || imcompletedTodoWithStatus.name,
              updateTodoStatus: "delete_pending",
            }
          : imcompletedTodoWithStatus;
      });
    return {
      imcompletedTodosWithStatus: newImcompletedTodos,
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
  queryClient.setQueryData(
    ["completed-todos"],
    (old: useGetCompletedTodosResponse) => {
      const newCompletedTodos: CompletedTodoType[] =
        old.completedTodosWithStatus.map(function (completedTodoWithStatus) {
          return completedTodoWithStatus.id === request.id
            ? {
                ...completedTodoWithStatus,
                name: request.name || completedTodoWithStatus.name,
                updateTodoStatus: "delete_pending",
              }
            : completedTodoWithStatus;
        });
      return {
        completedTodosWithStatus: newCompletedTodos,
      };
    }
  );
};
