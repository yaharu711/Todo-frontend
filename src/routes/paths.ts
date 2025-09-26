export const ROUTE_PATHS = {
  root: "/",
  login: "/login",
  regist: "/regist",
  todos: "/todos",
  todosCompleted: "/todos/completed",
  settings: "/settings",
  error500: "/500",
} as const;

export const DEFAULT_AFTER_LOGIN: string = ROUTE_PATHS.todos as string;

export type AppPath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];
