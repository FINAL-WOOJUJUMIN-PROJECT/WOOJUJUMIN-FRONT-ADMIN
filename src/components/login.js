import React, { useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {
  const history = useNavigate();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const [cookies, setCookies] = useCookies("");
  // checkbox
  const [saveId, setSaveId] = useState(false);

  function CheckHandler() {
    // alert(saveId)
    setSaveId(!saveId);
    if (!saveId === true && id !== "") {
      setCookies("user_id", id);
    } else {
      setCookies("user_id", "");
    }
  }

  function login() {
    axios
      .post("http://118.67.132.98:3000/adminLogin", null, {
        params: { id: id, password: pwd },
      })
      .then(function (resp) {
        // alert(resp.data);
        if (resp.data !== null && resp.data !== "") {
          alert(resp.data.nickname + "님 환영합니다");
          console.log(resp.data);
          localStorage.setItem("login", JSON.stringify(resp.data));

          document.location.href = "/main";
        } else {
          alert("id나 password를 확인하십시오");
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }

  useEffect(
    function () {
      let user_id = cookies.user_id;
      if (user_id !== undefined && user_id !== "") {
        setId(user_id);
        setSaveId(true);
      } else {
        setId("");
        setSaveId(false);
      }
    },
    [cookies]
  );

  return (
    <>
      <div className="loginbox">
        <h3>Login</h3>
        <br />
        <br />
        <form class="form-floating">
          <input type="text" class="form-control" id="floatingInputValue" value={id} onChange={(e) => setId(e.target.value)} />
          <label for="floatingInputValue">ID</label>
        </form>
        <br />
        <form class="form-floating">
          <input type="password" class="form-control" id="floatingInputValue" value={pwd} onChange={(e) => setPwd(e.target.value)} />
          <label for="floatingInputValue">PWD</label>
        </form>
        <br />
        <input type="checkbox" checked={saveId} onChange={CheckHandler} />
        아이디저장
        <br />
        <br />
        <button type="button" class="btn btn-secondary" onClick={() => login()}>
          Login
        </button>
        &nbsp;&nbsp;&nbsp;
        <a href="/regi">관리자등록</a>
      </div>
    </>
  );
}

export default Login;
