import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import AllQna from "./allqna";
import Ansqna from "./ansqna";
import Typeqna from "./typeqna";
import Qnadetail from "./qnadetail";

import "./qna.css";

function Qnapage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [qtype, setQtype] = useState(""); // qtype 상태값 추가

  const tabClickHandler = (index, qtype) => {
    setActiveIndex(index);
    setQtype(qtype); // qtype 상태값 설정
  };

  const tabContArr = [
    {
      tabTitle: (
        <li
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          <p>전체질문</p>
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <AllQna />
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1, "회원관리")}
        >
          <p>회원관련</p>
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <Typeqna qtype={qtype} />
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 2 ? "is-active" : ""}
          onClick={() => tabClickHandler(2, "게시글관리")}
        >
          <p>게시글관련</p>
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <Typeqna qtype={qtype} />
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 3 ? "is-active" : ""}
          onClick={() => tabClickHandler(3, "파티관리")}
        >
          <p>파티관련</p>
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <Typeqna qtype={qtype} />
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 4 ? "is-active" : ""}
          onClick={() => tabClickHandler(4, "오류신고")}
        >
          <p>오류신고</p>
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <Typeqna qtype={qtype} />
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 5 ? "is-active" : ""}
          onClick={() => tabClickHandler(5, "기타")}
        >
          <p>기타문의</p>
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <Typeqna qtype={qtype} />
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 6 ? "is-active" : ""}
          onClick={() => tabClickHandler(6)}
        >
          <p>답변 완료◦수정</p>
        </li>
      ),
      tabCont: (
        <div className="qnapage">
          <div className="qnapageLeft">
            <Ansqna />
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {}, [qtype]);

  return (
    <div className="tabbox">
      <ul className="tabs is-boxed">
        {tabContArr.map((section, index) => {
          return section.tabTitle;
        })}
      </ul>
      <div>{tabContArr[activeIndex].tabCont}</div>
    </div>
  );
}
export default Qnapage;
