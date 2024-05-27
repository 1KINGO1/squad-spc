import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import authService from "./services/auth.service";
import NavBar from "./elements/NavBar/NavBar";
import { Box } from "@mui/material";


import './styles/global.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
]);

function App() {
  useEffect(() => {
    authService.getUserInfo()
      .then(data => {
        console.log(data);
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
      <Box flexGrow={1} padding='20px'>
        <RouterProvider router={router} />
      </Box>
    </Box>
  );
}

export default App;
