import { Col, Layout, Row } from "antd";
import MainHeader from "../../../components/BaseLayout/MainHeader/MainHeader";
import { Content } from "antd/es/layout/layout";
import { AuthContext } from "../../../main";
import { useContext } from "react";
import ProjectStatusesData from "../../../components/ProjectStatuses/ProjectStatusesData/ProjectStatusesData";

export const ProjectStatuses = () => {
  const { store } = useContext(AuthContext);
  store.page = "Статусы проекта";

  return (
    <>
      <MainHeader />
      <Layout className="container">
        <Content>
          <Row gutter={16} align="middle" className="row-spacing">
            <Col className="gutter-row" span={24}>
              <ProjectStatusesData />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
