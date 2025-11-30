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
import { ImcompletedFilter } from "../../pages/Todo/components/ImcompletedTodos/filterOptions";
import { AxiosError } from "axios";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { todosQueryKey, todosQueryKeyPrefix } from "./queryKey";

export type useGetTodosResponse = {
  imcompletedTodosWithStatus: ImcompletedTodoType[];
};
export type useGetCompletedTodosResponse = {
  completedTodosWithStatus: CompletedTodoType[];
};

export const useGetTodos = (filter?: ImcompletedFilter) => {
  const { data, isPending, error } = useQuery({
    queryKey: todosQueryKey(filter),
    queryFn: async (): Promise<useGetTodosResponse> => {
      const data = await TodoApi.getTodos(filter);
      const imcompletedTodosWithStatus = data.todos.map(function (
        imcompletedTodo
      ) {
        const parsedNotificateAt =
          imcompletedTodo.notificate_at === "" ||
          imcompletedTodo.notificate_at === null
            ? null
            : new Date(imcompletedTodo.notificate_at);
        return {
          id: imcompletedTodo.id,
          name: imcompletedTodo.name,
          memo: imcompletedTodo.memo,
          notificate_at: parsedNotificateAt,
          created_at: new Date(imcompletedTodo.created_at),
          completed_at: imcompletedTodo.completed_at,
          imcompleted_at: imcompletedTodo.imcompleted_at,
          updateDetailStatus: "done",
          updateTodoStatus: "done",
        } as ImcompletedTodoType;
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
  return useMutation({
    mutationFn: (params: CreateTodoParams) =>
      TodoApi.createTodo(params.request),
    onError: (error: Error, { setInputError }) => {
      const axiosError = error as AxiosError;
      if (axiosError.status === 401) return; // 401はインターセプタが処理
      createTodoErrorHandler(setInputError, error);
    },
    onSettled: async () => {
      // 楽観的更新はisPendingの時にvariablesを表示しているのでinvalidateするまで待つ必要ある
      // 待たないと、isPendingはfalseとなり楽観的更新したものも消えて何も更新されていないuIが表示されてしまう
      await queryClient.invalidateQueries({ queryKey: todosQueryKeyPrefix });
    },
  });
};

export const useUpdateDetailTodos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdateTodoDetailParams) =>
      TodoApi.updateTodos(params.request),
    onMutate: async ({ request }) => {
      await queryClient.cancelQueries({ queryKey: todosQueryKeyPrefix });
      const previousTodosEntries = queryClient.getQueriesData<useGetTodosResponse>({
        queryKey: todosQueryKeyPrefix,
      });

      updateCacheForUpdateTodoDetail({
        queryClient,
        request,
        updateDetailStatus: "pending",
      });

      return { previousTodosEntries };
    },
    onError: (error: Error, { request, setInputError }, context) => {
      console.log("editTodo", error);
      const updateCache = () =>
        updateCacheForUpdateTodoDetail({
          queryClient,
          request,
        updateDetailStatus: "error",
      });
      const updateCacheToPrevious = () => {
        if (context === undefined) return;
        context.previousTodosEntries?.forEach(([key, value]) => {
          queryClient.setQueryData(key, value);
        });
      };
      const axiosError = error as AxiosError;
      if (axiosError.status === 401) {
        updateCacheToPrevious();
        return;
      }
      updateTodoDetailErrorHandler(
        setInputError,
        error,
        updateCache,
        updateCacheToPrevious
      );
    },
    onSettled: async (_data, error) => {
      // 成功時のみrefetchする→エラーの時はキャッシュをそのままにしたいため→楽観的更新の部分が消えてしまってエラー状態が分かりにくい
      if (error === null)
        await queryClient.invalidateQueries({
          queryKey: todosQueryKeyPrefix,
        });
    },
  });
};

export const useUpdateTodos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: UpdateTodosRequest) => TodoApi.updateTodos(request),
    onMutate: async (request) => {
      await queryClient.cancelQueries({ queryKey: todosQueryKeyPrefix });

      const previousTodosEntries = queryClient.getQueriesData<useGetTodosResponse>({
        queryKey: todosQueryKeyPrefix,
      });

      if (request.is_completed) {
        // 完了にする時
        updateCacheForCompleteTodo({ queryClient, request });
      } else {
        // 未完了にする時
        updateCacheForImcompleteTodo({ queryClient, request });
      }
      return { previousTodosEntries };
    },
    onError: (error: Error, _variables, context) => {
      const axiosError = error as AxiosError;
      if (axiosError.status === 401) {
        if (context)
          context.previousTodosEntries?.forEach(([key, value]) => {
            queryClient.setQueryData(key, value);
          });
        return;
      }
      updateTodoErrorHandler(error);
      if (context === undefined) return;
      context.previousTodosEntries?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: todosQueryKeyPrefix,
      });
    },
  });
};

