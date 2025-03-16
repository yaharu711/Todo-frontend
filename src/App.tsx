import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import PublicLayout from "./components/PublicLayout";
import PrivateLayout from "./components/PrivateLayout";
import TodoPage from "./pages/Todo";
import HomePage from "./pages/HomePage";
import UnExpectedErrorPage from "./pages/UnExpectedErrorPage";
import ToastProvider from "./components/ToastProvider";
import NotFoundUrlPage from "./pages/NotFoundUrlPage";
import RegisterPage from "./pages/Register";
import SettingPage from "./pages/Setting";

export type ButtonProps = {
  onClick: (target: TodoType) => void;
  children: string;
};
export type TodoType = {
  name: string;
  isEditMode: boolean;
};

const App = () => {
  return (
    <div className="App">
      <ToastProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/regist" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/500" element={<UnExpectedErrorPage />} />
          </Route>
          <Route element={<PrivateLayout />}>
            <Route path="/todos" element={<TodoPage />} />
            <Route path="/setting" element={<SettingPage />} />
          </Route>
          <Route path="*" element={<NotFoundUrlPage />} />
        </Routes>
      </ToastProvider>
    </div>
  );
};

export default App;
