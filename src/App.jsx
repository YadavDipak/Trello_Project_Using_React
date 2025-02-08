import { Navigate, Route, Routes } from "react-router-dom";
import Content from "./components/homePage/Content";
import MainLayout from "./layout/MainLayout";
import BoardInfo from "./components/boardView/BoardInfo";
import SetErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <>
      <SetErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/boards" />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/boards" element={<Content />} />
            <Route path="/boards/:id" element={<BoardInfo />}></Route>
          </Route>
        </Routes>
      </SetErrorBoundary>
    </>
  );
}

export default App;
