import { BrowserRouter } from "react-router-dom"
import { Route, Routes } from "react-router"
import { PATH_DETAILS } from "./env"
import Detail from "./views/Detail"
import Home from "./views/Home"
import './App.css'

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          <Route path={PATH_DETAILS} element={<Detail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
