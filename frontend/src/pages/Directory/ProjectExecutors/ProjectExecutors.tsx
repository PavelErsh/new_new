import { Col, Layout, Row } from "antd";
import MainHeader from "../../../components/BaseLayout/MainHeader/MainHeader";
import { Content } from "antd/es/layout/layout";
import { AuthContext } from "../../../main";
import { useContext } from "react";
import ProjectExecutorsData from "../../../components/ProjectExecutors/ProjectExecutorsData/ProjectExecutorsData";

export const ProjectExecutors = () => {
  const { store } = useContext(AuthContext);
  store.page = "Исполнители на проектах";

  return (
    <>
      <MainHeader />
      <Layout className="container">
        <Content>
          <Row gutter={16} align="middle" className="row-spacing">
            <Col className="gutter-row" span={24}>
              <ProjectExecutorsData />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
