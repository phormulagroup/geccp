import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch, TimePicker, Tooltip } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlineInfoCircle, AiOutlinePlusCircle } from "react-icons/ai";

import helpers from "../../utils/helpers";
import CharlsonIndex from "../charlsonIndex";
import PalliativeTreatment from "./palliativeTreatment";

export default function Relapse({ form, next, previous }) {
  return (
    <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-3 gap-x-12 gap-y-4">
      <div className="col-span-3">
        <p className="label">Recidiva</p>
      </div>
      <div className="col-span-3">
        <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
      </div>

      {/* Abordagem terapêutica */}
      <div>
        <Form.Item name="therapeutic_approach" className="mb-0!">
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
          prevValues.therapeutic_approach !== currentValues.therapeutic_approach || prevValues.recidive_treatment !== currentValues.recidive_treatment
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
                  <div className="col-span-3 flex justify-start items-start">
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
                    </div>
                  </div>

                  {/* Abordagem terapêutica */}
                  <div className="col-span-3 mt-2">
                    <p className="font-bold">Data de término do tratamento da recidiva:</p>
                  </div>
                  <div className="col-span-3">
                    <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                  </div>
                  <div>
                    <Form.Item name="treatment_completion_date _relapse" className="mb-0!">
                      <DatePicker size="large" className="w-full" />
                    </Form.Item>
                  </div>
                </div>
              </div>

              {/* Locais de metastização à distância */}
              <div className="mt-4">
                <p className="label">Locais de metastização à distância</p>
              </div>
              <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
              <div className="grid grid-cols-5 gap-x-12">
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
                <div>
                  <Form.Item name="distant_metastasis_sites" className="mb-0!">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Fígado">Fígado</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="col-span-2">
                  <Form.Item name="distant_metastasis_sites" className="mb-0!">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Sem metastização à distância">Sem metastização à distância</Radio>
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
                        <div className="mt-2">
                          <Form.Item name="distant_metastasis_sites_other" className="mb-0!">
                            <Input size="large" placeholder="Descreva o local da metastização à distância" />
                          </Form.Item>
                        </div>
                      )
                    }
                  </Form.Item>
                </div>
              </div>

              {/* Confirmação histológica (biópsia com evidência de neoplasia) */}
              <div className="flex items-center mt-4">
                <p className="label mr-1">Confirmação histológica</p>
                <p>(biópsia com evidência de neoplasia)</p>
              </div>
              <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
              <Form.Item name="histological_confirmation" className="mb-0!" layout="horizontal">
                <Radio.Group className="flex w-full!" size="large">
                  <Radio value="Sim">Sim</Radio>
                  <Radio value="Não">Não</Radio>
                </Radio.Group>
              </Form.Item>

              {/* PD-L1 CPS */}
              <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.histological_confirmation !== currentValues.histological_confirmation}>
                {({ getFieldValue }) =>
                  getFieldValue("histological_confirmation") === "Sim" && (
                    <>
                      <p className="font-bold">PD-L1 CPS</p>
                      <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                      <div className="grid grid-cols-5">
                        <div>
                          <Form.Item name="histological_confirmation_pdl1_cps" className="mb-0!">
                            <Radio.Group className="flex w-full!" size="large">
                              <Radio value="CPS <1">{"CPS <1"}</Radio>
                              <Radio value="CPS 1-19">CPS 1-19</Radio>
                              <Radio value="CPS >=20">{"CPS >=20"}</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item name="histological_confirmation_pdl1_cps" className="mb-0!">
                            <Radio.Group className="flex w-full!" size="large">
                              <Radio value="Desconhecido / não realizado">Desconhecido / não realizado</Radio>
                              <Radio value="Valor absoluto">Valor absoluto (se disponível):</Radio>
                            </Radio.Group>
                          </Form.Item>

                          <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.histological_confirmation_pdl1_cps !== currentValues.histological_confirmation_pdl1_cps}
                          >
                            {({ getFieldValue }) =>
                              getFieldValue("histological_confirmation_pdl1_cps") === "Valor absoluto" && (
                                <div className="mt-2">
                                  <Form.Item name="histological_confirmation_pdl1_cps_value" className="mb-0!">
                                    <Input size="large" placeholder="Valor absoluto (se disponível)" />
                                  </Form.Item>
                                </div>
                              )
                            }
                          </Form.Item>
                        </div>
                      </div>
                    </>
                  )
                }
              </Form.Item>

              {/* Confirmação histológica (biópsia com evidência de neoplasia) */}
              <div className="flex items-center mt-4">
                <p className="label mr-1">Data do diagnóstico da recidiva</p>
                <p>(considerar a data do exame de imagem)</p>
              </div>
              <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
              <div className="grid grid-cols-3">
                <Form.Item name="diagnostic_relapse_date" className="mb-0!" layout="horizontal">
                  <DatePicker size="large" className="w-full" />
                </Form.Item>
              </div>
            </div>
          ) : (
            getFieldValue("therapeutic_approach") === "Não passível de tratamento radical" && (
              /* Se diagnóstico em estadio avançado ou recidiva não passível de tratamento radical */
              <div className="col-span-3 flex flex-col w-full gap-x-12 gap-y-4">
                <div className="border-dashed border-2 border-[#8BD1C6] bg-[#C5E8E3] rounded-[10px] mt-4">
                  <div className="p-6 rounded-t-[10px]">
                    <p className="label">Não passível de tratamento radical</p>
                  </div>
                  <div className="pl-6 pr-6 pb-6 col-span-3">
                    <Form.Item name="therapeutic_approach_type" layout="horizontal" className="mb-0!">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="Recidiva com doença locorregional e metastização à distância">Recidiva com doença locorregional e metastização à distância</Radio>
                        <Radio value="Recidiva com metastização à distância apenas">Recidiva com metastização à distância apenas</Radio>
                        <Radio value="Recidiva locorreginal apenas">Recidiva locorreginal apenas</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>

                  <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.therapeutic_approach_type !== currentValues.therapeutic_approach_type}>
                    {({ getFieldValue }) =>
                      (getFieldValue("therapeutic_approach_type") === "Recidiva com doença locorregional e metastização à distância" ||
                        getFieldValue("therapeutic_approach_type") === "Recidiva com metastização à distância apenas") && (
                        <div className="p-6 border-t-2 border-dashed border-[#8BD1C6] bg-white rounded-[10px] grid grid-cols-3 gap-x-12 gap-y-4">
                          {/* Recidiva com doença locorregional e metastização à distância */}
                          <div className="col-span-3">
                            <p className="label">{getFieldValue("therapeutic_approach_type")}</p>
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
                              <Form.Item name="distant_metastasis_sites" className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="1">1</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                            <div className="col-span-4">
                              <Form.Item name="distant_metastasis_sites" className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="2">2</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                            <div>
                              <Form.Item name="distant_metastasis_sites" className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="3 ou mais">3 ou mais</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                          </div>

                          {/* Número total de lesões */}
                          <div className="col-span-3 mt-2">
                            <p className="font-bold">Número de órgãos envolvidos</p>
                          </div>
                          <div className="col-span-3">
                            <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                          </div>
                          <div className="col-span-3 grid grid-cols-5 gap-x-12">
                            <div>
                              <Form.Item name="distant_metastasis_sites" className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="1">1</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                            <div className="col-span-4">
                              <Form.Item name="distant_metastasis_sites" className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="2">2</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                            <div>
                              <Form.Item name="distant_metastasis_sites" className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="3">3</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                            <div className="col-span-4">
                              <Form.Item name="distant_metastasis_sites" className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="4">4</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                            <div>
                              <Form.Item name="distant_metastasis_sites" className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="5">5</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                            <div className="col-span-4">
                              <Form.Item name="distant_metastasis_sites" className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="6 ou mais">6 ou mais</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </Form.Item>
                </div>

                <PalliativeTreatment form={form} />
              </div>
            )
          )
        }
      </Form.Item>
    </div>
  );
}
