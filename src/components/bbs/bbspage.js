import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Partybbs from "./partybbs";
import Freebbs from "./freebbs";
import Spam from "./spam";
import Comment from "./comment";
import "./bbs.css";

function Bbspage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  const isLogin = localStorage.getItem("login");
  useEffect(() => {
    if (isLogin == null) {
      alert("로그인해 주십시오");
      navigate("/"); // 로그인 페이지로 이동
    } else {
      const login = JSON.parse(isLogin);
      setId(login.id);
    }
  }, [navigate, isLogin]);

  const location = useLocation(); // 현재 위치 정보를 가져오기 위해 useLocation 훅을 사용합니다.

  return (
    <div className="bbspage">
      <div className="bbsnav" style={{ textAlign: "left" }}>
        <Link className={` ${location.pathname.includes("spam") ? "active" : ""}`} to="spam">
          스팸/홍보글 모니터링
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link className={` ${location.pathname.includes("comment") ? "active" : ""}`} to="comment">
          댓글 모니터링
        </Link>
        <Link className={` ${location.pathname.includes("partybbs") ? "active" : ""}`} to="partybbs">
          모집게시판
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link className={` ${location.pathname.includes("freebbs") ? "active" : ""}`} to="freebbs">
          자유게시판
        </Link>
        &nbsp;&nbsp;&nbsp;
      </div>
      <div className="bbscontent">
        <Routes>
          <Route path="partybbs/*" element={<Partybbs />} />
          <Route path="freebbs/*" element={<Freebbs />} />
          <Route path="spam/*" element={<Spam />} />
          <Route path="comment/*" element={<Comment />} />
        </Routes>
      </div>
    </div>
  );
}

export default Bbspage;
