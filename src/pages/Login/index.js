import React, { useState, useContext } from "react";
import "./login.css";

import { MdOutlinePersonOutline, MdLock } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Context } from "../../contexts/AuthContext";

function Login({ logoff }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const { handleLogin, handleRegister, handleLogout } = useContext(Context);

  if(logoff){
    handleLogout();
  }

  const handleSubmitLogin = () => {
    handleLogin({
      user,
      password,
    });
  };

  const handleSubmitRegister = () => {
    handleRegister({
      user, password
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div className="login">
      <div className="login-right">
        <h1>Acessar Kanban</h1>
        <div className="login-loginInputEmail">
          <MdOutlinePersonOutline />
          <input
            type="text"
            placeholder="Digite seu usuário..."
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        <div className="login-loginInputPassword">
          <MdLock />
          <input
            placeholder="Digite sua senha..."
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-eye">
            {show ? (
              <HiEye size={20} onClick={handleClick} />
            ) : (
              <HiEyeOff size={20} onClick={handleClick} />
            )}
          </div>
        </div>

        <button type="button" onClick={handleSubmitLogin}>
          Entrar
        </button>

        <h4>Ou</h4>

        <button type="button" onClick={handleSubmitRegister}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default Login;
