import { Col, Layout, Row } from "antd";
import MainHeader from "../../../components/BaseLayout/MainHeader/MainHeader";
import { Content } from "antd/es/layout/layout";
import { AuthContext } from "../../../main";
import { useContext } from "react";
import OwnershipFormsData from "../../../components/OwnershipForms/OwnershipFormsData/OwnershipFormsData";

export const OwnershipForms = () => {
  const { store } = useContext(AuthContext);
  store.page = "Формы собственности";

  return (
    <>
      <MainHeader />
      <Layout className="container">
        <Content>
          <Row gutter={16} align="middle" className="row-spacing">
            <Col className="gutter-row" span={24}>
              <OwnershipFormsData />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};