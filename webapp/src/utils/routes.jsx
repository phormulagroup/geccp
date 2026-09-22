import { Navigate, Route, Routes } from "react-router-dom";
import { ConfigProvider, Spin } from "antd";
import { Context } from "./appContext";
import { Suspense, lazy, useContext } from "react";
import Loading from "../layout/loading";
import Login from "../pages/auth/login";
import MainLayout from "../layout/index";

const Main = lazy(() => import("../pages/main/main"));
const Patient = lazy(() => import("../pages/main/patient/patient"));
const PatientDetails = lazy(() => import("../pages/main/patient/details"));
const PatientCreate = lazy(() => import("../pages/main/patient/create"));
const Profile = lazy(() => import("../pages/main/profile/profile"));

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
        <Suspense fallback={<Spin spinning size="large" className="flex! justify-center items-center w-full h-full" />}>
          <Routes>
            {isLoggedIn ? (
              <>
                <Route element={<MainLayout />}>
                  <Route exact path="/" element={<Navigate to={`/app/`} replace />} />
                  <Route exact path="/login" element={<Navigate to={`/app/`} replace />} />
                  <Route exact path="/app/" element={<Main />} />
                  <Route exact path="/app/paciente" element={<Patient />} />
                  <Route exact path="/app/paciente/adicionar" element={<PatientCreate />} />
                  <Route exact path="/app/paciente/:id" element={<PatientDetails />} />
                  <Route exact path="/app/perfil" element={<Profile />} />
                  <Route path="/*" element={<Navigate to="/app/" replace />} />
                </Route>
              </>
            ) : (
              <Route>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/*" element={<Navigate to="/login" />} />
              </Route>
            )}
          </Routes>
        </Suspense>
      )}
    </ConfigProvider>
  );
}
