import { Route, Routes } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import PrivateLayout from "./components/PrivateLayout";
import ToastProvider from "./util/ToastProvider";
import { AuthProvider } from "./auth/AuthProvider";
import { lazy, Suspense } from "react";

export type ButtonProps = {
  onClick: (target: TodoType) => void;
  children: string;
};
export type TodoType = {
  name: string;
  isEditMode: boolean;
};

const HomePageLazy = lazy(() => import("./pages/HomePage"));
const RegisterPageLazy = lazy(() => import("./pages/Register"));
const LoginPageLazy = lazy(() => import("./pages/Login"));
const TodoPageLazy = lazy(() => import("./pages/Todo"));
const CompletedTodoPageLazy = lazy(() => import("./pages/CompletedTodo"));
const SettingPageLazy = lazy(() => import("./pages/Setting"));
const UnExpectedErrorPageLazy = lazy(
  () => import("./pages/UnExpectedErrorPage")
);
const NotFoundUrlPageLazy = lazy(() => import("./pages/NotFoundUrlPage"));

const App = () => {
  // 全体にローディングが入った後に、部分的にローディング入るのが微妙な気がするから、一旦何も表示しないように
  return (
    <div className="App">
      <ToastProvider>
        <AuthProvider>
          <Routes>
          <Route element={<PublicLayout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<div></div>}>
                  <HomePageLazy />
                </Suspense>
              }
            />
            <Route
              path="/regist"
              element={
                <Suspense fallback={<div></div>}>
                  <RegisterPageLazy />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<div></div>}>
                  <LoginPageLazy />
                </Suspense>
              }
            />
            <Route
              path="/500"
              element={
                <Suspense fallback={<div></div>}>
                  <UnExpectedErrorPageLazy />
                </Suspense>
              }
            />
          </Route>
          <Route element={<PrivateLayout />}>
            <Route
              path="/todos"
              element={
                <Suspense fallback={<div></div>}>
                  <TodoPageLazy />
                </Suspense>
              }
            />
            <Route
              path="/todos/completed"
              element={
                <Suspense fallback={<div></div>}>
                  <CompletedTodoPageLazy />
                </Suspense>
              }
            />
            <Route
              path="/settings"
              element={
                <Suspense fallback={<div></div>}>
                  <SettingPageLazy />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <Suspense fallback={<div></div>}>
                <NotFoundUrlPageLazy />
              </Suspense>
            }
          />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </div>
  );
};

export default App;
