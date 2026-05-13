import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch, TimePicker, Tooltip } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlineInfoCircle, AiOutlinePlusCircle } from "react-icons/ai";

import helpers from "../../utils/helpers";
import CharlsonIndex from "../charlsonIndex";
import Treatment from "./palliativeTreatment";
import PalliativeTreatment from "./palliativeTreatment";

export default function Relapse({ form, next, previous }) {
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
                {/* Recidiva com doença locorregional e metastização à distância */}
                <div className="col-span-3">
                  <p className="label">{getFieldValue("relapse_location")}</p>
                </div>

                {/* Locais de metastização à distância */}
                <div className="col-span-3 mt-2">
                  <p className="font-bold">Locais de metastização à distância</p>
                </div>
                <div className="col-span-3">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-3 grid grid-cols-5 gap-x-12">
                  <div>
                    <Form.Item name="distant_metastasis_sites" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="Osso">Osso</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="distant_metastasis_sites" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="Pulmão">Pulmão</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="col-span-3">
                    <Form.Item name="distant_metastasis_sites" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="Fígado">Fígado</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="distant_metastasis_sites" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="Sistema nervoso central">Sistema nervoso central</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="distant_metastasis_sites" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="Outro">Outro</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.distant_metastasis_sites !== currentValues.distant_metastasis_sites}>
                      {({ getFieldValue }) =>
                        getFieldValue("distant_metastasis_sites") === "Outro" && (
                          <Form.Item name="distant_metastasis_sites_other" className="mb-0! mt-2!">
                            <Input size="large" placeholder="Qual?" />
                          </Form.Item>
                        )
                      }
                    </Form.Item>
                  </div>
                </div>

                {/* Número de órgãos envolvidos */}
                <div className="col-span-3 mt-2">
                  <p className="font-bold">Número de órgãos envolvidos</p>
                </div>
                <div className="col-span-3">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-3 grid grid-cols-5 gap-x-12">
                  <div>
                    <Form.Item name="organs_envolved" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="1">1</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="col-span-4">
                    <Form.Item name="organs_envolved" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="2">2</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="organs_envolved" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="3 ou mais">3 ou mais</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>

                {/* Número total de lesões */}
                <div className="col-span-3 mt-2">
                  <p className="font-bold">Número total de lesões</p>
                </div>
                <div className="col-span-3">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-3 grid grid-cols-5 gap-x-12">
                  <div>
                    <Form.Item name="total_lesions" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="1">1</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="col-span-4">
                    <Form.Item name="total_lesions" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="2">2</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="total_lesions" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="3">3</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="col-span-4">
                    <Form.Item name="total_lesions" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="4">4</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="total_lesions" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="5">5</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="col-span-4">
                    <Form.Item name="total_lesions" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="6 ou mais">6 ou mais</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>

                {/* PD-L1 CPS */}
                <div className="col-span-3 mt-2">
                  <p className="font-bold">PD-L1 CPS</p>
                </div>
                <div className="col-span-3">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-3 grid grid-cols-5 gap-x-12">
                  <div>
                    <Form.Item name="pdl1_cps" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="CPS < 1">{"CPS < 1"}</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="col-span-4">
                    <Form.Item name="pdl1_cps" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="CPS 1-19">CPS 1-19</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="pdl1_cps" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="CPS >= 20">{"CPS >= 20"}</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div className="col-span-4">
                    <Form.Item name="pdl1_cps" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="Desconhecido / não realizado">{"Desconhecido / não realizado"}</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="pdl1_cps" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="Valor absoluto">Valor absoluto</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.pdl1_cps !== currentValues.pdl1_cps}>
                      {({ getFieldValue }) =>
                        getFieldValue("pdl1_cps") === "Valor absoluto" && (
                          <Form.Item name="pdl1_cps_specified" className="mb-0! mt-2!">
                            <Input size="large" placeholder="Qual?" />
                          </Form.Item>
                        )
                      }
                    </Form.Item>
                  </div>
                </div>
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
          prevValues.therapeutic_approach !== currentValues.therapeutic_approach || prevValues.recidive_treatment !== currentValues.recidive_treatment || prevValues.tumor_location !== currentValues.tumor_location
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
                  </div>: 
                  <div className="col-span-3 grid! grid-cols-3 gap-x-12">
                    <div
                      className={`border-dashed border-2 border-[#8BD1C6] ${getFieldValue("recidive_treatment") === "Cirurgia seguida de RT adjuvante" ? "border-[#8BD1C6] bg-[#C5E8E3]" : "border-white"} rounded-[10px] p-4`}
                    >
                      <Form.Item name="recidive_treatment" layout="horizontal" className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="Cirurgia seguida de RT adjuvante">Cirurgia seguida de RT adjuvante</Radio>
                        </Radio.Group>
                      </Form.Item>
                      {getFieldValue("recidive_treatment") === "Cirurgia seguida de RT adjuvante" && (
                        <div className="mt-4 ml-8">
                          <p className="font-bold">Pembrolizumab peri-operatório:</p>
                          <Form.Item name="perioperative_pembrolizumab" layout="horizontal" className="mb-0!">
                            <Radio.Group className="flex w-full!" size="large">
                              <Radio value="Sim">Sim</Radio>
                              <Radio value="Não">Não</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                      )}
                    </div>
                    <div
                      className={`border-dashed border-2 border-[#8BD1C6] ${getFieldValue("recidive_treatment") === "Cirurgia seguida de QRT adjuvante" ? "border-[#8BD1C6] bg-[#C5E8E3]" : "border-white"} rounded-[10px] p-4`}
                    >
                      <Form.Item name="recidive_treatment" layout="horizontal" className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="Cirurgia seguida de QRT adjuvante">Cirurgia seguida de QRT adjuvante</Radio>
                        </Radio.Group>
                      </Form.Item>
                      {getFieldValue("recidive_treatment") === "Cirurgia seguida de QRT adjuvante" && (
                        <div className="mt-4 ml-8">
                          <p className="font-bold">Pembrolizumab peri-operatório:</p>
                          <Form.Item name="perioperative_pembrolizumab" layout="horizontal" className="mb-0!">
                            <Radio.Group className="flex w-full!" size="large">
                              <Radio value="Sim">Sim</Radio>
                              <Radio value="Não">Não</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                      )}
                    </div>
                    <div
                      className={`border-dashed border-2 border-[#8BD1C6] ${getFieldValue("recidive_treatment") === "Cirurgia apenas" ? "border-[#8BD1C6] bg-[#C5E8E3]" : "border-white"} rounded-[10px] p-4`}
                    >
                      <Form.Item name="recidive_treatment" layout="horizontal" className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="Cirurgia apenas">Cirurgia apenas</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div
                      className={`border-dashed border-2 border-[#8BD1C6] ${getFieldValue("recidive_treatment") === "RT radical" ? "border-[#8BD1C6] bg-[#C5E8E3]" : "border-white"} rounded-[10px] p-4`}
                    >
                      <Form.Item name="recidive_treatment" layout="horizontal" className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="RT radical">RT radical</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div
                      className={`border-dashed border-2 border-[#8BD1C6] ${getFieldValue("recidive_treatment") === "QRT radical" ? "border-[#8BD1C6] bg-[#C5E8E3]" : "border-white"} rounded-[10px] p-4`}
                    >
                      <Form.Item name="recidive_treatment" layout="horizontal" className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="QRT radical">QRT radical</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div
                      className={`border-dashed border-2 border-[#8BD1C6] ${getFieldValue("recidive_treatment") === "Outro" ? "border-[#8BD1C6] bg-[#C5E8E3]" : "border-white"} rounded-[10px] p-4`}
                    >
                      <Form.Item name="recidive_treatment" layout="horizontal" className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="Outro">Outro</Radio>
                        </Radio.Group>
                      </Form.Item>

                      {getFieldValue("recidive_treatment") === "Outro" && (
                        <Form.Item name="recidive_treatment_other" layout="horizontal" className="mb-0! mt-2!">
                          <Input size="large" placeholder="Qual?" />
                        </Form.Item>
                      )}
                    </div>
                  </div>}

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
