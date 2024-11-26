import { useState } from "react";
import TodoInputForm from "../../components/TodoInputForm";
import Todos from "../../components/Todos";
import styles from "../../App.module.css";

export type ButtonProps = {
  onClick: (target: TodoType) => void;
  children: string;
};

export type TodoType = {
  name: string;
  isEditMode: boolean;
};

// TODO: components配下にあるコンポーネントはすべてpage/Todo/components配下に移動させよう

const TodoPage = () => {
  const [imcompletedTodos, setImcompletedTodos] = useState<TodoType[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);
  const completeTodo = (target: TodoType) => {
    setCompletedTodos([...completedTodos, target]);
    setImcompletedTodos(
      imcompletedTodos.filter(
        (imcompletedTodo) => imcompletedTodo.name !== target.name
      )
    );
  };
  const deleteTodo = (target: TodoType) => {
    setImcompletedTodos(
      imcompletedTodos.filter(
        (imcompletedTodo) => imcompletedTodo.name !== target.name
      )
    );
  };
  const imcompleteTodo = (target: TodoType) => {
    setImcompletedTodos([...imcompletedTodos, target]);
    setCompletedTodos(
      completedTodos.filter(
        (completedTodo) => completedTodo.name !== target.name
      )
    );
  };

  // 未完了TODOについての処理
  const imcompletedTodosButtonPropsList: ButtonProps[] = [
    {
      onClick: completeTodo,
      children: "完了",
    },
    {
      onClick: deleteTodo,
      children: "削除",
    },
  ];
  // 完了TODOについての処理
  // →未完了と完了それぞれの処理が同じところで管理するのはちょっと微妙
  // 未完了のTODOと完了のTODOのHTMLやCSSを共通化できたが、その分責務の分離や親で多くのことを管理するはめになった。。
  const completedTodosButtonPropsList: ButtonProps[] = [
    {
      onClick: imcompleteTodo,
      children: "未完了",
    },
  ];

  //TODO: ButtonPropsは子から親に型という情報を渡しちゃっているのがあまりよくないかな。
  // 基本は親から子にデータを渡す一方向にしたい。型定義だけ別の場所に定義して、ButtonやAppからその型を参照するならまだ健全かな

  return (
    <div className={styles.container}>
      <TodoInputForm
        imcompletedTodos={imcompletedTodos}
        setImcompletedTodos={setImcompletedTodos}
      />
      <Todos
        section="未完了のTOOD一覧"
        todos={imcompletedTodos}
        setTodos={setImcompletedTodos}
        buttonPropsList={imcompletedTodosButtonPropsList}
      />
      <Todos
        section="完了のTOOD一覧"
        todos={completedTodos}
        setTodos={setCompletedTodos}
        buttonPropsList={completedTodosButtonPropsList}
      />
    </div>
  );
};

export default TodoPage;
