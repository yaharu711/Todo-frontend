import { ImcompletedFilter } from "../../pages/Todo/components/ImcompletedTodos/filterOptions";

// すべてのTodoクエリで共通のプレフィックス
export const todosQueryKeyPrefix = ["todos"] as const;

// フィルタ別のクエリキー（デフォルトは"all"）
export const todosQueryKey = (filter: ImcompletedFilter = "all") =>
  [...todosQueryKeyPrefix, filter] as const;
