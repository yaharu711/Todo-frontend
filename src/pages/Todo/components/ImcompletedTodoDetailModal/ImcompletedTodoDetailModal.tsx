import { Drawer } from "vaul";
import { ImcompletedTodoType, UpdateTodoDetailParams } from "../../types";
import useImcompletedTodoDetailModalViewModdel from "./ImcompletedTodoDetailModalViewModel";
import Textarea from "../../../../components/Textarea";
import Button from "../../../../components/Button";

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
  const { editInputError, onClose, onComplete } =
    useImcompletedTodoDetailModalViewModdel({
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
        <Drawer.Overlay
          style={{
            position: "fixed", // `relative` だと他の要素の影響を受ける可能性がある
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(2, 1, 1, 0.75)",
            width: "100%",
            height: "100%",
            zIndex: 999,
          }}
        />
        <Drawer.Content
          style={{
            position: "fixed", // `relative` だと他の要素の影響を受ける可能性がある
            bottom: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "90%", // モーダルの高さを50%に設定
            width: "100%",
            backgroundColor: "var(--background-color)",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "16px",
              padding: "16px",
              width: "90%",
            }}
          >
            {/* Todoアプリのように改行されて表示され、タップですぐ入力モードになるUIはどのようにできる？
             * textareaだと改行できちゃうしなー、常にTextInputを表示は改行表示ができないし、pタグで表示でタップでTextInputにしても一行表示になってしまうし、、
             */}
            {/* <TextInput
              name="edit_modal"
              value={inputedTodoName}
              onChange={onChangeInput}
              errorMessage={editInputError.name}
              style={{
                width: isMobile ? "330px" : "300px",
                minHeight: isMobile ? "35px" : "auto",
                height: "auto",
                backgroundColor: "var(--background-color)",
                overflowWrap: "break-word",
              }}
            /> */}
            <p
              style={{
                fontSize: "1.1rem",
                width: "auto",
                minWidth: "200px",
                lineBreak: "anywhere",
              }}
            >
              {target.name}
            </p>
            <Textarea label="メモ" errorMessage={editInputError.memo} />
            {/* 必要に応じて編集ボタンや削除ボタンを配置 */}
            <Button onClick={() => onComplete(target)}>完了</Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ImcompletedTodoDetailModal;
