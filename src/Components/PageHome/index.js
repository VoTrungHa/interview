import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fullscreen from "../FullScreen";
import "./styles.scss";
export default function PageHome() {
  const navigate = useNavigate();
  const [initStateValue, setInitStateValue] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    // get date save on localStorage
    if (localStorage.getItem("info-user")) {
      const data = JSON.parse(localStorage.getItem("info-user"));
      const info = {
        email: data.email,
        password: data.password,
      };
      setInitStateValue(info);
    }
  }, []);
  const HanldLogOut = () => {
    localStorage.removeItem("info-user");
    navigate("/login");
  };
  return (
    <Fullscreen>
      <div className="mod-home">
        <h1>Thông tin tài khoản đã đăng nhập</h1>
        <div className="mod-home-content">
          <p>Email: {initStateValue.email}</p>
          <p>Mật khẩu: {initStateValue.password}</p>
        </div>
        <span className="log-out" onClick={() => HanldLogOut()}>
          Đăng xuất
        </span>
      </div>
    </Fullscreen>
  );
}
