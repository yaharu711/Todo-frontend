import styles from "./AdditionalInfo.module.css";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { formatDate } from "../../../../../../util/CustomDate";
import { ImcompletedTodoType } from "../../../../types";
import AdditionalInfoViewModel from "./AdditionalInfoViewModel";

type Props = {
  target: ImcompletedTodoType;
  toggleModal: (target: ImcompletedTodoType) => void;
};

const AdditionalInfo = ({ target, toggleModal }: Props) => {
  const { hasMemo, hasNotification } = AdditionalInfoViewModel(target);

  return (
    <div className={styles.additional_info_wrapper}>
      {hasMemo && (
        <div
          className={styles.additional_info}
          onClick={() => toggleModal(target)}
        >
          <MdOutlineStickyNote2 size={15} />
          <span className={styles.additional_text}>メモ</span>
        </div>
      )}
      {hasNotification && (
        <div
          className={styles.additional_info}
          onClick={() => toggleModal(target)}
        >
          <FaRegBell size={15} />
          <span className={styles.additional_text}>
            {target.notificate_at !== null && formatDate(target.notificate_at)}
          </span>
        </div>
      )}
    </div>
  );
};

export default AdditionalInfo;
