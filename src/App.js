import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ToggleMenu from "./components/togglemenu";
import Login from "./components/login";
import Main from "./components/main";
import Regi from "./components/regi";

import Qnapage from "./components/qna/qnapage";
import Member from "./components/member";
import Typeqna from "./components/qna/typeqna";

import "./App.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <nav>
            <ToggleMenu />
            <Link to="/">로그인</Link>&nbsp;&nbsp;&nbsp;
            <Link to="/main">메인</Link>&nbsp;&nbsp;&nbsp;
            <Link to="/qna-management">Q&A관리</Link>
          </nav>
        </header>

        <hr />

        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/regi" element={<Regi />} />
            <Route path="/main" element={<Main />} />
            <Route path="/qna-management" element={<Qnapage />} />
            <Route path="/typeqna/:qtype" exact element={<Typeqna />} />

            <Route path="/member-management" element={<Member />} />
          </Routes>
        </main>
        <hr />
      </BrowserRouter>

      <footer>
        <p>여긴 푸터</p>
      </footer>
    </div>
  );
}

export default App;
