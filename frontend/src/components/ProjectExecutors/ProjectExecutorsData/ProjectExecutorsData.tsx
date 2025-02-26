import React, { useEffect } from "react";
import {
  Button,
  Form,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography,
  Select,
} from "antd";
import { observer } from "mobx-react-lite";
import projectExecutorsStore from "../../../store/ProjectExecutorsStore";
import employeesStore from "../../../store/EmployeesStore";
import { IProjectExecutorResponce } from "../../../models/responce/ProjectExecutor";
import projectsStore from "../../../store/ProjectsStore";

const AgreementsData: React.FC = observer(() => {
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [addModalVisible, setAddModalVisible] = React.useState(false);

  useEffect(() => {
    projectExecutorsStore.fetchProjectExecutors();
  }, []);

  useEffect(() => {
    if (addModalVisible) {
      employeesStore.fetchEmployees();
      projectsStore.fetchProjects();
    }
  }, [addModalVisible]);

  useEffect(() => {
    if (editModalVisible) {
      employeesStore.fetchEmployees();
      projectsStore.fetchProjects();
    }
  }, [editModalVisible]);

  const showEditModal = (record: IProjectExecutorResponce) => {
    projectExecutorsStore.setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      user: record.user.id,
      project: record.project.id,
    });
    setEditModalVisible(true);
  };

  const handleEditOk = () => {
    form.validateFields().then((values) => {
      if (projectExecutorsStore.currentRecord) {
        projectExecutorsStore
          .updateProjectExecutor({
            ...projectExecutorsStore.currentRecord,
            ...values,
            contract: values.contract,
            project: values.project,
          })
          .then(() => {
            setEditModalVisible(false);
            message.success("Ответственный на проекте успешно изменен");
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.detail ||
              "Не удалось изменить ответственного на проекте";
            message.error(errorMessage);
          });
      }
    });
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const remove = (id: number) => {
    try {
      projectExecutorsStore.removeProjectExecutor(id);
      message.success("Ответственный на проекте успешно удален");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(
            `Не удалось удалить ответственного на проекте: ${error}`
          );
        } else {
          message.error(
            `Не удалось удалить ответственного на проекте: ${error.message}`
          );
        }
      } else {
        message.error(
          "Не удалось удалить ответственного на проекте: неизвестная ошибка"
        );
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
      await projectExecutorsStore.addProjectExecutor(
        values.user,
        values.project
      );
      setAddModalVisible(false);
      message.success("Ответсвенный на проекте успешно добавлен");
      projectExecutorsStore.fetchProjectExecutors();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(
            `Не удалось добавить ответственного на проекте: ${error}`
          );
        } else {
          message.error(
            `Не удалось добавить ответственного на проекте: ${error.message}`
          );
        }
      } else {
        message.error(
          "Не удалось добавить ответственного на проекте: неизвестная ошибка"
        );
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
      title: "Проект",
      dataIndex: "project",
      key: "project",
      render: (project: { id: number; name: string }) => project.name,
    },
    {
      title: "Ответственный",
      dataIndex: "user",
      key: "user",
      render: (user: { id: number; username: string }) => user.username,
    },
    {
      title: "Действия",
      dataIndex: "operation",
      render: (_: unknown, record: IProjectExecutorResponce) => {
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
      <Button
        type="primary"
        onClick={showAddModal}
        style={{ marginBottom: 16 }}
      >
        Добавить ответственного на проекте
      </Button>

      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={projectExecutorsStore.data}
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
        title="Редактировать ответственного на проекте"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="project"
            label="Проект"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите проект">
              {projectsStore.data.map((project) => (
                <Select.Option key={project.id} value={project.id}>
                  {project.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="user"
            label="Ответственный"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите ответственного">
              {employeesStore.data.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Модальное окно для добавления */}
      <Modal
        title="Добавить ответственного на проекте"
        open={addModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="project"
            label="Проект"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите проект">
              {projectsStore.data.map((project) => (
                <Select.Option key={project.id} value={project.id}>
                  {project.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="user"
            label="Ответственный"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите ответственного">
              {employeesStore.data.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default AgreementsData;
