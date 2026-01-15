import axios from "axios";
import { useContext, useEffect, useState } from "react";
import endpoints from "../../../utils/endpoints";
import { Context } from "../../../utils/context";
import { Button, DatePicker, Form, Input, InputNumber, Table } from "antd";
import dayjs from "dayjs";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";
import Create from "./create";

export default function Patients() {
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get(endpoints.patient.readByInstitution, {
        params: { instituion: user.institution },
      })
      .then((res) => {
        setData(res.data);
        prepareTableData(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function prepareTableData(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push({
        ...array[i],
        birth_date: array[i].BIRTH_DATE ? dayjs(array[i].BIRTH_DATE).format("DD/MM/YYYY") : null,
        details: <Button onClick={() => navigate(`/app/paciente/${array[i].ID}`)}>Details</Button>,
        full_data: array[i],
      });
    }

    setTableData(newArray);
  }

  return (
    <div>
      <div className="mb-2">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Patients</p>
          <Button onClick={() => navigate("/app/paciente/adicionar")}>Adicionar paciente</Button>
        </div>
      </div>
      <Table
        columns={[
          { title: "ID", dataIndex: "ID", key: "ID" },
          { title: "Local Patient Log", dataIndex: "PROCESS_NUMBER", key: "PROCESS_NUMBER" },
          { title: "Birth date", dataIndex: "BIRTH_DATE", key: "BIRTH_DATE" },
          { title: "Acronyms name", dataIndex: "ACRONYMS_NAME", key: "ACRONYMS_NAME" },
          { title: "", dataIndex: "DETAILS", key: "DETAILS" },
        ]}
        dataSource={tableData}
      />
    </div>
  );
}
