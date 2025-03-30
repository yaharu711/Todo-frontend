import axios from "axios";
import {
  CreateTodoRequest,
  GetTodosResponse,
  UpdateTodosRequest,
} from "./types";

const ENDPOINT: string = import.meta.env.VITE_API_URL;

const getHelloMessage = async (): Promise<string> => {
  const res = await axios.get(ENDPOINT + "/api/hello-message", {
    withCredentials: true,
  });
  return res.data;
  // TODO: interceptorを使って共通化するか。
  // try {
  //   const res = await axios.get(ENDPOINT + "/api/hello-message", {
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
  const res = await axios.get(ENDPOINT + "/api/todos", {
    withCredentials: true,
  });
  return res.data;
};

const createTodo = async (parapms: CreateTodoRequest) => {
  await axios.post(ENDPOINT + "/api/todos", parapms, {
    withCredentials: true,
  });
};

const updateTodos = async ({
  id,
  name,
  memo,
  notificate_at,
  is_completed,
}: UpdateTodosRequest) => {
  await axios.patch(
    ENDPOINT + "/api/todos/" + id,
    {
      name,
      memo,
      notificate_at,
      is_completed,
    },
    {
      withCredentials: true,
    }
  );
};

const deleteTodo = async (id: number) => {
  await axios.delete(ENDPOINT + "/api/todos/" + id, {
    withCredentials: true,
  });
};

const sortTodos = async (sorted_todo_ids: number[]) => {
  await axios.put(
    // 完了のTODOでも並び替えたいケースができたら、クエリパラメータで切り替えようかな
    ENDPOINT + "/api/todos/sort",
    {
      todos_order: sorted_todo_ids,
    },
    {
      withCredentials: true,
    }
  );
};

const TodoApi = {
  getHelloMessage,
  getTodos,
  createTodo,
  updateTodos,
  deleteTodo,
  sortTodos,
};

export default TodoApi;
