import { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Suspenseを使うなら、エラーは投げっぱなしにするのでエラーハンドリングはErrorBoundaryという仕組みを使う
// 上位のコンポーネントで処理するという思想なのかな
export const APIErrorHandler = ({ error }: { error: AxiosError }) => {
  const navigate = useNavigate();
  // コンポーネント内なので、以下のような副作用はuseEffectで処理してあげる
  // これによりレンダリングとの処理が分離できるので予期せぬバグが起きない
  useEffect(() => {
    if (error.response?.status === 401) {
      navigate("/login?isFrom401=true", { replace: true });
    } else {
      navigate("/500", { replace: true });
      toast.error(
        "予期しないバグが発生しました。時間をおいて再度アクセスしてください"
      );
    }
  }, [navigate, error]);

  return <></>;
};
