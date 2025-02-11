import dayjs from "dayjs";

export const formatDate = (dateStr: string): string => {
  return dayjs(dateStr).format("M月D日 H時m分");
};
