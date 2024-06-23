import {Home} from "./pages/Home";

import {Routes, Route} from "react-router-dom";

export function App() {
  return (
    <Routes> 
      <Route path="/" element={<Home />} />
    </Routes>
  )
}