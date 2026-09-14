import axios from "axios";
import { useContext, useEffect, useState } from "react";
import endpoints from "../../../utils/endpoints";
import { Button, Form, Tabs } from "antd";
import { useParams } from "react-router";
import PersonalInformation from "../../../components/form/personalInformation";
import DiseaseCharacterization from "../../../components/form/diseaseCharacterization";
import { Context } from "../../../utils/appContext";

export default function Details() {
  const { update } = useContext(Context);
  const [data, setData] = useState([]);

  const [form] = Form.useForm();

  const params = useParams();

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
      });
  }, [params.id, form]);

  function submitForm(values) {
    update({ table: "patient", data: { ...values, id: params.id } }, values).catch((err) => console.log(err));
  }

  return (
    <div>
      {data.length > 0 && (
        <div className="flex flex-col">
          <Form form={form} layout="vertical" onFinish={submitForm}>
            <Tabs
              className="mt-4! patient-tabs"
              size="large"
              tabPosition="left"
              type="card"
              defaultActiveKey="personal-information"
              items={[
                {
                  label: `Personal Information`,
                  key: "personal-information",
                  children: <PersonalInformation form={form} />,
                },
                {
                  label: `Caracterização da doença`,
                  key: "disease-characterization",
                  children: <DiseaseCharacterization form={form} />,
                },
              ]}
            />
            <div className="flex justify-end mt-4">
              <Button type="primary" size="large" onClick={() => form.submit()}>
                Guardar
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
