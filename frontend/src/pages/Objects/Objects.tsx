import { Col, Layout, Row } from "antd";
import MainHeader from "../../components/BaseLayout/MainHeader/MainHeader";
import { Content } from "antd/es/layout/layout";
import ObjectsData from "../../components/Objects/ObjectsData/ObjectsData";
import { AuthContext } from "../../main";
import { useContext } from "react";

export const Objects = () => {
  const { store } = useContext(AuthContext);
  store.page = "Объекты";

  return (
    <>
      <MainHeader />
      <Layout className="container">
        <Content>
          <Row gutter={16} align="middle" className="row-spacing">
            <Col className="gutter-row" span={24}>
              <ObjectsData />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
