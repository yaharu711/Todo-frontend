import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type apiErrorHandlesType = {
  onUnAuthorized?: () => void;
  onDefault?: () => void;
};

export const useApiErrorHandles = (): apiErrorHandlesType => {
  const navigate = useNavigate();

  return {
    onUnAuthorized: () => {
      toast.error("セッションが切れました。再度ログインしてください");
      navigate("/login");
    },
    onDefault: () => navigate("/500"),
  };
};
