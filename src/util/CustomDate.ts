import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";

// Date専用。和暦ではなく、西暦の日本語ロケールで表記
// 例: 9月19日 (金) 14時05分
export const formatDateTime = (date: Date): string => {
  return format(date, "M月d日 (EEE) H時m分", { locale: ja });
};
