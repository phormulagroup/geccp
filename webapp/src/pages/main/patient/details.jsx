import axios from "axios";
import { useContext, useEffect, useState } from "react";
import endpoints from "../../../utils/endpoints";
import { Button, Form, Spin, Tabs } from "antd";
import { AiOutlineArrowLeft, AiOutlineFileText, AiOutlineSave, AiOutlineUser } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import PersonalInformation from "../../../components/form/personalInformation";
import DiseaseCharacterization from "../../../components/form/diseaseCharacterization";
import { Context } from "../../../utils/appContext";

export default function Details() {
  const { update } = useContext(Context);
  const [data, setData] = useState(null);

  const [form] = Form.useForm();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) return;

    axios
      .get(endpoints.patient.readById, {
        params: { id: params.id },
      })
      .then((res) => {
        setData(res.data);
        if (res.data.length > 0) {
          form.setFieldsValue(res.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
        setData([]);
      });
  }, [params.id, form]);

  function submitForm(values) {
    update({ table: "patient", data: { ...values, id: params.id } }, values).catch((err) => console.log(err));
  }

  if (data === null) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button icon={<AiOutlineArrowLeft />} onClick={() => navigate("/app/paciente")}>
          Voltar
        </Button>
        <p className="text-2xl font-bold">Paciente #{params.id}</p>
      </div>

      {data.length > 0 && (
        <div className="border-dashed border-2 border-[#8BD1C6] rounded-[10px] p-6 bg-white">
          <Form form={form} layout="vertical" onFinish={submitForm}>
            <Tabs
              className="mt-4! patient-tabs"
              size="large"
              tabPosition="top"
              type="card"
              defaultActiveKey="personal-information"
              items={[
                {
                  label: (
                    <span className="flex items-center gap-2">
                      <AiOutlineUser /> Informação pessoal
                    </span>
                  ),
                  key: "personal-information",
                  children: <PersonalInformation form={form} />,
                },
                {
                  label: (
                    <span className="flex items-center gap-2">
                      <AiOutlineFileText /> Caracterização da doença
                    </span>
                  ),
                  key: "disease-characterization",
                  children: <DiseaseCharacterization form={form} />,
                },
              ]}
            />
            <div className="flex justify-end mt-4">
              <Button type="primary" size="large" icon={<AiOutlineSave />} onClick={() => form.submit()}>
                Guardar
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
