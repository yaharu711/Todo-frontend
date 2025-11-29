import { GrSort } from "react-icons/gr";
import { LuFilter } from "react-icons/lu";
import Button from "../../../../../components/Button/Button";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import IconButton from "../../../../../components/IconButton/IconButton";
import { ImcompletedFilterOptions, ImcompletedFilter } from "../filterOptions";
import styles from "./Actions.module.css";

type Props = {
  filter: ImcompletedFilter;
  onChangeFilter: (value: ImcompletedFilter) => void;
  isSortMode: boolean;
  toggleSortMode: () => void;
  onClickSaveSorted: () => void;
  isPendingForSortedTodo: boolean;
};

const Actions = ({
  filter,
  onChangeFilter,
  isSortMode,
  toggleSortMode,
  onClickSaveSorted,
  isPendingForSortedTodo,
}: Props) => {
  const selectedOption = ImcompletedFilterOptions.find(
    (option) => option.key === filter
  );
  const isActiveFilter = filter !== "all";

  return (
    <div className={styles.actions}>
      {!isSortMode && (
        <Dropdown
          selectedKey={filter}
          onSelect={(key: string) => onChangeFilter(key as ImcompletedFilter)}
          items={ImcompletedFilterOptions}
          trigger={
            <button
              type="button"
              aria-label="フィルター"
              className={styles.filterTrigger}
              data-active={isActiveFilter}
            >
              <LuFilter size={22} />
              <span className={styles.filterButtonText}>
                {selectedOption?.label ?? "フィルター"}
              </span>
            </button>
          }
        />
      )}

      <div
        className={styles.sortIcon}
        data-is-pending-for-sort-todo={isPendingForSortedTodo}
      >
        {isSortMode ? (
          <Button
            onClick={onClickSaveSorted}
            style={{ width: "80px", height: "45px" }}
            disabled={isPendingForSortedTodo}
          >
            完了
          </Button>
        ) : (
          <IconButton
            onClick={toggleSortMode}
            aria-label="並び替えモード"
            disabled={isPendingForSortedTodo}
          >
            <GrSort size={23} style={{ color: "var(--color-icon)" }} />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Actions;
