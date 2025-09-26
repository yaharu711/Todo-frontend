import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/paths";
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
      navigate(ROUTE_PATHS.login);
    },
    onDefault: () => navigate(ROUTE_PATHS.error500),
  };
};
