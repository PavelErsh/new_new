import { Modal, Form, Input, message, Select } from "antd";
import { useEffect } from "react";
import { AddModalProps } from "../../../models/ModalForms";
import { ICustomer } from "../../../models/responce/Customer";
import customersStore from "../../../store/CustomersStore";
import ownershipFormsStore from "../../../store/OwnershipFormsStore";

const AddCustomerModal = ({ visible, onCancel, onSuccess }: AddModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      ownershipFormsStore.fetchOwnershipForms();
    } else {
      form.resetFields();
    }
  }, [visible, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((data: ICustomer) => {
        customersStore
          .addCustomer(
            data.name,
            data.form,
            data.address,
            data.inn,
            data.comment
          )
          .then(() => {
            customersStore.fetchCustomers();
            form.resetFields();
            onSuccess();
            message.success("Заказчик успешно добавлен");
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.detail || "Не удалось добавить заказчика";
            message.error(errorMessage);
          });
      })
      .catch(() => {
        message.error("Проверьте правильность заполнения полей");
      });
  };

  const fields = [
    {
      name: "name",
      label: "Наименование",
      rules: [
        { required: true, message: "Поле обязательно для заполнения" },
        { max: 256, message: "Максимально 256 символов" },
      ],
    },
    {
      name: "form",
      label: "Форма собственности",
      rules: [{ required: true, message: "Поле обязательно для заполнения" }],
    },
    {
      name: "address",
      label: "Адрес",
      rules: [
        { required: true, message: "Поле обязательно для заполнения" },
        { max: 256, message: "Максимально 256 символов" },
      ],
    },
    {
      name: "inn",
      label: "ИНН",
      rules: [{ required: true, message: "Поле обязательно для заполнения" }],
    },
    {
      name: "comment",
      label: "Комментарий",
    },
  ];

  return (
    <Modal
      title="Добавить заказчика"
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
            {field.name === "form" ? (
              <Select placeholder="Выберите форму собственности">
                {ownershipFormsStore.data.map((ownership) => (
                  <Select.Option key={ownership.id} value={ownership.id}>
                    {ownership.name}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <Input />
            )}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default AddCustomerModal;
