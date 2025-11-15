import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomaPage/HomePage";

// import Header from "./components/Header/Header";
// import CaseStudy from "./components/Home/CaseStudy";
// import News1 from "./Page/PageNews/News1/News1";
// import Footer from "./components/Footer/Footer";
// import Industries from "./Page/Industries/Industries";

// import ApplicationServicePage from "./Page/ApplicationServicePage/ApplicationServicePage";
function App() {
  return (
    <>
      <div className="app">
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HomePage/>
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