import { Checkbox, Col, Form, Layout, Row, Table } from "antd";
import MainHeader from "../../../components/BaseLayout/MainHeader/MainHeader";
import { Content } from "antd/es/layout/layout";
import { useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../../../main";
import employeesStore from "../../../store/EmployeesStore";
import { observer } from "mobx-react-lite";
import { IEmployee } from "../../../models/responce/User";

const Telegram = () => {
  const { store } = useContext(AuthContext);
  store.page = "Настройки Telegram";
  const [form] = Form.useForm();

  useEffect(() => {
    employeesStore.fetchEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    return employeesStore.data.filter(employee => employee.telegram);
  }, [employeesStore.data]);

  const columns = [
    {
      title: "Номер",
      width: 100,
      dataIndex: "id",
    },
    {
      title: "Логин",
      width: 150,
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Фамилия",
      width: 150,
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Имя",
      width: 150,
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Отчество",
      width: 150,
      dataIndex: "father_name",
      key: "father_name",
    },
    {
      title: "Телеграм",
      width: 150,
      dataIndex: "telegram",
      key: "telegram",
    },
    {
      title: "Доступные оповещения в Telegram",
      width: 150,
      dataIndex: "notification",
      key: "notification",
      render: (notification: boolean, record: IEmployee) => (
        <Checkbox
          checked={notification} 
          onChange={(e) => {
            const updatedRecord = {
                id: record.id,
                username: record.username,
                role: record.role,
                notification: e.target.checked
              };
            employeesStore.updateEmployee(updatedRecord);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <MainHeader />
      <Layout className="container">
        <Content>
          <Row gutter={16} align="middle" className="row-spacing">
            <Col className="gutter-row" span={24}>
              <div className="center-button-container">
                <h2 style={{ color: 'red' }}>В случае, если данные отсуствуют, возможно вы не указали логин Telegram сотрудника</h2>
                <Form form={form} component={false}>
                  <Table
                    bordered
                    dataSource={filteredEmployees}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{ onChange: () => {} }}
                    scroll={{ x: "max-content", y: 1500 }}
                    rowKey="id"
                    locale={{ emptyText: "Нет данных" }}
                  />
                </Form>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default observer(Telegram);
