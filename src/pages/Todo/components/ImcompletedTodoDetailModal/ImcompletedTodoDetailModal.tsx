import { Drawer } from "vaul";
import { ImcompletedTodoType, UpdateTodoDetailParams } from "../../types";
import useImcompletedTodoDetailModalViewModdel from "./ImcompletedTodoDetailModalViewModel";
import Textarea from "../../../../components/Textarea";
import Button from "../../../../components/Button";
import styles from "./ImcompletedTodoDetailModal.module.css";
import { formatDate } from "../../../../util/CustomDate";

const ImcompletedTodoDetailModal = ({
  isOpen,
  target,
  setOpen,
  updateTodoDetail,
}: {
  isOpen: boolean;
  target: ImcompletedTodoType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodoDetail: (props: UpdateTodoDetailParams) => void;
}) => {
  const {
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
            <p className={styles.todo_name}>{target.name}</p>
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
            <Button onClick={() => onComplete(target)}>完了</Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ImcompletedTodoDetailModal;
