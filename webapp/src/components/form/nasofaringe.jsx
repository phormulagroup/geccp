import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";

import helpers from "../../utils/helpers";
import CharlsonIndex from "../charlsonIndex";
import Relapse from "./relapse";
import PalliativeTreatment from "./palliativeTreatment";

export default function Nasofaringe({ data, next, previous, form }) {
  const [isOpenCharlsonIndex, setIsOpenCharlsonIndex] = useState(false);

  function submitForm(values) {
    next(values);
  }

  return (
    <div className="cols-span-2 flex flex-col">
      <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
        <div className="col-span-4">
          <p className="label">Pesquisa de EBER na peça tumoral:</p>
        </div>
        <div className="col-span-4 flex flex-col">
          <Form.Item name="nasofaringe_eber" layout="horizontal" className="mb-0!">
            <Radio.Group
              size="large"
              options={[
                { value: "Positivo", label: "Positivo" },
                { value: "Negativo", label: "Negativo" },
                { value: "Desconhecido", label: "Desconhecido" },
              ]}
            />
          </Form.Item>
        </div>
      </div>

      <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
        <div className="col-span-4 mt-2">
          <p className="label">Pesquisa de HPV na peça tumoral:</p>
        </div>
        <div className="col-span-4 flex flex-col">
          <Form.Item name="nasofaringe_hpv" layout="horizontal" className="mb-0!">
            <Radio.Group
              size="large"
              options={[
                { value: "Positivo", label: "Positivo" },
                { value: "Negativo", label: "Negativo" },
                { value: "Desconhecido", label: "Desconhecido" },
              ]}
            />
          </Form.Item>
        </div>
      </div>
      <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
        <div className="col-span-4 mt-2">
          <p className="label">EBV plasmático baseline</p>
        </div>
        <div className="col-span-4 flex justify-start items-start gap-x-12">
          <Form.Item name="nasofaringe_hpv" layout="horizontal" className="mb-0!">
            <Radio.Group size="large" options={[{ value: "Desconhecido/não realizado", label: "Desconhecido/não realizado" }]} />
          </Form.Item>
          <div>
            <Form.Item name="nasofaringe_hpv" layout="horizontal" className="mb-0!">
              <Radio.Group size="large" options={[{ value: "Doseamento", label: "Doseamento" }]} />
            </Form.Item>

            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.nasofaringe_hpv !== currentValues.nasofaringe_hpv}>
              {({ getFieldValue }) =>
                getFieldValue("nasofaringe_hpv") === "Doseamento" && (
                  <Form.Item name="nasofaringe_hpv_dose" layout="horizontal" className="mb-0! mt-2!">
                    <InputNumber size="large" className="min-w-62.5!" />
                  </Form.Item>
                )
              }
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
        <div className="col-span-4 mt-2">
          <p className="label">Histologia</p>
        </div>
        <div className="col-span-4 flex justify-start items-start gap-x-12">
          <Form.Item name="nasofaringe_histology" layout="horizontal" className="mb-0!">
            <Radio.Group size="large" options={[{ value: "Carcinoma queratinizante", label: "Carcinoma queratinizante" }]} />
          </Form.Item>
          <Form.Item name="nasofaringe_histology" layout="horizontal" className="mb-0!">
            <Radio.Group size="large" options={[{ value: "Carcinoma espinocelular não queratinizante", label: "Carcinoma espinocelular não queratinizante" }]} />
          </Form.Item>
          <Form.Item name="nasofaringe_histology" layout="horizontal" className="mb-0!">
            <Radio.Group size="large" options={[{ value: "Carcinoma espinocelular basaloide", label: "Carcinoma espinocelular basaloide" }]} />
          </Form.Item>
          <div>
            <Form.Item name="nasofaringe_histology" layout="horizontal" className="mb-0!">
              <Radio.Group size="large" options={[{ value: "Outro", label: "Outro" }]} />
            </Form.Item>

            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.nasofaringe_histology !== currentValues.nasofaringe_histology}>
              {({ getFieldValue }) =>
                getFieldValue("nasofaringe_histology") === "Outro" && (
                  <Form.Item name="nasofaringe_histology_other_details" layout="horizontal" className="mb-0! mt-2!">
                    <Input size="large" className="min-w-62.5!" />
                  </Form.Item>
                )
              }
            </Form.Item>
          </div>
        </div>
      </div>

      {/* Data do diagnóstico do tumor da cabeça e pescoço */}
      <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
        <div className="col-span-4">
          <p className="label">Data do diagnóstico do tumor da cabeça e pescoço</p>
          <p className="text-[12px] mt-2 mb-2">(considerar a data de realização da primeira biópsia)</p>
        </div>
        <div className="flex flex-col">
          <Form.Item name="diagnosis_date" layout="horizontal" className="mb-0!" getValueProps={(value) => ({ value: value && dayjs(value) })}>
            <DatePicker size="large" className="w-full" />
          </Form.Item>
        </div>
      </div>

      {/* Tumores síncronos */}
      <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
        <div className="col-span-4">
          <p className="label">Tumores síncronos</p>
        </div>
        <div className="col-span-4">
          <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
        </div>
        <div className="col-span-4 flex flex-col">
          <Form.Item name="synchronous_tumors" layout="horizontal" className="mb-0!">
            <Radio.Group
              size="large"
              options={[
                { value: "Sim", label: "Sim" },
                { value: "Não", label: "Não" },
              ]}
            />
          </Form.Item>
        </div>

        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.synchronous_tumors !== currentValues.synchronous_tumors}>
          {({ getFieldValue }) =>
            getFieldValue("synchronous_tumors") === "Sim" && (
              <>
                <div>
                  <p className="font-bold pb-2">Localização</p>
                  <div className="flex flex-col">
                    <Form.Item name="synchronous_tumors_location" layout="horizontal" className="mb-0!">
                      <Input placeholder="Localização" />
                    </Form.Item>
                  </div>
                </div>
                <div>
                  <p className="font-bold pb-2">Data do diagnóstico</p>
                  <div className="flex flex-col">
                    <Form.Item name="synchronous_tumors_date" layout="horizontal" className="mb-0!" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                      <DatePicker size="large" className="w-full" />
                    </Form.Item>
                  </div>
                </div>
              </>
            )
          }
        </Form.Item>
      </div>

      <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-3 gap-x-12 gap-y-4 mt-6">
        <div className="col-span-4 mt-4!">
          <p className="label">Referenciação a Cuidados Paliativos</p>
        </div>
        <div className="col-span-4">
          <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
        </div>
        <div className="col-span-4">
          <Form.Item name={"palliative_care_referral"} layout="horizontal">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="Sim">Sim</Radio>
              <Radio value="Não">Não</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.palliative_care_referral !== currentValues.palliative_care_referral}>
            {({ getFieldValue }) =>
              getFieldValue("palliative_care_referral") === "Sim" && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="pb-2">Data da referenciação:</p>
                    <Form.Item name={"palliative_care_referral_date"} layout="horizontal" className="mb-0!" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                      <DatePicker className="w-full" />
                    </Form.Item>
                  </div>
                </div>
              )
            }
          </Form.Item>
        </div>
      </div>

      <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-3 gap-x-12 gap-y-4 mt-6">
        <div className="col-span-3">
          <p className="label">Estadio ao diagnóstico do tumor da cabeça e pescoço:</p>
        </div>
        <div className="col-span-3 flex flex-col">
          <Form.Item name="stage_diagnosis" layout="horizontal" className="mb-0!">
            <Radio.Group size="large" options={[{ value: "Estadio clínico ao diagnóstico", label: "Estadio clínico ao diagnóstico" }]} />
          </Form.Item>
        </div>

        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.stage_diagnosis !== currentValues.stage_diagnosis}>
          {({ getFieldValue }) =>
            getFieldValue("stage_diagnosis") && (
              <div className="col-span-3 grid grid-cols-3 gap-x-12 gap-y-4">
                <div className="col-span-3">
                  <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
                </div>
                {getFieldValue("stage_diagnosis") === "Estadio clínico ao diagnóstico" ? (
                  <>
                    <div className="flex flex-col w-full">
                      <div className="flex items-center">
                        <Form.Item name="stage_clinical_diagnosis_type" layout="vertical" className="min-w-30! mb-0!">
                          <Radio.Group className="w-full!" size="large">
                            <Radio value="cT">cT</Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item name="stage_clinical_diagnosis_type_cT_value" layout="vertical" className="w-full! mb-0!">
                          <InputNumber size="large" className="w-full!" />
                        </Form.Item>
                      </div>
                      <div className="flex items-center mt-3">
                        <Form.Item name="stage_clinical_diagnosis_type" layout="vertical" className="min-w-30! mb-0!">
                          <Radio.Group className="w-full!" size="large">
                            <Radio value="cN">cN</Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item name="stage_clinical_diagnosis_type_cN_value" layout="vertical" className="w-full! mb-0!">
                          <InputNumber size="large" className="w-full!" />
                        </Form.Item>
                      </div>
                      <div className="flex items-center mt-3">
                        <Form.Item name="stage_clinical_diagnosis_type" layout="vertical" className="min-w-30! mb-0!">
                          <Radio.Group className="w-full!" size="large">
                            <Radio value="cM">cM</Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item name="stage_clinical_diagnosis_type_cM_value" layout="vertical" className="w-full! mb-0!">
                          <InputNumber size="large" className="w-full!" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-span-3 mt-4">
                      <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4">
                        <div className="col-span-4 flex flex-col">
                          <Form.Item name="stage_diagnosis_status" layout="horizontal" className="mb-0!">
                            <Radio.Group
                              size="large"
                              options={[
                                { value: "Diagnóstico em estadio precoce", label: "Diagnóstico em estadio precoce" },
                                { value: "Diagnóstico em estadio avançado", label: "Diagnóstico em estadio avançado" },
                              ]}
                            />
                          </Form.Item>
                        </div>
                        <Form.Item noStyle shouldUpdate={(prev, curr) => prev.stage_diagnosis_status !== curr.stage_diagnosis_status}>
                          {({ getFieldValue }) =>
                            getFieldValue("stage_diagnosis_status") === "Diagnóstico em estadio precoce" ? (
                              <>
                                <div className="col-span-4">
                                  <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
                                  <div className="border-dashed border-2 border-[#8BD1C6] bg-[#C5E8E3] p-6 rounded-[10px] mt-[24px]">
                                    <p className="label">Tratamento da doença localizada / localmente avançada</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
                                      <div>
                                        <div className="pl-4 ml-0.5">
                                          <Form.Item name="treatment_localized_disease">
                                            <Radio.Group className="w-full!">
                                              <Radio value="QT de indução seguida de QRT radical">QT de indução seguida de QRT radical</Radio>
                                              <Radio value="QRT radical seguida de QT adjuvante">QRT radical seguida de QT adjuvante</Radio>
                                              <Radio value="RT radical">RT radical</Radio>
                                              <Radio value="Outro">Outro</Radio>
                                            </Radio.Group>
                                          </Form.Item>

                                        <Form.Item noStyle shouldUpdate={(prev, curr) => prev.treatment_localized_disease !== curr.treatment_localized_disease}>
                                          {({ getFieldValue }) =>
                                            getFieldValue("treatment_localized_disease") === "Outro" && (
                                              <Form.Item name="treatment_localized_disease_specified" className="w-full">
                                                <Input size="large" className="w-full" placeholder="Qual?" />
                                              </Form.Item>
                                            )
                                          }
                                        </Form.Item>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4">
                                      <p className="font-bold">Data de término do tratamento radical da doença localizada / localmente avançada</p>
                                      <Form.Item name="treatment_end_date" className="mt-4! mb-0!" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                                        <DatePicker size="large" className="w-full" format="DD/MM/YYYY" placeholder="Selecioe a data de término" />
                                      </Form.Item>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-span-4 mt-[24px]!">
                                  <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] ">
                                    <p className="label">Recidiva</p>
                                    <Divider className="mt-2! mb-2! h-1 bg-[#17A38D]" />

                                    <Form.Item name="relapse" layout="horizontal" className="mb-0!">
                                      <Radio.Group className="flex w-full!" size="large">
                                        <Radio value="Sim">Sim</Radio>
                                        <Radio value="Não">Não</Radio>
                                      </Radio.Group>
                                    </Form.Item>
                                    <Form.Item noStyle shouldUpdate={(prev, curr) => prev.relapse !== curr.relapse}>
                                      {({ getFieldValue }) => getFieldValue("relapse") === "Sim" && <Relapse form={form} />}
                                    </Form.Item>
                                  </div>
                                </div>
                              </>
                            ) : (
                              getFieldValue("stage_diagnosis_status") === "Diagnóstico em estadio avançado" && (
                                <>
                                  <div className="col-span-4">
                                    <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
                                  </div>
                                  <div className="col-span-4 flex flex-col w-full gap-x-12 gap-y-4">
                                    <div className="p-6 border-2 border-dashed border-[#8BD1C6] rounded-[10px] grid grid-cols-3 gap-x-12 gap-y-4">
                                      {/* Recidiva com doença locorregional e metastização à distância */}

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

                                          <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, currentValues) => prevValues.distant_metastasis_sites !== currentValues.distant_metastasis_sites}
                                          >
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

                                      <div className="col-span-4">
                                        <PalliativeTreatment form={form} />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            )
                          }
                        </Form.Item>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            )
          }
        </Form.Item>
      </div>
    </div>
  );
}
