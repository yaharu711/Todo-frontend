import { Drawer } from "vaul";
import { ImcompletedTodoType, UpdateTodoDetailParams } from "../../types";
import useImcompletedTodoDetailModalViewModdel from "./ImcompletedTodoDetailModalViewModel";
import Textarea from "../../../../components/Textarea";
import Button from "../../../../components/Button";
import styles from "./ImcompletedTodoDetailModal.module.css";

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
    onChangeInputedMemo,
    onClose,
    onComplete,
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
        <Drawer.Content className={styles.content_wraper}>
          <div className={styles.content}>
            <p className={styles.todo_name}>{target.name}</p>
            <Textarea
              label="メモ"
              value={inputedMemo}
              onChange={(e) => onChangeInputedMemo(e)}
              errorMessage={editInputError}
            />
            {/* TODO: リンクにする。これは、編集中はTextareaで編集後は以下のdivタグで表示するようにすれば、良いのでは？ */}
            {/* <div dangerouslySetInnerHTML={{ __html: replaceUrlToLink(inputedMemo) }} /> */}
            <Button onClick={() => onComplete(target)}>完了</Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ImcompletedTodoDetailModal;
