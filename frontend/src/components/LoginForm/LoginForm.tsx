import { Button, Form, Input } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../main";
import { observer } from "mobx-react-lite";

interface UserLogin {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [form] = Form.useForm();
  const { store } = useContext(AuthContext);

  const onFinish = async (values: UserLogin) => {
    const { username, password } = values;
    await store.login(username, password);
  };

  //   const onFinishFailed = (errorInfo) => {
  //     console.log("Failed:", errorInfo);
  //   };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}
    >
      {store.errorMessage && (
        <div style={{ color: "red" }}>{store.errorMessage}</div>
      )}
      <Form.Item
        label="Логин"
        name="username"
        rules={[
          { required: true, message: "Пожалуйста, введите логин!" },
          { min: 4, message: "Логин должен содержать минимум 4 символа!" },
        ]}
      >
        <Input size="large" placeholder="Введите логин" />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          { required: true, message: "Пожалуйста, введите пароль!" },
          {
            min: 3,
            message: "В пароле должны быть строчные и заглавные буквы, цифры",
          },
        ]}
      >
        <Input.Password size="large" placeholder="Введите пароль" />
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(LoginForm);
