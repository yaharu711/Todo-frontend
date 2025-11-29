import { ImcompletedFilter } from "../../pages/Todo/components/ImcompletedTodos/filterOptions";

// 共通のクエリキー定義（デフォルトは"all"）
export const todosQueryKey = (filter: ImcompletedFilter = "all") =>
  ["todos", filter] as const;
