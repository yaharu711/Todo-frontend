import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

const useLoginPageViewModel = () => {
  const { status } = useAuth();
  const navigate = useNavigate();
  // 認証状態が確定してauthenticatedならTODOへ
  useEffect(() => {
    if (status === "authenticated") {
      navigate("/todos", { replace: true });
    }
  }, [status, navigate]);

  return {
    isPendingForCheckLogined: status === "checking",
  };
};

export default useLoginPageViewModel;
