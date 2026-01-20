import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";

import helpers from "../../utils/helpers";
import CharlsonIndex from "../charlsonIndex";
import PalliativeTreatment from "./palliativeTreatment";
import Relapse from "./relapse";

export default function DiseaseCharacterization({ data, next, previous }) {
  const [isOpenCharlsonIndex, setIsOpenCharlsonIndex] = useState(false);

  const [form] = Form.useForm();

  function submitForm(values) {
    console.log(values);
    next();
  }

  return (
    <div>
      <Form form={form} onFinish={submitForm} layout="vertical">
        {/* Localização do tumor primário */}
        <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-2 gap-x-12 gap-y-4 mt-6">
          <div className="col-span-2">
            <p className="label">Localização do tumor primário</p>
          </div>
          <div className="col-span-2">
            <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
          </div>
          <div className="col-span-2 flex flex-col">
            <Form.Item name="tumor_location" layout="horizontal" className="mb-0!">
              <Radio.Group
                size="large"
                defaultValue={1}
                options={[
                  { value: "Cavidade oral", label: "Cavidade oral" },
                  { value: "Orofaringe", label: "Orofaringe" },
                  { value: "Laringe", label: "Laringe" },
                  { value: "Hipofaringe", label: "Hipofaringe" },
                  { value: "Nasofaringe", label: "Nasofaringe" },
                  { value: "Primário oculto da cabeça e pescoço", label: "Primário oculto da cabeça e pescoço" },
                  { value: "Outro", label: "Outro" },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        {/* Histologia */}
        <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
          <div className="col-span-4">
            <p className="label">Histologia</p>
          </div>
          <div className="flex flex-col">
            <Form.Item name="histology" layout="horizontal" className="mb-0!">
              <Select
                size="large"
                placeholder="Selecionar a histologia"
                options={[
                  { value: "Carcinoma epidermoide", label: "Carcinoma epidermoide" },
                  { value: "Outro", label: "Outro" },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        {/* Tumores síncronos */}
        <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
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
                defaultValue={1}
                options={[
                  { value: "Sim", label: "Sim" },
                  { value: "Não", label: "Não" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="col-span-4">
            <p className="label">Localização</p>
          </div>
          <div className="flex flex-col">
            <Form.Item name="location" layout="horizontal" className="mb-0!">
              <Select
                size="large"
                placeholder="Selecionar a histologia"
                options={[
                  { value: "Carcinoma epidermoide", label: "Carcinoma epidermoide" },
                  { value: "Outro", label: "Outro" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col col-span-3">
            <Form.Item name="location_specify" layout="horizontal" className="mb-0!">
              <Radio.Group
                size="large"
                defaultValue={1}
                options={[
                  { value: "Cavidade oral", label: "Cavidade oral" },
                  { value: "Orofaringe", label: "Orofaringe" },
                  { value: "Laringe", label: "Laringe" },
                  { value: "Hipofaringe", label: "Hipofaringe" },
                  { value: "Nasofaringe", label: "Nasofaringe" },
                  { value: "Primário oculto da cabeça e pescoço", label: "Primário oculto da cabeça e pescoço" },
                  { value: "Outro", label: "Outro" },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        {/* Data do diagnóstico do tumor da cabeça e pescoço */}
        <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
          <div className="col-span-4">
            <p className="label">Data do diagnóstico do tumor da cabeça e pescoço</p>
            <p className="text-[12px] mt-2 mb-2">(considerar a data de realização da primeira biópsia)</p>
          </div>
          <div className="flex flex-col">
            <Form.Item name="diagnosis_date" layout="horizontal" className="mb-0!">
              <DatePicker size="large" className="w-full" />
            </Form.Item>
          </div>
        </div>

        {/* Traqueostomia */}
        <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
          <div className="col-span-4">
            <p className="label">Traqueostomia</p>
          </div>
          <div className="col-span-4 flex flex-col">
            <Form.Item name="tracheostomy" layout="horizontal" className="mb-0!">
              <Radio.Group
                size="large"
                defaultValue={1}
                options={[
                  { value: "Sim", label: "Sim" },
                  { value: "Não", label: "Não" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="col-span-4">
            <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
          </div>
          <div className="col-span-4 flex flex-col">
            <Form.Item name="tracheostomy_type" layout="horizontal" className="mb-0!">
              <Radio.Group
                size="large"
                defaultValue={1}
                options={[
                  { value: "Urgente", label: "Urgente" },
                  { value: "Programada", label: "Programada" },
                  { value: "Desconhecido", label: "Desconhecido" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col">
            <p className="mb-2">Data da colocação:</p>
            <Form.Item name="tracheostomy_placement_date" layout="horizontal">
              <DatePicker size="large" className="w-full" placeholder="Selecione data da colocação" />
            </Form.Item>
            <p className="mb-2">Data da remoção:</p>
            <Form.Item name="tracheostomy_removal_date" layout="horizontal">
              <DatePicker size="large" className="w-full" placeholder="Selecione data da remoção" />
            </Form.Item>
            <p>Em curso</p>
            <Form.Item name="tracheostomy_ongoing" layout="horizontal" className="mb-0!" valuePropName="checked">
              <Switch size="large" checkedChildren="Sim" unCheckedChildren="Não" />
            </Form.Item>
          </div>
        </div>

        {/* Sistema de alimentação entérica (PEG / SNG) */}
        <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
          <div className="col-span-4">
            <p className="label">Sistema de alimentação entérica (PEG / SNG)</p>
          </div>
          <div className="col-span-4 flex flex-col">
            <Form.Item name="enteral_feeding_system" layout="horizontal" className="mb-0!">
              <Radio.Group
                size="large"
                defaultValue={1}
                options={[
                  { value: "Sim", label: "Sim" },
                  { value: "Não", label: "Não" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="col-span-4">
            <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
          </div>
          <div className="col-span-4 flex flex-col">
            <Form.Item name="tracheostomy_type" layout="horizontal" className="mb-0!">
              <Radio.Group
                size="large"
                defaultValue={1}
                options={[
                  { value: "Profilática", label: "Profilática" },
                  { value: "Reativa", label: "Reativa" },
                  { value: "Desconhecido", label: "Desconhecido" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col">
            <p className="mb-2">Data da colocação:</p>
            <Form.Item name="tracheostomy_placement_date" layout="horizontal">
              <DatePicker size="large" className="w-full" placeholder="Selecione data da colocação" />
            </Form.Item>
            <p className="mb-2">Data da remoção:</p>
            <Form.Item name="tracheostomy_removal_date" layout="horizontal">
              <DatePicker size="large" className="w-full" placeholder="Selecione data da remoção" />
            </Form.Item>
            <p>Em curso</p>
            <Form.Item name="tracheostomy_ongoing" layout="horizontal" className="mb-0!" valuePropName="checked">
              <Switch size="large" checkedChildren="Sim" unCheckedChildren="Não" />
            </Form.Item>
          </div>
        </div>

        {/* Estadio ao diagnóstico do tumor da cabeça e pescoço: */}
        <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-3 gap-x-12 gap-y-4 mt-6">
          <div className="col-span-3">
            <p className="label">Estadio ao diagnóstico do tumor da cabeça e pescoço:</p>
          </div>
          <div className="col-span-3 flex flex-col">
            <Form.Item name="stage_diagnosis" layout="horizontal" className="mb-0!">
              <Radio.Group
                size="large"
                defaultValue={1}
                options={[
                  { value: "Estadio clínico ao diagnóstico", label: "Estadio clínico ao diagnóstico" },
                  { value: "Estadio patológico ao diagnóstico", label: "Estadio patológico ao diagnóstico" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="col-span-3">
            <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
          </div>
          <div className="flex flex-col">
            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.stage_diagnosis !== currentValues.stage_diagnosis}>
              {({ getFieldValue }) =>
                getFieldValue("stage_diagnosis") === "Estadio clínico ao diagnóstico" ? (
                  <div className="flex w-full">
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
                  </div>
                ) : getFieldValue("stage_diagnosis") === "Estadio patológico ao diagnóstico" ? (
                  <div className="flex flex-col w-full">
                    <div className="flex items-center">
                      <Form.Item name="stage_diagnosis_type" layout="vertical" className="min-w-30! mb-0!">
                        <Radio.Group className="w-full!" size="large">
                          <Radio value="(y)PT">(y)PT</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item name="stage_diagnosis_(y)pT" layout="vertical" className="w-full! mb-0!">
                        <InputNumber size="large" className="w-full!" />
                      </Form.Item>
                    </div>
                    <div className="flex items-center mt-3">
                      <Form.Item name="stage_diagnosis_type" layout="vertical" className="min-w-30! mb-0!">
                        <Radio.Group className="w-full!" size="large">
                          <Radio value="(y)pN">(y)pN</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item name="stage_diagnosis_(y)pN_value" layout="vertical" className="w-full! mb-0!">
                        <InputNumber size="large" className="w-full!" />
                      </Form.Item>
                    </div>
                    <div className="flex items-center mt-3">
                      <Form.Item name="stage_diagnosis_type" layout="vertical" className="min-w-30! mb-0!">
                        <Radio.Group className="w-full!" size="large">
                          <Radio value="Cirurgia não realizada">Cirurgia não realizada</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </div>
                ) : null
              }
            </Form.Item>
          </div>
          <div className="col-span-3 mt-4">
            <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4">
              <div className="col-span-4 flex flex-col">
                <Form.Item name="stage_diagnosis_status" layout="horizontal" className="mb-0!">
                  <Radio.Group
                    size="large"
                    defaultValue={1}
                    options={[
                      { value: "Diagnóstico em estadio precoce", label: "Diagnóstico em estadio precoce" },
                      { value: "Diagnóstico em estadio avançado", label: "Diagnóstico em estadio avançado" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="col-span-4">
                <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
              </div>
              <div className="flex flex-col">
                <Form.Item name="stage_diagnosis_early">
                  <Select
                    size="large"
                    placeholder="Se diagnóstico em estadio precoce"
                    options={[
                      { value: "Tratamento da doença localizada / localmente avançada", label: "Tratamento da doença localizada / localmente avançada" },
                      { value: "Recidiva", label: "Recidiva" },
                    ]}
                  />
                </Form.Item>
              </div>
              {/* Tratamento da doença localizada / localmente avançada */}
              <Form.Item noStyle shouldUpdate={(prev, curr) => prev.stage_diagnosis_early !== curr.stage_diagnosis_early}>
                {({ getFieldValue }) =>
                  getFieldValue("stage_diagnosis_early") === "Tratamento da doença localizada / localmente avançada" ? (
                    <div className="col-span-3">
                      <div className="border-dashed border-2 border-[#8BD1C6] bg-[#C5E8E3] p-6 rounded-[10px]">
                        <p className="label">Tratamento da doença localizada / localmente avançada</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
                          <div>
                            <Form.Item noStyle shouldUpdate={(prev, curr) => prev.treatment_localized_disease !== curr.treatment_localized_disease}>
                              {({ getFieldValue }) => (
                                <div
                                  className={`box-border border-2 border-dashed ${
                                    getFieldValue("treatment_localized_disease") === "Cirurgia seguida de RT adjuvante" ? "border-[#8BD1C6] p-4 mb-4" : "border-[#C5E8E3] pl-4 pt-4"
                                  } rounded-[10px]`}
                                >
                                  <Form.Item name="treatment_localized_disease" className="mb-0!">
                                    <Radio.Group className="w-full!" size="large">
                                      <Radio value="Cirurgia seguida de RT adjuvante">Cirurgia seguida de RT adjuvante</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                  {getFieldValue("treatment_localized_disease") === "Cirurgia seguida de RT adjuvante" ? (
                                    <div className="pl-4 mt-6">
                                      <p className="font-bold mb-3">Pembrolizumab peri-operatório:</p>
                                      <Form.Item name="pembrolizumab" layout="horizontal" className="mb-0!">
                                        <Radio.Group className="flex w-full!" size="large">
                                          <Radio value="Sim">Sim</Radio>
                                          <Radio value="Não">Não</Radio>
                                        </Radio.Group>
                                      </Form.Item>
                                    </div>
                                  ) : null}
                                </div>
                              )}
                            </Form.Item>
                            <div className="pl-4 ml-0.5">
                              <Form.Item name="treatment_localized_disease">
                                <Radio.Group className="w-full!">
                                  <Radio value="Cirurgia seguida de QRT adjuvante">Cirurgia seguida de QRT adjuvante</Radio>
                                  <Radio value="Cirurgia apenas">Cirurgia apenas</Radio>
                                  <Radio value="QRT radical">QRT radical</Radio>
                                  <Radio value="QT indução seguida de RT">QT indução seguida de RT</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                          </div>
                          <div className="pt-4">
                            <Form.Item name="treatment_localized_disease" className="mb-0!">
                              <Radio.Group>
                                <Radio value="QT indução seguida de QRT">QT indução seguida de QRT</Radio>
                                <Radio value="QT indução seguida de cirurgia">QT indução seguida de cirurgia</Radio>

                                {/* ENSAIO CLÍNICO */}
                                <Radio value="Ensaio clínico">Ensaio clínico</Radio>
                              </Radio.Group>
                            </Form.Item>

                            <Form.Item noStyle shouldUpdate={(prev, curr) => prev.treatment_localized_disease !== curr.treatment_localized_disease}>
                              {({ getFieldValue }) =>
                                getFieldValue("treatment_localized_disease") === "Ensaio clínico" && (
                                  <Form.Item name="clinical_trial_name" className="w-full pl-7.5!">
                                    <Input size="large" className="w-full" placeholder="Qual?" />
                                  </Form.Item>
                                )
                              }
                            </Form.Item>

                            <Form.Item name="treatment_localized_disease" className="mb-3!">
                              <Radio.Group>
                                <Radio value="Tratamento paliativo">Tratamento paliativo</Radio>
                                <Radio value="Outro">Outro</Radio>
                              </Radio.Group>
                            </Form.Item>

                            <Form.Item noStyle shouldUpdate={(prev, curr) => prev.treatment_localized_disease !== curr.treatment_localized_disease}>
                              {({ getFieldValue }) =>
                                getFieldValue("treatment_localized_disease") === "Outro" && (
                                  <Form.Item name="treatment_localized_disease_other" className="w-full pl-7.5!">
                                    <Input size="large" className="w-full" placeholder="Qual?" />
                                  </Form.Item>
                                )
                              }
                            </Form.Item>
                          </div>
                        </div>

                        <div className="border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4">
                          <p className="font-bold">Data de término do tratamento radical da doença localizada / localmente avançada</p>
                          <Form.Item name="treatment_end_date" className="mt-4! mb-0!">
                            <DatePicker size="large" className="w-full" format="DD/MM/YYYY" placeholder="Selecioe a data de término" />
                          </Form.Item>
                        </div>
                      </div>
                      <Form.Item noStyle shouldUpdate={(prev, curr) => prev.treatment_localized_disease !== curr.treatment_localized_disease}>
                        {({ getFieldValue }) => getFieldValue("treatment_localized_disease") === "Tratamento paliativo" && <PalliativeTreatment form={form} />}
                      </Form.Item>
                    </div>
                  ) : (
                    getFieldValue("stage_diagnosis_early") === "Recidiva" && (
                      <div className="col-span-4">
                        <Relapse form={form} />
                      </div>
                    )
                  )
                }
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
