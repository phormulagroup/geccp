import axios from "axios";
import { useContext, useEffect, useState } from "react";
import endpoints from "../../../utils/endpoints";
import { Context } from "../../../utils/appContext";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

const formatDate = (value) => (value ? dayjs(value).format("DD/MM/YYYY") : "-");

export default function Patients() {
  const { user } = useContext(Context);
  const [patients, setPatients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id_institution) return;

    axios
      .get(endpoints.patient.readByInstitution, {
        params: { id_institution: user.id_institution },
      })
      .then((res) => {
        setPatients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.id_institution]);

  return (
    <div>
      <div className="mb-2">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Pacientes</p>
          <Button onClick={() => navigate("/app/paciente/adicionar")}>Adicionar paciente</Button>
        </div>
      </div>
      <Table
        rowKey="id"
        dataSource={patients}
        columns={[
          { title: "ID", dataIndex: "id", key: "id" },
          { title: "Localização do tumor", dataIndex: "tumor_location", key: "tumor_location", render: (value) => value ?? "-" },
          { title: "Data de nascimento", dataIndex: "birth_date", key: "birth_date", render: formatDate },
          { title: "Criado em", dataIndex: "created_at", key: "created_at", render: formatDate },
          { title: "", key: "details", render: (_, record) => <Button onClick={() => navigate(`/app/paciente/${record.id}`)}>Detalhes</Button> },
        ]}
      />
    </div>
  );
}
