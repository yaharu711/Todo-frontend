import { Drawer } from "vaul";
import styles from "./MenuModalPortal.module.css";
import { IoSettingsOutline } from "react-icons/io5";
import Button from "../../../../../components/Button";
import IconButton from "../../../../../components/IconButton";
import MenueModalPortalViewModel from "./MenueModalPortalViewModel";
type Props = {
  isOpen: boolean;
  changeIsOpen: (open: boolean) => void;
};

const MenuModalPortal = ({ isOpen, changeIsOpen }: Props) => {
  const { onClickSetting } = MenueModalPortalViewModel(changeIsOpen);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={changeIsOpen}
      direction="bottom"
      repositionInputs={false}
    >
      {/* Portalのせいで変なところに表示されていた。コメントアウトすると表示される！ */}
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={styles.content_wraper}>
          <div className={styles.content}>
            <Button
              onClick={() => changeIsOpen(false)}
              style={{
                position: "absolute",
                top: "38px",
                right: "38px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0",
                width: "auto",
                height: "auto",
              }}
            >
              ✖︎
            </Button>
            <div className={styles.menu_wrapper}>
              <div className={styles.menu_item}>
                {/* TODO: 本当は新しいボタンコンポーネントを作った方が良さそう→アイコンとラベルをつけたボタン。 */}
                <IconButton onClick={onClickSetting}>
                  <IoSettingsOutline
                    size={30}
                    style={{ color: "var(--color-icon)" }}
                  />
                </IconButton>
                <span onClick={onClickSetting}>アプリ設定</span>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
export default MenuModalPortal;
