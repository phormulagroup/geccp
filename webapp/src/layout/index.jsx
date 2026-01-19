import React, { useContext, useEffect, useState } from "react";
import { CloseOutlined, DownOutlined, LoginOutlined, MenuOutlined, ProfileOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Drawer, Dropdown, Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/Europeer.svg";

import endpoints from "../utils/endpoints";
import config from "../utils/config";

import { Context } from "../utils/context";

import Logout from "../components/logout";

const { Header, Content, Sider } = Layout;

const Main = () => {
  const { user, logout, isLoggedIn } = useContext(Context);
  const location = useLocation();
  const [current, setCurrent] = useState("/app");
  const [isOpenDrawerMenu, setIsOpenDrawerMenu] = useState(false);
  const [isOpenLogout, setIsOpenLogout] = useState(false);

  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [items] = useState([getItem("Dashboard", "/app"), getItem("Patients", "/app/paciente")]);

  const navigate = useNavigate();

  function getItem(label, key, icon, children, extra) {
    return {
      key,
      icon,
      children,
      label,
      extra,
    };
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    let pathname = location.pathname.split("/");
    if (pathname.length > 2) {
      setCurrent(`/${pathname[1]}/${pathname[2]}`);
    } else {
      setCurrent(`/${pathname[pathname.length - 1]}`);
    }
  }, [location]);

  useEffect(() => {
    const detectSize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  function handleClickMenu(e) {
    if (e.key === "logout") {
      logout();
    } else {
      navigate(e.key);
      setIsOpenDrawerMenu(false);
    }
  }

  return (
    <Layout>
      <Logout open={isOpenLogout} close={() => setIsOpenLogout(false)} submit={logout} />
      <Layout>
        {windowDimension.width > 1080 ? (
          <Sider width={250} className="bg-[#17A38D]!">
            <div className="flex flex-col h-full p-4">
              <img src={logo} className="max-w-40 mx-auto" />
              <div className="mt-10">
                <Menu className="principal-menu" selectedKeys={[current]} mode="inline" items={items} onClick={handleClickMenu} />{" "}
              </div>
            </div>
          </Sider>
        ) : (
          <Drawer className="menu-drawer" width={400} open={isOpenDrawerMenu} onClose={() => setIsOpenDrawerMenu(false)} maskClosable={true} closable={false}>
            <Button type="text" className="absolute right-5 top-5 font-bold" onClick={() => setIsOpenDrawerMenu(false)}>
              <CloseOutlined className="text-[#0c3c61]" />
            </Button>
            <div className="bg-[#E9F2FF] flex p-[60px_20px_20px_20px] cursor-pointer" onClick={() => handleClickMenu({ key: "/app/perfil" })}>
              <Avatar className="w-12.5 h-12.5 mr-2" src={`${config.server_ip}/media/${user.img ?? "User-default.svg"}`} />
              <div className="flex flex-col">
                <p className="text-[#0c3c61]">Olá,</p>
                <p className="text-[#0c3c61]">{user.name}</p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-center p-5">
              <Menu className="principal-menu" selectedKeys={[current]} mode="inline" items={items} onClick={handleClickMenu} />
              <Divider />
              <a className={`dropdown-item flex items-center w-full min-h-11.25 pl-6`} onClick={() => setIsOpenLogout(true)}>
                <LoginOutlined className="mr-2" /> Logout
              </a>
            </div>
          </Drawer>
        )}

        <Layout>
          <Header className="bg-white! shadow-[0px_4px_16px_#A7AFB754] flex justify-end items-center">
            <div className="flex justify-end items-center">
              {windowDimension.width > 1080 ? (
                <Dropdown
                  menu={{
                    items: [
                      {
                        label: (
                          <a className="dropdown-item flex items-center" onClick={() => navigate("/app/perfil")}>
                            <ProfileOutlined className="mr-2" /> Perfil
                          </a>
                        ),
                        key: "0",
                      },
                      {
                        label: (
                          <a className="dropdown-item flex items-center" onClick={() => setIsOpenLogout(true)}>
                            <LoginOutlined className="mr-2" /> Logout
                          </a>
                        ),
                        key: "2",
                      },
                    ],
                  }}
                  trigger={["click"]}
                >
                  <div className="flex justify-center items-center mr-2 cursor-pointer">
                    <Avatar src={`${config.server_ip}/media/${user.img ?? "User-default.svg"}`} />
                    <p className="text-[12px] ml-2 mr-2">{user.name}</p>
                    <DownOutlined />
                  </div>
                </Dropdown>
              ) : (
                <MenuOutlined onClick={() => setIsOpenDrawerMenu(true)} />
              )}
            </div>
          </Header>
          <div className="p-6 h-[calc(100vh-64px)] overflow-auto">
            <Outlet />
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Main;
