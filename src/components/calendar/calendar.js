import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Ink from "../image/ink.png";
import Table from "react-bootstrap/Table";
import backmonth from "../image/backmonth.png";
import backyear from "../image/backyear.png";
import nextyear from "../image/nextyear.png";
import nextmonth from "../image/nextmonth.png";

function Calendar() {
  let { ryear, rmonth, ryyyymm } = useParams();

  function nvl(msg) {
    return msg === null || msg.trim() === "" ? true : false;
  }

  if (nvl(ryear) || nvl(rmonth) || nvl(ryyyymm)) {
    const currentDate = new Date();
    ryear = String(currentDate.getFullYear());
    // rmonth = new Date().getMonth() + 1;
    rmonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentDay = String(currentDate.getDate()).padStart(2, "0");
    ryyyymm = rmonth + currentDay;
  }

  console.log(ryear);
  console.log(rmonth);
  console.log(ryyyymm);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [sendYear, setSendYear] = useState(ryear);
  const [sendMonth, setSendMonth] = useState(rmonth);
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [lastday, setLastday] = useState(0);
  const [weekday, setWeekday] = useState(0);
  const [yyyymm, setYyyymm] = useState("");
  const [sendyyyymm, setSendyyymm] = useState(ryyyymm);
  const [calendardto, setCalendardto] = useState([]);

  useEffect(() => {
    const fetchData = async (sendYear, sendMonth) => {
      await axios
        .post("http://localhost:3000/calendarmain", null, { params: { sendYear: sendYear, sendMonth: sendMonth, sendYyyymm: sendyyyymm } })
        .then(function (res) {
          // alert(res.data);
          console.log(JSON.stringify(res.data));
          // console.log(JSON.stringify(res.data.dayOfWeek));
          // console.log(res.data.dayOfWeek);
          setDayOfWeek(res.data.dayOfWeek);
          setLastday(res.data.lastday);
          setWeekday(res.data.weekday);
          setYear(res.data.year);
          // alert(charTwo(msg));
          setMonth(charTwo(res.data.month));
          // console.log(dayOfWeek);
          // console.log(weekday);
          // console.log(lastday);
          setYyyymm(res.data.year + charTwo(res.data.month));
          setCalendardto(res.data.list);
        })
        .catch(function (err) {
          alert(err);
        });
    };

    fetchData(sendYear, sendMonth);
  }, [sendMonth, sendYear, sendyyyymm]);

  // 전년도
  function prevYear() {
    // alert(year);
    // alert(month);
    setSendYear(year - 1);
    setSendMonth(Number(month));
    let intToString = String(year - 1) + charTwo(Number(month));
    setSendyyymm(intToString);
  }

  // 전월
  function prevMonth() {
    setSendYear(year);
    setSendMonth(Number(month) - 1);
    let intToString = String(year) + charTwo(Number(month) - 1);
    setSendyyymm(intToString);
  }

  // 익월
  function nextMonth() {
    setSendYear(year);
    setSendMonth(Number(month) + 1);
    let intToString = String(year) + charTwo(Number(month) + 1);
    setSendyyymm(intToString);
  }

  // 내년도
  function nextYear() {
    setSendYear(year + 1);
    setSendMonth(Number(month));
    let intToString = String(year + 1) + charTwo(Number(month));
    setSendyyymm(intToString);
  }

  // 오늘날짜로 돌아오기
  function todaySet() {
    setSendYear("");
    setSendMonth("");
    setSendyyymm("");
  }

  // 한자리 숫자를 두자리로 만들어주는 함수 : 1 ~ 9 -> 01 ~ 09
  function charTwo(msg) {
    if (typeof msg !== "string") {
      msg = String(msg); // 숫자나 다른 타입을 문자열로 변환
    }

    return msg.trim().length < 2 ? "0" + msg.trim() : msg.trim();
  }

  // 제목 길면 ... 으로 변경해주는 함수
  function dot3(msg) {
    let str = "";
    if (msg.length >= 10) {
      str = msg.substring(0, 6); //0 부터 10 전까지  - 6으로 바꿈
      str += "...";
    } else {
      str = msg.trim();
    }
    return str;
  }

  // 의존성 배열로 경고나서 useEffect안에 함수 정의 함수 불러오기 수정
  // useEffect(() => {
  //     fetchData(sendYear, sendMonth);
  // }, [sendMonth, sendYear, sendyyyymm]);

  // 달력 가져오기
  const calendarList = () => {
    let arrTop = [];
    let row = [];

    // 위쪽 빈칸
    for (let i = 1; i < dayOfWeek; i++) {
      row.push(<td key={i}>빈칸</td>);
    }

    // 날짜
    // `/some-url?month=${monthValue}&day=${dayValue}`
    for (let i = 1; i <= lastday; i++) {
      const tableList = calendardto.map((cal, index) => {
        let selDate = year + charTwo(month) + charTwo(i);

        return cal.rdate.substring(0, 8) === selDate ? ( // 값이 true일 때 테이블을 출력하도록 설정
          <table key={index}>
            <tbody>
              <tr>
                <td>
                  <Link to={`/calendardetail/${cal.calSeq}`}>
                    {cal.tagName}----{dot3(cal.title)}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        ) : null; // 속성이 false일 경우, null을 반환하여 아무것도 출력하지 않도록 설정
      });

      row.push(
        <td key={i + dayOfWeek - 1}>
          <Link to={`/calendarlist/${year}${month}${charTwo(i)}`}>{i} </Link>
          <Link to={`/calendarwrite/${year}/${month}/${i}`}>
            <img alt="글 쓰기" src={Ink} style={{ width: "20px", height: "25px" }} />
          </Link>
          {tableList}
        </td>
      );
      if ((i + dayOfWeek - 1) % 7 === 0 && i !== lastday) {
        arrTop.push(
          <tr key={i} style={{ height: "100px", textAlign: "left", verticalAlign: "top" }}>
            {row}
          </tr>
        );
        row = [];
      }
    }

    // 아래쪽 빈칸
    for (let i = 0; i < 7 - weekday; i++) {
      row.push(<td key={i}>빈칸</td>);
    }
    let keyVal = 0;
    arrTop.push(
      <tr key={keyVal} style={{ height: "100px", textAlign: "left", verticalAlign: "top" }}>
        {row}
      </tr>
    );

    return <>{arrTop}</>;
  };

  return (
    <div>
      <h3>일정 등록</h3>
      <div>
        <Table responsive>
          <colgroup>
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
          </colgroup>

          <thead>
            <tr>
              <td colSpan={7}>
                <div style={{ alignItems: "center" }}>
                  <img src={backyear} onClick={prevYear} alt="전년도" style={{ height: "40px", width: "auto" }} /> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                  <img src={backmonth} onClick={prevMonth} alt="전월" style={{ height: "40px", width: "auto" }} /> &nbsp; &nbsp;&nbsp; &nbsp;
                  <b>
                    {year}년 {month}월&nbsp; &nbsp;&nbsp; &nbsp;
                  </b>
                  <img src={nextmonth} onClick={nextMonth} alt="익월" style={{ height: "40px", width: "auto" }} /> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                  <img src={nextyear} onClick={nextYear} alt="내년도" style={{ height: "40px", width: "auto" }} />
                </div>
              </td>
            </tr>
            <tr>
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          <tbody>{calendarList()}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default Calendar;
