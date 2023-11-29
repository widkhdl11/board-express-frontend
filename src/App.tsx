import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/log-in";
import Detail from "./pages/detail";
import Signup from "./pages/sign-up";
import Create from "./pages/create";
import Header from "./components/Header";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:postId" element={<Detail />} />
        </Route>
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
