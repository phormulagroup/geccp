import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch, TimePicker, Tooltip } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlineInfoCircle, AiOutlinePlusCircle } from "react-icons/ai";

import helpers from "../../utils/helpers";
import CharlsonIndex from "../charlsonIndex";

export default function PalliativeTreatment({ form, next, previous, formKey }) {
  const [selectedTreatmentLine, setSelectedTreatmentLine] = useState(1);

  function addTreatmentLine(e) {
    let lines = form.getFieldValue("palliative_treatment");
    form.setFieldValue("palliative_treatment", [...(lines || []), {}]);
  }

  function selectLine(e) {
    setSelectedTreatmentLine(e.target.value);
  }

  return (
    <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-4">
      <div className="col-span-4">
        <p className="label">Tratamento paliativo</p>
      </div>
      <div className="col-span-4">
        <div className="flex justify-between items-center">
          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.palliative_treatment !== currentValues.palliative_treatment}>
            {({ getFieldValue }) => (
              <Radio.Group className="flex w-full!" size="large" onChange={selectLine} defaultValue={selectedTreatmentLine}>
                {getFieldValue("palliative_treatment") ? getFieldValue("palliative_treatment").map((item, index) => <Radio value={index + 1}>{index + 1}ª linha</Radio>) : null}
              </Radio.Group>
            )}
          </Form.Item>
          <div>
            <Button type="primary" size="large" icon={<AiOutlinePlusCircle />} onClick={addTreatmentLine}>
              Nova linha de tratamento
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
      </div>
      <div className="col-span-4">
        <Form.List name="palliative_treatment">
          {(fields, { add, remove, move }) =>
            fields.map((field, fieldInd) => (
              <div className={`grid-cols-4 gap-x-12 gap-y-4 mt-4 ${selectedTreatmentLine === fieldInd + 1 ? "grid" : "hidden"}`}>
                {/* ECOG-PS no início do tratamento */}

                <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.stage_diagnosis_status !== currentValues.stage_diagnosis_status}>
                  {({ getFieldValue }) =>
                    getFieldValue("stage_diagnosis_status") === "Diagnóstico em estadio precoce" &&
                    getFieldValue("therapeutic_approach") !== "Não passível de tratamento radical" ? (
                      <>
                        <div className="col-span-4">
                          <p className="font-bold">Motivo</p>
                        </div>
                        <div className="col-span-4">
                          <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        </div>
                        <div className="col-span-4">
                          <Form.Item name={[field.name, "ecog"]} className="mb-0!" layout="horizontal">
                            <Radio.Group className="flex w-full!" size="large">
                              <Radio value="Doente considerado unfit para tratamento radical pela equipa médica">
                                Doente considerado <i>unfit</i> para tratamento radical pela equipa médica
                              </Radio>
                              <Radio value="Doente recusou tratamento radical">Doente recusou tratamento radical</Radio>
                              <Radio value="Outro">Outro</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                        <div className="col-span-4 mt-4">
                          <p className="font-bold">ECOG-PS no início do tratamento</p>
                        </div>
                        <div className="col-span-4">
                          <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        </div>
                        <div className="col-span-4">
                          <Form.Item name={[field.name, "ecog"]} className="mb-0!" layout="horizontal">
                            <Radio.Group className="flex w-full!" size="large">
                              <Radio value="CPS < 1">{"CPS < 1"}</Radio>
                              <Radio value="CPS 1-19">{""}</Radio>
                              <Radio value="CPS >= 20">{"CPS >= 20"}</Radio>
                              <Radio value="Desconhecido / não realizado">Desconhecido / não realizado</Radio>
                              <Radio value="Valor absoluto">Valor absoluto</Radio>
                            </Radio.Group>
                          </Form.Item>

                          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.stage_diagnosis_status !== currentValues.stage_diagnosis_status}>
                            {({ getFieldValue }) =>
                              getFieldValue("ecog") === "Valor absoluto" && (
                                <InputNumber name={[field.name, "ecog_value"]} className="w-full" placeholder="Especifique o valor absoluto do ECOG-PS" size="large" />
                              )
                            }
                          </Form.Item>
                        </div>
                      </>
                    ) : getFieldValue("stage_diagnosis_status") === "Diagnóstico em estadio avançado" ||
                      getFieldValue("therapeutic_approach") === "Não passível de tratamento radical" ? (
                      <>
                        <div className="col-span-4">
                          <p className="font-bold">ECOG-PS no início do tratamento</p>
                        </div>
                        <div className="col-span-4">
                          <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        </div>
                        <div className="col-span-4">
                          <Form.Item name={[field.name, "ecog"]} className="mb-0!" layout="horizontal">
                            <Radio.Group className="flex w-full!" size="large">
                              <Radio value="0">0</Radio>
                              <Radio value="1">1</Radio>
                              <Radio value="2">2</Radio>
                              <Radio value="3">3</Radio>
                              <Radio value="4">4</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                      </>
                    ) : null
                  }
                </Form.Item>

                {/* Sinais / Sintomas */}
                <div className="col-span-4 mt-6">
                  <p className="font-bold">Sinais / Sintomas</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4 border-dashed border-2 border-[#8BD1C6] rounded-[10px] grid grid-cols-3 gap-y-4 mt-4">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.palliative_treatment[field.name]?.symptoms !== currentValues.palliative_treatment[field.name]?.symptoms ||
                      prevValues.palliative_treatment[field.name]?.symptoms_details !== currentValues.palliative_treatment[field.name]?.symptoms_details
                    }
                  >
                    {({ getFieldValue }) => (
                      <>
                        <div
                          className={`${
                            getFieldValue("palliative_treatment")[field.name]?.symptoms === "Sintomas" ? "col-span-2 border-r-2  border-dashed border-[#8BD1C6]" : "col-span-4"
                          } p-4 bg-[#C5E8E3] rounded-l-[10px]`}
                        >
                          <Form.Item name={[field.name, "symptoms"]} className="mb-0!">
                            <Radio.Group className="flex w-full!" size="large">
                              <Radio value="Sintomas">Sintomas</Radio>
                              <Radio value="Alterações imagiológicas ou laboratoriais que requerem resposta rápida">
                                Alterações imagiológicas ou laboratoriais que requerem resposta rápida
                              </Radio>
                            </Radio.Group>
                          </Form.Item>

                          {getFieldValue("palliative_treatment")[field.name]?.symptoms === "Alterações imagiológicas ou laboratoriais que requerem resposta rápida" && (
                            <div>
                              <p className="mt-6 pb-2">Especifique</p>
                              <Form.Item name={[field.name, "symptoms_specify"]}>
                                <Input size="large" placeholder="Especifique..." className="w-full" />
                              </Form.Item>
                            </div>
                          )}
                        </div>
                        {getFieldValue("palliative_treatment")[field.name]?.symptoms === "Sintomas" && (
                          <div className="flex flex-col p-4">
                            <Form.Item name={[field.name, "symptoms_details"]} className="mb-0!">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Assintomático">Assintomático</Radio>
                              </Radio.Group>
                            </Form.Item>
                            {getFieldValue("palliative_treatment")[field.name]?.symptoms_details === "Assintomático" && (
                              <div>
                                <p className="mt-4 pb-2">Especifique</p>
                                <Form.Item name={[field.name, "symptoms_details_specify"]}>
                                  <Input size="large" placeholder="Especifique..." className="w-full" />
                                </Form.Item>
                              </div>
                            )}
                            <Form.Item name={[field.name, "symptoms_details"]} className="mb-0!">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Moderadamente sintomático">Moderadamente sintomático</Radio>
                              </Radio.Group>
                            </Form.Item>
                            {getFieldValue("palliative_treatment")[field.name]?.symptoms_details === "Moderadamente sintomático" && (
                              <div>
                                <p className="mt-4 pb-2">Especifique</p>
                                <Form.Item name={[field.name, "symptoms_details_specify"]}>
                                  <Input size="large" placeholder="Especifique..." className="w-full" />
                                </Form.Item>
                              </div>
                            )}
                            <Form.Item name={[field.name, "symptoms_details"]} className="mb-0!">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Altamente sintomático">Altamente sintomático</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </div>
                        )}
                      </>
                    )}
                  </Form.Item>
                </div>

                {/* Esquema de tratamento */}
                <div className="col-span-4 mt-6">
                  <p className="font-bold">Esquema de tratamento</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4">
                  {field.name === 0 ? (
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Cetuximab + docetaxel + cisplatina">Cetuximab + docetaxel + cisplatina</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Pembrolizumab + cisplatina + 5FU">Pembrolizumab + cisplatina + 5FU</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Paclitaxel + carboplatina">Paclitaxel + carboplatina</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Cetuximab + paclitaxel">Cetuximab + paclitaxel</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Cetuximab + docetaxel + carboplatina">Cetuximab + docetaxel + carboplatina</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Pembrolizumab + carboplatina + 5FU">Pembrolizumab + carboplatina + 5FU</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Pembrolizumab em monoterapia">Pembrolizumab em monoterapia</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Metotrexato">Metotrexato</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Nivolumab">Nivolumab</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Ensaio clínico">Ensaio clínico</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, currentValues) =>
                            prevValues.palliative_treatment[field.name]?.treatment_scheme !== currentValues.palliative_treatment[field.name]?.treatment_scheme
                          }
                        >
                          {({ getFieldValue }) =>
                            getFieldValue("palliative_treatment")[field.name]?.treatment_scheme === "Ensaio clínico" && (
                              <Form.Item name={[field.name, "treatment_scheme_clinical_trial"]} className="mb-0! mt-3!">
                                <Input size="large" className="w-full" placeholder="Qual?" />
                              </Form.Item>
                            )
                          }
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Outro">Outro</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, currentValues) =>
                            prevValues.palliative_treatment[field.name]?.treatment_scheme !== currentValues.palliative_treatment[field.name]?.treatment_scheme
                          }
                        >
                          {({ getFieldValue }) =>
                            getFieldValue("palliative_treatment")[field.name]?.treatment_scheme === "Outro" && (
                              <Form.Item name={[field.name, "treatment_scheme_other"]} className="mb-0! mt-3!">
                                <Input size="large" className="w-full" placeholder="Especifique..." />
                              </Form.Item>
                            )
                          }
                        </Form.Item>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Cetuximab + paclitaxel">Cetuximab + paclitaxel</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Paclitaxel + carboplatina">Paclitaxel + carboplatina</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Nivolumab">Nivolumab</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Paclitaxel monoterapia">Paclitaxel monoterapia</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Cetuximab monoterapia">Cetuximab monoterapia</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Metotrexato">Metotrexato</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Ensaio clínico">Ensaio clínico</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, currentValues) =>
                            prevValues.palliative_treatment[field.name]?.treatment_scheme !== currentValues.palliative_treatment[field.name]?.treatment_scheme
                          }
                        >
                          {({ getFieldValue }) =>
                            getFieldValue("palliative_treatment")[field.name]?.treatment_scheme === "Ensaio clínico" && (
                              <Form.Item name={[field.name, "treatment_scheme_clinical_trial"]} className="mb-0! mt-3!">
                                <Input size="large" className="w-full" placeholder="Qual?" />
                              </Form.Item>
                            )
                          }
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item name={[field.name, "treatment_scheme"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Outro">Outro</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, currentValues) =>
                            prevValues.palliative_treatment[field.name]?.treatment_scheme !== currentValues.palliative_treatment[field.name]?.treatment_scheme
                          }
                        >
                          {({ getFieldValue }) =>
                            getFieldValue("palliative_treatment")[field.name]?.treatment_scheme === "Outro" && (
                              <Form.Item name={[field.name, "treatment_scheme_other"]} className="mb-0! mt-3!">
                                <Input size="large" className="w-full" placeholder="Especifique..." />
                              </Form.Item>
                            )
                          }
                        </Form.Item>
                      </div>
                    </div>
                  )}
                </div>

                {/* Data da primeira administração do tratamento */}
                <div className="col-span-4 mt-6">
                  <p className="font-bold">Data da primeira administração do tratamento</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Form.Item name={[field.name, "first_administration_treatment_date"]} className="mb-0!" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                      <DatePicker size="large" className="w-full" />
                    </Form.Item>
                  </div>
                </div>

                {/* Eventos adversos graves que motivaram ajuste de dose ou suspensão do tratamento de quimioterapia ou anti-EGFR. */}
                <div className="col-span-4 mt-6">
                  <p className="font-bold">Eventos adversos graves que motivaram ajuste de dose ou suspensão do tratamento de quimioterapia ou anti-EGFR.</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4 gap-4">
                  <Form.Item name={[field.name, "serious_adverse_events_adjust_discontinuation"]} className="mb-0!">
                    <Checkbox.Group className="grid! grid-cols-2!" size="large">
                      <Checkbox value="Neutropenia">Neutropenia</Checkbox>
                      <Checkbox value="Neutropenia febril">Neutropenia febril</Checkbox>
                      <Checkbox value="Trombocitopenia">Trombocitopenia</Checkbox>
                      <Checkbox value="Anemia">Anemia</Checkbox>
                      <Checkbox value="Neuropatia sensitiva periférica">Neuropatia sensitiva periférica</Checkbox>
                      <Checkbox value="Rash acneiforme">Rash acneiforme</Checkbox>
                      <Checkbox value="Mucosite">Mucosite</Checkbox>
                      <Checkbox value="Fadiga">Fadiga</Checkbox>
                      <Checkbox value="Toxicidade hepática">Toxicidade hepática</Checkbox>
                      <Checkbox value="Toxicidade imuno-mediada">Toxicidade imuno-mediada</Checkbox>
                      <Checkbox value="Ototoxicidade">Ototoxicidade</Checkbox>
                      <Checkbox value="Outro">Outro</Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.palliative_treatment[field.name]?.serious_adverse_events_adjust_discontinuation !==
                      currentValues.palliative_treatment[field.name]?.serious_adverse_events_adjust_discontinuation
                    }
                  >
                    {({ getFieldValue }) => (
                      <div className="grid grid-cols-3 gap-6 mt-4">
                        {getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_adjust_discontinuation?.map((ad) => (
                          <div className="border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4">
                            <p className="font-[600] mb-2 text-center">{ad}</p>
                            <Form.Item noStyle={ad !== "Outro"} name={[field.name, "serious_adverse_events_adjust_discontinuation_details", ad, "name"]} className="mb-4!">
                              <Input size="large" className="w-full!" placeholder="Especifique..." hidden={ad !== "Outro"} />
                            </Form.Item>
                            <div className="p-4 border-r-2 border-r-[#8BD1C6] border-dashed bg-[#C5E8E3]">
                              <p className="font-bold">Grau de acordo com o CTCAE v.6</p>
                            </div>
                            <div className="p-4 grid grid-cols-2 gap-4">
                              <Form.Item name={[field.name, "serious_adverse_events_adjust_discontinuation_details", ad, "grade"]} className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="1">1</Radio>
                                  <Radio value="2">2</Radio>
                                  <Radio value="3">3</Radio>
                                </Radio.Group>
                              </Form.Item>
                              <Form.Item name={[field.name, "serious_adverse_events_adjust_discontinuation_details", ad, "grade"]} className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="4">4</Radio>
                                  <Radio value="5">5</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>

                            <p className="font-bold pb-2 mt-4">Data do diagnóstico:</p>
                            <Form.Item
                              name={[field.name, "serious_adverse_events_adjust_discontinuation_details", ad, "date"]}
                              className="mb-0!"
                              getValueProps={(value) => ({ value: value && dayjs(value) })}
                            >
                              <DatePicker size="large" className="w-full" />
                            </Form.Item>

                            <p className="font-bold pb-2 mt-4">Ciclo de tratamento:</p>
                            <Form.Item name={[field.name, "serious_adverse_events_adjust_discontinuation_details", ad, "treatment_cycle"]} className="mb-0!">
                              <InputNumber size="large" className="w-full!" placeholder="0" />
                            </Form.Item>

                            <p className="font-bold mt-4 pb-[8px]">Necessidade de ajuste do tratamento</p>

                            <Form.Item
                              noStyle
                              shouldUpdate={(prevValues, currentValues) =>
                                prevValues.palliative_treatment[field.name]?.serious_adverse_events_adjust_discontinuation_details?.[ad]?.need_treatment_adjustment !==
                                currentValues.palliative_treatment[field.name]?.serious_adverse_events_adjust_discontinuation_details?.[ad]?.need_treatment_adjustment
                              }
                            >
                              {({ getFieldValue }) => (
                                <div>
                                  <div
                                    className={`${
                                      getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_adjust_discontinuation_details?.[ad]?.need_treatment_adjustment ===
                                      "Suspensão temporária"
                                        ? "bg-[#C5E8E3]"
                                        : "bg-white"
                                    } border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4 mb-4`}
                                  >
                                    <Form.Item
                                      name={[field.name, "serious_adverse_events_adjust_discontinuation_details", ad, "need_treatment_adjustment"]}
                                      className="mb-0! flex items-center"
                                    >
                                      <Radio.Group className="flex w-full!" size="large">
                                        <Radio value="Suspensão temporária">Suspensão temporária</Radio>
                                      </Radio.Group>
                                    </Form.Item>

                                    <Form.List name={[field.name, "serious_adverse_events_adjust_discontinuation_details", ad, "need_treatment_adjustment_temporary"]}>
                                      {(fieldsTreatmentAdjustment, { add, remove, move }) => (
                                        <div>
                                          {fieldsTreatmentAdjustment.map((fieldTreatmentAdjustment) => (
                                            <div className="border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px] mt-4 mb-6 relative">
                                              <p className="pb-2 text-[12px]">Fármaco(s) que foi(oram) suspenso(s):</p>
                                              <Form.Item name={[fieldTreatmentAdjustment.name, "medication"]} className="mb-0! w-full!">
                                                <Input size="large" className="w-full!" />
                                              </Form.Item>
                                              <p className="pb-2 text-[12px] mt-4">Período de suspensão temporária:</p>
                                              <Form.Item name={[fieldTreatmentAdjustment.name, "days"]} className="mb-0! w-full!">
                                                <InputNumber size="large" className="w-full!" suffix="Dias" />
                                              </Form.Item>
                                              <Button
                                                icon={<AiOutlineDelete />}
                                                className="absolute! -top-4.5 -right-2.5"
                                                onClick={() => remove(fieldTreatmentAdjustment.name)}
                                              ></Button>
                                            </div>
                                          ))}

                                          {getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_adjust_discontinuation_details?.[ad]
                                            ?.need_treatment_adjustment === "Suspensão temporária" ? (
                                            <div className="flex justify-center items-center">
                                              <Button type="primary" size="large" icon={<AiOutlinePlusCircle />} onClick={() => add()}>
                                                Adicionar fármaco
                                              </Button>
                                            </div>
                                          ) : null}
                                        </div>
                                      )}
                                    </Form.List>
                                  </div>
                                </div>
                              )}
                            </Form.Item>

                            <Form.Item
                              noStyle
                              shouldUpdate={(prevValues, currentValues) =>
                                prevValues.palliative_treatment[field.name]?.serious_adverse_events_adjust_discontinuation_details?.[ad]?.need_treatment_adjustment !==
                                currentValues.palliative_treatment[field.name]?.serious_adverse_events_adjust_discontinuation_details?.[ad]?.need_treatment_adjustment
                              }
                            >
                              {({ getFieldValue }) => (
                                <div>
                                  <div
                                    className={`${
                                      getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_adjust_discontinuation_details?.[ad]?.need_treatment_adjustment ===
                                      "Descontinuação definitiva"
                                        ? "bg-[#C5E8E3]"
                                        : "bg-white"
                                    } border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4 mb-4`}
                                  >
                                    <Form.Item
                                      name={[field.name, "serious_adverse_events_adjust_discontinuation_details", ad, "need_treatment_adjustment"]}
                                      className="mb-0! flex items-center"
                                    >
                                      <Radio.Group className="flex w-full!" size="large">
                                        <Radio value="Descontinuação definitiva">Descontinuação definitiva</Radio>
                                      </Radio.Group>
                                    </Form.Item>

                                    <Form.List name={[field.name, "serious_adverse_events_adjust_discontinuation_details", ad, "need_treatment_adjustment_discontinuation"]}>
                                      {(fieldsTreatmentAdjustmentDiscontinuation, { add, remove, move }) => (
                                        <div>
                                          {fieldsTreatmentAdjustmentDiscontinuation.map((fieldTreatmentAdjustmentDiscontinuation) => (
                                            <div className="border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px] mt-4 mb-6 relative">
                                              <p className="pb-2 text-[12px]">Fármaco(s) que foi(oram) descontinuado(s):</p>
                                              <Form.Item name={[fieldTreatmentAdjustmentDiscontinuation.name, "medication"]} className="mb-0! w-full!">
                                                <Input size="large" className="w-full!" />
                                              </Form.Item>
                                              <p className="pb-2 text-[12px] mt-4">Data da descontinuação:</p>
                                              <Form.Item name={[fieldTreatmentAdjustmentDiscontinuation.name, "date"]} className="mb-0! w-full!">
                                                <InputNumber size="large" className="w-full!" suffix="Dias" />
                                              </Form.Item>
                                              <Button
                                                icon={<AiOutlineDelete />}
                                                className="absolute! -top-4.5 -right-2.5"
                                                onClick={() => remove(fieldTreatmentAdjustmentDiscontinuation.name)}
                                              ></Button>
                                            </div>
                                          ))}
                                          {getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_adjust_discontinuation_details?.[ad]
                                            ?.need_treatment_adjustment === "Descontinuação definitiva" ? (
                                            <div className="flex justify-center items-center">
                                              <Button type="primary" size="large" icon={<AiOutlinePlusCircle />} onClick={() => add()}>
                                                Adicionar fármaco
                                              </Button>
                                            </div>
                                          ) : null}
                                        </div>
                                      )}
                                    </Form.List>
                                  </div>
                                </div>
                              )}
                            </Form.Item>

                            <Form.Item
                              noStyle
                              shouldUpdate={(prevValues, currentValues) =>
                                prevValues.palliative_treatment[field.name]?.serious_adverse_events_adjust_discontinuation_details?.[ad]?.need_treatment_adjustment !==
                                currentValues.palliative_treatment[field.name]?.serious_adverse_events_adjust_discontinuation_details?.[ad]?.need_treatment_adjustment
                              }
                            >
                              {({ getFieldValue }) => (
                                <div>
                                  <div
                                    className={`${
                                      getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_adjust_discontinuation_details?.[ad]?.need_treatment_adjustment ===
                                      "Redução de dose"
                                        ? "bg-[#C5E8E3]"
                                        : "bg-white"
                                    } border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4`}
                                  >
                                    <Form.Item
                                      name={[field.name, "serious_adverse_events_adjust_discontinuation_details", ad, "need_treatment_adjustment"]}
                                      className="mb-0! flex items-center"
                                    >
                                      <Radio.Group className="flex w-full!" size="large">
                                        <Radio value="Redução de dose">Redução de dose</Radio>
                                      </Radio.Group>
                                    </Form.Item>

                                    <Form.List name={[field.name, "serious_adverse_events_adjust_discontinuation_details", ad, "need_treatment_adjustment_reduction"]}>
                                      {(fieldsTreatmentAdjustmentReduction, { add, remove, move }) => (
                                        <div>
                                          {fieldsTreatmentAdjustmentReduction.map((fieldTreatmentAdjustmentReduction) => (
                                            <div className="border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px] mt-4 mb-6 relative">
                                              <p className="pb-2 text-[12px]">Fármaco(s) em que a dose foi reduzida:</p>
                                              <Form.Item name={[fieldTreatmentAdjustmentReduction.name, "medication"]} className="mb-0! w-full!">
                                                <Input size="large" className="w-full!" />
                                              </Form.Item>
                                              <p className="pb-2 text-[12px] mt-4">Percentagem de redução:</p>
                                              <Form.Item name={[fieldTreatmentAdjustmentReduction.name, "percentage"]} className="mb-0! w-full!">
                                                <InputNumber size="large" className="w-full!" suffix="%" />
                                              </Form.Item>
                                              <Button
                                                icon={<AiOutlineDelete />}
                                                className="absolute! -top-4.5 -right-2.5"
                                                onClick={() => remove(fieldTreatmentAdjustmentReduction.name)}
                                              ></Button>
                                            </div>
                                          ))}

                                          {getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_adjust_discontinuation_details?.[ad]
                                            ?.need_treatment_adjustment === "Redução de dose" ? (
                                            <div className="flex justify-center items-center">
                                              <Button type="primary" size="large" icon={<AiOutlinePlusCircle />} onClick={() => add()}>
                                                Adicionar fármaco
                                              </Button>
                                            </div>
                                          ) : null}
                                        </div>
                                      )}
                                    </Form.List>
                                  </div>
                                </div>
                              )}
                            </Form.Item>
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.Item>
                </div>

                {/* Tratamento radical */}
                <div className="col-span-4 mt-6">
                  <p className="font-bold">Tratamento radical</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-2">
                  <Form.Item name={[field.name, "radical_treatment"]} className="mb-0!" layout="horizontal">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Sim">Sim</Radio>
                      <Radio value="Não">Não</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.palliative_treatment[field.name]?.radical_treatment !== currentValues.palliative_treatment[field.name]?.radical_treatment
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("palliative_treatment")[field.name]?.radical_treatment === "Sim" && (
                        <Form.Item name={[field.name, "radical_treatment_specified"]} className="mb-0! mt-3!">
                          <Input size="large" className="w-full" placeholder="Especifique..." />
                        </Form.Item>
                      )
                    }
                  </Form.Item>
                </div>

                {/* Se tratamento com fluoropirimidinas */}
                <div className="col-span-4 mt-6">
                  <p className="font-bold">Se tratamento com fluoropirimidinas</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4">
                  <p className="pb-2">DPYD status (se conhecido)</p>
                  <Form.Item name={[field.name, "dpyd_stats"]}>
                    <Input size="large" placeholder="DPYD status" />
                  </Form.Item>
                </div>

                {/* Se tratamentos com imunoterapia (Pembrolizumab ou Nivolumab) */}
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.palliative_treatment[field.name]?.treatment_scheme !== currentValues.palliative_treatment[field.name]?.treatment_scheme
                  }
                >
                  {({ getFieldValue }) =>
                    (getFieldValue("palliative_treatment")[field.name]?.treatment_scheme?.includes("Pembrolizumab") ||
                      getFieldValue("palliative_treatment")[field.name]?.treatment_scheme?.includes("Nivolumab")) && (
                      <>
                        <div className="col-span-4 mt-6">
                          <p className="font-bold">Se tratamentos com imunoterapia (Pembrolizumab ou Nivolumab)</p>
                        </div>
                        <div className="col-span-4">
                          <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        </div>
                        <div className="col-span-4">
                          <div className="border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px] mt-2">
                            <Form.List name={[field.name, "time_administration_immunotherapy_cycle"]}>
                              {(fieldsTimeAdministration, { add, remove, move }) => (
                                <div className="relative grid grid-cols-3 gap-4">
                                  {fieldsTimeAdministration.map((fieldTimeAdministration) => (
                                    <>
                                      <div>
                                        <p className="pb-2 font-bold">{fieldTimeAdministration.name + 1}º Ciclo de imunoterapia</p>
                                        <Form.Item
                                          name={[fieldTimeAdministration.name, "date"]}
                                          className="mb-0! w-full!"
                                          getValueProps={(value) => ({ value: value && dayjs(value) })}
                                        >
                                          <DatePicker size="large" className="w-full!" />
                                        </Form.Item>
                                      </div>
                                      <div>
                                        <p className="pb-2 font-bold">Hora de ínicio</p>
                                        <Form.Item name={[fieldTimeAdministration.name, "time"]} className="mb-0! w-full!">
                                          <TimePicker size="large" className="w-full!" />
                                        </Form.Item>
                                      </div>
                                      <div className="flex justify-start items-end">
                                        <Button icon={<AiOutlineDelete />} size="large" onClick={() => remove(fieldTimeAdministration.name)}></Button>
                                      </div>
                                    </>
                                  ))}

                                  <div className="col-span-3 flex justify-start items-center">
                                    <Button type="primary" size="large" icon={<AiOutlinePlusCircle />} onClick={() => add()}>
                                      Adicionar ciclo
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </Form.List>
                          </div>
                        </div>
                      </>
                    )
                  }
                </Form.Item>

                {/* Se tratamentos com imunoterapia (Pembrolizumab ou Nivolumab) */}
                <div className="col-span-4 mt-6">
                  <p className="font-bold">Eventos adversos de interesse da imunoterapia</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4">
                  <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_reason"]} className="mb-0!">
                    <Checkbox.Group className="grid! grid-cols-2!" size="large">
                      <Checkbox value="Pneumonite">Pneumonite</Checkbox>
                      <Checkbox value="Hepatite">Hepatite</Checkbox>
                      <Checkbox value="Hipotiroidismo">Hipotiroidismo</Checkbox>
                      <Checkbox value="Insuficiência da suprarrenal">Insuficiência da suprarrenal</Checkbox>
                      <Checkbox value="Nefrite">Nefrite</Checkbox>
                      <Checkbox value="Colite">Colite</Checkbox>
                      <Checkbox value="Miocardite">Miocardite</Checkbox>
                      <Checkbox value="Diabetes">Diabetes</Checkbox>
                      <Checkbox value="Outra toxicidade imuno-mediada">Outra toxicidade imuno-mediada:</Checkbox>
                    </Checkbox.Group>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.palliative_treatment[field.name]?.serious_adverse_events_immunotherapy_reason !==
                      currentValues.palliative_treatment[field.name]?.serious_adverse_events_immunotherapy_reason
                    }
                  >
                    {({ getFieldValue }) => (
                      <div className="grid grid-cols-3 gap-6 mt-4">
                        {getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_immunotherapy_reason?.map((ad) => (
                          <div className="border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4">
                            <p className="font-[600] mb-2 text-center">{ad}</p>
                            <Form.Item
                              noStyle={ad !== "Outra toxicidade imuno-mediada"}
                              name={[field.name, "serious_adverse_events_immunotherapy_reason_details", ad, "name"]}
                              className="mb-4!"
                            >
                              <Input size="large" className="w-full!" placeholder="Especifique..." hidden={ad !== "Outra toxicidade imuno-mediada"} />
                            </Form.Item>
                            <div className="p-4 border-r-2 border-r-[#8BD1C6] border-dashed bg-[#C5E8E3]">
                              <p className="font-bold">Grau de acordo com o CTCAE v.6</p>
                            </div>
                            <div className="p-4 grid grid-cols-2 gap-4">
                              <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_reason_details", ad, "grade"]} className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="1">1</Radio>
                                  <Radio value="2">2</Radio>
                                  <Radio value="3">3</Radio>
                                </Radio.Group>
                              </Form.Item>
                              <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_reason_details", ad, "grade"]} className="mb-0!">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="4">4</Radio>
                                  <Radio value="5">5</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>

                            <p className="font-bold pb-2 mt-4">Data do diagnóstico:</p>
                            <Form.Item
                              name={[field.name, "serious_adverse_events_immunotherapy_reason_details", ad, "date"]}
                              className="mb-0!"
                              getValueProps={(value) => ({ value: value && dayjs(value) })}
                            >
                              <DatePicker size="large" className="w-full" />
                            </Form.Item>

                            <p className="font-bold pb-2 mt-4">Necessidade de corticoterapia:</p>
                            <Form.Item
                              name={[field.name, "serious_adverse_events_immunotherapy_reason_details", ad, "corticosteroid_therapy"]}
                              className="mb-0!"
                              layout="horizontal"
                            >
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Sim">Sim</Radio>
                                <Radio value="Não">Não</Radio>
                              </Radio.Group>
                            </Form.Item>

                            <p className="font-bold pb-2 mt-4">Internamento:</p>
                            <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_reason_details", ad, "hospitalization"]} className="mb-0!" layout="horizontal">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Sim">Sim</Radio>
                                <Radio value="Não">Não</Radio>
                              </Radio.Group>
                            </Form.Item>

                            <p className="font-bold pb-2 mt-4">Necessidade de ajuste do tratamento:</p>
                            <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_reason_details", ad, "treatment_adjustment"]} className="mb-0!" layout="horizontal">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Sim">Sim</Radio>
                                <Radio value="Não">Não</Radio>
                              </Radio.Group>
                            </Form.Item>

                            <Form.Item
                              noStyle
                              shouldUpdate={(prevValues, currentValues) =>
                                prevValues.palliative_treatment[field.name]?.serious_adverse_events_immunotherapy_reason_details?.[ad].treatment_adjustment !==
                                  currentValues.palliative_treatment[field.name]?.serious_adverse_events_immunotherapy_reason_details?.[ad].treatment_adjustment ||
                                prevValues.palliative_treatment[field.name]?.serious_adverse_events_immunotherapy_reason_details?.[ad].treatment_adjustment_solution !==
                                  currentValues.palliative_treatment[field.name]?.serious_adverse_events_immunotherapy_reason_details?.[ad].treatment_adjustment_solution
                              }
                            >
                              {({ getFieldValue }) =>
                                getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_immunotherapy_reason_details?.[ad].treatment_adjustment === "Sim" && (
                                  <div className="flex flex-col">
                                    <div
                                      className={`border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4 mt-4 mb-4 ${
                                        getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_immunotherapy_reason_details?.[ad]
                                          .treatment_adjustment_solution === "Suspensão temporária da imunoterapia"
                                          ? "bg-[#C5E8E3]"
                                          : " bg-white"
                                      }`}
                                    >
                                      <Form.Item
                                        name={[field.name, "serious_adverse_events_immunotherapy_reason_details", ad, "treatment_adjustment_solution"]}
                                        className="mb-0!"
                                        layout="horizontal"
                                      >
                                        <Radio.Group className="flex w-full!" size="large">
                                          <Radio value="Suspensão temporária da imunoterapia">Suspensão temporária da imunoterapia</Radio>
                                        </Radio.Group>
                                      </Form.Item>
                                      {getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_immunotherapy_reason_details?.[ad]
                                        .treatment_adjustment_solution === "Suspensão temporária da imunoterapia" && (
                                        <>
                                          <p className="pb-2 mt-4">Período de suspensão temporária:</p>
                                          <Form.Item
                                            name={[field.name, "serious_adverse_events_immunotherapy_reason_details", ad, "treatment_adjustment_temporary_suspension_days"]}
                                            className="mb-0! max-w-75"
                                          >
                                            <InputNumber size="large" className="w-full!" suffix="Dias" />
                                          </Form.Item>
                                        </>
                                      )}
                                    </div>
                                    <div
                                      className={`border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4 ${
                                        getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_immunotherapy_reason_details?.[ad]
                                          .treatment_adjustment_solution === "Descontinuação definitiva da imunoterapia"
                                          ? "bg-[#C5E8E3]"
                                          : " bg-white"
                                      }`}
                                    >
                                      <Form.Item
                                        name={[field.name, "serious_adverse_events_immunotherapy_reason_details", ad, "treatment_adjustment_solution"]}
                                        className="mb-0!"
                                        layout="horizontal"
                                      >
                                        <Radio.Group className="flex w-full!" size="large">
                                          <Radio value="Descontinuação definitiva da imunoterapia">Descontinuação definitiva da imunoterapia</Radio>
                                        </Radio.Group>
                                      </Form.Item>
                                    </div>
                                  </div>
                                )
                              }
                            </Form.Item>
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.Item>
                </div>

                {/* Linha de tratamento ainda em curso */}
                <div className="col-span-4 mt-6">
                  <p className="label">Linha de tratamento ainda em curso</p>
                  <Form.Item name={[field.name, "treatment_line_ongoing"]} className="mb-0!" layout="horizontal">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Sim">Sim</Radio>
                      <Radio value="Não">Não</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
                </div>

                {/* Data da última administração do tratamento: */}
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.palliative_treatment[field.name]?.treatment_line_ongoing !== currentValues.palliative_treatment[field.name]?.treatment_line_ongoing
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue("palliative_treatment")[field.name]?.treatment_line_ongoing === "Não" && (
                      <div className="col-span-4 flex flex-col gap-4 p-6 border-2 border-dashed border-[#8BD1C6] rounded-[10px]">
                        <p className="font-bold">Data da última administração do tratamento:</p>
                        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        <div className="grid grid-cols-3 gap-4">
                          <Form.Item name={[field.name, "treatment_line_ending_date"]} getValueProps={(value) => ({ value: value && dayjs(value) })}>
                            <DatePicker className="w-full" />
                          </Form.Item>
                        </div>

                        <p className="font-bold">Motivo para o término do tratamento:</p>
                        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        <div className="grid grid-cols-3 gap-4">
                          <Form.Item name={[field.name, "treatment_line_ending_reason"]}>
                            <Select
                              size="large"
                              placeholder="Selecionar o motivo"
                              options={[
                                { value: "Progressão da doença", label: "Progressão da doença" },
                                { value: "Evento adverso inaceitável", label: "Evento adverso inaceitável" },
                                { value: "Degradação do estado geral", label: "Degradação do estado geral" },
                                { value: "Morte com evidência de progressão", label: "Morte com evidência de progressão" },
                                { value: "Morte sem evidência de progressão", label: "Morte sem evidência de progressão" },
                                { value: "Suspensão eletiva", label: "Suspensão eletiva" },
                                { value: "Outro", label: "Outro" },
                              ]}
                            />
                          </Form.Item>
                          <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) =>
                              prevValues.palliative_treatment[field.name]?.treatment_line_ending_reason !==
                              currentValues.palliative_treatment[field.name]?.treatment_line_ending_reason
                            }
                          >
                            {({ getFieldValue }) =>
                              getFieldValue("palliative_treatment")[field.name]?.treatment_line_ending_reason === "Suspensão eletiva" && (
                                <div>
                                  <div className="p-4 border-2 border-dashed border-[#8BD1C6] rounded-[5px]">
                                    <Form.Item name={[field.name, "treatment_line_ending_reason_elective_suspension"]} className="mb-0!">
                                      <Radio.Group className="flex w-full!" size="large">
                                        <Radio value="Resposta prolongada a imunoterapia">Resposta prolongada a imunoterapia</Radio>
                                        <Radio value="Outra situação">Outra situação</Radio>
                                      </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                      noStyle
                                      shouldUpdate={(prevValues, currentValues) =>
                                        prevValues.palliative_treatment[field.name]?.treatment_line_ending_reason !==
                                          currentValues.palliative_treatment[field.name]?.treatment_line_ending_reason ||
                                        prevValues.palliative_treatment[field.name]?.treatment_line_ending_reason_elective_suspension !==
                                          currentValues.palliative_treatment[field.name]?.treatment_line_ending_reason_elective_suspension
                                      }
                                    >
                                      {({ getFieldValue }) =>
                                        getFieldValue("palliative_treatment")[field.name]?.treatment_line_ending_reason_elective_suspension === "Outra situação" && (
                                          <Form.Item name={[field.name, "treatment_line_ending_reason_elective_suspension_specified"]} className="mb-0! mt-4!">
                                            <Input size="large" className="w-full!" placeholder="Especifique..." />
                                          </Form.Item>
                                        )
                                      }
                                    </Form.Item>
                                  </div>
                                </div>
                              )
                            }
                          </Form.Item>
                          <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) =>
                              prevValues.palliative_treatment[field.name]?.treatment_line_ending_reason !==
                                currentValues.palliative_treatment[field.name]?.treatment_line_ending_reason ||
                              prevValues.palliative_treatment[field.name]?.treatment_line_ending_reason_elective_suspension !==
                                currentValues.palliative_treatment[field.name]?.treatment_line_ending_reason_elective_suspension
                            }
                          >
                            {({ getFieldValue }) =>
                              getFieldValue("palliative_treatment")[field.name]?.treatment_line_ending_reason_elective_suspension === "Resposta prolongada a imunoterapia" && (
                                <div className="p-4 border-2 border-dashed border-[#8BD1C6] rounded-[5px]">
                                  <p className="font-bold pb-2">Tempo de duração da imunoterapia</p>
                                  <Form.Item name={[field.name, "treatment_line_ending_reason_elective_suspension_prolonged_response", "duration"]} className="mb-0!">
                                    <Radio.Group className="flex w-full!" size="large">
                                      <Radio value="=< 2 anos">{"=< 2 anos"}</Radio>
                                      <Radio value="2-3 anos">{"2-3 anos"}</Radio>
                                      <Radio value="4-5 anos">{"4-5 anos"}</Radio>
                                      <Radio value="> 5 anos">{"> 5 anos"}</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                  <p className="font-bold mt-4! pb-2">Resposta completo em TC / RMN</p>
                                  <Form.Item name={[field.name, "treatment_line_ending_reason_elective_suspension_prolonged_response", "complete_response"]} className="mb-0!">
                                    <Radio.Group className="flex w-full!" size="large">
                                      <Radio value="Sim">{"Sim"}</Radio>
                                      <Radio value="Não">{"Não"}</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                  <p className="font-bold mt-4! pb-2">Resposta metabólica completa em PET-FDG</p>
                                  <Form.Item name={[field.name, "treatment_line_ending_reason_elective_suspension_prolonged_response", "metabolic_response"]} className="mb-0!">
                                    <Radio.Group className="flex w-full!" size="large">
                                      <Radio value="Sim">Sim</Radio>
                                      <Radio value="Não">Não</Radio>
                                      <Radio value="Não avaliado">Não avaliado</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                </div>
                              )
                            }
                          </Form.Item>
                        </div>
                        <p className="font-bold">Número total de ciclos completos tratamento administrados</p>
                        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        <div className="grid grid-cols-3 gap-4">
                          <Form.Item name={[field.name, "complete_cycles_administrated_treatment"]}>
                            <InputNumber className="w-full!" placeholder="0" />
                          </Form.Item>
                        </div>
                        <p className="font-bold">Melhor resposta imagiológica</p>
                        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        <div className="grid grid-cols-2">
                          <Form.Item name={[field.name, "better_response_imagiologic"]} className="mb-0!">
                            <Radio.Group className="flex w-full!" size="large">
                              <Radio value="Resposta completa">Resposta completa</Radio>
                              <Radio value="Resposta parcial">Resposta parcial</Radio>
                              <Radio value="Doença estável">Doença estável</Radio>
                              <Radio value="Progressão da doença">Progressão da doença</Radio>
                              <Radio value="Desconhecido">Desconhecido</Radio>
                            </Radio.Group>
                          </Form.Item>

                          <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) =>
                              prevValues.palliative_treatment[field.name]?.better_response_imagiologic !==
                              currentValues.palliative_treatment[field.name]?.better_response_imagiologic
                            }
                          >
                            {({ getFieldValue }) =>
                              getFieldValue("palliative_treatment")[field.name]?.better_response_imagiologic === "Progressão da doença" && (
                                <div>
                                  <p className="pb-2">Progressão da doença</p>
                                  <div className="bg-[#C5E8E3] border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px]">
                                    <Form.Item name={[field.name, "disease_progression"]} className="mb-0! w-full">
                                      <Radio.Group className="flex w-full!" size="large">
                                        <Radio value="Locorregional">Locorregional</Radio>
                                        <Radio value="À distância">À distância</Radio>
                                        <Radio value="Ambos">Ambos</Radio>
                                      </Radio.Group>
                                    </Form.Item>
                                  </div>
                                </div>
                              )
                            }
                          </Form.Item>
                        </div>
                        <p className="font-bold">Data da melhor resposta imagiológica</p>
                        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        <div className="grid grid-cols-3 gap-4">
                          <Form.Item name={[field.name, "best_imagiologic_response_date"]} getValueProps={(value) => ({ value: value && dayjs(value) })}>
                            <DatePicker className="w-full" />
                          </Form.Item>
                        </div>
                        <p className="font-bold">Tempo até resposta clínica</p>
                        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        <Form.Item name={[field.name, "time_until_clinic_response"]} className="mb-0!" layout="horizontal">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="Inferior a 1 mês">Inferior a 1 mês</Radio>
                            <Radio value="1-3 meses">1-3 meses</Radio>
                            <Radio value="Mais do que 3 meses">Mais do que 3 meses</Radio>
                            <Radio value="Doente assintomático aquando do início do tratamento">Doente assintomático aquando do início do tratamento</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                    )
                  }
                </Form.Item>

                {/* Referenciação a Cuidados Paliativos */}

                <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.palliative_treatment !== currentValues.palliative_treatment}>
                  {({ getFieldValue }) =>
                    (field.name === 0 || (field.name > 0 && getFieldValue("palliative_treatment")[field.name - 1]?.palliative_care_referral === "Não")) && (
                      <>
                        <div className="col-span-4 mt-4!">
                          <p className="font-bold">Referenciação a Cuidados Paliativos</p>
                        </div>
                        <div className="col-span-4">
                          <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        </div>
                        <div className="col-span-4">
                          <Form.Item name={[field.name, "palliative_care_referral"]} layout="horizontal">
                            <Radio.Group className="flex w-full!" size="large">
                              <Radio value="Sim">Sim</Radio>
                              <Radio value="Não">Não</Radio>
                            </Radio.Group>
                          </Form.Item>
                          <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) =>
                              prevValues.palliative_treatment[field.name]?.palliative_care_referral !== currentValues.palliative_treatment[field.name]?.palliative_care_referral
                            }
                          >
                            {({ getFieldValue }) =>
                              getFieldValue("palliative_treatment")[field.name]?.palliative_care_referral === "Sim" && (
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <p className="pb-2">Data da referenciação:</p>
                                    <Form.Item
                                      name={[field.name, "palliative_care_referral_date"]}
                                      layout="horizontal"
                                      className="mb-0!"
                                      getValueProps={(value) => ({ value: value && dayjs(value) })}
                                    >
                                      <DatePicker className="w-full" />
                                    </Form.Item>
                                  </div>
                                </div>
                              )
                            }
                          </Form.Item>
                        </div>
                      </>
                    )
                  }
                </Form.Item>

                {/* Diagnóstico de tumor metácrono */}
                <div className="col-span-4 mt-4!">
                  <p className="font-bold">Diagnóstico de tumor metácrono</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4">
                  <Form.Item name={[field.name, "diagnosis_metachronous_tumor"]} layout="horizontal">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Sim">Sim</Radio>
                      <Radio value="Não">Não</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.palliative_treatment[field.name]?.diagnosis_metachronous_tumor !== currentValues.palliative_treatment[field.name]?.diagnosis_metachronous_tumor
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("palliative_treatment")[field.name]?.diagnosis_metachronous_tumor === "Sim" && (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="pb-2">Localização:</p>
                            <Form.Item name={[field.name, "diagnosis_metachronous_tumor_location"]} className="mb-0!">
                              <Input size="large" className="w-full" placeholder="Especifique a localização" />
                            </Form.Item>
                          </div>
                          <div>
                            <div className="flex items-center pb-2">
                              <p className="mr-1">Data do diagnóstico</p>
                              <Tooltip placement="topLeft" title={"considerar a data da biópsia"}>
                                <AiOutlineInfoCircle />
                              </Tooltip>
                            </div>
                            <Form.Item name={[field.name, "diagnosis_metachronous_tumor_date"]} layout="horizontal" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                              <DatePicker className="w-full" />
                            </Form.Item>
                          </div>
                        </div>
                      )
                    }
                  </Form.Item>
                </div>

                {/* Óbito */}
                <div className="col-span-4">
                  <p className="font-bold">Óbito</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4">
                  <Form.Item name={[field.name, "death"]} layout="horizontal">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Sim">Sim</Radio>
                      <Radio value="Não">Não</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.palliative_treatment[field.name]?.death !== currentValues.palliative_treatment[field.name]?.death ||
                      prevValues.palliative_treatment[field.name]?.death_cause !== currentValues.palliative_treatment[field.name]?.death_cause
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("palliative_treatment")[field.name]?.death === "Sim" && (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="pb-2">Data:</p>
                            <Form.Item name={[field.name, "death_date"]} className="mb-0!" layout="horizontal" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                              <DatePicker className="w-full" />
                            </Form.Item>
                          </div>
                          <div className="col-span-2">
                            <p className="pb-2">Causa:</p>
                            <Form.Item name={[field.name, "death_cause"]} layout="horizontal" className="mb-0!">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Relacionada com a doença oncológica">Relacionada com a doença oncológica</Radio>
                                <Radio value="Não relacionada com a doença oncológica">Não relacionada com a doença oncológica (especifique se possível)</Radio>
                              </Radio.Group>
                            </Form.Item>
                            {getFieldValue("palliative_treatment")[field.name]?.death_cause === "Não relacionada com a doença oncológica" && (
                              <Form.Item name={[field.name, "death_cause_text"]} layout="horizontal" className="mt-6!">
                                <Input size="large" placeholder="Qual? (Especifique se possível)" />
                              </Form.Item>
                            )}
                            <Form.Item name={[field.name, "death_cause"]} layout="horizontal">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Desconhecida">Desconhecida</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </div>
                        </div>
                      )
                    }
                  </Form.Item>
                </div>

                {/* Perda de seguimento */}
                <div className="col-span-4">
                  <p className="font-bold">Perda de seguimento</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4">
                  <Form.Item name={[field.name, "lost_tracking"]} layout="horizontal">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Sim">Sim</Radio>
                      <Radio value="Não">Não</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.palliative_treatment[field.name]?.lost_tracking !== currentValues.palliative_treatment[field.name]?.lost_tracking
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("palliative_treatment")[field.name]?.lost_tracking === "Sim" && (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="pb-2">Data da última consulta:</p>
                            <Form.Item name={[field.name, "lost_tracking_date"]} layout="horizontal" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                              <DatePicker className="w-full" />
                            </Form.Item>
                          </div>
                        </div>
                      )
                    }
                  </Form.Item>
                </div>
              </div>
            ))
          }
        </Form.List>
      </div>

      <div className="col-span-4">
        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
      </div>
      <div className="col-span-4">
        <Button type="primary" size="large" icon={<AiOutlinePlusCircle />} onClick={addTreatmentLine}>
          Nova linha de tratamento
        </Button>
      </div>
    </div>
  );
}
