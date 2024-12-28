import { ReactNode, useState } from "react";
import TodoInputForm from "../../components/TodoInputForm";
import Todos from "../../components/Todos";
import styles from "../../App.module.css";
import { useGetHelloMessage } from "../../api/Todo/hooks";
import { isMobile } from "react-device-detect";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import { CiCircleCheck, CiTrash } from "react-icons/ci";
import { PiKeyReturnLight } from "react-icons/pi";

type renderTodoButtonProps = {
  key: string;
  isDisabled: boolean;
  onClick: (target: TodoType) => void;
  target: TodoType;
  children: string | ReactNode;
  style?: object;
};

export type ButtonProps = {
  onClick: (target: TodoType) => void;
  children: string | ReactNode;
  style?: object;
  render: ({
    key,
    isDisabled,
    onClick,
    children,
    style,
  }: renderTodoButtonProps) => ReactNode;
};

export type TodoType = {
  name: string;
  isEditMode: boolean;
};

// TODO: components配下にあるコンポーネントはすべてpage/Todo/components配下に移動させよう

const TodoPage = () => {
  // todoを取得するメソッドの代わり
  useGetHelloMessage();

  const [imcompletedTodos, setImcompletedTodos] = useState<TodoType[]>([
    { name: "test", isEditMode: false },
    { name: "test1", isEditMode: false },
    { name: "test2", isEditMode: false },
    { name: "test3", isEditMode: false },
    { name: "test4", isEditMode: false },
    { name: "test5", isEditMode: false },
    { name: "test6", isEditMode: false },
  ]);
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

  const renderTodoButton = ({
    key,
    isDisabled,
    onClick,
    target,
    children,
    style,
  }: renderTodoButtonProps) =>
    isMobile ? (
      <IconButton onClick={() => onClick(target)} children={children} />
    ) : (
      <Button
        key={key}
        disabled={isDisabled}
        onClick={() => onClick(target)}
        children={children}
        style={style}
      />
    );

  // 未完了TODOについての処理
  const imcompletedTodosButtonList: ButtonProps[] = [
    isMobile
      ? {
          onClick: completeTodo,
          children: <CiCircleCheck size={30} />,
          render: (props) => renderTodoButton(props),
        }
      : {
          onClick: completeTodo,
          children: "完了",
          render: (props) => renderTodoButton(props),
        },
    isMobile
      ? {
          onClick: deleteTodo,
          children: <CiTrash size={30} />,
          render: (props) => renderTodoButton(props),
        }
      : {
          onClick: deleteTodo,
          children: "削除",
          render: (props) => renderTodoButton(props),
        },
  ];
  // 完了TODOについての処理
  // →未完了と完了それぞれの処理が同じところで管理するのはちょっと微妙
  // 未完了のTODOと完了のTODOのHTMLやCSSを共通化できたが、その分親で多くのことを管理するはめになった。。
  const completedTodosButtonList: ButtonProps[] = [
    isMobile
      ? {
          onClick: imcompleteTodo,
          children: <PiKeyReturnLight size={30} />,
          render: (props) => renderTodoButton(props),
        }
      : {
          onClick: imcompleteTodo,
          children: "戻す",
          render: (props) => renderTodoButton(props),
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
        buttonPropsList={imcompletedTodosButtonList}
      />
      <Todos
        section="完了のTOOD一覧"
        todos={completedTodos}
        setTodos={setCompletedTodos}
        buttonPropsList={completedTodosButtonList}
      />
    </div>
  );
};

export default TodoPage;
