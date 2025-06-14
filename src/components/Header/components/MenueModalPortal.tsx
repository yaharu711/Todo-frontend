import { Drawer } from "vaul";
import styles from "./MenuModalPortal.module.css";
import IconButton from "../../IconButton";
import { IoCloseCircleOutline } from "react-icons/io5";
type Props = {
  isOpen: boolean;
  changeIsOpen: (open: boolean) => void;
  children: React.ReactNode;
};

const MenuModalPortal = ({ isOpen, changeIsOpen, children }: Props) => {
  return (
    <Drawer.Root open={isOpen} onOpenChange={changeIsOpen} direction="bottom">
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={styles.content_wraper}>
          <div className={styles.content}>
            <IconButton
              onClick={() => changeIsOpen(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0",
                width: "auto",
                height: "auto",
              }}
            >
              <IoCloseCircleOutline
                size={30}
                style={{ color: "var(--color-icon)" }}
              />
            </IconButton>
            <div className={styles.menue_wrap}>{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
export default MenuModalPortal;
