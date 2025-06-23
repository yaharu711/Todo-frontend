import { useState } from "react";

const useLogoViewModel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const onLoad = () => {
    setIsLoading(false);
  };
  return {
    isLoading,
    onLoad,
  };
};
export default useLogoViewModel;
