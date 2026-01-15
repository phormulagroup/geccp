import { Navigate, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Context } from "./context";
import { useContext } from "react";
import Loading from "../layout/loading";
import Login from "../pages/auth/login";
import Main from "../pages/main/main";
import MainLayout from "../layout/index";

import Patient from "../pages/main/patient/patient";
import PatientDetails from "../pages/main/patient/details";
import PatientCreate from "../pages/main/patient/create";

export default function AppRoutes() {
  const { isLoggedIn, isLoading } = useContext(Context);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#17A38D",
          fontFamily: "Poppins",
        },
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          {isLoggedIn ? (
            <>
              <Route element={<MainLayout />}>
                <Route exact path="/" element={<Navigate to={`/app/`} replace />} />
                <Route exact path="/login" element={<Navigate to={`/app/`} replace />} />
                <Route exact path="/login" element={<Navigate to={`/app/`} replace />} />
                <Route exact path="/app/" element={<Main />} />
                <Route exact path="/app/paciente" element={<Patient />} />
                <Route exact path="/app/paciente/adicionar" element={<PatientCreate />} />
                <Route exact path="/app/paciente/:id" element={<PatientDetails />} />
              </Route>
            </>
          ) : (
            <Route>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/*" element={<Navigate to="/login" />} />
            </Route>
          )}
        </Routes>
      )}
    </ConfigProvider>
  );
}
