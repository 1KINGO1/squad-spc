import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import authService from "./services/auth.service";
import NavBar from "./elements/NavBar/NavBar";
import { Box } from "@mui/material";
import './styles/global.scss';
import Users from "./screens/users/Users";
import Clans from "./screens/clans/Clans";
import useCurrentUser from "./store/useCurrentUser";
import User from "./types/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: '/clans',
    element: <Clans/>
  },
  {
    path: '/users',
    element: <Users />
  }
]);

function App() {
  const {setUser} = useCurrentUser();

  useEffect(() => {
    authService.getUserInfo()
      .then(data => {
        if (data.user) {
          setUser(data.user as User);
        }
      })
      .catch(({status}) => {
        // If status is Forbidden
        if (status === 403) {
          window.location.replace("/api/auth/login");
          return;
        }
      });
  }, []);

  return (
    <Box display="flex" height='100%'>
      <NavBar />
      <Box flexGrow={1}>
        <RouterProvider router={router} />
      </Box>
    </Box>
  );
}

export default App;
