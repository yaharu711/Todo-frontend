import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PublicLayout from "./components/PublicLayout";
import PrivateLayout from "./components/PrivateLayout";
import TodoPage from "./pages/Todo";
import HomePage from "./pages/HomePage";
import UnExpectedErrorPage from "./pages/UnExpectedErrorPage";

export type ButtonProps = {
  onClick: (target: TodoType) => void;
  children: string;
};
export type TodoType = {
  name: string;
  isEditMode: boolean;
};

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

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/500" element={<UnExpectedErrorPage />} />
        </Route>
        <Route element={<PrivateLayout />}>
          <Route path="/todo" element={<TodoPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
