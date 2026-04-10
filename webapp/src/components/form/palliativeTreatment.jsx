import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch, TimePicker, Tooltip } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlineInfoCircle, AiOutlinePlusCircle } from "react-icons/ai";

import helpers from "../../utils/helpers";
import CharlsonIndex from "../charlsonIndex";

export default function PalliativeTreatment({ form, next, previous }) {
  const [selectedTreatmentLine, setSelectedTreatmentLine] = useState(1);
  function addTreatmentLine(e) {
    let lines = form.getFieldValue("palliative_treatment");
    form.setFieldValue("palliative_treatment", [...(lines || []), {}]);
  }

  function selectLine(e) {
    console.log(e);
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
              <Radio.Group className="flex w-full!" size="large" onChange={selectLine}>
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
                {/* Motivo */}
                <div className="col-span-4 mt-2">
                  <p className="font-bold">Motivo</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-2">
                  <Form.Item name={[field.name, "palliative_treatment_reason"]} className="mb-0!">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Doente considerado pela equipa médica unfit para tratamento radical">Doente considerado pela equipa médica unfit para tratamento radical</Radio>
                      <Radio value="Doente recusou tratamento radical">Doente recusou tratamento radical</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="flex items-start col-span-2">
                  <div className="flex items-center w-full">
                    <Form.Item name={[field.name, "palliative_treatment_reason"]} className="mb-0! flex justify-center items-center" layout="vertical">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="Outro">Outro</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.palliative_treatment[field.name]?.palliative_treatment_reason !== currentValues.palliative_treatment[field.name]?.palliative_treatment_reason
                      }
                    >
                      {({ getFieldValue }) => (
                        <Form.Item
                          name={[field.name, "palliative_treatment_reason_other"]}
                          className="mb-0! w-full"
                          hidden={getFieldValue("palliative_treatment_reason") !== "Outro"}
                        >
                          <Input size="large" className="w-full" placeholder="Qual?" />
                        </Form.Item>
                      )}
                    </Form.Item>
                  </div>
                </div>

                {/* ECOG-PS no início do tratamento */}
                <div className="col-span-4 mt-6">
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
                    shouldUpdate={(prevValues, currentValues) => prevValues.palliative_treatment[field.name]?.symptoms !== currentValues.palliative_treatment[field.name]?.symptoms}
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
                        </div>
                        {getFieldValue("palliative_treatment")[field.name]?.symptoms === "Sintomas" && (
                          <div className="flex flex-col p-4">
                            <Form.Item name={[field.name, "symptoms_details"]} className="mb-0!">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Assintomático">Assintomático</Radio>
                                <Radio value="Moderadamente sintomático">Moderadamente sintomático</Radio>
                                <Radio value="Altamente sintomático">Altamente sintomático</Radio>
                              </Radio.Group>
                            </Form.Item>
                            <p className="mt-6 pb-2">Especifique</p>
                            <Form.Item name={[field.name, "symptoms_details_specify"]} className="mb-0!">
                              <Input size="large" className="w-full" />
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
                              <Input size="large" className="w-full" placeholder="Qual?" />
                            </Form.Item>
                          )
                        }
                      </Form.Item>
                    </div>
                  </div>
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
                <div className="col-span-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Form.Item name={[field.name, "serious_adverse_events_adjust_discontinuation"]} className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="Neutropenia">Neutropenia</Radio>
                          <Radio value="Neutropenia febril">Neutropenia febril</Radio>
                          <Radio value="Trombocitopenia">Trombocitopenia</Radio>
                          <Radio value="Anemia">Anemia</Radio>
                          <Radio value="Neuropatia sensitiva periférica">Neuropatia sensitiva periférica</Radio>
                          <Radio value="Rash acneiforme">Rash acneiforme</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div>
                      <Form.Item name={[field.name, "serious_adverse_events_adjust_discontinuation"]} className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="Mucosite">Mucosite</Radio>
                          <Radio value="Fadiga">Fadiga</Radio>
                          <Radio value="Toxicidade hepática">Toxicidade hepática</Radio>
                          <Radio value="Toxicidade imuno-mediada">Toxicidade imuno-mediada</Radio>
                          <Radio value="Ototoxicidade">Ototoxicidade</Radio>
                          <Radio value="Outro">Outro</Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.palliative_treatment[field.name]?.serious_adverse_events_adjust_discontinuation !==
                          currentValues.palliative_treatment[field.name]?.serious_adverse_events_adjust_discontinuation
                        }
                      >
                        {({ getFieldValue }) =>
                          getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_adjust_discontinuation === "Outro" && (
                            <Form.Item name={[field.name, "serious_adverse_events_adjust_discontinuation_other"]} className="mb-0! mt-3!">
                              <Input size="large" className="w-full" placeholder="Qual?" />
                            </Form.Item>
                          )
                        }
                      </Form.Item>
                    </div>
                  </div>
                </div>

                {/* Grau de acordo com o CTCAE v.6: */}
                <div className="col-span-4 mt-4">
                  <div className="grid grid-cols-2 border-2 border-dashed border-[#8BD1C6] rounded-[10px]">
                    <div className="p-4 border-r-2 border-r-[#8BD1C6] border-dashed bg-[#C5E8E3]">
                      <p className="font-bold">Grau de acordo com o CTCAE v.6</p>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-4">
                      <Form.Item name={[field.name, "serious_adverse_events_adjust_discontinuation_grade"]} className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="1">1</Radio>
                          <Radio value="2">2</Radio>
                          <Radio value="3">3</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item name={[field.name, "serious_adverse_events_adjust_discontinuation_grade"]} className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="4">4</Radio>
                          <Radio value="5 febril">5</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </div>
                </div>

                {/* Data do diagnóstico */}
                <div className="col-span-4 mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-bold pb-2">Data do diagnóstico:</p>
                      <Form.Item name={[field.name, "diagnostic_date"]} className="mb-0!" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                        <DatePicker size="large" className="w-full" />
                      </Form.Item>
                    </div>
                  </div>
                </div>

                {/* Ciclo de tratamento */}
                <div className="col-span-4 mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-bold pb-2">Ciclo de tratamento:</p>
                      <Form.Item name={[field.name, "first_administration_treatment_date"]} className="mb-0!">
                        <InputNumber size="large" className="w-full!" placeholder="0" />
                      </Form.Item>
                    </div>
                  </div>
                </div>

                {/* Necessidade de ajuste do tratamento */}
                <div className="col-span-4 mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3">
                      <p className="font-bold">Necessidade de ajuste do tratamento</p>
                    </div>

                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.palliative_treatment[field.name]?.need_treatment_adjustment !== currentValues.palliative_treatment[field.name]?.need_treatment_adjustment
                      }
                    >
                      {({ getFieldValue }) => (
                        <div>
                          <div
                            className={`${
                              getFieldValue("palliative_treatment")[field.name]?.need_treatment_adjustment === "Suspensão temporária" ? "bg-[#C5E8E3]" : "bg-white"
                            } border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4`}
                          >
                            <Form.Item name={[field.name, "need_treatment_adjustment"]} className="mb-0! flex items-center">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Suspensão temporária">Suspensão temporária</Radio>
                              </Radio.Group>
                            </Form.Item>

                            <Form.List name={[field.name, "need_treatment_adjustment_temporary"]}>
                              {(fieldsTreatmentAdjustment, { add, remove, move }) => (
                                <div>
                                  {fieldsTreatmentAdjustment.map((fieldTreatmentAdjustment) => (
                                    <div className="border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px] mt-4 mb-6 relative">
                                      <p className="pb-2 text-[12px]">Fármaco(s) que foi(oram) suspenso(s):</p>
                                      <Form.Item name={[fieldTreatmentAdjustment.name, "need_treatment_adjustment_temporary_drugs"]} className="mb-0! w-full!">
                                        <Input size="large" className="w-full!" />
                                      </Form.Item>
                                      <p className="pb-2 text-[12px] mt-4">Período de suspensão temporária:</p>
                                      <Form.Item name={[fieldTreatmentAdjustment.name, "need_treatment_adjustment_temporary_days"]} className="mb-0! w-full!">
                                        <InputNumber size="large" className="w-full!" suffix="Dias" />
                                      </Form.Item>
                                      <Button icon={<AiOutlineDelete />} className="absolute! -top-4.5 -right-2.5" onClick={() => remove(fieldTreatmentAdjustment.name)}></Button>
                                    </div>
                                  ))}

                                  {getFieldValue("palliative_treatment")[field.name]?.need_treatment_adjustment === "Suspensão temporária" ? (
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
                        prevValues.palliative_treatment[field.name]?.need_treatment_adjustment !== currentValues.palliative_treatment[field.name]?.need_treatment_adjustment
                      }
                    >
                      {({ getFieldValue }) => (
                        <div>
                          <div
                            className={`${
                              getFieldValue("palliative_treatment")[field.name]?.need_treatment_adjustment === "Descontinuação definitiva" ? "bg-[#C5E8E3]" : "bg-white"
                            } border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4`}
                          >
                            <Form.Item name={[field.name, "need_treatment_adjustment"]} className="mb-0! flex items-center">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Descontinuação definitiva">Descontinuação definitiva</Radio>
                              </Radio.Group>
                            </Form.Item>

                            <Form.List name={[field.name, "need_treatment_adjustment_discontinuation"]}>
                              {(fieldsTreatmentAdjustmentDiscontinuation, { add, remove, move }) => (
                                <div>
                                  {fieldsTreatmentAdjustmentDiscontinuation.map((fieldTreatmentAdjustmentDiscontinuation) => (
                                    <div className="border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px] mt-4 mb-6 relative">
                                      <p className="pb-2 text-[12px]">Fármaco(s) que foi(oram) suspenso(s):</p>
                                      <Form.Item name={[fieldTreatmentAdjustmentDiscontinuation.name, "need_treatment_adjustment_discontinuation_drugs"]} className="mb-0! w-full!">
                                        <Input size="large" className="w-full!" />
                                      </Form.Item>
                                      <p className="pb-2 text-[12px] mt-4">Período de suspensão temporária:</p>
                                      <Form.Item name={[fieldTreatmentAdjustmentDiscontinuation.name, "need_treatment_adjustment_discontinuation_days"]} className="mb-0! w-full!">
                                        <InputNumber size="large" className="w-full!" suffix="Dias" />
                                      </Form.Item>
                                      <Button
                                        icon={<AiOutlineDelete />}
                                        className="absolute! -top-4.5 -right-2.5"
                                        onClick={() => remove(fieldTreatmentAdjustmentDiscontinuation.name)}
                                      ></Button>
                                    </div>
                                  ))}
                                  {getFieldValue("palliative_treatment")[field.name]?.need_treatment_adjustment === "Descontinuação definitiva" ? (
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
                        prevValues.palliative_treatment[field.name]?.need_treatment_adjustment !== currentValues.palliative_treatment[field.name]?.need_treatment_adjustment
                      }
                    >
                      {({ getFieldValue }) => (
                        <div>
                          <div
                            className={`${
                              getFieldValue("palliative_treatment")[field.name]?.need_treatment_adjustment === "Redução de dose" ? "bg-[#C5E8E3]" : "bg-white"
                            } border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4`}
                          >
                            <Form.Item name="need_treatment_adjustment" className="mb-0! flex items-center">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Redução de dose">Redução de dose</Radio>
                              </Radio.Group>
                            </Form.Item>

                            <Form.List name={[field.name, "need_treatment_adjustment_reduction"]}>
                              {(fieldsTreatmentAdjustmentReduction, { add, remove, move }) => (
                                <div>
                                  {fieldsTreatmentAdjustmentReduction.map((fieldTreatmentAdjustmentReduction) => (
                                    <div className="border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px] mt-4 mb-6 relative">
                                      <p className="pb-2 text-[12px]">Fármaco(s) que foi(oram) suspenso(s):</p>
                                      <Form.Item name={[fieldTreatmentAdjustmentReduction.name, "need_treatment_adjustment_reduction_drugs"]} className="mb-0! w-full!">
                                        <Input size="large" className="w-full!" />
                                      </Form.Item>
                                      <p className="pb-2 text-[12px] mt-4">Período de suspensão temporária:</p>
                                      <Form.Item name={[fieldTreatmentAdjustmentReduction.name, "need_treatment_adjustment_reduction_days"]} className="mb-0! w-full!">
                                        <InputNumber size="large" className="w-full!" suffix="Dias" />
                                      </Form.Item>
                                      <Button
                                        icon={<AiOutlineDelete />}
                                        className="absolute! -top-4.5 -right-2.5"
                                        onClick={() => remove(fieldTreatmentAdjustmentReduction.name)}
                                      ></Button>
                                    </div>
                                  ))}

                                  {getFieldValue("palliative_treatment")[field.name]?.need_treatment_adjustment === "Redução de dose" ? (
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
                <div className="col-span-4 mt-6">
                  <p className="font-bold">Se tratamentos com imunoterapia (Pembrolizumab ou Nivolumab)</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4">
                  <p className="pb-2">(Hora de administração de cada ciclo de imunoterapia)</p>
                  <div className="border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px] mt-4">
                    <Form.List name={[field.name, "time_administration_immunotherapy_cycle"]}>
                      {(fieldsTimeAdministration, { add, remove, move }) => (
                        <div className="relative grid grid-cols-3 gap-4">
                          {fieldsTimeAdministration.map((fieldTimeAdministration) => (
                            <>
                              <div>
                                <p className="pb-2 font-bold">{fieldTimeAdministration.name}º Ciclo de imunoterapia</p>
                                <Form.Item name={[fieldTimeAdministration.name, "date"]} className="mb-0! w-full!" getValueProps={(value) => ({ value: value && dayjs(value) })}>
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

                {/* Se tratamentos com imunoterapia (Pembrolizumab ou Nivolumab) */}
                <div className="col-span-4 mt-6">
                  <p className="font-bold">Eventos adversos de interesse da imunoterapia</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_reason"]} className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="Pneumonite">Pneumonite</Radio>
                          <Radio value="Hepatite">Hepatite</Radio>
                          <Radio value="Hipotiroidismo">Hipotiroidismo</Radio>
                          <Radio value="Insuficiência da suprarrenal">Insuficiência da suprarrenal</Radio>
                          <Radio value="Nefrite">Nefrite</Radio>
                          <Radio value="Colite">Colite</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div>
                      <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_reason"]} className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="Miocardite">Miocardite</Radio>
                          <Radio value="Diabetes">Diabetes</Radio>
                          <Radio value="Outra toxicidade imuno-mediada">Outra toxicidade imuno-mediada:</Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.palliative_treatment[field.name]?.serious_adverse_events_immunotherapy !==
                          currentValues.palliative_treatment[field.name]?.serious_adverse_events_immunotherapy
                        }
                      >
                        {({ getFieldValue }) =>
                          getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_immunotherapy_reason === "Outra toxicidade imuno-mediada" && (
                            <Form.Item name="serious_adverse_events_immunotherapy_reason_other" className="mb-0! mt-3!">
                              <Input size="large" className="w-full" placeholder="Qual?" />
                            </Form.Item>
                          )
                        }
                      </Form.Item>
                    </div>
                  </div>

                  {/* Grau de acordo com o CTCAE v.6: */}
                  <div className="col-span-4 mt-6">
                    <div className="grid grid-cols-2 border-2 border-dashed border-[#8BD1C6] rounded-[10px]">
                      <div className="p-4 border-r-2 border-r-[#8BD1C6] border-dashed bg-[#C5E8E3]">
                        <p className="font-bold">Grau de acordo com o CTCAE v.6</p>
                      </div>
                      <div className="p-4 grid grid-cols-2 gap-4">
                        <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_grade"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="1">1</Radio>
                            <Radio value="2">2</Radio>
                            <Radio value="3">3</Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_grade"]} className="mb-0!">
                          <Radio.Group className="flex w-full!" size="large">
                            <Radio value="4">4</Radio>
                            <Radio value="5 febril">5</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data do diagnóstico */}
                <div className="col-span-4 mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-bold pb-2">Data do diagnóstico:</p>
                      <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_date"]} className="mb-0!" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                        <DatePicker size="large" className="w-full" />
                      </Form.Item>
                    </div>
                  </div>
                </div>

                {/* Ciclo de tratamento */}
                <div className="col-span-4 mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-bold pb-2">Ciclo de tratamento:</p>
                      <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_treatment_cycle"]} className="mb-0!">
                        <InputNumber size="large" className="w-full!" placeholder="0" />
                      </Form.Item>
                    </div>
                  </div>
                </div>

                {/* Internamento */}
                <div className="col-span-4 mt-4">
                  <p className="font-bold pb-2">Internamento:</p>
                  <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_hospitalization"]} className="mb-0!" layout="horizontal">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Sim">Sim</Radio>
                      <Radio value="Não">Não</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>

                {/* Necessidade de corticoterapia */}
                <div className="col-span-4 mt-4">
                  <p className="font-bold pb-2">Necessidade de corticoterapia:</p>
                  <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_corticosteroid_therapy"]} className="mb-0!" layout="horizontal">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Sim">Sim</Radio>
                      <Radio value="Não">Não</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>

                {/* Necessidade de ajuste do tratamento */}
                <div className="col-span-4 mt-4">
                  <p className="font-bold pb-2">Necessidade de ajuste do tratamento:</p>
                  <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_treatment_adjustment"]} className="mb-0!" layout="horizontal">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Sim">Sim</Radio>
                      <Radio value="Não">Não</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.palliative_treatment[field.name]?.serious_adverse_events_immunotherapy_treatment_adjustment !==
                        currentValues.palliative_treatment[field.name]?.serious_adverse_events_immunotherapy_treatment_adjustment ||
                      prevValues.palliative_treatment[field.name]?.serious_adverse_events_immunotherapy_treatment_adjustment_solution !==
                        currentValues.palliative_treatment[field.name]?.serious_adverse_events_immunotherapy_treatment_adjustment_solution
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_immunotherapy_treatment_adjustment === "Sim" && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div
                            className={`border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4 ${
                              getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_immunotherapy_treatment_adjustment_solution ===
                              "Suspensão temporária da imunoterapia"
                                ? "bg-[#C5E8E3]"
                                : " bg-white"
                            }`}
                          >
                            <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_treatment_adjustment_solution"]} className="mb-0!" layout="horizontal">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Suspensão temporária da imunoterapia">Suspensão temporária da imunoterapia</Radio>
                              </Radio.Group>
                            </Form.Item>
                            {getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_immunotherapy_treatment_adjustment_solution ===
                              "Suspensão temporária da imunoterapia" && (
                              <>
                                <p className="pb-2 mt-4">Período de suspensão temporária:</p>
                                <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_treatment_adjustment_temporary_suspension_days"]} className="mb-0! max-w-75">
                                  <InputNumber size="large" className="w-full!" suffix="Dias" />
                                </Form.Item>
                              </>
                            )}
                          </div>
                          <div
                            className={`border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4 ${
                              getFieldValue("palliative_treatment")[field.name]?.serious_adverse_events_immunotherapy_treatment_adjustment_solution ===
                              "Descontinuação definitiva da imunoterapia"
                                ? "bg-[#C5E8E3]"
                                : " bg-white"
                            }`}
                          >
                            <Form.Item name={[field.name, "serious_adverse_events_immunotherapy_treatment_adjustment_solution"]} className="mb-0!" layout="horizontal">
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

                {/* Linha de tratamento ainda em curso */}
                <div className="col-span-4 mt-10">
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
                      <>
                        <div className="col-span-4 mt-2">
                          <p className="font-bold">Data da última administração do tratamento:</p>
                        </div>
                        <div className="col-span-4">
                          <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        </div>
                        <div className="col-span-4">
                          <div className="grid grid-cols-3 gap-4">
                            <Form.Item name="treatment_line_ending_date" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                              <DatePicker className="w-full" />
                            </Form.Item>
                          </div>
                        </div>
                      </>
                    )
                  }
                </Form.Item>

                {/* Número total de ciclos completos tratamento administrados */}
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.palliative_treatment[field.name]?.treatment_line_ongoing !== currentValues.palliative_treatment[field.name]?.treatment_line_ongoing
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue("palliative_treatment")[field.name]?.treatment_line_ongoing === "Não" && (
                      <>
                        <div className="col-span-4 mt-2">
                          <p className="font-bold">Número total de ciclos completos tratamento administrados</p>
                        </div>
                        <div className="col-span-4">
                          <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        </div>
                        <div className="col-span-4">
                          <div className="grid grid-cols-3 gap-4">
                            <Form.Item name={[field.name, "complete_cycles_administrated_treatment"]}>
                              <InputNumber className="w-full!" placeholder="0" />
                            </Form.Item>
                          </div>
                        </div>
                      </>
                    )
                  }
                </Form.Item>

                {/* Melhor resposta imagiológica */}
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.palliative_treatment[field.name]?.treatment_line_ongoing !== currentValues.palliative_treatment[field.name]?.treatment_line_ongoing
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue("palliative_treatment")[field.name]?.treatment_line_ongoing === "Não" && (
                      <>
                        <div className="col-span-4 mt-2">
                          <p className="font-bold">Melhor resposta imagiológica</p>
                        </div>
                        <div className="col-span-4">
                          <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        </div>
                        <div className="col-span-4">
                          <div className="grid grid-cols-2">
                            <Form.Item name={[field.name, "better_response_imagiologic"]} className="mb-0!">
                              <Radio.Group className="flex w-full!" size="large">
                                <Radio value="Resposta completa">Resposta completa</Radio>
                                <Radio value="Resposta parcial">Resposta parcial</Radio>
                                <Radio value="Doença estável">Doença estável</Radio>
                                <Radio value="Progressão da doença">Progressão da doença</Radio>
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
                        </div>
                      </>
                    )
                  }
                </Form.Item>

                {/* Data da melhor resposta imagiológica */}
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.palliative_treatment[field.name]?.treatment_line_ongoing !== currentValues.palliative_treatment[field.name]?.treatment_line_ongoing
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue("palliative_treatment")[field.name]?.treatment_line_ongoing === "Não" && (
                      <>
                        <div className="col-span-4 mt-6">
                          <p className="font-bold">Data da melhor resposta imagiológica</p>
                        </div>
                        <div className="col-span-4">
                          <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        </div>
                        <div className="col-span-4">
                          <div className="grid grid-cols-3 gap-4">
                            <Form.Item name={[field.name, "best_imagiologic_response_date"]} getValueProps={(value) => ({ value: value && dayjs(value) })}>
                              <DatePicker className="w-full" />
                            </Form.Item>
                          </div>
                        </div>
                      </>
                    )
                  }
                </Form.Item>

                {/* Tempo até resposta clínica */}
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.palliative_treatment[field.name]?.treatment_line_ongoing !== currentValues.palliative_treatment[field.name]?.treatment_line_ongoing
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue("palliative_treatment")[field.name]?.treatment_line_ongoing === "Não" && (
                      <>
                        <div className="col-span-4 mt-6">
                          <p className="font-bold">Tempo até resposta clínica (se doente sintomático aquando do ínicio do tratamento)</p>
                        </div>
                        <div className="col-span-4">
                          <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                        </div>
                        <div className="col-span-4">
                          <Form.Item name={[field.name, "time_until_clinic_response"]} className="mb-0!" layout="horizontal">
                            <Radio.Group className="flex w-full!" size="large">
                              <Radio value="=< 1 mês">{"=< 1 mês"}</Radio>
                              <Radio value="1 - 3 meses">{"1 - 3 meses"}</Radio>
                              <Radio value="> 3 meses">{"> 3 meses"}</Radio>
                              <Radio value="Doente assintomático aquando do início do tratamento">Doente assintomático aquando do início do tratamento</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                      </>
                    )
                  }
                </Form.Item>

                {/* Referenciação a Cuidados Paliativos */}
                <div className="col-span-4 mt-6">
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
                              className="mb-0!"
                              layout="horizontal"
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

                {/* Diagnóstico de tumor metácrono */}
                <div className="col-span-4 mt-6">
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
                            <Form.Item name={[field.name, "diagnosis_metachronous_tumor_location"]} className="mb-0!" getValueProps={(value) => ({ value: value && dayjs(value) })}>
                              <DatePicker className="w-full" />
                            </Form.Item>
                          </div>
                          <div>
                            <div className="flex items-center pb-2">
                              <p className="mr-1">Data do diagnóstico</p>
                              <Tooltip placement="topLeft" title={"considerar a data da biópsia"}>
                                <AiOutlineInfoCircle />
                              </Tooltip>
                            </div>
                            <Form.Item
                              name={[field.name, "diagnosis_metachronous_tumor_date"]}
                              className="mb-0!"
                              layout="horizontal"
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

                {/* Óbito */}
                <div className="col-span-4 mt-6">
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
              </div>
            ))
          }
        </Form.List>
      </div>

      <div className="col-span-4">
        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
      </div>
      <div className="col-span-4">
        <Button type="primary" size="large" icon={<AiOutlinePlusCircle />}>
          Nova linha de tratamento
        </Button>
      </div>
    </div>
  );
}
