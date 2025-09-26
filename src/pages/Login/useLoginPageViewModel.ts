import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { useAuthRedirect } from "../../auth/redirectFrom";
import { ROUTE_PATHS } from "../../routes/paths";

const useLoginPageViewModel = () => {
  const { status } = useAuth();
  const navigate = useNavigate();
  const { target } = useAuthRedirect({ defaultPath: ROUTE_PATHS.todos });
  // 認証状態が確定してauthenticatedならTODOへ
  useEffect(() => {
    if (status === "authenticated") {
      // 直前のアクセス先（state）を優先して復元
      navigate(target, { replace: true });
    }
  }, [status, navigate, target]);

  return {
    isPendingForCheckLogined: status === "checking",
  };
};

export default useLoginPageViewModel;
