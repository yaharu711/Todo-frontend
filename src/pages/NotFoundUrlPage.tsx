import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const NotFoundUrlPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>
        指定されたURLは見つかりませんでした。不明な点は開発者に連絡をお願いします
      </p>
      <Button onClick={() => navigate("/")} style={{ width: "150px" }}>
        ホームページ
      </Button>
    </div>
  );
};

export default NotFoundUrlPage;
