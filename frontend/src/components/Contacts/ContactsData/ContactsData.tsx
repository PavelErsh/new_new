import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography,
  Select,
} from "antd";
import { observer } from "mobx-react-lite";
import contactsStore from "../../../store/ContactsStore";
import customersStore from "../../../store/CustomersStore";
import { IResponceContact } from "../../../models/responce/Contact";

const ContactsData: React.FC = observer(() => {
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [addModalVisible, setAddModalVisible] = React.useState(false);

  useEffect(() => {
    contactsStore.fetchContacts();
  }, []);

  useEffect(() => {
    if (addModalVisible) {
      customersStore.fetchCustomers();
    }
  }, [addModalVisible]);

  useEffect(() => {
    if (editModalVisible) {
      customersStore.fetchCustomers();
    }
  }, [editModalVisible]);

  const showEditModal = (record: IResponceContact) => {
    contactsStore.setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      customer: record.customer.id,
    });
    setEditModalVisible(true);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      if (contactsStore.currentRecord) {
        await contactsStore.updateContact({
          ...contactsStore.currentRecord,
          ...values,
          customer: values.customer, 
        });
      }
      setEditModalVisible(false);
      message.success("Контакт успешно изменен");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось изменить контакт: ${error}`);
        } else {
          message.error(`Не удалось изменить контакт: ${error.message}`);
        }
      } else {
        message.error("Не удалось изменить контакт: неизвестная ошибка");
      }
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const remove = (id: number) => {
    try {
      contactsStore.removeContact(id);
      message.success("Контакт успешно удален");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось удалить контакт: ${error}`);
        } else {
          message.error(`Не удалось удалить контакт: ${error.message}`);
        }
      } else {
        message.error("Не удалось удалить контакт: неизвестная ошибка");
      }
    }
  };

  const showAddModal = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleAddOk = async () => {
    try {
      const values = await form.validateFields();
      await contactsStore.addContact(
        values.first_name,
        values.last_name,
        values.father_name,
        values.phone,
        values.email,
        values.position,
        values.customer
      );
      setAddModalVisible(false);
      message.success("Контакт успешно добавлен");
      contactsStore.fetchContacts();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось добавить контакт: ${error}`);
        } else {
          message.error(`Не удалось добавить контакт: ${error.message}`);
        }
      } else {
        message.error("Не удалось добавить контакт: неизвестная ошибка");
      }
    }
  };

  const handleAddCancel = () => {
    setAddModalVisible(false);
  };

  const columns = [
    {
      title: "Номер",
      width: 90,
      dataIndex: "id",
    },
    {
      title: "Фамилия",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Имя",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Отчество",
      dataIndex: "father_name",
      key: "father_name",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Почта",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Должность",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Заказчик",
      width: 100,
      dataIndex: "customer",
      key: "customer",
      render: (customer: { id: number; name: string }) => customer.name,
    },
    {
      title: "Действия",
      dataIndex: "operation",
      render: (_: unknown, record: IResponceContact) => {
        return (
          <Space size="middle">
            <Typography.Link onClick={() => showEditModal(record)}>
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
        );
      },
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={showAddModal}
        style={{ marginBottom: 16 }}
      >
        Добавить контакт
      </Button>

      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={contactsStore.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{ onChange: () => {} }}
          scroll={{ x: "max-content", y: 1500 }}
          rowKey="id"
          locale={{ emptyText: "Нет данных" }}
        />
      </Form>

      {/* Модальное окно для редактирования */}
      <Modal
        title="Редактировать контакт"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form form={form} layout="vertical">
        <Form.Item
            name="first_name"
            label="Фамилия"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Имя"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="father_name"
            label="Отчество"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Телефон"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Почта"
            rules={[
                { required: true, message: "Поле обязательно для заполнения" },
              { type: "email", message: "Введите корректный email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Должность"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="customer"
            label="Заказчик"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите заказчика">
              {customersStore.data.map((customer) => (
                <Select.Option key={customer.id} value={customer.id}>
                  {customer.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Модальное окно для добавления */}
      <Modal
        title="Добавить контакт"
        open={addModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="first_name"
            label="Фамилия"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Имя"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="father_name"
            label="Отчество"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Телефон"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Почта"
            rules={[
                { required: true, message: "Поле обязательно для заполнения" },
              { type: "email", message: "Введите корректный email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Должность"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="customer"
            label="Заказчик"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите заказчика">
              {customersStore.data.map((customer) => (
                <Select.Option key={customer.id} value={customer.id}>
                  {customer.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default ContactsData;
