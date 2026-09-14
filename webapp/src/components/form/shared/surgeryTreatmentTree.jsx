import { Checkbox, Form, Input, Radio } from "antd";

// Shared "Tratamento da doença localizada / localmente avançada" decision tree —
// used both for the initial diagnosis (estadio precoce) and for a relapse that's
// still amenable to radical treatment. `namePrefix` namespaces every field (as a
// nested object) so the two contexts never collide when the form is submitted,
// and each shows up as its own object when exporting/analysing the data.
export default function SurgeryTreatmentTree({ namePrefix, includePalliativeOption = false }) {
  const name = (field) => [namePrefix, field];
  const watches = (field) => (prevValues, currentValues) => prevValues[namePrefix]?.[field] !== currentValues[namePrefix]?.[field];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
      <div>
        <Form.Item name={name("type")} className="mb-0!">
          <Radio.Group className="w-full!" size="large">
            <Radio value="Cirurgia">Cirurgia</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item noStyle shouldUpdate={watches("type")}>
          {({ getFieldValue }) =>
            getFieldValue(name("type")) === "Cirurgia" && (
              <div className="pl-4 mt-4 border-l-2 border-[#8BD1C6]">
                <p className="font-bold mb-2">Margens cirúrgicas</p>
                <Form.Item name={name("surgery_margins")} className="mb-3!">
                  <Radio.Group className="flex w-full!" size="large">
                    <Radio value="R0">R0</Radio>
                    <Radio value="R1">R1</Radio>
                    <Radio value="R2">R2</Radio>
                  </Radio.Group>
                </Form.Item>

                <p className="font-bold mb-2">Outros fatores de risco patológicos</p>
                <Form.Item name={name("surgery_risk_factors")} className="mb-3!">
                  <Checkbox.Group
                    options={[
                      { value: "Invasão vascular", label: "Invasão vascular" },
                      { value: "Invasão perineural", label: "Invasão perineural" },
                      { value: "Invasão linfática", label: "Invasão linfática" },
                      { value: "Margens curtas (=< 5mm)", label: "Margens curtas (≤ 5mm)" },
                      { value: "Extensão extracapsular", label: "Extensão extracapsular" },
                    ]}
                  />
                </Form.Item>

                <p className="font-bold mb-2">Tratamento adjuvante</p>
                <Form.Item name={name("surgery_adjuvant_treatment")} className="mb-0!">
                  <Radio.Group className="flex w-full!" size="large">
                    <Radio value="RT adjuvante">RT adjuvante</Radio>
                    <Radio value="QRT adjuvante">QRT adjuvante</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item noStyle shouldUpdate={watches("surgery_adjuvant_treatment")}>
                  {({ getFieldValue }) =>
                    getFieldValue(name("surgery_adjuvant_treatment")) === "QRT adjuvante" && (
                      <Form.Item name={name("surgery_adjuvant_treatment_specified")} className="mt-3! mb-0!">
                        <Input size="large" placeholder="Especifique o tratamento sistémico" />
                      </Form.Item>
                    )
                  }
                </Form.Item>

                <p className="font-bold mb-2 mt-4">Imunoterapia</p>
                <Form.Item name={name("surgery_immunotherapy")} className="mb-0!">
                  <Radio.Group className="w-full!">
                    <Radio value="Pembrolizumab peri-operatório">Pembrolizumab peri-operatório</Radio>
                    <Radio value="Nivolumab adjuvante">Nivolumab adjuvante</Radio>
                    <Radio value="Outro">Outro</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item noStyle shouldUpdate={watches("surgery_immunotherapy")}>
                  {({ getFieldValue }) =>
                    getFieldValue(name("surgery_immunotherapy")) === "Outro" && (
                      <Form.Item name={name("surgery_immunotherapy_other")} className="mt-2! mb-0!">
                        <Input size="large" placeholder="Especifique" />
                      </Form.Item>
                    )
                  }
                </Form.Item>
              </div>
            )
          }
        </Form.Item>
      </div>
      <div className="pt-4">
        <Form.Item name={name("type")} className="mb-0!">
          <Radio.Group className="w-full!">
            <Radio value="QT de indução">QT de indução</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle shouldUpdate={watches("type")}>
          {({ getFieldValue }) =>
            getFieldValue(name("type")) === "QT de indução" && (
              <Form.Item name={name("induction_chemo_specified")} className="w-full pl-7.5! mb-3!">
                <Input size="large" className="w-full" placeholder="Especifique o tratamento sistémico" />
              </Form.Item>
            )
          }
        </Form.Item>

        <Form.Item name={name("type")} className="mb-0!">
          <Radio.Group className="w-full!">
            <Radio value="QRT radical">QRT radical</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle shouldUpdate={watches("type")}>
          {({ getFieldValue }) =>
            getFieldValue(name("type")) === "QRT radical" && (
              <Form.Item name={name("radical_qrt_specified")} className="w-full pl-7.5! mb-3!">
                <Input size="large" className="w-full" placeholder="Especifique o tratamento sistémico" />
              </Form.Item>
            )
          }
        </Form.Item>

        <Form.Item name={name("type")} className="mb-0!">
          <Radio.Group>
            {/* ENSAIO CLÍNICO */}
            <Radio value="Ensaio clínico">Ensaio clínico</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle shouldUpdate={watches("type")}>
          {({ getFieldValue }) =>
            getFieldValue(name("type")) === "Ensaio clínico" && (
              <Form.Item name={name("clinical_trial_name")} className="w-full pl-7.5!">
                <Input size="large" className="w-full" placeholder="Qual?" />
              </Form.Item>
            )
          }
        </Form.Item>

        <Form.Item name={name("type")} className={includePalliativeOption ? "mb-3!" : "mb-0!"}>
          <Radio.Group>
            {includePalliativeOption && <Radio value="Tratamento paliativo">Tratamento paliativo</Radio>}
            <Radio value="Outro">Outro</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle shouldUpdate={watches("type")}>
          {({ getFieldValue }) =>
            getFieldValue(name("type")) === "Outro" && (
              <Form.Item name={name("other_specified")} className="w-full pl-7.5!">
                <Input size="large" className="w-full" placeholder="Qual?" />
              </Form.Item>
            )
          }
        </Form.Item>
      </div>
    </div>
  );
}
