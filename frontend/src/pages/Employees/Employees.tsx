import { Col, Layout, Row } from "antd";
import MainHeader from "../../components/BaseLayout/MainHeader/MainHeader";
import "./styles.css";
import { Content } from "antd/es/layout/layout";
import EmployeesData from "../../components/Employees/EmployeesData/EmployeesData";
import { AuthContext } from "../../main";
import { useContext } from "react";

export const Employees = () => {
  const { store } = useContext(AuthContext);
  store.page = "Сотрудники";

  return (
    <>
      <MainHeader />
      <Layout className="container">
        <Content>
          <Row gutter={16} align="middle" className="row-spacing">
            <Col className="gutter-row" span={24}>
              <EmployeesData />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
