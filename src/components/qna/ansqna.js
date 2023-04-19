import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import SimpleBarReact from "simplebar-react";
import Table from "react-bootstrap/Table";
import Qnamodal from "./qnamodal";
function Ansqna() {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  const isLogin = localStorage.getItem("login");

  const [qnalist, setQnalist] = useState([]);

  //
  const [qnaSeq, setQnaSeq] = useState(""); // qtype 상태값 추
  const ClickHandler = (qnaSeq) => {
    setQnaSeq(qnaSeq); // qnaSeq 상태값 설정
  };
  //
  const simpleBarRef = useRef(null);
  //

  useEffect(() => {
    if (isLogin == null) {
      alert("로그인해 주십시오");
      navigate("/"); // 로그인 페이지로 이동
    } else {
      const login = JSON.parse(isLogin);
      setId(login.id);
    }
  }, [navigate, isLogin]);

  function getQnalist() {
    if (!isLogin) {
      return;
    }
    axios
      .get("http://localhost:3000/answeredqns")
      .then(function (resp) {
        console.log(resp.data);
        setQnalist(resp.data);
      })
      .catch(function (err) {
        alert(err);
      });
  }

  const [qtype, setQtype] = useState("");

  useEffect(() => {
    if (id) {
      getQnalist();
    }
  }, [id]);

  return (
    <SimpleBarReact>
      <div ref={simpleBarRef} style={{ maxHeight: 500 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>제목</th>
              <th>작성날짜</th>
              <th>답변</th>
            </tr>
          </thead>
          <tbody>
            {qnalist && qnalist.length ? (
              qnalist.map(function (qna, i) {
                return (
                  <tr key={i}>
                    <td align="left">
                      {qna.ansdate ? (
                        <span>[답변완료] </span>
                      ) : (
                        <span>[답변대기중] </span>
                      )}
                      {qna.title}
                    </td>
                    <td>{qna.wdate.substring(0, 10)}</td>
                    <td>
                      <Qnamodal qnaSeq={qna.qnaSeq} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <td colSpan={2}>작성된 문의글이 없습니다</td>
            )}
          </tbody>
        </Table>
      </div>
    </SimpleBarReact>
  );
}

export default Ansqna;
