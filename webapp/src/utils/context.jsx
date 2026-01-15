import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import endpoints from "./endpoints";
import api from "./api";
import { message } from "antd";

export const Context = createContext();

api.init();

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const [tablesName] = useState({ user: "Utilizador", patient: "Paciente" });

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  function getData() {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post(endpoints.auth.verifyToken, {
          data: token,
        })
        .then((res) => {
          console.log(res);
          if (res.data.token_valid) {
            api.token(res.data.token);
            navigate(window.location);
            setUser(res.data.user);
            createLog(res.data.user, "enter");
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            navigate("/login");
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        });
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    const auxUser = JSON.parse(JSON.stringify(user));
    setIsLoggedIn(false);
    setIsLoading(true);
    setUser({});
    navigate("/login");
    createLog(auxUser, "logout");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  function login(res) {
    localStorage.setItem("token", res.token);
    api.token(res.token);
    setUser(res.user);
    createLog(res.user, "login");
    setIsLoggedIn(true);
    navigate("/app");
  }

  function createLog(objUser, action) {
    if (objUser.id) {
      axios
        .post(endpoints.logs.create, { data: { id_user: objUser.id, action } })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function create(obj) {
    return new Promise(async (resolve, reject) => {
      console.log(obj);
      try {
        const res = await axios.post(endpoints[obj.table].create, { data: obj.data });
        createLog({
          action: "create",
          changed: null,
          type: obj.table,
          [`id_${obj.table}`]: res.insertId,
        });
        messageApi.open({
          type: "success",
          content: `${obj.table.charAt(0).toUpperCase() + obj.table.slice(1)} criado com sucesso!`,
        });
        resolve(res);
      } catch (err) {
        messageApi.open({
          type: "error",
          content: `Algo correu mal ao editar o ${obj.table}.`,
        });
        reject(err);
      }
    });
  }

  function update(obj, changed) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(endpoints[obj.table].update, { data: obj.data });
        createLog({
          action: "update",
          changed: changed,
          type: obj.table,
          [`id_${obj.table}`]: obj.data.id,
        });
        messageApi.open({
          type: "success",
          content: `${tablesName[obj.table]} foi editado com sucesso.`,
        });
        resolve(res);
      } catch (err) {
        messageApi.open({
          type: "error",
          content: `Algo correu mal ao editar o ${obj.table}.`,
        });
        reject(err);
      }
    });
  }

  function deleteRow(obj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(endpoints[obj.table].delete, { data: obj.data });
        createLog({
          action: "delete",
          type: obj.table,
          [`id_${obj.table}`]: obj.data.id,
        });
        messageApi.open({
          type: "success",
          content: `${tablesName[obj.table]} foi apagado com sucesso.`,
        });
        resolve(res);
      } catch (err) {
        messageApi.open({
          type: "error",
          content: `Algo correu mal ao editar o ${obj.table}.`,
        });
        reject(err);
      }
    });
  }

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        login,
        logout,
        isLoading,
        setIsLoading,
        messageApi,
        create,
        update,
        deleteRow,
      }}
    >
      {contextHolder}
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
