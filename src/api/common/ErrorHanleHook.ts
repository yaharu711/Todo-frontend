import { useNavigate } from "react-router-dom";

export type apiErrorHandlesType = {
  onUnAuthorized?: () => void;
  onDefault?: () => void;
};

export const useApiErrorHandles = (): apiErrorHandlesType => {
  const navigate = useNavigate();

  return {
    onUnAuthorized: () =>
      navigate("/login", {
        state: {
          message: "セッションが切れました。再度ログインをお願いします",
        },
      }),
    onDefault: () => navigate("/500"),
  };
};
