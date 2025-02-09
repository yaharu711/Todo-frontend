import { useState } from "react";
import { ImcompletedTodoType, UpdateTodoDetailParams } from "../../types";

export type Props = {
  target: ImcompletedTodoType;
  updateTodoDetail: (props: UpdateTodoDetailParams) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const useImcompletedTodoDetailModalViewModdel = ({
  target,
  updateTodoDetail,
  setOpen,
}: Props) => {
  const [inputedMemo, setInputedMemo] = useState<string>(target.name);
  const [editInputError, setEditInputError] = useState({
    name: "",
    memo: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputedMemo(e.target.value);
    setEditInputError((prev) => ({ ...prev, name: "" }));
  };

  // これをonCloseの時と、完了ボタンを押した時に実行する
  const editTodo = (target: ImcompletedTodoType) => {
    // 変化なく何も入力していない場合は編集していなかったことにする
    if (inputedMemo === target.memo || inputedMemo === "") {
      setInputedMemo(target.memo);
      console.log("ok");
      return;
    }
    if (inputedMemo.trim() === "") {
      // 編集モードは終わらないまま編集してもらう
      setEditInputError((prev) => ({
        ...prev,
        name: "空白・改行のみは許可されていません",
      }));
      return;
    }

    return;
    updateTodoDetail({
      request: {
        id: target.id,
        name: inputedTodoName,
      },
      setInputError: setEditInputError,
    });
  };

  const onClose = (target: ImcompletedTodoType) => editTodo(target);
  const onComplete = (target: ImcompletedTodoType) => {
    editTodo(target);
    setOpen((prev) => !prev);
  };

  return {
    inputedMemo,
    editInputError,
    onChangeInput,
    onClose,
    onComplete,
  };
};

export default useImcompletedTodoDetailModalViewModdel;
