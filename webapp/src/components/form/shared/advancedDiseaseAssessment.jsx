import { Divider, Form, Input, Radio } from "antd";

const PDL1_OPTIONS = [
  { value: "CPS < 1", label: "CPS < 1", className: "" },
  { value: "CPS 1-19", label: "CPS 1-19", className: "col-span-4" },
  { value: "CPS >= 20", label: "CPS >= 20", className: "" },
];

// Shared by the "estadio avançado" branch of the initial diagnosis, the relapse
// flow, and the nasofaringe-specific flow — they all record the same fields
// (metastasis sites, organ/lesion counts, PD-L1 CPS). `namePrefix` namespaces
// the Form.Item names (e.g. "initial_diagnosis_advanced") so the three contexts
// never collide in the submitted form values, and each shows up as its own
// object when exporting/analysing the data.
export default function AdvancedDiseaseAssessment({ namePrefix }) {
  const name = (field) => [namePrefix, field];
  const watches = (field) => (prevValues, currentValues) => prevValues[namePrefix]?.[field] !== currentValues[namePrefix]?.[field];

  return (
    <>
      <div className="col-span-3 mt-2">
        <p className="font-bold">Locais de metastização à distância</p>
      </div>
      <div className="col-span-3">
        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
      </div>
      <div className="col-span-3 grid grid-cols-5 gap-x-12">
        <div>
          <Form.Item name={name("distant_metastasis_sites")} className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="Osso">Osso</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div>
          <Form.Item name={name("distant_metastasis_sites")} className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="Pulmão">Pulmão</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="col-span-3">
          <Form.Item name={name("distant_metastasis_sites")} className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="Fígado">Fígado</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div>
          <Form.Item name={name("distant_metastasis_sites")} className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="Sistema nervoso central">Sistema nervoso central</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div>
          <Form.Item name={name("distant_metastasis_sites")} className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="Outro">Outro</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item noStyle shouldUpdate={watches("distant_metastasis_sites")}>
            {({ getFieldValue }) =>
              getFieldValue(name("distant_metastasis_sites")) === "Outro" && (
                <Form.Item name={name("distant_metastasis_sites_other")} className="mb-0! mt-2!">
                  <Input size="large" placeholder="Qual?" />
                </Form.Item>
              )
            }
          </Form.Item>
        </div>
      </div>

      <div className="col-span-3 mt-2">
        <p className="font-bold">Número de órgãos envolvidos</p>
      </div>
      <div className="col-span-3">
        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
      </div>
      <div className="col-span-3 grid grid-cols-5 gap-x-12">
        <div>
          <Form.Item name={name("organs_envolved")} className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="1">1</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="col-span-4">
          <Form.Item name={name("organs_envolved")} className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="2">2</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div>
          <Form.Item name={name("organs_envolved")} className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="3 ou mais">3 ou mais</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      </div>

      <div className="col-span-3 mt-2">
        <p className="font-bold">Número total de lesões</p>
      </div>
      <div className="col-span-3">
        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
      </div>
      <div className="col-span-3 grid grid-cols-5 gap-x-12">
        {["1", "2", "3", "4", "5", "6 ou mais"].map((value, index) => (
          <div key={value} className={index % 2 === 1 ? "col-span-4" : ""}>
            <Form.Item name={name("total_lesions")} className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value={value}>{value}</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        ))}
      </div>

      <div className="col-span-3 mt-2">
        <p className="font-bold">PD-L1 CPS</p>
      </div>
      <div className="col-span-3">
        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
      </div>
      <div className="col-span-3 grid grid-cols-5 gap-x-12">
        {PDL1_OPTIONS.map((option) => (
          <div key={option.value} className={option.className}>
            <Form.Item name={name("pdl1_cps")} className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value={option.value}>{option.label}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item noStyle shouldUpdate={watches("pdl1_cps")}>
              {({ getFieldValue }) =>
                getFieldValue(name("pdl1_cps")) === option.value && (
                  <Form.Item name={name("pdl1_cps_specified")} className="mb-0! mt-2!">
                    <Input size="large" placeholder="Valor absoluto (se disponível)" />
                  </Form.Item>
                )
              }
            </Form.Item>
          </div>
        ))}
        <div className="col-span-4">
          <Form.Item name={name("pdl1_cps")} className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="Desconhecido / não realizado">Desconhecido / não realizado</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      </div>
    </>
  );
}
