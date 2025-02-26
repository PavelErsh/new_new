import { useContext, useEffect } from "react";
import "./App.css";
import { Welcome } from "./pages/Welcome/Welcome";
import { Auth } from "./pages/Auth/Auth";
import { AuthContext } from "./main";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Objects } from "./pages/Objects/Objects";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Employees } from "./pages/Employees/Employees";
import { ConfigProvider } from "antd";
import ru_RU from "antd/lib/locale/ru_RU";
import { Directory } from "./pages/Directory/Directory";
import { OwnershipForms } from "./pages/Directory/OwnershipForms/OwnershipForms";
import Customers from "./pages/Customers/Customers";
import { Contacts } from "./pages/Directory/Contacts/Contacts";
import Contracts from "./pages/Contracts/Contracts";
import { Agreements } from "./pages/Directory/Agreements/Agreements";
import Backup from "./pages/Settings/Backup/Backup";
import Telegram from "./pages/Settings/Telegram/Telegram";
import { ProjectStatuses } from "./pages/Directory/ProjectStatuses/ProjectStatuses";
import { ProjectExecutors } from "./pages/Directory/ProjectExecutors/ProjectExecutors";
import { Projects } from "./pages/Projects/Projects";

export const App = () => {
  const { store } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ConfigProvider locale={ru_RU}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={store.isAuth ? <Welcome /> : <Auth />} />
          <Route
            path="/objects"
            element={
              <ProtectedRoute>
                <Objects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contracts"
            element={
              <ProtectedRoute>
                <Contracts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/backup"
            element={
              <ProtectedRoute>
                <Backup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/telegram"
            element={
              <ProtectedRoute>
                <Telegram />
              </ProtectedRoute>
            }
          />
          <Route
            path="/directory"
            element={
              <ProtectedRoute>
                <Directory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/directory/ownership-forms"
            element={
              <ProtectedRoute>
                <OwnershipForms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/directory/contacts"
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/directory/agreements"
            element={
              <ProtectedRoute>
                <Agreements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/directory/project-statuses"
            element={
              <ProtectedRoute>
                <ProjectStatuses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/directory/project-executors"
            element={
              <ProtectedRoute>
                <ProjectExecutors />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default observer(App);
