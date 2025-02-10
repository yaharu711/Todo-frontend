import { useEffect, useState } from "react";
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
  const [inputedMemo, setInputedMemo] = useState<string>(target.memo);
  const [editInputError, setEditInputError] = useState("");

  const onChangeInputedMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputedMemo(e.target.value);
    setEditInputError("");
  };

  // これをonCloseの時と、完了ボタンを押した時に実行する
  const editTodo = (target: ImcompletedTodoType) => {
    // 変化なく何も入力していない場合は編集していなかったことにする
    if (inputedMemo === target.memo || inputedMemo === "") {
      setInputedMemo(target.memo);
      return;
    }
    if (inputedMemo.trim() === "") {
      // 編集モードは終わらないまま編集してもらう
      setEditInputError("空白・改行のみは許可されていません");
      return;
    }

    updateTodoDetail({
      request: {
        id: target.id,
        name: target.name,
        memo: inputedMemo,
      },
      setInputError: setEditInputError,
    });
  };

  const onClose = (target: ImcompletedTodoType) => editTodo(target);
  const onComplete = (target: ImcompletedTodoType) => {
    editTodo(target);
    setOpen((prev) => !prev);
  };

  const [modalHeight, setModalHeight] = useState(window.innerHeight * 0.9);
  useEffect(() => {
    const updateHeight = () => {
      setModalHeight(window.innerHeight * 0.9);
    };

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return {
    inputedMemo,
    editInputError,
    onChangeInputedMemo,
    onClose,
    onComplete,
    modalHeight,
  };
};

export default useImcompletedTodoDetailModalViewModdel;
