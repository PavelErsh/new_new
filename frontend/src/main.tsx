import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthStore from "./store/AuthStore.ts";

const store = new AuthStore();

interface State {
  store: AuthStore;
}

export const AuthContext = createContext<State>({
  store,
});

createRoot(document.getElementById("root")!).render(
  <AuthContext.Provider
    value={{
      store,
    }}
  >
    <StrictMode>
      <App />
    </StrictMode>
  </AuthContext.Provider>
);
