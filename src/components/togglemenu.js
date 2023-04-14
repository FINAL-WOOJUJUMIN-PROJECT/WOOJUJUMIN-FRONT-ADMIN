import "./style.css";
import React, { useRef } from "react";

function ToggleMenu() {
  const toggleRef = useRef(null);
  const navbarRef = useRef(null);

  function closeNavbar(e) {
    if (
      document.body.classList.contains("show-nav") &&
      e.target !== toggleRef.current &&
      !toggleRef.current.contains(e.target) &&
      e.target !== navbarRef.current &&
      !navbarRef.current.contains(e.target)
    ) {
      document.body.classList.toggle("show-nav");
      document.body.removeEventListener("click", closeNavbar);
    } else if (!document.body.classList.contains("show-nav")) {
      document.body.removeEventListener("click", closeNavbar);
    }
  }

  // Toggle nav
  function handleToggleClick() {
    document.body.classList.toggle("show-nav");
    document.body.addEventListener("click", closeNavbar);
  }
  return (
    <>
      <button
        className="toggle"
        id="toggle"
        onClick={handleToggleClick}
        ref={toggleRef}
      >
        Toggle
      </button>
      <nav id="navbar" ref={navbarRef}>
        <ui>
          <li>
            <a href="/main" style={{ color: "white" }}>
              메인
            </a>
          </li>

          <li>
            <a href="/qna" style={{ color: "white" }}>
              Q&A관리
            </a>
          </li>
        </ui>
      </nav>
    </>
  );
}

export default ToggleMenu;
