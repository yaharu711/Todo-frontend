import { useNavigate, useSearchParams } from "react-router-dom";
import { useCheckLogined } from "../../api/User/hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useLoginPageViewModel = () => {
  const { data, isPending: isPendingForCheckLogined } = useCheckLogined();
  const navigate = useNavigate();
  // ログイン状態ならログイン後の画面に遷移する
  if (!isPendingForCheckLogined && data?.is_logined) {
    toast.info("ログイン済みのためTODOページに遷移します", {
      progressStyle: {
        background:
          "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
      },
    });
    navigate("/todos");
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const isFrom401 = searchParams.get("isFrom401");
  const isReload = searchParams.get("isReload");

  useEffect(() => {
    if (isFrom401 && !isReload) {
      // isReloadをtrueに設定し、リロードを実行
      searchParams.set("isReload", "true");
      // クエリパラメータを更新→以下はreload()が走る前に一回useEffectが実行されトースト表示されてしまう
      // よって、useEffectでは[]を指定して最初のレンダリング時のみ処理するようにしている
      setSearchParams(searchParams);
      window.location.reload();
    } else if (isFrom401 && isReload) {
      // リロード後にトーストを表示
      toast.error("セッションが切れました。再度ログインしてください");
      // クエリパラメータを削除して状態をリセット
      const params = new URLSearchParams(searchParams);
      params.delete("isFrom401");
      params.delete("isReload");
      // 現在のurlをクエリパラメータがない状態に書き換える
      window.history.replaceState({}, "", `${window.location.pathname}`);
    }
  }, []);

  return {
    isPendingForCheckLogined,
  };
};

export default useLoginPageViewModel;
