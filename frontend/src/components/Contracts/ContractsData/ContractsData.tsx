import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { observer } from "mobx-react-lite";
import contractsStore from "../../../store/ContractsStore";
import { IContractResponce } from "../../../models/responce/Contract";
import objectsStore from "../../../store/ObjectsStore";
import customersStore from "../../../store/CustomersStore";
import employeesStore from "../../../store/EmployeesStore";
import { IAgreement } from "../../../models/responce/Agreement";
import agreementsStore from "../../../store/AgreementsStore";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const ContractsData: React.FC = observer(() => {
  const [form] = Form.useForm();
  const [agreementForm] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addAgreementModalVisible, setAddAgreementModalVisible] =
    useState(false);
  const [currentContractId, setCurrentContractId] = useState<number | null>(
    null
  );

  useEffect(() => {
    contractsStore.fetchContracts();
  }, []);

  useEffect(() => {
    if (editModalVisible) {
      objectsStore.fetchObjects();
      customersStore.fetchCustomers();
      employeesStore.fetchEmployees();
    }
  }, [editModalVisible]);

  useEffect(() => {
    if (addAgreementModalVisible && currentContractId) {
      agreementForm.setFieldsValue({
        contract: currentContractId,
      });
    }
  }, [addAgreementModalVisible, currentContractId, agreementForm]);

  const showEditModal = (record: IContractResponce) => {
    form.resetFields();
    contractsStore.setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      code: record.code.id,
      customer: record.customer.id,
      executor: record.executor.id,
      sign_date: record.sign_date
        ? dayjs(record.sign_date, "YYYY-MM-DD")
        : null,
    });
    setEditModalVisible(true);
  };

  const showAddAgreementModal = (contractId: number) => {
    setCurrentContractId(contractId);
    setAddAgreementModalVisible(true);
  };

  const handleAddAgreementOk = () => {
    agreementForm.validateFields().then((data: IAgreement) => {
      agreementsStore
        .addAgreement(
          data.name,
          data.number,
          data.price,
          data.deadline,
          data.notes,
          data.contract
        )
        .then(() => {
          contractsStore.fetchContracts();
          agreementForm.resetFields();
          setAddAgreementModalVisible(false);
          message.success("Доп соглашение успешно добавлено");
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.detail ||
            "Не удалось добавить доп соглашение";
          message.error(errorMessage);
        });
    });
  };

  const handleAddAgreementCancel = () => {
    agreementForm.resetFields();
    setAddAgreementModalVisible(false);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      if (contractsStore.currentRecord) {
        await contractsStore.updateCustomer({
          ...contractsStore.currentRecord,
          ...values,
        });
      }
      setEditModalVisible(false);
      message.success("Договор успешно изменен");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось изменить договор: ${error}`);
        } else {
          message.error(`Не удалось изменить договор: ${error.message}`);
        }
      } else {
        message.error(`Не удалось изменить договор: ${error}`);
      }
    }
  };

  const handleEditCancel = () => {
    form.resetFields();
    setEditModalVisible(false);
  };

  const remove = (id: number) => {
    try {
      contractsStore.removeContract(id);
      message.success("Договор успешно удален");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось удалить договор: ${error}`);
        } else {
          message.error(`Не удалось удалить договор: ${error.message}`);
        }
      } else {
        message.error("Не удалось удалить договор: неизвестная ошибка");
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
      title: "Шифр объекта",
      width: 200,
      dataIndex: "code",
      key: "code",
      render: (code: { id: number; code: string }) => code.code,
    },
    {
      title: "Наименование",
      width: 200,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Заказчик",
      width: 200,
      dataIndex: "customer",
      key: "customer",
      render: (customer: { id: number; name: string }) => customer.name,
    },
    {
      title: "Исполнитель",
      width: 200,
      dataIndex: "executor",
      key: "executor",
      render: (executor: { id: number; username: string }) =>
        `${executor.username}`,
    },
    {
      title: "№ Договора",
      width: 200,
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Дата подписания",
      width: 200,
      dataIndex: "sign_date",
      key: "sign_date",
      render: (text: string) => (text ? dayjs(text).format("DD.MM.YYYY") : ""),
    },
    {
      title: "Сумма",
      width: 200,
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Тема",
      width: 200,
      dataIndex: "theme",
      key: "theme",
    },
    {
      title: "Эволюция",
      width: 200,
      dataIndex: "evolution",
      key: "evolution",
    },
    {
      title: "Доп соглашения",
      width: 200,
      dataIndex: "agreements",
      key: "agreements",
      render: (_: unknown, record: IContractResponce) => {
        return (
          <div>
            {record.agreements.map((agreement) => (
              <Tooltip
                title={
                  <div>
                    <strong>Наименование:</strong> {agreement.name}
                    <br />
                    <strong>Номер:</strong> {agreement.number}
                    <br />
                    <strong>Цена:</strong> {agreement.price} рублей
                    <br />
                    <strong>Срок действия:</strong>{" "}
                    {dayjs(agreement.deadline).format("DD.MM.YYYY")}
                  </div>
                }
                key={agreement.id}
              >
                <Tag color="orange">{agreement.name}</Tag>
              </Tooltip>
            ))}
            <PlusOutlined
              style={{
                fontSize: "10px",
                marginLeft: "4px",
                cursor: "pointer",
              }}
              onClick={() => showAddAgreementModal(record.id)}
            />
          </div>
        );
      },
    },
    {
      title: "Действия",
      dataIndex: "operation",
      key: "operation",
      render: (_: unknown, record: IContractResponce) => {
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
          dataSource={contractsStore.data}
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
        title="Редактировать договор"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="code"
            label="Шифр объекта"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите код объекта">
              {objectsStore.data.map((object) => (
                <Select.Option key={object.id} value={object.id}>
                  {object.code}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Краткое наименование объекта"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
              { max: 256, message: "Максимально 256 символов" },
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
          <Form.Item
            name="executor"
            label="Исполнитель"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите исполнителя">
              {employeesStore.data.map((empoyee) => (
                <Select.Option key={empoyee.id} value={empoyee.id}>
                  {empoyee.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="number"
            label="№ договора"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
              { max: 256, message: "Максимально 256 символов" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sign_date"
            label="Дата подписания договора"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Цена"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input type="number" placeholder="Введите сумму договора" />
          </Form.Item>
          <Form.Item
            name="theme"
            label="Тема договора"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
              { max: 256, message: "Максимально 256 символов" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Модальное окно для добавления доп соглашения */}

      <Modal
        title="Добавить доп соглашение"
        open={addAgreementModalVisible}
        onOk={handleAddAgreementOk}
        onCancel={handleAddAgreementCancel}
      >
        <Form form={agreementForm} layout="vertical">
          <Form.Item
            name="name"
            label="Наименование"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="number"
            label="Номер договора"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Цена"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="deadline"
            label="Срок"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="notes" label="Комментарии">
            <Input />
          </Form.Item>
          <Form.Item name="contract" label="Договор" hidden>
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default ContractsData;
