import { Col, Layout, Row } from "antd";
import MainHeader from "../../../components/BaseLayout/MainHeader/MainHeader";
import { Content } from "antd/es/layout/layout";
import { AuthContext } from "../../../main";
import { useContext } from "react";
import ContactsData from "../../../components/Contacts/ContactsData/ContactsData";

export const Contacts = () => {
  const { store } = useContext(AuthContext);
  store.page = "Контактные лица";

  return (
    <>
      <MainHeader />
      <Layout className="container">
        <Content>
          <Row gutter={16} align="middle" className="row-spacing">
            <Col className="gutter-row" span={24}>
              <ContactsData />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};