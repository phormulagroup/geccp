import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Footer } from "antd/es/layout/layout";
import { Button, Checkbox, Form, Input, message } from "antd";

import { Context } from "../../utils/context";

import loginBg from "../../assets/login/GECCP-Login.png";
import logo from "../../assets/login/Cancro-da-cabeca-e-pescoco.svg";
import logoStudy from "../../assets/login/Grupo-de-Estudos-de-Cancro-da-Cabeca-e-Pescoco.svg";
import espghan from "../../assets/ESPGHAN.svg";
import dayjs from "dayjs";
import axios from "axios";
import endpoints from "../../utils/endpoints";

function Login() {
  const { isLoggedIn, login, messageApi } = useContext(Context);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/app");
    }
  }, [isLoggedIn]);

  function submit(values) {
    setIsButtonLoading(true);
    axios
      .post(endpoints.auth.login, { data: values })
      .then((res) => {
        if (res.data.user) {
          login(res.data);
        } else {
          messageApi.open({
            type: "error",
            content: res.data.message,
          });
        }
        setIsButtonLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsButtonLoading(false);
      });
  }

  return (
    <div className={`flex flex-col justify-between w-full h-full bg-cover bg-center`} style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="flex flex-col justify-center items-center min-h-125 w-full">
        <img src={logo} className="mt-20 mb-6" />
        <div className="max-w-112.5 bg-white rounded-[5px] shadow-[0px_3px_6px_#00000029]">
          <div className="w-full flex justify-center items-center bg-black p-6 rounded-t-[5px]">
            <img src={logoStudy} className="w-full max-w-75" />
          </div>
          <div className="flex flex-col p-4">
            <p className="text-center font-bold text-sm">Área de administração</p>
            <p className="text-center text-sm">Plataforma de Monitorização Epidemiológica</p>
            <div className="flex flex-col mt-6">
              <Form form={form} layout="vertical" onFinish={submit}>
                <p className="pb-2">E-mail</p>
                <Form.Item name="email" rules={[{ required: true, message: "Este campo é obrigatório" }]}>
                  <Input size="large" placeholder="johndoe" />
                </Form.Item>
                <div className="flex justify-between items-center pb-2">
                  <p>Password</p>
                  <a className="text-xs text-[#2b5067]!">
                    <u>Esqueceu-se da password?</u>
                  </a>
                </div>
                <Form.Item name="password" rules={[{ required: true, message: "Este campo é obrigatório" }]}>
                  <Input.Password size="large" placeholder="●●●●●●●" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox size="large" className="text-sm">
                    Lembrar-me?
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button size="large" type="primary" className="w-full" onClick={form.submit} loading={isButtonLoading}>
                    Entrar
                  </Button>
                </Form.Item>
              </Form>

              <p className="text-center text-xs">
                Caso esteja com problemas de acesso por favor entre em contacto com o nosso suporte <u>help@geccp.pt</u>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer className="bg-transparent! max-w-400 w-full mx-auto py-6 px-12">
        <div className="flex justify-center items-center mt-6">
          <div>
            <p className="text-xs text-white text-left">Todos os direitos reservados a Phormulagroup © {dayjs().format("YYYY")}</p>
          </div>
        </div>
      </Footer>
    </div>
  );
}

export default Login;
