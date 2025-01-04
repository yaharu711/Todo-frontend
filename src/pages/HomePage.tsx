import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>ホームページ</h1>
      <Button onClick={() => navigate("/login")} style={{ width: "150px" }}>
        ログインページ
      </Button>
    </div>
  );
};

export default HomePage;
