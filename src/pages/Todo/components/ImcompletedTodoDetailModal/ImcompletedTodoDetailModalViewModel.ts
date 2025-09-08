import { useEffect, useState } from "react";
import { ImcompletedTodoType, UpdateTodoDetailParams } from "../../types";
import { replaceUrlToLink } from "../../../../util/ReplaceUrlToLink";
import DOMPurify from "dompurify";
import { format } from "date-fns";

export type Props = {
  target: ImcompletedTodoType;
  updateTodoDetail: (props: UpdateTodoDetailParams) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialNameEditMode?: boolean;
};
const useImcompletedTodoDetailModalViewModdel = ({
  target,
  updateTodoDetail,
  setOpen,
  initialNameEditMode = false,
}: Props) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    target.notificate_at !== null ? new Date(target.notificate_at) : null
  );
  useEffect(() => {
    setSelectedDateTime(
      target.notificate_at !== null ? new Date(target.notificate_at) : null
    );
  }, [target]);
  const onChangeDateTime = (date: Date | null) => setSelectedDateTime(date);
  const [inputedMemo, setInputedMemo] = useState<string>(target.memo);
  const [editInputError, setEditInputError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const onChangeInputedMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputedMemo(e.target.value);
    setEditInputError("");
  };
  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  // タイトル（Todo名）の編集
  const [inputedTodoName, setInputedTodoName] = useState<string>(target.name);
  useEffect(() => {
    setInputedTodoName(target.name);
  }, [target]);
  const [isNameEditMode, setIsNameEditMode] = useState<boolean>(
    initialNameEditMode
  );
  useEffect(() => {
    setIsNameEditMode(initialNameEditMode);
  }, [initialNameEditMode]);
  const [nameEditInputError, setNameEditInputError] = useState<string>("");
  const onChangeInputedTodoName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputedTodoName(e.target.value);
    setNameEditInputError("");
  };
  const startNameEdit = () => setIsNameEditMode(true);
  const finishNameEdit = (_e?: React.FocusEvent) => {
    if (inputedTodoName.trim() === "") {
      setNameEditInputError("空白のみは許可されていません");
      return;
    }
    setIsNameEditMode(false);
  };
  const nameEditOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    finishNameEdit();
  };

  const validateName = (): boolean => {
    if (inputedTodoName.trim() === "") {
      setNameEditInputError("空白のみは許可されていません");
      setIsNameEditMode(true);
      return false;
    }
    return true;
  };

  // これをonCloseの時と、完了ボタンを押した時に実行する
  const editTodo = (target: ImcompletedTodoType) => {
    if (inputedMemo.trim() === "") {
      // 編集モードは終わらないまま編集してもらう
      setEditInputError("空白・改行のみは許可されていません");
    }
    // 変更がない場合（名前・メモ・通知のいずれも変わっていない場合）は処理しない
    const isNotUpdatedName = inputedTodoName === target.name;
    const isNotUpdatedMemo = inputedMemo === target.memo;
    const isNotSetNotification = !target.notificate_at && !selectedDateTime;
    const isNotUpdatedNotificateAt =
      selectedDateTime &&
      format(new Date(selectedDateTime), "yyyy-MM-dd HH:mm:ss") ===
        target.notificate_at;
    if (
      isNotUpdatedName &&
      isNotUpdatedMemo &&
      (isNotUpdatedNotificateAt || isNotSetNotification)
    ) {
      return;
    }

    // 名前は空白のみの場合は更新しない（直前の編集終了時にエラー表示している）
    const safeName =
      inputedTodoName.trim() === "" ? target.name : inputedTodoName;

    updateTodoDetail({
      request: {
        id: target.id,
        name: safeName,
        memo: inputedMemo,
        notificate_at:
          selectedDateTime && format(selectedDateTime, "yyyy-MM-dd HH:mm"),
      },
      setInputError: setEditInputError,
    });
  };

  const onClose = (target: ImcompletedTodoType) => {
    setIsEditMode(false);
    setIsNameEditMode(false);
    editTodo(target);
  };
  const onComplete = (target: ImcompletedTodoType) => {
    setIsEditMode(false);
    setIsNameEditMode(false);
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

  // 通知の日付設定のモーダルについて
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const onChangeDatePicker = () => {
    setIsOpenDatePicker((prev) => !prev);
  };

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
    isOpenDatePicker,
    onChangeDatePicker,
    inputedTodoName,
    nameEditInputError,
    isNameEditMode,
    onChangeInputedTodoName,
    finishNameEdit,
    nameEditOnKeyDown,
    startNameEdit,
    validateName,
  };
};

export default useImcompletedTodoDetailModalViewModdel;
