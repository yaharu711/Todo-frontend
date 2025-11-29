import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import styles from "./Dropdown.module.css";

export type DropdownItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export type DropdownProps = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect: (key: string) => void;
  selectedKey?: string;
  disabled?: boolean;
  sideOffset?: number;
  align?: DropdownMenu.DropdownMenuContentProps["align"];
};

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect,
  selectedKey,
  disabled,
  sideOffset = 8,
  align = "end",
}) => {
  return (
    // ドロップダウンなので、modal={false}で背面へのフォーカスやスクロールロックなど行わない
    <DropdownMenu.Root modal={false}>
      {/* asChildをつけることで、子要素をそのまま使える */}
      <DropdownMenu.Trigger asChild disabled={disabled}>
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.content}
          sideOffset={sideOffset}
          // プップアップの表示位置の調整
          align={align}
          collisionPadding={8}
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.key}
              disabled={item.disabled}
              className={styles.item}
              data-selected={item.key === selectedKey}
              onSelect={() => onSelect(item.key)}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span>{item.label}</span>
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className={styles.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
