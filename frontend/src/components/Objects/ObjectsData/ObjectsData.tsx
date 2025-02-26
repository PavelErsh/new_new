import React, { useEffect } from "react";
import {
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
import objectsStore from "../../../store/ObjectsStore";
import validateObjectName from "../../../utils/objects/validateObjectName";
import { IObject } from "../../../models/responce/Object";

const ObjectsData: React.FC = observer(() => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  useEffect(() => {
    objectsStore.fetchObjects();
  }, []);

  const showModal = (record: IObject) => {
    objectsStore.setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (objectsStore.currentRecord) {
        await objectsStore.updateObject({
          ...objectsStore.currentRecord,
          ...values,
        });
      }
      setIsModalVisible(false);
      message.success("Объект успешно изменен");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось изменить объект: ${error}`);
        } else {
          message.error(`Не удалось изменить объект: ${error.message}`);
        }
      } else {
        message.error("Не удалось изменить объект: неизвестная ошибка");
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const remove = (id: number) => {
    try {
      objectsStore.removeObject(id);
      message.success("Объект успешно удален");
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AxiosError") {
          message.error(`Не удалось удалить объект: ${error}`);
        } else {
          message.error(`Не удалось удалить объект: ${error.message}`);
        }
      } else {
        message.error("Не удалось удалить объект: неизвестная ошибка");
      }
    }
  };

  const columns = [
    {
      title: "Номер",
      width: 90,
      dataIndex: "id",
    },
    {
      title: "Шифр",
      dataIndex: "code",
    },
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Комментарий",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Действия",
      dataIndex: "operation",
      render: (_: unknown, record: IObject) => {
        return (
          <>
            <Space size="middle">
              <Typography.Link onClick={() => showModal(record)}>
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
          </>
        );
      },
    },
  ];

  return (
    <>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={objectsStore.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{ onChange: () => {} }}
          scroll={{ x: "max-content", y: 1500 }}
          rowKey="id"
          locale={{ emptyText: "Нет данных" }}
        />
      </Form>
      <Modal
        title="Редактировать объект"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="code"
            label="Шифр"
            rules={[
              { required: true },
              {
                min: 6,
                max: 6,
                message: "Поле шифр должно состоять из 6 цифр",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Наименование"
            rules={[{ required: true, validator: validateObjectName }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Комментарий"
            rules={[
              {
                max: 256,
                message: "Максимально 256 символов",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default ObjectsData;
