import { Drawer } from "vaul";
import styles from "./MenuModalPortal.module.css";
import Button from "../../../../../components/Button";
type Props = {
  isOpen: boolean;
  changeIsOpen: (open: boolean) => void;
  children: React.ReactNode;
};

const MenuModalPortal = ({ isOpen, changeIsOpen, children }: Props) => {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={changeIsOpen}
      direction="bottom"
      repositionInputs={false}
    >
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
            <div className={styles.menue_wrap}>{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
export default MenuModalPortal;
