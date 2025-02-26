import { useContext } from "react";
import "./styles.css";
import { AuthContext } from "../../main";
import MainHeader from "../../components/BaseLayout/MainHeader/MainHeader";
import { Col, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import ContractsData from "../../components/Contracts/ContractsData/ContractsData";

const Customers = () => {
  const { store } = useContext(AuthContext);
  store.page = "Договоры";

  return (
    <>
      <MainHeader />
      <Layout className="container">
        <Content>
          <Row gutter={16} align="middle" className="row-spacing">
            <Col className="gutter-row" span={24}>
                <ContractsData />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Customers;
