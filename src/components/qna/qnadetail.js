import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Qnamodal from "./qnamodal";

function Qnadetail(props) {
  const [qna, setQna] = useState();
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  //const [content, setContent] = useState("");
  let qnaSeq = props.qnaSeq;
  //console.log(params.qnaSeq);

  //관리자id,nickname
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const isLogin = localStorage.getItem("login");
  useEffect(() => {
    if (isLogin == null) {
      alert("로그인해 주십시오");
      navigate("/login"); // 로그인 페이지로 이동
    } else {
      const login = JSON.parse(isLogin);
      setNickname(login.nickname);
      setId(login.id);
    }
  }, [navigate, isLogin]);

  const qnaData = async (qnaSeq) => {
    const response = await axios.get("http://localhost:3000/getQna", {
      params: { qnaSeq: qnaSeq },
    });
    setQna(response.data);

    setLoading(true); // 여기서 rendering 해 준다
  };

  useEffect(() => {
    qnaData(props.qnaSeq);
  }, [props.qnaSeq]);

  if (loading === false) {
    return <div>Loading...</div>;
  }

  const makeAnswer = () => {
    if (answer === undefined || answer.trim() === "") {
      alert("답변을 입력해주세요");
      return;
    }
    axios
      .post("http://localhost:3000/makeanswer", null, {
        params: { qnaSeq: qnaSeq, mngid: id, answer: answer },
      })
      .then((resp) => {
        if (resp.data === "YES") {
          alert("답변이 등록되었습니다");
        } else {
          alert("답변 등록에 실패했습니다");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  };

  return (
    <div>
      <Table responsive>
        <colgroup>
          <col style={{ width: "150px" }} />
          <col style={{ width: "500px" }} />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td style={{ textAlign: "left" }}>{qna.id}</td>
          </tr>
          <tr>
            <th>문의일자</th>
            <td style={{ textAlign: "left" }}>{qna.wdate}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td colSpan="2" style={{ textAlign: "left" }}>
              {qna.title}
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td style={{ textAlign: "left" }}>{qna.content}</td>
          </tr>
          <tr>
            <th>관리자 정보</th>
            <td style={{ textAlign: "left" }}>
              {nickname}({id})
            </td>
          </tr>
          <tr>
            <th>답변내용</th>
            <td>
              <textarea
                rows="10"
                value={answer}
                cols="50"
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={qna.answer}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: "center" }}>
              <button
                type="button"
                onClick={() => makeAnswer()}
                className="btn btn-primary"
              >
                답변등록
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Qnadetail;
