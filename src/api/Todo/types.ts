export type GetTodosResponse = {
  imcompletedTodos: {
    id: number;
    name: string;
    memo: string;
    created_at: string;
    completed_at?: string;
    imcompleted_at: string;
  }[];
  completedTodos: {
    id: number;
    name: string;
    memo: string;
    created_at: string;
    completed_at: string;
    imcompleted_at: string;
  }[];
};

export type CreateTodoRequest = {
  name: string;
};

export type UpdateTodosRequest = {
  id: number;
  name?: string;
  memo?: string;
  is_completed?: boolean;
};
