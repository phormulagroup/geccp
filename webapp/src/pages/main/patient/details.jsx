import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import endpoints from "../../../utils/endpoints";
import { Context } from "../../../utils/context";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Table, Tabs } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router";
import PersonalInformation from "../../../components/form/personalInformation";

export default function Details() {
  const { user } = useContext(Context);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const [form] = Form.useForm();

  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    if (params.ID) {
      axios
        .get(endpoints.patient.readById, {
          params: { ID: params.ID },
        })
        .then((res) => {
          setData(res.data);
          if (res.data.patient.length > 0) {
            const formObj = {
              ...res.data.patient[0],
              BIRTH_DATE_YEAR: parseInt(res.data.patient[0].BIRTH_DATE_YEAR),
              BIRTH_DATE_MONTH: parseInt(res.data.patient[0].BIRTH_DATE_MONTH),
              BIRTH_DATE: res.data.patient[0].BIRTH_DATE ? dayjs(res.data.patient[0].BIRTH_DATE) : null,
            };

            form.setFieldsValue(formObj);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function submitForm(values) {
    console.log(values);
  }

  return (
    <div>
      {Object.keys(data).length > 0 && (
        <div className="flex flex-col">
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
                children: <PersonalInformation initialValues={data} />,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
