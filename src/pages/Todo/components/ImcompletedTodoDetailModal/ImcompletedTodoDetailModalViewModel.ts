import { useEffect, useState } from "react";
import { ImcompletedTodoType, UpdateTodoDetailParams } from "../../types";
import { replaceUrlToLink } from "../../../../util/ReplaceUrlToLink";
import DOMPurify from "dompurify";

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
  // TODO: memoのようにAPIから取得されるデータに設定された通知の日時も含めるようにして、初期値をそれにする。
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const onChangeDateTime = (date: Date | null) => setSelectedDateTime(date);
  const [inputedMemo, setInputedMemo] = useState<string>(target.memo);
  const [editInputError, setEditInputError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const onChangeInputedMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputedMemo(e.target.value);
    setEditInputError("");
  };
  const toggleEditMode = () => setIsEditMode((prev) => !prev);

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

  const onClose = (target: ImcompletedTodoType) => {
    setIsEditMode(false);
    editTodo(target);
  };
  const onComplete = (target: ImcompletedTodoType) => {
    setIsEditMode(false);
    editTodo(target);
    setOpen((prev) => !prev);
  };

  const [modalHeight, setModalHeight] = useState(window.innerHeight * 0.8);
  useEffect(() => {
    const updateHeight = () => {
      setModalHeight(window.innerHeight * 0.8);
    };

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const inputedMemoReplacedUrlToLink = DOMPurify.sanitize(
    replaceUrlToLink(inputedMemo),
    {
      ALLOWED_TAGS: ["a"], // 許可するタグリスト
      ALLOWED_ATTR: ["href", "rel", "target"], // 許可する属性リスト
    }
  );

  return {
    selectedDateTime,
    onChangeDateTime,
    inputedMemo,
    editInputError,
    isEditMode,
    toggleEditMode,
    onChangeInputedMemo,
    onClose,
    onComplete,
    modalHeight,
    inputedMemoReplacedUrlToLink,
  };
};

export default useImcompletedTodoDetailModalViewModdel;
