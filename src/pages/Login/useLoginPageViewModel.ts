import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { clearAuthFrom, FromParts, resolveAuthRedirectTarget } from "../../auth/redirectFrom";

const useLoginPageViewModel = () => {
  const { status } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // 認証状態が確定してauthenticatedならTODOへ
  useEffect(() => {
    if (status === "authenticated") {
      // 直前のアクセス先（state or session）を優先して復元
      const to = resolveAuthRedirectTarget({
        stateFrom: ((location.state as { from?: FromParts } | null) || {})?.from,
        defaultPath: "/todos",
      });
      clearAuthFrom();
      navigate(to, { replace: true });
    }
  }, [status, navigate, location.state]);

  return {
    isPendingForCheckLogined: status === "checking",
  };
};

export default useLoginPageViewModel;
