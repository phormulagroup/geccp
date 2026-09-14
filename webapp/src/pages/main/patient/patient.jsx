import axios from "axios";
import { useContext, useEffect, useState } from "react";
import endpoints from "../../../utils/endpoints";
import { Context } from "../../../utils/appContext";
import { Button, DatePicker, Form, Input, InputNumber, Table } from "antd";
import dayjs from "dayjs";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";
import Create from "./create";

export default function Patients() {
  const { user } = useContext(Context);
  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id_institution) return;

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

    axios
      .get(endpoints.patient.readByInstitution, {
        params: { id_institution: user.id_institution },
      })
      .then((res) => {
        prepareTableData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.id_institution, navigate]);

  return (
    <div>
      <div className="mb-2">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Pacientes</p>
          <Button onClick={() => navigate("/app/paciente/adicionar")}>Adicionar paciente</Button>
        </div>
      </div>
      <Table
        columns={[
          { title: "id", key: "id", render: (_, record) => record.id ?? record.ID },
          { title: "Nº Processo", key: "process_number", render: (_, record) => record.process_number ?? record.PROCESS_NUMBER },
          { title: "Data de nascimento", dataIndex: "birth_date", key: "birth_date" },
          { title: "", dataIndex: "details", key: "details" },
        ]}
        dataSource={tableData}
      />
    </div>
  );
}
