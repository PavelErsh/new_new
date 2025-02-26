import { Col, Layout, Row } from "antd";
import MainHeader from "../../components/BaseLayout/MainHeader/MainHeader";
import { Content } from "antd/es/layout/layout";
import { AuthContext } from "../../main";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export const Directory = () => {
  const { store } = useContext(AuthContext);
  store.page = "Справочники";

  return (
    <>
      <MainHeader />
      <Layout className="container">
        <Content>
          <Row gutter={16} align="middle" className="row-spacing">
            <Col className="gutter-row" span={24}>
              <div className="center-button-container">
                <Link to="/directory/ownership-forms" className="custom-link">
                  Формы собственности
                </Link>
                <Link to="/directory/contacts" className="custom-link">
                  Контактные лица
                </Link>
                <Link to="/directory/agreements" className="custom-link">
                  Доп. соглашения
                </Link>
                <Link to="/directory/project-statuses" className="custom-link">
                  Статусы проекта
                </Link>
                <Link to="/directory/project-executors" className="custom-link">
                  Исполнители на проектах
                </Link>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
