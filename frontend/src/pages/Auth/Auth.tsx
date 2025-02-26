import { useState } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./styles.css";
import { Button } from "antd";

export const Auth = () => {
  const [authType, setAuthType] = useState<string>("login");

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="auth">
      <div className="form-wrapper">
        <h2>
          {authType === "register" ? "Регистрация" : "Вход в учетную запись"}
        </h2>
        {authType === "register" ? <RegisterForm /> : <LoginForm />}
        <div className="auth-info">
          <span className="auth-desc">
            {authType === "register"
              ? "Уже есть аккаунт?"
              : "Ещё нет аккаунта?"}
          </span>
          <Button type="link" onClick={handleClick}>
            {authType === "register" ? "Войти" : "Создать аккаунт"}
          </Button>
        </div>
      </div>
    </div>
  );
};
