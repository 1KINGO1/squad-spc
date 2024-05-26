import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import authService from "./services/auth.service";

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
        // If status Forbidden
        if (status === 403) {
          console.log("Forbidden");
          window.location.replace("/api/auth/login");
          return;
        }
      });
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
