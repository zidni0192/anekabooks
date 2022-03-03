import React from 'react'
import Home from './containers/home'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Purchased from './containers/purchased';
import Detail from './containers/detail';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path=":id" element={<Detail />} />
          <Route path="purchased" element={<Purchased />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
