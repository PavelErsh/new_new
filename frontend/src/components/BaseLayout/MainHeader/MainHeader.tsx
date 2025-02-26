import { useContext, useState } from "react";
import Logo from "../../../assets/img/logo.png";
import "./styles.css";
import { Button, Flex, Layout, Space, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { TimeContext } from "../../../pages/Welcome/Welcome";
import { AuthContext } from "../../../main";
import PlusButton from "../../PlusButton/PlusButton";
import AddObjectModal from "../../Objects/AddObjectModal/AddObjectModal";
import AddEmployeeModal from "../../Employees/AddEmployeeModal/AddEmployeeModal";
import AddCustomerModal from "../../Customers/AddCustomerModal/AddCustomerModal";
import AddContractsModal from "../../Contracts/AddContractsModal/AddContractsModal";
import AddProjectModal from "../../Projects/AddProjectModal/AddProjectModal";

const { Header } = Layout;

interface IButton {
  path: string;
  label: string;
}

const MainHeader = () => {
  const { timeStore } = useContext(TimeContext);
  const { store } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const showModal = (type: string) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalType(null);
  };

  const handleSuccess = () => {
    setIsModalVisible(false);
    setModalType(null);
  };

  const buttons: IButton[] = [
    { path: "objects", label: "Объекты" },
    { path: "contracts", label: "Договоры" },
    { path: "customers", label: "Заказчики" },
    { path: "projects", label: "Проекты" },
    { path: "dashboards", label: "Дашборды" },
    { path: "employees", label: "Сотрудники" },
    { path: "directory", label: "Справочники" },
  ];

  const settingsMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/theme">Настройки оформления</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/backup">Резервное копирование</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/telegram">Настройки Telegram</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="header">
      <Flex className="header-top" justify="space-between" align="center">
        <Link to="/">
          <img src={Logo} className="logo" alt="Логотип" />
        </Link>
        <Flex justify="center">
          <h2 className="welcome-title">
            {store.page}, {store.user.username}
          </h2>
        </Flex>
        <Flex className="header-right" align="center">
          <Dropdown overlay={settingsMenu} trigger={["click"]}>
            <Button className="header-settings">Настройки</Button>
          </Dropdown>
          <div className="time-container">
            <div className="time" id="current-time">
              {timeStore.currentTime}
            </div>
            <div className="time" id="future-time">
              {timeStore.futureTime}
            </div>
          </div>
          <Button
            type="primary"
            style={{ margin: "20px 10px" }}
            onClick={() => store.logout()}
          >
            Выйти
          </Button>
        </Flex>
      </Flex>
      <nav className="header-bottom">
        <Flex justify="center" align="center">
          <Space size="large">
            {buttons.map((button: IButton) => (
              <div
                key={button.path}
                className="header-bottom-btn"
                onMouseEnter={() => {
                  setHoveredButton(button.path);
                }}
                onMouseLeave={() => {
                  setHoveredButton(null);
                }}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    navigate(`/${button.path}`);
                  }}
                  disabled={button.path === "dashboards"}
                  className={
                    button.path === "dashboards" ? "disabled-dashboard-btn" : ""
                  }
                >
                  {button.label}
                </Button>
                {button.path !== "directory" &&
                  button.path !== "dashboards" && (
                    <PlusButton
                      onClick={() =>
                        showModal(
                          button.path === "employees"
                            ? "employees"
                            : button.path === "customers"
                            ? "customers"
                            : button.path === "contracts"
                            ? "contracts"
                            : button.path === "projects"
                            ? "projects"
                            : "object"
                        )
                      }
                      isVisible={hoveredButton === button.path}
                      isAdmin={
                        button.path === "employees"
                          ? store.role === "admin"
                          : button.path === "dashboards"
                          ? false
                          : undefined
                      }
                    />
                  )}
              </div>
            ))}
          </Space>
        </Flex>
      </nav>

      {/* Модальное окно для добавления объекта */}
      <AddObjectModal
        visible={modalType === "object" && isModalVisible}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />

      {/* Модальное окно для добавления договора */}
      <AddContractsModal
        visible={modalType === "contracts" && isModalVisible}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />

      {/* Модальное окно для добавления проекта */}
      <AddProjectModal
        visible={modalType === "projects" && isModalVisible}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />

      {/* Модальное окно для добавления сотрудника */}
      <AddEmployeeModal
        visible={modalType === "employees" && isModalVisible}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />

      {/* Модальное окно для добавления заказчика */}
      <AddCustomerModal
        visible={modalType === "customers" && isModalVisible}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />
    </Header>
  );
};

export default observer(MainHeader);
