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
} from "antd";
import { observer } from "mobx-react-lite";
import projectStatusesStore from "../../../store/ProjectStatusesStore";
import { IProjectStatus } from "../../../models/responce/ProjectStatus";

const ProjectStatusesData: React.FC = observer(() => {
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [addModalVisible, setAddModalVisible] = React.useState(false);

  useEffect(() => {
    projectStatusesStore.fetchProjectStatuses();
  }, []);

  const showEditModal = (record: IProjectStatus) => {
    projectStatusesStore.setCurrentRecord(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      if (projectStatusesStore.currentRecord) {
        await projectStatusesStore.updateProjectStatus({
          ...projectStatusesStore.currentRecord,
          ...values,
        });
      }
      setEditModalVisible(false);
      message.success("Статус проекта успешно изменен");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось изменить стутус проекта: ${error}`);
        } else {
          message.error(`Не удалось изменить статус проекта: ${error.message}`);
        }
      } else {
        message.error("Не удалось изменить статус проекта: неизвестная ошибка");
      }
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const remove = (id: number) => {
    try {
      projectStatusesStore.removeProjectStatus(id);
      message.success("Статус проекта успешно удален");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось удалить статус проекта: ${error}`);
        } else {
          message.error(`Не удалось удалить статус проекта: ${error.message}`);
        }
      } else {
        message.error("Не удалось удалить статус проекта: неизвестная ошибка");
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
      await projectStatusesStore.addProjectStatus(values.name);
      setAddModalVisible(false);
      message.success("Статус проекта успешно добавлен");
      projectStatusesStore.fetchProjectStatuses();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось добавить статус проекта: ${error}`);
        } else {
          message.error(`Не удалось добавить статус проекта: ${error.message}`);
        }
      } else {
        message.error("Не удалось добавить статус проекта: неизвестная ошибка");
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
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Действия",
      dataIndex: "operation",
      render: (_: unknown, record: IProjectStatus) => {
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
        Добавить статус проекта
      </Button>

      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={projectStatusesStore.data}
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
        title="Редактировать статус проекта"
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
        </Form>
      </Modal>

      {/* Модальное окно для добавления */}
      <Modal
        title="Добавить стутус проекта"
        open={addModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Наименование"
            rules={[{ required: true, message: "Введите наименование" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default ProjectStatusesData;
