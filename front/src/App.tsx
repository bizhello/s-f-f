/* eslint-disable prettier/prettier */
import React, { FC, useState, useCallback, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Error from "./pages/Error";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import authLoader from "./utils/authLoader";
import CurrentUserContext from "./utils/contexts/CurrentUserContext";
import AuthService from "./services/AuthService";
import { IRegistryRes } from "./common/interfaces/IAuth";

const App: FC = () => {

  const [currentUser, setCurrentUser] = useState<IRegistryRes | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const response = await AuthService.checkAuth();
      setCurrentUser(response);
    } catch (error) {
      setCurrentUser(null);
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      loader: authLoader
    },
    {
      path: "/chat",
      element: <Chat />,
      errorElement: <Error />,
      loader: authLoader
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Error />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
  ]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <RouterProvider router={router} />
      </CurrentUserContext.Provider>
    </div >
  );
}

export default App;
