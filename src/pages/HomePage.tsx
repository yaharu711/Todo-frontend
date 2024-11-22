import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>ホームページ</h1>
      <button onClick={() => navigate("/login")}>ログインする</button>
    </div>
  );
};

export default HomePage;
