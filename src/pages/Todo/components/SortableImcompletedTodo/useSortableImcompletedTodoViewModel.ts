import { useSortable } from "@dnd-kit/sortable";
import { ImcompletedTodoType } from "../../types";
import { CSS } from "@dnd-kit/utilities";

const UseSortableImcompletedTodoViewModel = (target: ImcompletedTodoType) => {
  // 並び替えについてのロジック
  const sortableProps = useSortable({ id: target.id });
  const sortableTodoStyle = {
    transform: CSS.Transform.toString(sortableProps.transform),
    transition: sortableProps.transition,
  };

  return {
    sortableProps,
    sortableTodoStyle,
  };
};

export default UseSortableImcompletedTodoViewModel;
