import { Button, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch, TimePicker, Tooltip } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlineInfoCircle, AiOutlinePlusCircle } from "react-icons/ai";

import CharlsonIndex from "../charlsonIndex";
import PalliativeTreatment from "./palliativeTreatment";
import AdvancedDiseaseAssessment from "./shared/advancedDiseaseAssessment";
import SurgeryTreatmentTree from "./shared/surgeryTreatmentTree";

export default function Relapse({ form }) {
  return (
    <div className="grid grid-cols-3 gap-x-12 gap-y-4 mt-6!">
      {/* Abordagem terapêutica */}

      <div className="col-span-3 flex flex-col mt-2 gap-x-12 gap-y-4">
        <p className="label">Local da recidiva</p>
        <Form.Item name="relapse_location" layout="horizontal" className="mb-0!">
          <Radio.Group className="flex w-full!" size="large">
            <Radio value="Recidiva com doença locorregional e metastização à distância">Recidiva com doença locorregional e metastização à distância</Radio>
            <Radio value="Recidiva com metastização à distância apenas">Recidiva com metastização à distância apenas</Radio>
            <Radio value="Recidiva locorreginal apenas">Recidiva locorreginal apenas</Radio>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="col-span-3 flex flex-col w-full gap-x-12 gap-y-4">
        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.relapse_location !== currentValues.relapse_location}>
          {({ getFieldValue }) =>
            (getFieldValue("relapse_location") === "Recidiva com doença locorregional e metastização à distância" ||
              getFieldValue("relapse_location") === "Recidiva com metastização à distância apenas") && (
              <div className="p-6 border-2 border-dashed border-[#8BD1C6] bg-white rounded-[10px] grid grid-cols-3 gap-x-12 gap-y-4">
                <div className="col-span-3">
                  <p className="label">{getFieldValue("relapse_location")}</p>
                </div>

                <AdvancedDiseaseAssessment namePrefix="relapse_advanced" />
              </div>
            )
          }
        </Form.Item>
      </div>

      <div className="col-span-3 flex flex-col mt-2 gap-x-12 gap-y-4">
        <p className="label">Confirmação histológica (biópsia com evidência de neoplasia)</p>
        <Form.Item name="histological_confirmation" layout="horizontal" className="mb-0!">
          <Radio.Group className="flex w-full!" size="large">
            <Radio value="Sim">Sim</Radio>
            <Radio value="Não">Não</Radio>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="col-span-3 flex flex-col mt-2 gap-x-12 gap-y-4">
        <p className="label">Data do diagnóstico da recidiva (considerar a data do exame de imagem):</p>
        <Form.Item name="relapse_diagnosis_date" layout="horizontal" className="mb-0!" getValueProps={(value) => ({ value: value && dayjs(value) })}>
          <DatePicker size="large" className="w-full" />
        </Form.Item>
      </div>
      <div>
        <Form.Item name="therapeutic_approach" label="Abordagem terapêutica" className="mb-0!">
          <Select
            size="large"
            placeholder="Selecionar a histologia"
            options={[
              { value: "Passível de tratamento radical", label: "Passível de tratamento radical" },
              { value: "Não passível de tratamento radical", label: "Não passível de tratamento radical" },
            ]}
          />
        </Form.Item>
      </div>

      {/* Recidiva passível de tratamento radical */}
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.therapeutic_approach !== currentValues.therapeutic_approach ||
          prevValues.recidive_treatment !== currentValues.recidive_treatment ||
          prevValues.tumor_location !== currentValues.tumor_location
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("therapeutic_approach") === "Passível de tratamento radical" ? (
            <div className="col-span-3 flex flex-col w-full gap-x-12 gap-y-4">
              <div className="border-dashed border-2 border-[#8BD1C6] bg-[#C5E8E3] rounded-[10px] mt-4">
                <div className=" p-6  rounded-t-[10px]">
                  <p className="label">Recidiva passível de tratamento radical</p>
                </div>
                <div className="p-6 border-t-2 border-dashed border-[#8BD1C6] bg-white rounded-[10px] grid grid-cols-3 gap-x-12 gap-y-4">
                  <div className="col-span-3">
                    <p className="font-bold">Tratamento</p>
                  </div>
                  <div className="col-span-3">
                    <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                  </div>
                  {getFieldValue("tumor_location") === "Nasofaringe" ? 
                  
                  <div className="col-span-3 grid! grid-cols-3 gap-x-12">
                    <div
                      className={`border-dashed border-2 border-[#8BD1C6] ${getFieldValue("recidive_treatment") === "Cirurgia seguida de RT adjuvante" ? "border-[#8BD1C6] bg-[#C5E8E3]" : "border-white"} rounded-[10px]`}
                    >
                      <Form.Item name="recidive_treatment" layout="horizontal" className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="Cirurgia +/- RT">Cirurgia +/- RT</Radio>
                          <Radio value="RT radical +/- QT">RT radical +/- QT</Radio>
                          <Radio value="Outro">Outro</Radio>
                        </Radio.Group>
                      </Form.Item>
                      {getFieldValue("recidive_treatment") === "Outro" && (
                        <Form.Item name="recidive_treatment_other" layout="horizontal" className="mb-0! mt-2!">
                          <Input size="large" placeholder="Qual?" />
                        </Form.Item>
                      )}
                    </div>
                  </div>: <SurgeryTreatmentTree namePrefix="relapse_treatment" />}

                  {/* Abordagem terapêutica */}
                  <div className="col-span-3 mt-2">
                    <p className="font-bold">Data de término do tratamento da recidiva:</p>
                  </div>
                  <div className="col-span-3">
                    <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                  </div>
                  <div>
                    <Form.Item name="treatment_completion_date _relapse" className="mb-0!" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                      <DatePicker size="large" className="w-full" />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          ) : getFieldValue("therapeutic_approach") === "Não passível de tratamento radical" ? (
            <div className="col-span-3">
              <PalliativeTreatment form={form} />
            </div>
          ) : null
        }
      </Form.Item>
    </div>
  );
}
