import { Modal, Form, Input, message } from "antd";
import { useEffect } from "react";
import objectsStore from "../../../store/ObjectsStore";
import { IObject } from "../../../models/responce/Object";
import validateObjectName from "../../../utils/objects/validateObjectName";
import { useForm } from "antd/es/form/Form";
import { AddModalProps } from "../../../models/ModalForms";

const AddObjectModal = ({
  visible,
  onCancel,
  onSuccess,
}: AddModalProps) => {
  const [form] = useForm();

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [visible, form]);

  const handleOk = () => {
    form.validateFields().then((data: IObject) => {
      objectsStore
        .addObject(data.code, data.name, data.comment || null)
        .then(() => {
          objectsStore.fetchObjects();
          form.resetFields();
          onSuccess();
          message.success("Объект успешно добавлен");
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.detail ||
            `Не удалось добавить объект: ${error}`;
          message.error(errorMessage);
        });
    });
  };

  const fields = [
    {
      name: "code",
      label: "Шифр",
      rules: [
        { required: true, message: "Поле шифр обязательно для заполнения" },
        { min: 6, max: 6, message: "Поле шифр должно состоять из 6 символов" },
        { required: true, validator: validateObjectName },
      ],
    },
    {
      name: "name",
      label: "Наименование",
      rules: [
        {
          required: true,
          message: "Поле наименование обязательно для заполнения",
        },
        { max: 256, message: "Максимально 256 символов" },
      ],
    },
    {
      name: "comment",
      label: "Комментарий",
      rules: [{ max: 256, message: "Максимально 256 символов" }],
    },
  ];

  return (
    <Modal
      title="Добавить объект"
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
          >
            <Input />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default AddObjectModal;
