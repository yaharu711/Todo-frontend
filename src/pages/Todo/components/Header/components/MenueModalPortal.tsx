import { Drawer } from "vaul";
import styles from "./MenuModalPortal.module.css";
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
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
export default MenuModalPortal;