export const useCompleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      TodoApi.updateTodos({
        id,
        notificate_at: null,
        is_completed: true,
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: todosQueryKeyPrefix });

      const previousTodosEntries = queryClient.getQueriesData<useGetTodosResponse>({
        queryKey: todosQueryKeyPrefix,
      });

      const request: UpdateTodosRequest = {
        id,
        notificate_at: null,
        is_completed: true,
      };
      // 楽観的更新
      updateCacheForCompleteTodo({ queryClient, request });

      return { previousTodosEntries };
    },
    onError: (error: Error, _variables, context) => {
      const axiosError = error as AxiosError;
      if (axiosError.status === 401) {
        if (context)
          context.previousTodosEntries?.forEach(([key, value]) => {
            queryClient.setQueryData(key, value);
          });
        return;
      }
      updateTodoErrorHandler(error);
      if (context === undefined) return;
      context.previousTodosEntries?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: todosQueryKeyPrefix,
      });
    },
  });
};

export const useImcompleteTodo = () => {
  const queryClient = useQueryClient();
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
      const axiosError = error as AxiosError;
      if (axiosError.status === 401) {
        if (context)
          queryClient.setQueryData(["completed-todos"], context.previousTodos);
        return;
      }
      updateTodoErrorHandler(error);
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
  return useMutation({
    mutationFn: (id: number) => TodoApi.deleteTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: todosQueryKeyPrefix });

      const previousTodosEntries = queryClient.getQueriesData<useGetTodosResponse>({
        queryKey: todosQueryKeyPrefix,
      });

      queryClient.setQueriesData<useGetTodosResponse>(
        { queryKey: todosQueryKeyPrefix },
        (old) => {
          const current =
            old ??
            ({
              imcompletedTodosWithStatus: [],
            } as useGetTodosResponse);
          const newImcompletedTodos: ImcompletedTodoType[] =
            current.imcompletedTodosWithStatus.map(function (
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
        }
      );

      return { previousTodosEntries };
    },
    onError: (error: Error, _variables, context) => {
      const axiosError = error as AxiosError;
      if (axiosError.status === 401) {
        if (context)
          context.previousTodosEntries?.forEach(([key, value]) => {
            queryClient.setQueryData(key, value);
          });
        return;
      }
      updateTodoErrorHandler(error);
      if (context === undefined) return;
      context.previousTodosEntries?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: todosQueryKeyPrefix,
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
        queryKey: todosQueryKeyPrefix,
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
      queryClient.setQueriesData<useGetTodosResponse>(
        { queryKey: todosQueryKeyPrefix },
        (previousTodos) => {
          const current =
            previousTodos ??
            ({ imcompletedTodosWithStatus: [] } as useGetTodosResponse);

          const previousTodoIds = current.imcompletedTodosWithStatus.map(
            (previousTodo) => previousTodo.id
          );
          // number型が適切なので型変換をする
          const oldIndex = previousTodoIds.indexOf(Number(active.id));
          const newIndex = previousTodoIds.indexOf(Number(over?.id));
          if (oldIndex === -1 || newIndex === -1) return current;

          const newImcompletedTodo = arrayMove(
            current.imcompletedTodosWithStatus,
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
  queryClient.setQueriesData<useGetTodosResponse>(
    { queryKey: todosQueryKeyPrefix },
    (old) => {
      const current =
        old ??
        ({
          imcompletedTodosWithStatus: [],
        } as useGetTodosResponse);

      const newImcompletedTodos = current.imcompletedTodosWithStatus.map(
        function (imcompletedTodoWithStatus) {
          return imcompletedTodoWithStatus.id === request.id
            ? {
                ...imcompletedTodoWithStatus,
                name: request.name ?? imcompletedTodoWithStatus.name,
                updateDetailStatus,
              }
            : imcompletedTodoWithStatus;
        }
      );
      return {
        imcompletedTodosWithStatus: newImcompletedTodos,
      };
    }
  );
};

const updateCacheForCompleteTodo = ({
  queryClient,
  request,
}: {
  queryClient: QueryClient;
  request: UpdateTodosRequest;
}) => {
  queryClient.setQueriesData<useGetTodosResponse>(
    { queryKey: todosQueryKeyPrefix },
    (old) => {
    const current =
      old ?? ({ imcompletedTodosWithStatus: [] } as useGetTodosResponse);

    const newImcompletedTodos: ImcompletedTodoType[] =
      current.imcompletedTodosWithStatus.map(function (imcompletedTodoWithStatus) {
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
