import React, { useEffect } from "react";

import { ConfigProvider, theme } from "antd";
import { RouterProvider } from "react-router";

import "./styles/global.scss";

import config from "./config";
import useClans from "./hooks/useClans";
import useLists from "./hooks/useLists";
import router from "./routes/router";
import {getUserInfo} from "./services/auth.service";
import useCurrentUser from "./store/useCurrentUser";
import User from "./types/models/User";


function App() {
  const { darkAlgorithm } = theme;
  const { setUser } = useCurrentUser();

  // Fetch data
  useClans();
  useLists();

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        if (data.user) {
          setUser(data.user as User);
        }
      })
      .catch(({ status }) => {
        // If status is Forbidden
        if (status === 403) {
          window.location.replace(config.apiBaseUrl + config.paths.auth.login);
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
