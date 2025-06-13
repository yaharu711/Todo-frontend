import { useState } from "react";

const useHeaderViewModel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const changeIsOpen = (open: boolean) => setIsOpen(open);

  return {
    isOpen,
    changeIsOpen,
  };
};

export default useHeaderViewModel;
