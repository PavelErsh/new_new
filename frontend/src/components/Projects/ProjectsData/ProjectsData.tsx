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
  Typography,
} from "antd";
import { observer } from "mobx-react-lite";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import projectsStore from "../../../store/ProjectsStore";
import objectsStore from "../../../store/ObjectsStore";
import employeesStore from "../../../store/EmployeesStore";
import projectStatusesStore from "../../../store/ProjectStatusesStore";
import { IProjectResponce } from "../../../models/responce/Project";
import { IProjectExecutor } from "../../../models/responce/ProjectExecutor";
import projectExecutorsStore from "../../../store/ProjectExecutorsStore";
import contractsStore from "../../../store/ContractsStore";

const ProjectsData: React.FC = observer(() => {
  const [form] = Form.useForm();
  const [projectExecutorForm] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addProjectExecutorModalVisible, setAddProjectExecutorModalVisible] =
    useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);

  useEffect(() => {
    projectsStore.fetchProjects();
  }, []);

  useEffect(() => {
    if (editModalVisible) {
      objectsStore.fetchObjects();
      contractsStore.fetchContracts();
      employeesStore.fetchEmployees();
      projectStatusesStore.fetchProjectStatuses();
    }
  }, [editModalVisible]);

  useEffect(() => {
    if (addProjectExecutorModalVisible && currentProjectId) {
      projectExecutorForm.setFieldsValue({
        project: currentProjectId,
      });
    }
  }, [addProjectExecutorModalVisible, currentProjectId, projectExecutorForm]);

  const showEditModal = (record: IProjectResponce) => {
    form.resetFields();
    projectsStore.setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      object: record.object.id,
      contract: record.contract?.id,
      main_executor: record.main_executor.id,
      status: record.status.id,
      deadline: dayjs(record.deadline, "YYYY-MM-DD"),
    });
    setEditModalVisible(true);
  };

  const showAddProjectExecutorModal = (projectId: number) => {
    setCurrentProjectId(projectId);
    setAddProjectExecutorModalVisible(true);
  };

  const handleAddProjectExecutorOk = () => {
    projectExecutorForm.validateFields().then((data: IProjectExecutor) => {
      projectExecutorsStore
        .addProjectExecutor(data.user, data.project)
        .then(() => {
          projectsStore.fetchProjects();
          projectExecutorForm.resetFields();
          setAddProjectExecutorModalVisible(false);
          message.success("Ответственный на проекте успешно добавлен");
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.detail ||
            "Не удалось добавить Ответственного на проекте";
          message.error(errorMessage);
        });
    });
  };

  const handleAddProjectExecutorCancel = () => {
    projectExecutorForm.resetFields();
    setAddProjectExecutorModalVisible(false);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      if (projectsStore.currentRecord) {
        await projectsStore.updateProject({
          ...projectsStore.currentRecord,
          ...values,
        });
      }
      setEditModalVisible(false);
      message.success("Проект успешно изменен");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось изменить проект: ${error}`);
        } else {
          message.error(`Не удалось изменить проект: ${error.message}`);
        }
      } else {
        message.error(`Не удалось изменить проект: ${error}`);
      }
    }
  };

  const handleEditCancel = () => {
    form.resetFields();
    setEditModalVisible(false);
  };

  const remove = (id: number) => {
    try {
      projectsStore.removeProject(id);
      message.success("Проект успешно удален");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось удалить проект: ${error}`);
        } else {
          message.error(`Не удалось удалить проект: ${error.message}`);
        }
      } else {
        message.error("Не удалось удалить проект: неизвестная ошибка");
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
      dataIndex: "object",
      key: "object",
      render: (object: { id: number; code: string }) => object.code,
    },
    {
      title: "Номер договора",
      width: 200,
      dataIndex: "contract",
      key: "contract",
      render: (contract: { id: number; number: string }) =>
        contract?.number || null,
    },
    {
      title: "Имя проекта",
      width: 200,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ответственный исполнитель",
      width: 200,
      dataIndex: "main_executor",
      key: "main_executor",
      render: (main_executor: { id: number; username: string }) =>
        main_executor.username,
    },
    {
      title: "Дата завершения проекта",
      width: 200,
      dataIndex: "deadline",
      key: "deadline",
      render: (text: string) => (text ? dayjs(text).format("DD.MM.YYYY") : ""),
    },
    {
      title: "Статус",
      width: 200,
      dataIndex: "status",
      key: "status",
      render: (status: { id: number; name: string }) => status.name,
    },
    {
      title: "Комментарии",
      width: 200,
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Дополнительные ответственные",
      width: 200,
      dataIndex: "executors",
      key: "executors",
      render: (_: unknown, record: IProjectResponce) => {
        return (
          <div>
            {record.project_executors.map((executor) => (
              <Tag color="purple">{executor.user.username}</Tag>
            ))}
            <PlusOutlined
              style={{
                fontSize: "10px",
                marginLeft: "4px",
                cursor: "pointer",
              }}
              onClick={() => showAddProjectExecutorModal(Number(record.id))}
            />
          </div>
        );
      },
    },
    {
      title: "Действия",
      dataIndex: "operation",
      key: "operation",
      render: (_: unknown, record: IProjectResponce) => {
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
          dataSource={projectsStore.data}
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
        title="Редактировать проект"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="object"
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
          <Form.Item name="contract" label="Номер договора">
            <Select placeholder="Выберите договор">
              {contractsStore.data.map((contract) => (
                <Select.Option key={contract.id} value={contract.id}>
                  {contract.number}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Краткое наименование проекта"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
              { max: 256, message: "Максимально 256 символов" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="number"
            label="Номер проекта"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
              { max: 256, message: "Максимально 256 символов" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="main_executor"
            label="Ответственный исполнитель"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите ответственного исполнителя">
              {employeesStore.data.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="deadline"
            label="Дата завершения проекта"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Статус проекта"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите статус">
              {projectStatusesStore.data.map((status) => (
                <Select.Option key={status.id} value={status.id}>
                  {status.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="Комментарии">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Модальное окно для добавления ответственного на проекте */}

      <Modal
        title="Добавить ответственного на проекте"
        open={addProjectExecutorModalVisible}
        onOk={handleAddProjectExecutorOk}
        onCancel={handleAddProjectExecutorCancel}
      >
        <Form form={projectExecutorForm} layout="vertical">
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
          <Form.Item name="project" label="Проект" hidden>
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default ProjectsData;
