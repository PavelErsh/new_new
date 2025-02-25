import { useState } from "react";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import './styles.css'

export const Auth = () => {
  const [authType, setAuthType] = useState<string>("register");

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
    </div>
    </div>
    
  );
};
