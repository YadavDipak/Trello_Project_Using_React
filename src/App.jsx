import { Navigate, Route, Routes } from "react-router-dom";
import Content from "./components/HomePage/Content";
import MainLayout from "./layout/MainLayout";
import BoardInfo from "./components/BoardView/BoardInfo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/boards" />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/boards" element={<Content />} />
          <Route path="/boards/:id" element={<BoardInfo />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
