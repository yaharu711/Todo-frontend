import apiClient from "../client/axios";
import {
  CreateTodoRequest,
  GetCompletedTodosResponse,
  GetTodosResponse,
  UpdateTodosRequest,
} from "./types";
import { ImcompletedFilter } from "../../pages/Todo/components/ImcompletedTodos/filterOptions";

const getTodos = async (filter?: ImcompletedFilter): Promise<GetTodosResponse> => {
  const res = await apiClient.get("/api/todos", {
    params: filter ? { filter } : undefined,
  });
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
  getTodos,
  getCompletedTodos,
  createTodo,
  updateTodos,
  deleteTodo,
  sortTodos,
};

export default TodoApi;
