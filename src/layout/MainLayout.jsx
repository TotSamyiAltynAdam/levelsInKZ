import { Outlet, Navigate } from "react-router-dom";
import { Container } from "@mui/material";

import Header from "./../components/header/Header";

import { useAuthContext } from "./../context/AuthContextProvider";
import { useState } from "react";

const MainLayout = () => {
  const { token } = useAuthContext();

  return (
    <div>
      {token ? null : <Navigate to="/auth/signin" replace />}
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
