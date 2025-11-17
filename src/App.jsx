import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/LoginPage/RegisterPage";
function App() {
  return (
    <>
      <div className="app">
        <div>
          <Routes>
            <Route
              path="/login"
              element={
                <>
                  <LoginPage />
                </>
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/register"
              element={
                <>
                  <RegisterPage />
                </>
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <>
                  <HomePage />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;