import { Navigate, Route, Routes } from 'react-router-dom'
import Content from './component/HomePage/Content'
import NavBar from './component/NavBar'
import BoardInfo from './component/BoardView/BoardInfo'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/boards" />} />
        <Route path="/boards" element={<Content />} />
        <Route path="/boards/:id" element={<BoardInfo />}></Route>
      </Routes>
    </>
  )
}

export default App
