import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Empty, Spin } from "antd";
import { useNavigate } from "react-router";
import { AiOutlineArrowRight, AiOutlineCalendar, AiOutlineEnvironment, AiOutlineTeam } from "react-icons/ai";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import endpoints from "../../utils/endpoints";
import { Context } from "../../utils/appContext";

const MONTH_LABELS_PT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const CHART_COLORS = ["#17A38D", "#0F766E", "#5EEAD4", "#F59E0B", "#64748B", "#38BDF8", "#A78BFA", "#F472B6"];

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

function ChartCard({ title, children }) {
  return (
    <div className="border-dashed border-2 border-[#8BD1C6] rounded-[10px] p-6 bg-white">
      <p className="label mb-4">{title}</p>
      {children}
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
  const locationData = Object.entries(byLocation)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value], index) => ({ name, value, color: CHART_COLORS[index % CHART_COLORS.length] }));

  const monthlyData = (() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const m = dayjs().subtract(i, "month");
      months.push({ key: m.format("YYYY-MM"), label: MONTH_LABELS_PT[m.month()], total: 0 });
    }
    (patients ?? []).forEach((p) => {
      if (!p.created_at) return;
      const key = dayjs(p.created_at).format("YYYY-MM");
      const entry = months.find((m) => m.key === key);
      if (entry) entry.total += 1;
    });
    return months;
  })();

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
            <StatTile icon={<AiOutlineEnvironment />} label="Localizações distintas" value={locationData.length} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Distribuição por localização do tumor">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-1/2 h-62.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={locationData} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="85%" paddingAngle={2}>
                        {locationData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} stroke="#fff" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 flex flex-col gap-2">
                  {locationData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2 text-sm">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                      <span className="flex-1 truncate">{entry.name}</span>
                      <span className="font-bold">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>

            <ChartCard title="Novos pacientes por mês">
              <div className="w-full h-62.5">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ left: -20 }}>
                    <CartesianGrid vertical={false} stroke="#EAF6F3" />
                    <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: "#EAF6F3" }} tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <Tooltip cursor={{ fill: "#EAF6F3" }} />
                    <Bar dataKey="total" name="Pacientes" fill="#17A38D" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
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
        </>
      )}
    </div>
  );
}
