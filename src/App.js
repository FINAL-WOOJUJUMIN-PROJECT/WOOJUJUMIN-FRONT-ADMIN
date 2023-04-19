import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ToggleMenu from "./components/togglemenu";
import Login from "./components/login";
import Main from "./components/main";

import Calendar from "./components/calendar";

import "./App.css";
import Calendarwrite from "./components/calendarwrite";

import Regi from "./components/regi";

import Qnapage from "./components/qna/qnapage";
import Member from "./components/member";
import Typeqna from "./components/qna/typeqna";
import Qnadetail from "./components/qna/qnadetail";

import "./App.css";

function App() {
  // 로그인 상태 관리
  const [log, setLog] = useState(null);

  function loghandle() {
    localStorage.clear();
    document.location.href = "/";
  }

  useEffect(() => {
    if (localStorage.getItem("login") === null) {
      setLog(true);
    } else {
      setLog(false);
    }
  }, [log]);

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <nav>
            <ToggleMenu />
            <Link to="/main">메인</Link>&nbsp;&nbsp;&nbsp;
            <Link to="/qna-management">Q&A관리</Link> &nbsp;&nbsp;&nbsp;
            <Link to="/Calendar">일정관리</Link> &nbsp;&nbsp;&nbsp;
            {log ? (
              <Link to="/">로그인</Link>
            ) : (
              <button onClick={loghandle}>로그아웃</button>
            )}
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/regi" element={<Regi />} />
            <Route path="/main" element={<Main />} />

            <Route path="/calendar" element={<Calendar />} />
            <Route
              path="/calendarwrite/:year/:month/:day"
              element={<Calendarwrite />}
            />

            <Route path="/qna-management" element={<Qnapage />} />
            <Route path="/typeqna/:qtype" exact element={<Typeqna />} />
            <Route path="/qnadetail/:qnaSeq" exact element={<Qnadetail />} />

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
