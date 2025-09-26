import apiClient from "../client/axios";
import {
  CreateTodoRequest,
  GetCompletedTodosResponse,
  GetTodosResponse,
  UpdateTodosRequest,
} from "./types";

const getHelloMessage = async (): Promise<string> => {
  const res = await apiClient.get("/api/hello-message");
  return res.data;
  // TODO: interceptorを使って共通化するか。
  // try {
  //   const res = await axios.get("/api/hello-message", {
  //     withCredentials: true,
  //   });
  //   return res.data;
  // } catch (error) {
  //   const axiosError = error as AxiosError;
  //   if (axiosError.status === 401) {
  //     errorHandle?.onUnAuthorized?.();
  //   } else {
  //     errorHandle?.onDefault?.();
  //   }
  //   throw error;
  // }
};

const getTodos = async (): Promise<GetTodosResponse> => {
  const res = await apiClient.get("/api/todos");
  return res.data;
};

const getCompletedTodos = async (): Promise<GetCompletedTodosResponse> => {
  const res = await apiClient.get("/api/todos", {
    params: {
      is_completed_only: true,
    },
  });
  return res.data;
};

const createTodo = async (parapms: CreateTodoRequest) => {
  await apiClient.post("/api/todos", parapms);
};

const updateTodos = async ({
  id,
  name,
  memo,
  notificate_at,
  is_completed,
}: UpdateTodosRequest) => {
  await apiClient.patch(
    "/api/todos/" + id,
    {
      name,
      memo,
      notificate_at,
      is_completed,
    },
    {}
  );
};

const deleteTodo = async (id: number) => {
  await apiClient.delete("/api/todos/" + id);
};

const sortTodos = async (sorted_todo_ids: number[]) => {
  await apiClient.put(
    // 完了のTODOでも並び替えたいケースができたら、クエリパラメータで切り替えようかな
    "/api/todos/sort",
    {
      todos_order: sorted_todo_ids,
    },
    {}
  );
};

const TodoApi = {
  getHelloMessage,
  getTodos,
  getCompletedTodos,
  createTodo,
  updateTodos,
  deleteTodo,
  sortTodos,
};

export default TodoApi;
