import { Col, Layout, Row } from "antd";
import { DeadlineCalendar } from "../../DeadlineCalendar/DeadlineCalendar";
import "./styles.css";
import { Content } from "antd/es/layout/layout";
import ObjectsTable from "../../Objects/ObjectsTable/ObjectsTable";
import ActionLogs from "../../ActionLogs/ActionLogs";

export const MainPage = () => (
  <Layout className="container">
    <Content>
      <Row gutter={16} align="middle" className="row-spacing">
        <Col className="gutter-row" span={12}>
          <ObjectsTable />
        </Col>
        <Col className="gutter-row" span={12}>
          <DeadlineCalendar />
        </Col>
      </Row>
      <Row gutter={16} align="middle" className="row-spacing">
        <Col className="gutter-row" span={12}>
          <ActionLogs />
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={{ backgroundColor: "white" }}>
            аллерты по временным критериям
          </div>
        </Col>
      </Row>
    </Content>
  </Layout>
);
