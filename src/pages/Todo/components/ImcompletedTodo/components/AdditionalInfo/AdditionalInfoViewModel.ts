import { ImcompletedTodoType } from "../../../../types";

const AdditionalInfoViewModel = (target: ImcompletedTodoType) => {
  const hasMemo = target.memo !== "";
  const hasNotification = target.notificate_at !== null;

  return {
    hasMemo,
    hasNotification,
  };
};

export default AdditionalInfoViewModel;
