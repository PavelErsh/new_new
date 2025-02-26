import { createContext, useContext } from "react";
import MainHeader from "../../components/BaseLayout/MainHeader/MainHeader";
import { MainPage } from "../../components/BaseLayout/MainPage/MainPage";
import TimeStore from "../../store/TimeStore";
import { AuthContext } from "../../main";

const timeStore = new TimeStore();

interface State {
  timeStore: TimeStore;
}

export const TimeContext = createContext<State>({
  timeStore,
});

export const Welcome = () => {
  const { store } = useContext(AuthContext);
  store.page = "Панель управления";

  return (
    <TimeContext.Provider
      value={{
        timeStore,
      }}
    >
      <MainHeader />
      <MainPage />
    </TimeContext.Provider>
  );
};
