import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography,
  Select,
  Tag,
  Tooltip,
} from "antd";
import { observer } from "mobx-react-lite";
import customersStore from "../../../store/CustomersStore";
import { ICustomerResponce } from "../../../models/responce/Customer";
import ownershipFormsStore from "../../../store/OwnershipFormsStore";
import { PlusOutlined } from "@ant-design/icons";
import { IContact } from "../../../models/responce/Contact";
import contactsStore from "../../../store/ContactsStore";

const CustomersData: React.FC = observer(() => {
  const [form] = Form.useForm();
  const [contactForm] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addContactModalVisible, setAddContactModalVisible] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState<number | null>(
    null
  );

  useEffect(() => {
    customersStore.fetchCustomers();
  }, []);

  useEffect(() => {
    if (editModalVisible) {
      ownershipFormsStore.fetchOwnershipForms();
    }
  }, [editModalVisible]);

  useEffect(() => {
    if (addContactModalVisible && currentCustomerId) {
      contactForm.setFieldsValue({
        customer: currentCustomerId,
      });
    }
  }, [addContactModalVisible, currentCustomerId, contactForm]);

  const showEditModal = (record: ICustomerResponce) => {
    form.resetFields();
    customersStore.setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      form: record.form.id,
    });
    setEditModalVisible(true);
  };

  const showAddContactModal = (customerId: number) => {
    setCurrentCustomerId(customerId);
    setAddContactModalVisible(true);
  };

  const handleAddContactOk = () => {
    contactForm.validateFields().then((data: IContact) => {
      contactsStore
        .addContact(
          data.first_name,
          data.last_name,
          data.father_name,
          data.phone,
          data.email,
          data.position,
          data.customer
        )
        .then(() => {
          customersStore.fetchCustomers();
          contactForm.resetFields();
          setAddContactModalVisible(false);
          message.success("Контакт успешно добавлен");
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.detail || "Не удалось добавить контакт";
          message.error(errorMessage);
        });
    });
  };

  const handleAddContactCancel = () => {
    contactForm.resetFields();
    setAddContactModalVisible(false);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      if (customersStore.currentRecord) {
        await customersStore.updateCustomer({
          ...customersStore.currentRecord,
          ...values,
        });
      }
      setEditModalVisible(false);
      message.success("Заказчик успешно изменен");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось изменить заказчика: ${error}`);
        } else {
          message.error(
            `Не удалось изменить форму заказчика: ${error.message}`
          );
        }
      } else {
        message.error(`Не удалось изменить форму заказчика: ${error}`);
      }
    }
  };

  const handleEditCancel = () => {
    form.resetFields();
    setEditModalVisible(false);
  };

  const remove = (id: number) => {
    try {
      customersStore.removeCustomer(id);
      message.success("Заказчик успешно удален");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось удалить заказчика: ${error}`);
        } else {
          message.error(`Не удалось удалить заказчика: ${error.message}`);
        }
      } else {
        message.error("Не удалось удалить форму заказчика: неизвестная ошибка");
      }
    }
  };

  const columns = [
    {
      title: "Номер",
      width: 90,
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Наименование",
      width: 200,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Форма собственности",
      width: 200,
      dataIndex: "form",
      key: "form",
      render: (ownership: { id: number; name: string }) => ownership.name,
    },
    {
      title: "Адрес",
      width: 200,
      dataIndex: "address",
      key: "address",
    },
    {
      title: "ИНН",
      width: 200,
      dataIndex: "inn",
      key: "inn",
    },
    {
      title: "Комментарий",
      width: 200,
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Контактные данные",
      width: 200,
      dataIndex: "contacts",
      key: "contacts",
      render: (_: unknown, record: ICustomerResponce) => {
        return (
          <div>
            {record.contacts.map((contact) => (
              <Tooltip
                title={
                  <div>
                    <strong>Имя:</strong> {contact.first_name}{" "}
                    {contact.last_name}
                    <br />
                    <strong>Должность:</strong> {contact.position}
                    <br />
                    <strong>Телефон:</strong> {contact.phone}
                    <br />
                    <strong>Email:</strong> {contact.email}
                  </div>
                }
                key={contact.id}
              >
                <Tag color="blue">
                  {contact.first_name} {contact.last_name}
                </Tag>
              </Tooltip>
            ))}
            <PlusOutlined
              style={{
                fontSize: "10px",
                marginLeft: "4px",
                cursor: "pointer",
              }}
              onClick={() => showAddContactModal(record.id)}
            />
          </div>
        );
      },
    },
    {
      title: "Действия",
      dataIndex: "operation",
      key: "operation",
      render: (_: unknown, record: ICustomerResponce) => {
        return (
          <Space size="middle">
            <Typography.Link onClick={() => showEditModal(record)}>
              Изменить
            </Typography.Link>
            <Popconfirm
              title="Вы уверены, что хотите удалить?"
              okText="Да"
              cancelText="Нет"
              onConfirm={() => remove(Number(record.id))}
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
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={customersStore.data}
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
        title="Редактировать заказчика"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Наименование"
            rules={[{ required: true, message: "Введите наименование" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="form"
            label="Форма собственности"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите форму собственности">
              {ownershipFormsStore.data.map((ownership) => (
                <Select.Option key={ownership.id} value={ownership.id}>
                  {ownership.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Адрес"
            rules={[{ required: true, message: "Введите Адрес" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="inn"
            label="ИНН"
            rules={[{ required: true, message: "Введите ИНН" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="notes" label="Комментарий">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Модальное окно для добавления контакта */}
      <Modal
        title="Добавить контакт"
        open={addContactModalVisible}
        onOk={handleAddContactOk}
        onCancel={handleAddContactCancel}
      >
        <Form form={contactForm} layout="vertical">
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
          <Form.Item name="customer" label="Заказчик" hidden>
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default CustomersData;
