import { Drawer } from "vaul";
import {
  ImcompletedTodoType,
  UpdateTodoDetailParams,
  UpdateTodoParams,
} from "../../types";
import useImcompletedTodoDetailModalViewModdel from "./ImcompletedTodoDetailModalViewModel";
import Textarea from "../../../../components/TextArea/Textarea";
import Button from "../../../../components/Button/Button";
import styles from "./ImcompletedTodoDetailModal.module.css";
import { formatDateTime } from "../../../../util/CustomDate";
import IconButton from "../../../../components/IconButton/IconButton";
import { CiCircleCheck } from "react-icons/ci";
import NotificationDateTimeSetting from "./NotificationDateTimeSetting/NotificationDateTimeSetting";
import { format } from "date-fns";
import { isMobile } from "react-device-detect";
// 名前編集も単一行ではなくTextareaで行う

const ImcompletedTodoDetailModal = ({
  isOpen,
  target,
  setOpen,
  updateTodoDetail,
  updateTodo,
}: {
  isOpen: boolean;
  target: ImcompletedTodoType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodoDetail: (props: UpdateTodoDetailParams) => void;
  updateTodo: ({ params, successMessage }: UpdateTodoParams) => void;
}) => {
  const {
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
    // name edit states
    inputedTodoName,
    nameEditInputError,
    isNameEditMode,
    onChangeInputedTodoName,
    finishNameEdit,
    nameEditOnKeyDown,
    startNameEdit,
    validateName,
  } = useImcompletedTodoDetailModalViewModdel({
    target,
    updateTodoDetail,
    setOpen,
  });

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setOpen}
      direction="bottom"
      onClose={() => onClose(target)}
      repositionInputs={false}
      dismissible={isOpenDatePicker ? false : true} // モーダルonモーダルになり、スクロールが伝播してしまうため、日時選択中は閉じないようにする
    >
      {/* Portalのせいで変なところに表示されていた。コメントアウトすると表示される！ */}
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content
          className={styles.content_wraper}
          style={{
            height: modalHeight, // キーボード表示時に高さを自動調整
          }}
        >
          <div className={styles.content}>
            {/* TODO: ここは、メモと同じように編集モードを作る。また、一行編集にならないようにtextタグでやろうかな */}
            <div className={styles.todo_name_wrapper}>
              <IconButton
                onClick={() => {
                  if (!validateName()) return;
                  updateTodo({
                    params: {
                      id: target.id,
                      name: inputedTodoName.trim(),
                      memo: inputedMemo,
                      notificate_at:
                        selectedDateTime &&
                        format(selectedDateTime, "yyyy-MM-dd HH:mm"),
                      is_completed: true,
                    },
                    successMessage: "完了にしました✅",
                  });
                  onComplete(target);
                }}
                children={
                  <CiCircleCheck
                    size={isMobile ? 35 : 40}
                    style={{ color: "var(--color-icon)" }}
                  />
                }
              />
              {isNameEditMode ? (
                <Textarea
                  name="edit_todo_name_in_modal"
                  value={inputedTodoName}
                  placeholder={target.name}
                  onChange={(e) => onChangeInputedTodoName(e)}
                  onBlur={finishNameEdit}
                  onKeyDown={nameEditOnKeyDown}
                  errorMessage={nameEditInputError}
                  autoFocus={true}
                  containerStyle={{ flex: 1 }}
                  style={{
                    width: "auto",
                    height: "auto",
                    minHeight: isMobile ? "60px" : "80px",
                    overflowY: "auto",
                  }}
                />
              ) : (
                <p className={styles.todo_name} onClick={() => startNameEdit()}>
                  {inputedTodoName}
                </p>
              )}
            </div>
            <NotificationDateTimeSetting
              selectedDateTime={selectedDateTime}
              onChangeDateTime={onChangeDateTime}
              isOpenDatePicker={isOpenDatePicker}
              onChangeDatePicker={onChangeDatePicker}
            />
            {isEditMode ? (
              <Textarea
                label="メモ"
                value={inputedMemo}
                onChange={(e) => onChangeInputedMemo(e)}
                onBlur={toggleEditMode}
                errorMessage={editInputError}
                autoFocus={true}
              />
            ) : (
              <div className="memo_wrapper">
                メモ
                <div
                  className={styles.memo}
                  dangerouslySetInnerHTML={{
                    __html: inputedMemoReplacedUrlToLink,
                  }}
                  onClick={toggleEditMode}
                />
              </div>
            )}
            <span className={styles.created_at}>
              作成日: {formatDateTime(target.created_at)}
            </span>
            <Button onClick={() => onComplete(target)}>閉じる</Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ImcompletedTodoDetailModal;
