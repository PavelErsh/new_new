import React, { useContext, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Progress,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import employeesStore from "../../../store/EmployeesStore";
import { AuthContext } from "../../../main";
import { IEmployee } from "../../../models/responce/User";
import calculatePasswordStrength from "../../../utils/employees/calculatePasswordStrength";
import dayjs from "dayjs";

const { Option } = Select;

const EmployeesData: React.FC = observer(() => {
  const { store } = useContext(AuthContext);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    React.useState(false);
  const [passwordForm] = Form.useForm();
  const [passwordStrength, setPasswordStrength] = React.useState(0);

  useEffect(() => {
    employeesStore.fetchEmployees();
  }, []);

  const showModal = (record: IEmployee) => {
    employeesStore.setCurrentRecord(record);
    const formattedRecord = {
      ...record,
      birthday: record.birthday ? dayjs(record.birthday, "YYYY-MM-DD") : null,
    };
    form.setFieldsValue(formattedRecord);
    setIsModalVisible(true);
  };

  const showPasswordModal = (record: IEmployee) => {
    employeesStore.setCurrentRecord(record);
    passwordForm.setFieldsValue({
      username: record.username,
      role: record.role,
      password: "",
    });
    setIsPasswordModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : null,
      };

      const { password, ...dataWithoutPassword } = formattedValues;

      if (employeesStore.currentRecord) {
        const { password: currentPassword, ...currentRecordWithoutPassword } =
          employeesStore.currentRecord;

        await employeesStore.updateEmployee({
          ...currentRecordWithoutPassword,
          ...dataWithoutPassword,
        });
      }

      setIsModalVisible(false);
      message.success("Сотрудник успешно изменен");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось изменить сотрудника: ${error}`);
        } else {
          message.error(`Не удалось изменить сотрудника: ${error.message}`);
        }
      } else {
        message.error('Не удалось изменить сотрудника: неизвестная ошибка');
      }
    }
  };

  const handlePasswordOk = () => {
    passwordForm
      .validateFields()
      .then((values) => {
        if (passwordStrength < 75) {
          message.error("Пароль слишком слабый. Увеличьте сложность пароля.");
          return;
        }

        if (employeesStore.currentRecord) {
          employeesStore
            .updateEmployee({
              ...employeesStore.currentRecord,
              password: values.password,
            })
            .then(() => {
              employeesStore.fetchEmployees();
              passwordForm.resetFields();
              setIsPasswordModalVisible(false);
              message.success("Пароль успешно изменен");
            })
            .catch((error) => {
              const errorMessage =
                error.response?.data?.detail ||
                `Не удалось изменить пароль: ${error}`;
              message.error(errorMessage);
            });
        }
      })
      .catch(() => {
        message.error("Проверьте правильность заполнения полей");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const remove = (id: number) => {
    try {
      employeesStore.removeEmployee(id);
      message.success("Сотрудник успешно удален");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось удалить сотрудника: ${error}`);
        } else {
          message.error(`Не удалось удалить сотрудника: ${error.message}`);
        }
      } else {
        message.error('Не удалось удалить сотрудника: неизвестная ошибка');
      }
    }
  };

  const columns = [
    {
      title: "Номер",
      width: 100,
      dataIndex: "id",
    },
    {
      title: "Логин",
      width: 150,
      dataIndex: "username",
      key: "username",
    },
    ...(store.role === "admin"
      ? [
          {
            title: "Пароль",
            width: 150,
            dataIndex: "password",
            key: "password",
            render: (text: string, record: IEmployee) => (
              <Space>
                <span>{text}</span>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => showPasswordModal(record)}
                />
              </Space>
            ),
          },
        ]
      : []),
    {
      title: "Роль",
      width: 120,
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Фамилия",
      width: 150,
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Имя",
      width: 150,
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Отчество",
      width: 150,
      dataIndex: "father_name",
      key: "father_name",
    },
    {
      title: "ФИО",
      width: 200,
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Должность",
      width: 200,
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Телефон",
      width: 150,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Почта",
      width: 200,
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Телеграм",
      width: 150,
      dataIndex: "telegram",
      key: "telegram",
    },
    {
      title: "Дата рождения",
      width: 150,
      dataIndex: "birthday",
      key: "birthday",
      render: (text: string) => (text ? dayjs(text).format("DD.MM.YYYY") : ""),
    },
    {
      title: "Категория",
      width: 150,
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Специальность",
      width: 200,
      dataIndex: "specialization",
      key: "specialization",
    },
    {
      title: "Примечания",
      width: 250,
      dataIndex: "notes",
      key: "notes",
    },
    ...(store.role === "admin"
      ? [
          {
            title: "Действия",
            width: 250,
            dataIndex: "operation",
            render: (_: unknown, record: IEmployee) => {
              return (
                <>
                  <Space size="middle">
                    <Typography.Link onClick={() => showModal(record)}>
                      Изменить
                    </Typography.Link>
                    <Popconfirm
                      title="Вы уверены, что хотите удалить?"
                      okText="Да"
                      cancelText="Нет"
                      onConfirm={() => remove(record.id)}
                    >
                      <a>Удалить</a>
                    </Popconfirm>
                  </Space>
                </>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={employeesStore.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{ onChange: () => {} }}
          scroll={{ x: "max-content", y: 1500 }}
          rowKey="id"
          locale={{ emptyText: "Нет данных" }}
        />
      </Form>
      <Modal
        title="Редактировать сотрудника"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" label="Номер" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="username"
            label="Логин"
            rules={[
              {
                required: true,
                message: "Поле логин обязательно для заполнения",
              },
              { min: 4, message: "Логин должен содержать минимум 4 символа!" },
              { max: 256, message: "Максимально 256 символов" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Роль"
            rules={[
              { required: true, message: "Поле роль обязательно для выбора" },
            ]}
          >
            <Select>
              <Option value="admin">Администратор</Option>
              <Option value="user">Пользователь</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="first_name"
            label="Фамилия"
            rules={[{ max: 256, message: "Максимально 256 символов" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Имя"
            rules={[{ max: 256, message: "Максимально 256 символов" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="father_name"
            label="Отчество"
            rules={[{ max: 256, message: "Максимально 256 символов" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="full_name"
            label="ФИО"
            rules={[{ max: 256, message: "Максимально 256 символов" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Должность"
            rules={[{ max: 256, message: "Максимально 256 символов" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Телефон"
            rules={[{ max: 256, message: "Максимально 256 символов" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Почта"
            rules={[
              { max: 256, message: "Максимально 256 символов" },
              { type: "email", message: "Введите корректный email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="telegram"
            label="Телеграм"
            rules={[{ max: 256, message: "Максимально 256 символов" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="birthday" label="Дата рождения">
            <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Категория"
            rules={[{ max: 256, message: "Максимально 256 символов" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="specialization"
            label="Специальность"
            rules={[{ max: 256, message: "Максимально 256 символов" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="notes" label="Примечания">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Изменить пароль"
        open={isPasswordModalVisible}
        onOk={handlePasswordOk}
        onCancel={() => setIsPasswordModalVisible(false)}
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item name="username" label="Логин">
            <Input disabled />
          </Form.Item>
          <Form.Item name="role" label="Роль">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              {
                required: true,
                message: "Поле пароль обязательно для заполнения",
              },
              { min: 8, message: "Пароль должен содержать минимум 8 символов" },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  "Пароль должен содержать хотя бы одну заглавную букву и одну цифру",
              },
            ]}
          >
            <Input.Password
              onChange={(e) => {
                setPasswordStrength(calculatePasswordStrength(e.target.value));
                passwordForm.setFieldsValue({ password: e.target.value });
              }}
            />
          </Form.Item>
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
        </Form>
      </Modal>
    </>
  );
});

export default EmployeesData;
