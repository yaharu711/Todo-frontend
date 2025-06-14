export type GetTodosResponse = {
  todos: {
    id: number;
    name: string;
    memo: string;
    notificate_at: string;
    created_at: string;
    completed_at?: string;
    imcompleted_at: string;
  }[];
};

export type GetCompletedTodosResponse = {
  todos: {
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
  notificate_at: string | null;
  is_completed?: boolean;
};
