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
import { formatDate } from "../../../../util/CustomDate";
import IconButton from "../../../../components/IconButton/IconButton";
import { CiCircleCheck } from "react-icons/ci";
import NotificationDateTimeSetting from "./NotificationDateTimeSetting/NotificationDateTimeSetting";
import { format } from "date-fns";
import { isMobile } from "react-device-detect";

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
                  updateTodo({
                    params: {
                      id: target.id,
                      name: target.name,
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
              <p className={styles.todo_name}>{target.name}</p>
            </div>
            <NotificationDateTimeSetting
              selectedDateTime={selectedDateTime}
              onChangeDateTime={onChangeDateTime}
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
              作成日: {formatDate(target.created_at)}
            </span>
            <Button onClick={() => onComplete(target)}>閉じる</Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ImcompletedTodoDetailModal;
