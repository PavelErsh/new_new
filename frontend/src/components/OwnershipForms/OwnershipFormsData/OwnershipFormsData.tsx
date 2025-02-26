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
import ownershipFormsStore from "../../../store/OwnershipFormsStore";
import { IOwnershipForm } from "../../../models/responce/OwnershipForm";

const OwnershipFormsData: React.FC = observer(() => {
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [addModalVisible, setAddModalVisible] = React.useState(false);

  useEffect(() => {
    ownershipFormsStore.fetchOwnershipForms();
  }, []);

  const showEditModal = (record: IOwnershipForm) => {
    ownershipFormsStore.setCurrentRecord(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      if (ownershipFormsStore.currentRecord) {
        await ownershipFormsStore.updateOwnershipForm({
          ...ownershipFormsStore.currentRecord,
          ...values,
        });
      }
      setEditModalVisible(false);
      message.success("Форма собственности успешно изменена");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось изменить форму собственности: ${error}`);
        } else {
          message.error(`Не удалось изменить форму собственности: ${error.message}`);
        }
      } else {
        message.error("Не удалось изменить форму собственности: неизвестная ошибка");
      }
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const remove = (id: number) => {
    try {
      ownershipFormsStore.removeOwnershipForm(id);
      message.success("Форма собственности успешно удалена");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось удалить форму собственности: ${error}`);
        } else {
          message.error(`Не удалось удалить форму собственности: ${error.message}`);
        }
      } else {
        message.error("Не удалось удалить форму собственности: неизвестная ошибка");
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
      await ownershipFormsStore.addOwnershipForm(values.name);
      setAddModalVisible(false);
      message.success("Форма собственности успешно добавлена");
      ownershipFormsStore.fetchOwnershipForms();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось добавить форму собственности: ${error}`);
        } else {
          message.error(`Не удалось добавить форму собственности: ${error.message}`);
        }
      } else {
        message.error("Не удалось добавить форму собственности: неизвестная ошибка");
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
      render: (_: unknown, record: IOwnershipForm) => {
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
        Добавить форму собственности
      </Button>

      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={ownershipFormsStore.data}
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
        title="Редактировать форму собственности"
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
        title="Добавить форму собственности"
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

export default OwnershipFormsData;
