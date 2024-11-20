import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PublicLayout from "./components/PublicLayout";
import PrivateLayout from "./components/PrivateLayout";
import TodoPage from "./pages/Todo";
import HomePage from "./pages/HomePage";

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
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateLayout />}>
          <Route path="/todo" element={<TodoPage />} />
        </Route>
      </Routes>
      ;
    </div>
  );
};

export default App;
