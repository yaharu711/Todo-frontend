import { useState } from "react";

const UseImcompletedTodosViewModel = () => {
  const [isSortMode, setIsSortMode] = useState(false);
  const toggleSortMode = () => setIsSortMode((prev) => !prev);

  const saveSorted = () => {
    // queryClientのキャッシュからAPIにリクエストするTODOのIDの配列を生成できる
    toggleSortMode();
  };

  return {
    isSortMode,
    toggleSortMode,
    saveSorted,
  };
};

export default UseImcompletedTodosViewModel;
