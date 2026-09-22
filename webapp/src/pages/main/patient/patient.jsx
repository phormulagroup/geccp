import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import endpoints from "../../../utils/endpoints";
import { Context } from "../../../utils/appContext";
import { Button, Empty, Input, Table } from "antd";
import dayjs from "dayjs";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router";

const formatDate = (value) => (value ? dayjs(value).format("DD/MM/YYYY") : "-");

export default function Patients() {
  const { user } = useContext(Context);
  const [patients, setPatients] = useState(null);
  const [search, setSearch] = useState("");

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
        setPatients([]);
      });
  }, [user.id_institution]);

  const filteredPatients = useMemo(() => {
    const list = patients ?? [];
    if (!search.trim()) return list;
    const term = search.trim().toLowerCase();
    return list.filter((p) => String(p.id).includes(term) || (p.tumor_location ?? "").toLowerCase().includes(term));
  }, [patients, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <p className="text-2xl font-bold">Pacientes</p>
          <p className="text-[#6b7280]">{patients?.length ?? 0} paciente(s) registado(s)</p>
        </div>
        <Button type="primary" size="large" icon={<AiOutlinePlus />} onClick={() => navigate("/app/paciente/adicionar")}>
          Adicionar paciente
        </Button>
      </div>

      <div className="border-dashed border-2 border-[#8BD1C6] rounded-[10px] p-6">
        <Input
          size="large"
          className="mb-4 max-w-100"
          placeholder="Pesquisar por ID ou localização do tumor"
          prefix={<AiOutlineSearch className="text-[#8BD1C6] mr-1" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
        />
        <Table
          rowKey="id"
          loading={patients === null}
          dataSource={filteredPatients}
          onRow={(record) => ({ onClick: () => navigate(`/app/paciente/${record.id}`), className: "cursor-pointer" })}
          locale={{
            emptyText: (
              <Empty
                description={patients !== null && patients.length === 0 ? "Ainda não há pacientes registados" : "Nenhum resultado para essa pesquisa"}
              />
            ),
          }}
          columns={[
            { title: "ID", dataIndex: "id", key: "id", width: 80 },
            { title: "Localização do tumor", dataIndex: "tumor_location", key: "tumor_location", render: (value) => value ?? "-" },
            { title: "Data de nascimento", dataIndex: "birth_date", key: "birth_date", render: formatDate },
            { title: "Criado em", dataIndex: "created_at", key: "created_at", render: formatDate },
            {
              title: "",
              key: "details",
              width: 120,
              render: (_, record) => (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/app/paciente/${record.id}`);
                  }}
                >
                  Detalhes
                </Button>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
