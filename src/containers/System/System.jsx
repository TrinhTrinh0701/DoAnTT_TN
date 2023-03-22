import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Header, Sidebar } from "./";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <Header />
      <div className="flex flex-auto w-full h-screen">
        <Sidebar />
        <div className="flex-auto h-full p-4 overflow-scroll bg-white shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
