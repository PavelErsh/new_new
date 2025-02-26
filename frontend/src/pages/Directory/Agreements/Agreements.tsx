import { Col, Layout, Row } from "antd";
import MainHeader from "../../../components/BaseLayout/MainHeader/MainHeader";
import { Content } from "antd/es/layout/layout";
import { AuthContext } from "../../../main";
import { useContext } from "react";
import AgreementsData from "../../../components/Agreements/AgreementsData/AgreementsData";

export const Agreements = () => {
  const { store } = useContext(AuthContext);
  store.page = "Доп. соглашения";

  return (
    <>
      <MainHeader />
      <Layout className="container">
        <Content>
          <Row gutter={16} align="middle" className="row-spacing">
            <Col className="gutter-row" span={24}>
              <AgreementsData />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};