import { Col, Layout, Row } from "antd";
import MainHeader from "../../components/BaseLayout/MainHeader/MainHeader";
import { Content } from "antd/es/layout/layout";
import { AuthContext } from "../../main";
import { useContext } from "react";
import CustomersData from "../../components/Customers/СustomersData/CustomersData";

const Customers = () => {
  const { store } = useContext(AuthContext);
  store.page = "Заказчики";

  return (
    <>
      <MainHeader />
      <Layout className="container">
        <Content>
          <Row gutter={16} align="middle" className="row-spacing">
            <Col className="gutter-row" span={24}>
                <CustomersData />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Customers;