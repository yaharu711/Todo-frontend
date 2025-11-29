import { DropdownItem } from "../../../../components/Dropdown/Dropdown";
import { LuBell, LuClock, LuList } from "react-icons/lu";

export type ImcompletedFilter = "all" | "today" | "overdue";

export const ImcompletedFilterOptions: DropdownItem[] = [
  { key: "all", label: "すべて", icon: <LuList size={18} /> },
  { key: "today", label: "今日通知", icon: <LuBell size={18} /> },
  { key: "overdue", label: "期限超過", icon: <LuClock size={18} /> },
];
