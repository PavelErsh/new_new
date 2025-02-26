import { Col, Layout, Row } from "antd";
import MainHeader from "../../components/BaseLayout/MainHeader/MainHeader";
import { Content } from "antd/es/layout/layout";
import { AuthContext } from "../../main";
import { useContext } from "react";
import ProjectsData from "../../components/Projects/ProjectsData/ProjectsData";

export const Projects = () => {
  const { store } = useContext(AuthContext);
  store.page = "Проекты";

  return (
    <>
      <MainHeader />
      <Layout className="container">
        <Content>
          <Row gutter={16} align="middle" className="row-spacing">
            <Col className="gutter-row" span={24}>
              <ProjectsData />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
