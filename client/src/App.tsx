import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import authService from "./services/auth.service";
import useCurrentUser from "./store/useCurrentUser";
import User from "./types/User";
import "./styles/global.scss";

import { ConfigProvider, theme } from "antd";
import router from "./routes/router";

function App() {
  const { darkAlgorithm } = theme;
  const { setUser } = useCurrentUser();

  useEffect(() => {
    authService.getUserInfo()
      .then(data => {
        if (data.user) {
          setUser(data.user as User);
        }
      })
      .catch(({ status }) => {
        // If status is Forbidden
        if (status === 403) {
          window.location.replace("/api/auth/login");
          return;
        }
      });
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
