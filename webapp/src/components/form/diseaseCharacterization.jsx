import { DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";

import Relapse from "./relapse";
import PalliativeTreatment from "./palliativeTreatment";
import Nasofaringe from "./nasofaringe";
import AdvancedDiseaseAssessment from "./shared/advancedDiseaseAssessment";
import SurgeryTreatmentTree from "./shared/surgeryTreatmentTree";

export default function DiseaseCharacterization({ form }) {
  return (
    <div>
      {/* Localização do tumor primário */}
      <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-2 gap-x-12 gap-y-4 mt-6">
        <div className="col-span-2">
          <p className="label">Localização do tumor primário</p>
        </div>
        <div className="col-span-2">
          <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
        </div>
        <div className="col-span-2 flex gap-x-12">
          <div>
            <Form.Item name="tumor_location" layout="horizontal" className="mb-0!">
              <Radio.Group size="large" options={[{ value: "Cavidade oral", label: "Cavidade oral" }]} />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="tumor_location" layout="horizontal" className="mb-0!">
              <Radio.Group size="large" options={[{ value: "Orofaringe", label: "Orofaringe" }]} />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="tumor_location" layout="horizontal" className="mb-0!">
              <Radio.Group size="large" options={[{ value: "Laringe", label: "Laringe" }]} />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="tumor_location" layout="horizontal" className="mb-0!">
              <Radio.Group size="large" options={[{ value: "Hipofaringe", label: "Hipofaringe" }]} />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="tumor_location" layout="horizontal" className="mb-0!">
              <Radio.Group size="large" options={[{ value: "Nasofaringe", label: "Nasofaringe" }]} />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="tumor_location" layout="horizontal" className="mb-0!">
              <Radio.Group size="large" options={[{ value: "Primário oculto da cabeça e pescoço", label: "Primário oculto da cabeça e pescoço" }]} />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="tumor_location" layout="horizontal" className="mb-0!">
              <Radio.Group size="large" options={[{ value: "Outro", label: "Outro" }]} />
            </Form.Item>

            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.tumor_location !== currentValues.tumor_location}>
              {({ getFieldValue }) =>
                getFieldValue("tumor_location") === "Outro" && (
                  <div className="mt-2 w-full">
                    <Form.Item name="tumor_location_other" layout="horizontal" className="mb-0!">
                      <Input size="large" placeholder="Especifique" className="min-w-75!" />
                    </Form.Item>
                  </div>
                )
              }
            </Form.Item>
          </div>
        </div>

        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.tumor_location !== currentValues.tumor_location}>
          {({ getFieldValue }) => (
            <>
              {getFieldValue("tumor_location") === "Cavidade oral" && (
                <div className=" col-span-2 p-6 bg-[#C5E8E3] border-[2px] border-dashed border-[#8BD1C6] rounded-[5px] flex gap-x-12">
                  <div>
                    <Form.Item name="oral_cavity_details" layout="horizontal" className="mb-0!">
                      <Radio.Group size="large" options={[{ value: "HPV +", label: "HPV +" }]} />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="oral_cavity_details" layout="horizontal" className="mb-0!">
                      <Radio.Group size="large" options={[{ value: "HPV -", label: "HPV -" }]} />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="oral_cavity_details" layout="horizontal" className="mb-0!">
                      <Radio.Group size="large" options={[{ value: "Desconhecido / não realizado", label: "Desconhecido / não realizado" }]} />
                    </Form.Item>
                  </div>
                </div>
              )}
              {getFieldValue("tumor_location") === "Orofaringe" && (
                <div className=" col-span-2 p-6 bg-[#C5E8E3] border-[2px] border-dashed border-[#8BD1C6] rounded-[5px] flex gap-x-12">
                  <div>
                    <Form.Item name="orofaringe_details" layout="horizontal" className="mb-0!">
                      <Radio.Group size="large" options={[{ value: "HPV +", label: "HPV +" }]} />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="orofaringe_details" layout="horizontal" className="mb-0!">
                      <Radio.Group size="large" options={[{ value: "HPV -", label: "HPV -" }]} />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="orofaringe_details" layout="horizontal" className="mb-0!">
                      <Radio.Group size="large" options={[{ value: "Desconhecido / não realizado", label: "Desconhecido / não realizado" }]} />
                    </Form.Item>
                  </div>
                </div>
              )}
              {getFieldValue("tumor_location") === "Primário oculto da cabeça e pescoço" && (
                <div className=" col-span-2 p-6 bg-[#C5E8E3] border-[2px] border-dashed border-[#8BD1C6] rounded-[5px] flex gap-x-12">
                  <div>
                    <Form.Item name="hidden_primary_head_neck" layout="horizontal" className="mb-0!">
                      <Radio.Group size="large" options={[{ value: "EBV +", label: "EBV +" }]} />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="hidden_primary_head_neck" layout="horizontal" className="mb-0!">
                      <Radio.Group size="large" options={[{ value: "HPV +", label: "HPV +" }]} />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="hidden_primary_head_neck" layout="horizontal" className="mb-0!">
                      <Radio.Group size="large" options={[{ value: "EBV - / HPV -", label: "EBV - / HPV -" }]} />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="hidden_primary_head_neck" layout="horizontal" className="mb-0!">
                      <Radio.Group size="large" options={[{ value: "EBV e HPV desconhecido", label: "EBV e HPV desconhecido" }]} />
                    </Form.Item>
                  </div>
                </div>
              )}
            </>
          )}
        </Form.Item>
      </div>

      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.tumor_location !== currentValues.tumor_location}>
        {({ getFieldValue }) =>
          getFieldValue("tumor_location") === "Nasofaringe" ? (
            <Nasofaringe form={form} />
          ) : getFieldValue("tumor_location") ? (
            <>
              {/* Histologia */}
              <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
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
                  <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.histology !== currentValues.histology}>
                    {({ getFieldValue }) =>
                      getFieldValue("histology") === "Outro" && (
                        <Form.Item name="histology_specified" layout="horizontal" className="mb-0! mt-4!">
                          <Input size="large" placeholder="Especifique" />
                        </Form.Item>
                      )
                    }
                  </Form.Item>
                </div>
              </div>

              {/* Diagnóstico em programa organizado de rastreio / diagnóstico precoce */}
              <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
                <div className="col-span-4">
                  <p className="label">Diagnóstico em programa organizado de rastreio / diagnóstico precoce</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
                </div>
                <div className="col-span-4 flex flex-col">
                  <Form.Item name="screening_program_diagnosis" layout="horizontal" className="mb-0!">
                    <Radio.Group
                      size="large"
                      options={[
                        { value: "Não", label: "Não" },
                        { value: "Sim", label: "Sim" },
                      ]}
                    />
                  </Form.Item>
                </div>
                <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.screening_program_diagnosis !== currentValues.screening_program_diagnosis}>
                  {({ getFieldValue }) =>
                    getFieldValue("screening_program_diagnosis") === "Sim" && (
                      <div className="col-span-4">
                        <Form.Item name="screening_program_diagnosis_specified" layout="horizontal" className="mb-0!">
                          <Input size="large" placeholder="Especifique" />
                        </Form.Item>
                      </div>
                    )
                  }
                </Form.Item>
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
                        <div className="col-span-4">
                          <p className="label">Localização</p>
                        </div>
                        <div className="flex flex-col">
                          <Form.Item name="location" layout="horizontal" className="mb-0!">
                            <Select
                              size="large"
                              placeholder="Selecionar a localização"
                              options={[
                                { value: "Cabeça e Pescoço", label: "Cabeça e Pescoço" },
                                { value: "Outro", label: "Outro" },
                              ]}
                            />
                          </Form.Item>
                        </div>

                        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.location !== currentValues.location}>
                          {({ getFieldValue }) =>
                            getFieldValue("location") === "Cabeça e Pescoço" ? (
                              <div className="flex flex-col col-span-3">
                                <div className="col-span-2 flex gap-x-12 flex-wrap">
                                  <div>
                                    <Form.Item name="synchronous_tumors_location" layout="horizontal" className="mb-0!">
                                      <Radio.Group size="large" options={[{ value: "Cavidade oral", label: "Cavidade oral" }]} />
                                    </Form.Item>
                                  </div>
                                  <div>
                                    <Form.Item name="synchronous_tumors_location" layout="horizontal" className="mb-0!">
                                      <Radio.Group size="large" options={[{ value: "Orofaringe", label: "Orofaringe" }]} />
                                    </Form.Item>
                                  </div>
                                  <div>
                                    <Form.Item name="synchronous_tumors_location" layout="horizontal" className="mb-0!">
                                      <Radio.Group size="large" options={[{ value: "Laringe", label: "Laringe" }]} />
                                    </Form.Item>
                                  </div>
                                  <div>
                                    <Form.Item name="synchronous_tumors_location" layout="horizontal" className="mb-0!">
                                      <Radio.Group size="large" options={[{ value: "Hipofaringe", label: "Hipofaringe" }]} />
                                    </Form.Item>
                                  </div>
                                  <div>
                                    <Form.Item name="synchronous_tumors_location" layout="horizontal" className="mb-0!">
                                      <Radio.Group size="large" options={[{ value: "Nasofaringe", label: "Nasofaringe" }]} />
                                    </Form.Item>
                                  </div>
                                  <div>
                                    <Form.Item name="synchronous_tumors_location" layout="horizontal" className="mb-0!">
                                      <Radio.Group size="large" options={[{ value: "Outro", label: "Outro" }]} />
                                    </Form.Item>

                                    <Form.Item
                                      noStyle
                                      shouldUpdate={(prevValues, currentValues) => prevValues.synchronous_tumors_location !== currentValues.synchronous_tumors_location}
                                    >
                                      {({ getFieldValue }) =>
                                        getFieldValue("synchronous_tumors_location") === "Outro" && (
                                          <div className="mt-2 w-full">
                                            <Form.Item name="synchronous_tumors_location_other" layout="horizontal" className="mb-0!">
                                              <Input size="large" placeholder="Especifique" className="min-w-75!" />
                                            </Form.Item>
                                          </div>
                                        )
                                      }
                                    </Form.Item>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              getFieldValue("location") === "Outro" && (
                                <div className="w-full">
                                  <Form.Item name="synchronous_tumors_location_other" layout="horizontal" className="mb-0!">
                                    <Input size="large" placeholder="Especifique" className="min-w-75!" />
                                  </Form.Item>
                                </div>
                              )
                            )
                          }
                        </Form.Item>
                      </>
                    )
                  }
                </Form.Item>
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

              {/* Traqueostomia */}
              <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
                <div className="col-span-4">
                  <p className="label">Traqueostomia</p>
                </div>
                <div className="col-span-4 flex flex-col">
                  <Form.Item name="tracheostomy" layout="horizontal" className="mb-0!">
                    <Radio.Group
                      size="large"
                      options={[
                        { value: "Sim", label: "Sim" },
                        { value: "Não", label: "Não" },
                      ]}
                    />
                  </Form.Item>
                </div>

                <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.tracheostomy !== currentValues.tracheostomy}>
                  {({ getFieldValue }) =>
                    getFieldValue("tracheostomy") === "Sim" ? (
                      <>
                        <div className="col-span-4">
                          <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
                        </div>
                        <div className="col-span-4 flex flex-col">
                          <Form.Item name="tracheostomy_type" layout="horizontal" className="mb-0!">
                            <Radio.Group
                              size="large"
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
                          <Form.Item name="tracheostomy_placement_date" layout="horizontal" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                            <DatePicker size="large" className="w-full" placeholder="Selecione data da colocação" />
                          </Form.Item>
                          <p className="mb-2">Data da remoção:</p>
                          <Form.Item name="tracheostomy_removal_date" layout="horizontal" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                            <DatePicker size="large" className="w-full" placeholder="Selecione data da remoção" />
                          </Form.Item>
                          <p>Em curso</p>
                          <Form.Item name="tracheostomy_ongoing" layout="horizontal" className="mb-0!" valuePropName="checked">
                            <Switch size="large" checkedChildren="Sim" unCheckedChildren="Não" />
                          </Form.Item>
                        </div>
                      </>
                    ) : (
                      getFieldValue("tracheostomy") === "Não" && (
                        <>
                          <div className="col-span-4">
                            <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
                          </div>
                          <div className="flex flex-col">
                            <p className="mb-2">Data da remoção:</p>
                            <Form.Item name="tracheostomy_removal_date" layout="horizontal" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                              <DatePicker size="large" className="w-full" placeholder="Selecione data da remoção" />
                            </Form.Item>
                          </div>
                        </>
                      )
                    )
                  }
                </Form.Item>
              </div>

              {/* Sistema de alimentação entérica (PEG / SNG) */}
              <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
                <div className="col-span-4">
                  <p className="label">Sistema de alimentação entérica (PEG / SNG)</p>
                </div>
                <div className="col-span-4 flex flex-col">
                  <Form.Item name="enteral_feeding_system" layout="horizontal" className="mb-0!">
                    <Radio.Group
                      size="large"
                      options={[
                        { value: "Sim", label: "Sim" },
                        { value: "Não", label: "Não" },
                      ]}
                    />
                  </Form.Item>
                </div>

                <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.enteral_feeding_system !== currentValues.enteral_feeding_system}>
                  {({ getFieldValue }) =>
                    getFieldValue("enteral_feeding_system") === "Sim" ? (
                      <>
                        <div className="col-span-4">
                          <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
                        </div>
                        <div className="col-span-4 flex flex-col">
                          <p className="mb-2">Tipo</p>
                          <Form.Item name="enteral_feeding_system_kind" layout="horizontal" className="mb-0!">
                            <Radio.Group
                              size="large"
                              options={[
                                { value: "PEG", label: "PEG" },
                                { value: "SNG", label: "SNG" },
                              ]}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-span-4 flex flex-col">
                          <Form.Item name="enteral_feeding_system_type" layout="horizontal" className="mb-0!">
                            <Radio.Group
                              size="large"
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
                          <Form.Item name="enteral_feeding_system_placement_date" layout="horizontal" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                            <DatePicker size="large" className="w-full" placeholder="Selecione data da colocação" />
                          </Form.Item>
                          <p className="mb-2">Data da remoção:</p>
                          <Form.Item name="enteral_feeding_system_removal_date" layout="horizontal" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                            <DatePicker size="large" className="w-full" placeholder="Selecione data da remoção" />
                          </Form.Item>
                          <p>Em curso</p>
                          <Form.Item name="enteral_feeding_system_ongoing" layout="horizontal" className="mb-0!" valuePropName="checked">
                            <Switch size="large" checkedChildren="Sim" unCheckedChildren="Não" />
                          </Form.Item>
                        </div>
                      </>
                    ) : (
                      getFieldValue("enteral_feeding_system") === "Não" && (
                        <>
                          <div className="col-span-4">
                            <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
                          </div>
                          <div className="flex flex-col">
                            <p className="mb-2">Data da remoção:</p>
                            <Form.Item name="enteral_feeding_system_removal_date" layout="horizontal" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                              <DatePicker size="large" className="w-full" placeholder="Selecione data da remoção" />
                            </Form.Item>
                          </div>
                        </>
                      )
                    )
                  }
                </Form.Item>
              </div>

              {/* Estadio ao diagnóstico do tumor da cabeça e pescoço: */}
              <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-3 gap-x-12 gap-y-4 mt-6">
                <div className="col-span-3">
                  <p className="label">Estadio ao diagnóstico do tumor da cabeça e pescoço:</p>
                </div>
                <div className="col-span-3 flex flex-col">
                  <Form.Item name="stage_diagnosis" layout="horizontal" className="mb-0!">
                    <Radio.Group
                      size="large"
                      options={[
                        { value: "Estadio clínico ao diagnóstico", label: "Estadio clínico ao diagnóstico" },
                        { value: "Estadio patológico ao diagnóstico", label: "Estadio patológico ao diagnóstico" },
                      ]}
                    />
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
                          <div className="flex w-full mt-2">
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
                                  <Radio value="(y)PT">(y)pT</Radio>
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
                        ) : null}
                      </div>
                    )
                  }
                </Form.Item>
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
                                <SurgeryTreatmentTree namePrefix="initial_diagnosis_treatment" includePalliativeOption />

                                <div className="border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4">
                                  <p className="font-bold">Data de término do tratamento radical da doença localizada / localmente avançada</p>
                                  <Form.Item name="treatment_end_date" className="mt-4! mb-0!" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                                    <DatePicker size="large" className="w-full" format="DD/MM/YYYY" placeholder="Selecioe a data de término" />
                                  </Form.Item>
                                </div>
                              </div>
                              <Form.Item
                                noStyle
                                shouldUpdate={(prev, curr) => prev.initial_diagnosis_treatment?.type !== curr.initial_diagnosis_treatment?.type}
                              >
                                {({ getFieldValue }) =>
                                  getFieldValue(["initial_diagnosis_treatment", "type"]) === "Tratamento paliativo" && <PalliativeTreatment form={form} />
                                }
                              </Form.Item>
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
                                  <AdvancedDiseaseAssessment namePrefix="initial_diagnosis_advanced" />

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
              </div>
            </>
          ) : null
        }
      </Form.Item>
    </div>
  );
}
