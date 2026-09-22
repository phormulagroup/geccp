import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Empty, Spin } from "antd";
import { useNavigate } from "react-router";
import { AiOutlineArrowRight, AiOutlineCalendar, AiOutlineEnvironment, AiOutlineTeam } from "react-icons/ai";

import endpoints from "../../utils/endpoints";
import { Context } from "../../utils/appContext";

function StatTile({ icon, label, value }) {
  return (
    <div className="border-dashed border-2 border-[#8BD1C6] rounded-[10px] p-6 flex items-center gap-4 bg-white">
      <div className="w-12.5 h-12.5 shrink-0 rounded-full bg-[#17A38D] text-white flex items-center justify-center text-[22px]">{icon}</div>
      <div>
        <p className="text-2xl font-bold leading-none">{value}</p>
        <p className="text-sm text-[#6b7280] mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function Main() {
  const { user } = useContext(Context);
  const [patients, setPatients] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id_institution) return;

    axios
      .get(endpoints.patient.readByInstitution, {
        params: { id_institution: user.id_institution },
      })
      .then((res) => setPatients(res.data))
      .catch((err) => {
        console.log(err);
        setPatients([]);
      });
  }, [user.id_institution]);

  const loading = patients === null;
  const total = patients?.length ?? 0;

  const thisMonthCount = (patients ?? []).filter((p) => p.created_at && dayjs(p.created_at).isSame(dayjs(), "month")).length;

  const byLocation = {};
  (patients ?? []).forEach((p) => {
    const key = p.tumor_location || "Não especificado";
    byLocation[key] = (byLocation[key] || 0) + 1;
  });
  const locationEntries = Object.entries(byLocation).sort((a, b) => b[1] - a[1]);
  const maxLocationCount = locationEntries.length > 0 ? Math.max(...locationEntries.map(([, count]) => count)) : 0;

  const recentPatients = [...(patients ?? [])].sort((a, b) => new Date(b.created_at ?? 0) - new Date(a.created_at ?? 0)).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-2xl font-bold">Olá, {user.name?.split(" ")[0] || "bem-vindo"}</p>
        <p className="text-[#6b7280]">Resumo dos pacientes registados na tua instituição</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      ) : total === 0 ? (
        <div className="border-dashed border-2 border-[#8BD1C6] rounded-[10px] p-12 flex flex-col items-center gap-4 bg-white">
          <Empty description="Ainda não há pacientes registados" />
          <button className="text-[#17A38D] font-bold" onClick={() => navigate("/app/paciente/adicionar")}>
            Adicionar o primeiro paciente
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatTile icon={<AiOutlineTeam />} label="Total de pacientes" value={total} />
            <StatTile icon={<AiOutlineCalendar />} label="Registados este mês" value={thisMonthCount} />
            <StatTile icon={<AiOutlineEnvironment />} label="Localizações distintas" value={locationEntries.length} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border-dashed border-2 border-[#8BD1C6] rounded-[10px] p-6 bg-white">
              <p className="label mb-4">Distribuição por localização do tumor</p>
              <div className="flex flex-col gap-3">
                {locationEntries.map(([location, count]) => (
                  <div key={location}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{location}</span>
                      <span className="font-bold">{count}</span>
                    </div>
                    <div className="w-full h-2 bg-[#EAF6F3] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#17A38D] rounded-full transition-[width]"
                        style={{ width: `${maxLocationCount ? (count / maxLocationCount) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-dashed border-2 border-[#8BD1C6] rounded-[10px] p-6 bg-white">
              <p className="label mb-2">Pacientes recentes</p>
              <div className="flex flex-col">
                {recentPatients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => navigate(`/app/paciente/${patient.id}`)}
                    className="flex justify-between items-center py-3 border-b border-[#EAF6F3] last:border-b-0 text-left hover:bg-[#F5FBFA] px-2 -mx-2 rounded-[5px]"
                  >
                    <div>
                      <p className="font-bold">Paciente #{patient.id}</p>
                      <p className="text-sm text-[#6b7280]">{patient.tumor_location || "Localização não especificada"}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#6b7280]">
                      <span>{patient.created_at ? dayjs(patient.created_at).format("DD/MM/YYYY") : "-"}</span>
                      <AiOutlineArrowRight />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
