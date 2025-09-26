import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../routes/paths";
import Button from "../components/Button/Button";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>ホームページ</h1>
      <Button onClick={() => navigate(ROUTE_PATHS.login)} style={{ width: "150px" }}>
        ログインページ
      </Button>
    </div>
  );
};

export default HomePage;
