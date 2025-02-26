import {
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Button,
  Card,
  message,
} from "antd";
import MainHeader from "../../../components/BaseLayout/MainHeader/MainHeader";
import { Content } from "antd/es/layout/layout";
import styles from "./Backup.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../main";
import BackupService from "../../../services/BackupService"; // Импортируем сервис

const Backup = () => {
  const { store } = useContext(AuthContext);
  store.page = "Резервные копии";
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then(() => {
        message.success("Данная часть в режиме разработки");
      })
      .catch(() => {
        message.error("Ошибка сохранения резервной копии");
      });
  };

  const handleDownload = async () => {
    try {
      const response = await BackupService.getLogs();

      const blob = new Blob([response.data as BlobPart], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "report.xlsx";
      link.click();
      window.URL.revokeObjectURL(url);

      message.success("Файл успешно скачан");
    } catch {
      message.error("Ошибка при скачивании файла");
    }
  };

  return (
    <>
      <MainHeader />
      <Layout className={styles.container}>
        <Content className={styles.centeredContent}>
          <Row gutter={16} align="middle" className={styles.rowSpacing}>
            <Col className="gutter-row" span={24}>
              <Card style={{ backgroundColor: "#ffffff" }}>
                <Form form={form} layout="vertical">
                  <Form.Item
                    name="frequency"
                    label="Периодичность автоматической загрузки"
                    rules={[
                      {
                        required: true,
                        message: "Поле обязательно для заполнения",
                      },
                    ]}
                  >
                    <Select placeholder="Выберите периодичность">
                      <Select.Option key="1" value="1">
                        День
                      </Select.Option>
                      <Select.Option key="2" value="2">
                        Неделя
                      </Select.Option>
                      <Select.Option key="3" value="3">
                        Месяц
                      </Select.Option>
                      <Select.Option key="4" value="4">
                        3 месяца
                      </Select.Option>
                      <Select.Option key="5" value="5">
                        Полгода
                      </Select.Option>
                      <Select.Option key="6" value="6">
                        Год
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Почта"
                    rules={[
                      {
                        required: true,
                        message: "Поле обязательно для заполнения",
                      },
                      { type: "email", message: "Введите корректный email" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={handleSave}
                    style={{ marginRight: 8 }}
                  >
                    Сохранить
                  </Button>
                  <Button onClick={handleDownload}>Скачать</Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Backup;
