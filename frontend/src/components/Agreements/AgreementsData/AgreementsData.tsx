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
  Select,
  DatePicker,
} from "antd";
import { observer } from "mobx-react-lite";
import agreementsStore from "../../../store/AgreementsStore";
import { IAgreementResponce } from "../../../models/responce/Agreement";
import contractsStore from "../../../store/ContractsStore";
import dayjs from "dayjs";

const AgreementsData: React.FC = observer(() => {
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [addModalVisible, setAddModalVisible] = React.useState(false);

  useEffect(() => {
    agreementsStore.fetchAgreements();
  }, []);

  useEffect(() => {
    if (addModalVisible) {
      contractsStore.fetchContracts();
    }
  }, [addModalVisible]);

  useEffect(() => {
    if (editModalVisible) {
      contractsStore.fetchContracts();
    }
  }, [editModalVisible]);

  const showEditModal = (record: IAgreementResponce) => {
    agreementsStore.setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      deadline: record.deadline ? dayjs(record.deadline, "YYYY-MM-DD") : null,
      contract: record.contract.id,
    });
    setEditModalVisible(true);
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      if (agreementsStore.currentRecord) {
        await agreementsStore.updateAgreement({
          ...agreementsStore.currentRecord,
          ...values,
          contract: values.contract,
          deadline: values.deadline ? values.deadline.format("YYYY-MM-DD") : null,
        });
      }
      setEditModalVisible(false);
      message.success("Доп соглашение успешно изменено");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось изменить доп соглашение: ${error}`);
        } else {
          message.error(`Не удалось изменить доп соглашение: ${error.message}`);
        }
      } else {
        message.error("Не удалось изменить доп соглашение: неизвестная ошибка");
      }
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const remove = (id: number) => {
    try {
      agreementsStore.removeAgreement(id);
      message.success("Доп соглашение успешно удалено");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось удалить доп соглашение: ${error}`);
        } else {
          message.error(`Не удалось удалить доп соглашение: ${error.message}`);
        }
      } else {
        message.error("Не удалось удалить доп соглашение: неизвестная ошибка");
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
      await agreementsStore.addAgreement(
        values.name,
        values.number,
        values.price,
        values.deadline,
        values.notes,
        values.contract
      );
      setAddModalVisible(false);
      message.success("Доп соглашение успешно добавлено");
      agreementsStore.fetchAgreements();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось добавить доп соглашение: ${error}`);
        } else {
          message.error(`Не удалось добавить доп соглашение: ${error.message}`);
        }
      } else {
        message.error("Не удалось добавить доп соглашение: неизвестная ошибка");
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
      title: "Номер соглашения",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Срок",
      dataIndex: "deadline",
      key: "deadline",
      render: (text: string) => (text ? dayjs(text).format("DD.MM.YYYY") : ""),
    },
    {
      title: "Комментарии",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Договор",
      dataIndex: "contract",
      key: "contract",
      render: (contract: {id: number; name: string}) => contract.name,
    },
    {
      title: "Действия",
      dataIndex: "operation",
      render: (_: unknown, record: IAgreementResponce) => {
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
        Добавить доп соглашение
      </Button>

      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={agreementsStore.data}
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
        title="Редактировать доп соглашение"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form form={form} layout="vertical">
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
          <Form.Item
            name="notes"
            label="Комментарии"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contract"
            label="Договор"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите договор">
              {contractsStore.data.map((contract) => (
                <Select.Option key={contract.id} value={contract.id}>
                  {contract.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Модальное окно для добавления */}
      <Modal
        title="Добавить доп соглащение"
        open={addModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form form={form} layout="vertical">
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
          <Form.Item
            name="notes"
            label="Комментарии"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contract"
            label="Договор"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
            ]}
          >
            <Select placeholder="Выберите договор">
              {contractsStore.data.map((contract) => (
                <Select.Option key={contract.id} value={contract.id}>
                  {contract.name}
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
