import { Modal, Form, Input, message, Select, DatePicker } from "antd";
import { useEffect } from "react";
import { AddModalProps } from "../../../models/ModalForms";
import objectsStore from "../../../store/ObjectsStore";
import employeesStore from "../../../store/EmployeesStore";
import projectStatusesStore from "../../../store/ProjectStatusesStore";
import { IProject } from "../../../models/responce/Project";
import projectsStore from "../../../store/ProjectsStore";
import contractsStore from "../../../store/ContractsStore";

const AddProjectModal = ({ visible, onCancel, onSuccess }: AddModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      objectsStore.fetchObjects();
      contractsStore.fetchContracts();
      employeesStore.fetchEmployees();
      projectStatusesStore.fetchProjectStatuses();
    } else {
      form.resetFields();
    }
  }, [visible, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((data: IProject) => {
        projectsStore
          .addProject(
            data.object,
            data.contract,
            data.name,
            data.number,
            data.main_executor,
            data.deadline,
            data.status,
            data.notes
          )
          .then(() => {
            projectsStore.fetchProjects();
            form.resetFields();
            onSuccess();
            message.success("Проект успешно добавлен");
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.detail || "Не удалось добавить Проект";
            message.error(errorMessage);
          });
      })
      .catch(() => {
        message.error("Проверьте правильность заполнения полей");
      });
  };

  const fields = [
    {
      name: "object",
      label: "Шифр объекта",
      rules: [{ required: true, message: "Поле обязательно для заполнения" }],
    },
    {
      name: "contract",
      label: "Номер договора",
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
      name: "number",
      label: "Номер проекта",
      rules: [
        { required: true, message: "Поле обязательно для заполнения" },
        { max: 256, message: "Максимально 256 символов" },
      ],
    },
    {
      name: "main_executor",
      label: "Ответственный исполнитель",
      rules: [{ required: true, message: "Поле обязательно для заполнения" }],
    },
    {
      name: "deadline",
      label: "Дата завершения проекта",
      rules: [
        {
          required: true,
          message: "Поле обязательно для заполнения",
        },
      ],
    },
    {
      name: "status",
      label: "Статус проекта",
      rules: [{ required: true, message: "Поле обязательно для заполнения" }],
    },
    {
      name: "notes",
      label: "Комментарии",
    },
  ];

  return (
    <Modal
      title="Добавить проект"
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
            {field.name === "object" ? (
              <Select placeholder="Выберите код объекта">
                {objectsStore.data.map((object) => (
                  <Select.Option key={object.id} value={object.id}>
                    {object.code}
                  </Select.Option>
                ))}
              </Select>
            ) : field.name === "main_executor" ? (
              <Select placeholder="Выберите ответственного исполнителя">
                {employeesStore.data.map((user) => (
                  <Select.Option key={user.id} value={user.id}>
                    {user.username}
                  </Select.Option>
                ))}
              </Select>
            ) : field.name === "contract" ? (
              <Select placeholder="Выберите контракт">
                {contractsStore.data.map((contract) => (
                  <Select.Option key={contract.id} value={contract.id}>
                    {contract.name}
                  </Select.Option>
                ))}
              </Select>
            ) : field.name === "deadline" ? (
              <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
            ) : field.name === "status" ? (
              <Select placeholder="Выберите статус">
                {projectStatusesStore.data.map((status) => (
                  <Select.Option key={status.id} value={status.id}>
                    {status.name}
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

export default AddProjectModal;
