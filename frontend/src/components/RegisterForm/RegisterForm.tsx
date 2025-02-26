import { Button, Form, Input, Select } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../main";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface UserRegister {
  username: string;
  password: string;
  role: string;
}

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { store } = useContext(AuthContext);

  const onFinish = (values: UserRegister) => {
    const { username, password, role } = values;
    store.registration(username, password, role);

    if (store.isAuth) {
      navigate("/welcome");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}
      initialValues={{ role: "user" }}
    >
      {store.errorMessage && (
        <div style={{ color: "red" }}>{store.errorMessage}</div>
      )}
      <Form.Item
        label="Логин"
        name="username"
        rules={[
          { required: true, message: "Пожалуйста, введите логин!" },
          { min: 3, message: "Логин должен содержать минимум 4 символа!" },
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
      <Form.Item
        label="Роль"
        name="role"
        rules={[{ required: true, message: "Пожалуйста, выберите роль!" }]}
      >
        <Select style={{ width: 200 }}>
          <Option value="user">Пользователь</Option>
          <Option value="admin">Администратор</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          Регистрация
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(RegisterForm);
