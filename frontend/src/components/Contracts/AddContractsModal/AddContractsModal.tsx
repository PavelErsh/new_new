import { Modal, Form, Input, message, Select, DatePicker } from "antd";
import { useEffect } from "react";
import { AddModalProps } from "../../../models/ModalForms";
import { IContract } from "../../../models/responce/Contract";
import contractsStore from "../../../store/ContractsStore";
import objectsStore from "../../../store/ObjectsStore";
import customersStore from "../../../store/CustomersStore";
import employeesStore from "../../../store/EmployeesStore";

const AddContractsModal = ({ visible, onCancel, onSuccess }: AddModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      objectsStore.fetchObjects();
      customersStore.fetchCustomers();
      employeesStore.fetchEmployees();
    } else {
      form.resetFields();
    }
  }, [visible, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((data: IContract) => {
        contractsStore
          .addContract(
            data.code,
            data.name,
            data.customer,
            data.executor,
            data.number,
            data.price,
            data.theme,
            data.sign_date
          )
          .then(() => {
            contractsStore.fetchContracts();
            form.resetFields();
            onSuccess();
            message.success("Договор успешно добавлен");
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.detail || "Не удалось добавить договор";
            message.error(errorMessage);
          });
      })
      .catch(() => {
        message.error("Проверьте правильность заполнения полей");
      });
  };

  const fields = [
    {
      name: "code",
      label: "Шифр объекта",
      rules: [{ required: true, message: "Поле обязательно для заполнения" }],
    },
    {
      name: "name",
      label: "Краткое наименование объекта",
      rules: [
        { required: true, message: "Поле обязательно для заполнения" },
        { max: 256, message: "Максимально 256 символов" },
      ],
    },
    {
      name: "customer",
      label: "Заказчик",
      rules: [{ required: true, message: "Поле обязательно для заполнения" }],
    },
    {
      name: "executor",
      label: "Исполнитель",
      rules: [{ required: true, message: "Поле обязательно для заполнения" }],
    },
    {
      name: "number",
      label: "№ договора",
      rules: [
        { required: true, message: "Поле обязательно для заполнения" },
      ],
    },
    {
      name: "sign_date",
      label: "Дата подписания договора",
      rules: [
        {
          required: true,
          message: "Поле обязательно для заполнения",
        },
      ],
    },
    {
      name: "price",
      label: "Сумма договора",
      rules: [{ required: true, message: "Поле обязательно для заполнения" }],
    },
    {
      name: "theme",
      label: "Тема договора",
      rules: [
        { required: true, message: "Поле обязательно для заполнения" },
        { max: 256, message: "Максимально 256 символов" },
      ],
    },
  ];

  return (
    <Modal
      title="Добавить договор"
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
            {field.name === "code" ? (
              <Select placeholder="Выберите код объекта">
                {objectsStore.data.map((object) => (
                  <Select.Option key={object.id} value={object.id}>
                    {object.code}
                  </Select.Option>
                ))}
              </Select>
            ) : field.name === "customer" ? (
              <Select placeholder="Выберите заказчика">
                {customersStore.data.map((customer) => (
                  <Select.Option key={customer.id} value={customer.id}>
                    {customer.name}
                  </Select.Option>
                ))}
              </Select>
            ) : field.name === "executor" ? (
              <Select placeholder="Выберите исполнителя">
                {employeesStore.data.map((empoyee) => (
                  <Select.Option key={empoyee.id} value={empoyee.id}>
                    {empoyee.username}
                  </Select.Option>
                ))}
              </Select>
            ) : field.name === "sign_date" ? (
              <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
            ) : field.name === "price" ? (
                <Input type="number" placeholder="Введите сумму договора" />
            )
            : (
              <Input />
            )}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default AddContractsModal;
