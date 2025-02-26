import { Modal, Form, Input, Select, message, Progress } from "antd";
import { useEffect, useState } from "react";
import employeesStore from "../../../store/EmployeesStore";
import calculatePasswordStrength from "../../../utils/employees/calculatePasswordStrength";
import { AddModalProps, NewEmployeeFormData } from "../../../models/ModalForms";


const AddEmployeeModal = ({
  visible,
  onCancel,
  onSuccess,
}: AddModalProps) => {
  const [form] = Form.useForm();
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setPasswordStrength(0);
    }
  }, [visible, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((data: NewEmployeeFormData) => {
        employeesStore
          .addEmployee(data.username, data.password, data.role)
          .then(() => {
            employeesStore.fetchEmployees();
            form.resetFields();
            onSuccess();
            message.success("Сотрудник успешно добавлен");
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.detail || "Не удалось добавить сотрудника";
            message.error(errorMessage);
          });
      })
      .catch(() => {
        message.error("Проверьте правильность заполнения полей");
      });
  };

  const fields = [
    {
      name: "username",
      label: "Логин",
      rules: [
        { required: true, message: "Поле обязательно для заполнения" },
        { min: 4, message: "Логин должен содержать минимум 4 символа!" },
        { max: 256, message: "Максимально 256 символов" },
      ],
    },
    {
      name: "password",
      label: "Пароль",
      rules: [
        { required: true, message: "Поле пароль обязательно для заполнения" },
        { min: 8, message: "Пароль должен содержать минимум 8 символов" },
        {
          pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
          message:
            "Пароль должен содержать хотя бы одну заглавную букву и одну цифру",
        },
      ],
    },
    {
      name: "role",
      label: "Роль",
      rules: [
        { required: true, message: "Поле роль обязательно для заполнения" },
      ],
    },
  ];

  return (
    <Modal
      title="Добавить сотрудника"
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Добавить"
      cancelText="Отмена"
    >
      <Form form={form} layout="vertical">
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules}
            validateFirst
          >
            {field.name === "role" ? (
              <Select placeholder="Выберите роль">
                <Select.Option value="admin">Администратор</Select.Option>
                <Select.Option value="user">Пользователь</Select.Option>
              </Select>
            ) : field.name === "password" ? (
              <div>
                <Input.Password
                  placeholder="Введите пароль"
                  onChange={(e) => {
                    setPasswordStrength(
                      calculatePasswordStrength(e.target.value)
                    );
                    form.setFieldsValue({ password: e.target.value });
                  }}
                />
                <Progress
                  percent={passwordStrength}
                  status={
                    passwordStrength < 50
                      ? "exception"
                      : passwordStrength < 75
                      ? "active"
                      : "success"
                  }
                  showInfo={false}
                  size="small"
                  style={{ width: "25%" }}
                />
              </div>
            ) : (
              <Input />
            )}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;
