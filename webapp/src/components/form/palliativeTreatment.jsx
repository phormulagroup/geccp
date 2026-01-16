import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch, TimePicker } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";

import helpers from "../../utils/helpers";
import CharlsonIndex from "../charlsonIndex";

export default function PalliativeTreatment({ form, next, previous }) {
  useEffect(() => {
    console.log("wat");
    console.log(form);
  }, []);

  return (
    <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-4">
      <div className="col-span-4">
        <p className="label">Tratamento paliativo</p>
      </div>
      <div className="col-span-4">
        <div className="flex justify-between items-center">
          <Form.Item name="palliative_treatment" layout="horizontal" className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="Primeira linha">Primeira linha</Radio>
              <Radio value="Segunda linha">Segunda linha</Radio>
            </Radio.Group>
          </Form.Item>
          <div>
            <Button type="primary" size="large" icon={<AiOutlinePlusCircle />}>
              Nova linha de tratamento
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
      </div>

      {/* Motivo */}
      <div className="col-span-4 mt-2">
        <p className="font-bold">Motivo</p>
      </div>
      <div className="col-span-4">
        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
      </div>
      <div className="col-span-2">
        <Form.Item name="palliative_treatment_reason" className="mb-0!">
          <Radio.Group className="flex w-full!" size="large">
            <Radio value="Doente considerado pela equipa médica unfit para tratamento radical">Doente considerado pela equipa médica unfit para tratamento radical</Radio>
            <Radio value="Doente recusou tratamento radical">Doente recusou tratamento radical</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
      <div className="flex items-start col-span-2">
        <div className="flex items-center w-full">
          <Form.Item name="palliative_treatment_reason" className="mb-0! flex justify-center items-center" layout="vertical">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="Outro">Outro</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.palliative_treatment_reason !== currentValues.palliative_treatment_reason}>
            {({ getFieldValue }) => (
              <Form.Item name="palliative_treatment_reason_other" className="mb-0! w-full" hidden={getFieldValue("palliative_treatment_reason") !== "Outro"}>
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
        <Form.Item name="palliative_treatment_reason" className="mb-0!" layout="horizontal">
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
          shouldUpdate={(prevValues, currentValues) => prevValues.palliative_treatment_sinals_or_symptoms !== currentValues.palliative_treatment_sinals_or_symptoms}
        >
          {({ getFieldValue }) => (
            <>
              <div
                className={`${
                  getFieldValue("palliative_treatment_sinals_or_symptoms") === "Sintomas" ? "col-span-2 border-r-2  border-dashed border-[#8BD1C6]" : "col-span-4"
                } p-4 bg-[#C5E8E3] rounded-l-[10px]`}
              >
                <Form.Item name="palliative_treatment_sinals_or_symptoms" className="mb-0!">
                  <Radio.Group className="flex w-full!" size="large">
                    <Radio value="Sintomas">Sintomas</Radio>
                    <Radio value="Alterações imagiológicas ou laboratoriais que requerem resposta rápida">
                      Alterações imagiológicas ou laboratoriais que requerem resposta rápida
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              {getFieldValue("palliative_treatment_sinals_or_symptoms") === "Sintomas" && (
                <div className="flex flex-col p-4">
                  <Form.Item name="palliative_treatment_symptoms_details" className="mb-0!">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Assintomático">Assintomático</Radio>
                      <Radio value="Moderadamente sintomático">Moderadamente sintomático</Radio>
                      <Radio value="Altamente sintomático">Altamente sintomático</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <p className="mt-[24px] pb-[8px]">Especifique</p>
                  <Form.Item name="palliative_treatment_symptoms_details_specify" className="mb-0!">
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
            <Form.Item name="palliative_treatment_symptoms_details" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="Cetuximab + docetaxel + cisplatina">Cetuximab + docetaxel + cisplatina</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div>
            <Form.Item name="palliative_treatment_symptoms_details" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="Pembrolizumab + cisplatina + 5FU">Pembrolizumab + cisplatina + 5FU</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div>
            <Form.Item name="palliative_treatment_symptoms_details" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="Paclitaxel + carboplatina">Paclitaxel + carboplatina</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div>
            <Form.Item name="palliative_treatment_symptoms_details" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="Cetuximab + paclitaxel">Cetuximab + paclitaxel</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div>
            <Form.Item name="palliative_treatment_symptoms_details" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="Cetuximab + docetaxel + carboplatina">Cetuximab + docetaxel + carboplatina</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div>
            <Form.Item name="palliative_treatment_symptoms_details" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="Pembrolizumab + carboplatina + 5FU">Pembrolizumab + carboplatina + 5FU</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div>
            <Form.Item name="palliative_treatment_symptoms_details" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="Pembrolizumab em monoterapia">Pembrolizumab em monoterapia</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div>
            <Form.Item name="palliative_treatment_symptoms_details" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="Metotrexato">Metotrexato</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div>
            <Form.Item name="palliative_treatment_symptoms_details" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="Ensaio clínico">Ensaio clínico</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.palliative_treatment_symptoms_details !== currentValues.palliative_treatment_symptoms_details}
            >
              {({ getFieldValue }) =>
                getFieldValue("palliative_treatment_symptoms_details") === "Ensaio clínico" && (
                  <Form.Item name="palliative_treatment_symptoms_details_clinical_trial" className="mb-0! mt-[12px]!">
                    <Input size="large" className="w-full" placeholder="Qual?" />
                  </Form.Item>
                )
              }
            </Form.Item>
          </div>
          <div>
            <Form.Item name="palliative_treatment_symptoms_details" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="Outro">Outro</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.palliative_treatment_symptoms_details !== currentValues.palliative_treatment_symptoms_details}
            >
              {({ getFieldValue }) =>
                getFieldValue("palliative_treatment_symptoms_details") === "Outro" && (
                  <Form.Item name="palliative_treatment_symptoms_details_other" className="mb-0! mt-[12px]!">
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
        <div className="grid grid-cols-4 gap-4">
          <Form.Item name="first_administration_treatment_date" className="mb-0!">
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
            <Form.Item name="serious_adverse_events_adjust_discontinuation" className="mb-0!">
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
            <Form.Item name="serious_adverse_events_adjust_discontinuation" className="mb-0!">
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
              shouldUpdate={(prevValues, currentValues) => prevValues.serious_adverse_events_adjust_discontinuation !== currentValues.serious_adverse_events_adjust_discontinuation}
            >
              {({ getFieldValue }) =>
                getFieldValue("serious_adverse_events_adjust_discontinuation") === "Outro" && (
                  <Form.Item name="serious_adverse_events_adjust_discontinuation_other" className="mb-0! mt-[12px]!">
                    <Input size="large" className="w-full" placeholder="Qual?" />
                  </Form.Item>
                )
              }
            </Form.Item>
          </div>
        </div>
      </div>

      {/* Grau de acordo com o CTCAE v.5: */}
      <div className="col-span-4 mt-4">
        <div className="grid grid-cols-2 border-2 border-dashed border-[#8BD1C6] rounded-[10px]">
          <div className="p-4 border-r-2 border-r-[#8BD1C6] border-dashed bg-[#C5E8E3]">
            <p className="font-bold">Grau de acordo com o CTCAE v.5</p>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            <Form.Item name="serious_adverse_events_adjust_discontinuation_grade" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="serious_adverse_events_adjust_discontinuation_grade" className="mb-0!">
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
            <p className="font-bold pb-[8px]">Data do diagnóstico:</p>
            <Form.Item name="diagnostic_date" className="mb-0!">
              <DatePicker size="large" className="w-full" />
            </Form.Item>
          </div>
        </div>
      </div>

      {/* Ciclo de tratamento */}
      <div className="col-span-4 mt-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-bold pb-[8px]">Ciclo de tratamento:</p>
            <Form.Item name="first_administration_treatment_date" className="mb-0!">
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

          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.need_treatment_adjustment !== currentValues.need_treatment_adjustment}>
            {({ getFieldValue }) => (
              <div>
                <div
                  className={`${
                    getFieldValue("need_treatment_adjustment") === "Suspensão temporária" ? "bg-[#C5E8E3]" : "bg-white"
                  } border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4`}
                >
                  <Form.Item name="need_treatment_adjustment" className="mb-0! flex items-center">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Suspensão temporária">Suspensão temporária</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.List name="need_treatment_adjustment_temporary">
                    {(fields, { add, remove, move }) => (
                      <div>
                        {fields.map((field) => (
                          <div className="border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px] mt-4 mb-6 relative">
                            <p className="pb-[8px] text-[12px]">Fármaco(s) que foi(oram) suspenso(s):</p>
                            <Form.Item name={[field.name, "need_treatment_adjustment_temporary_drugs"]} className="mb-0! w-full!">
                              <Input size="large" className="w-full!" />
                            </Form.Item>
                            <p className="pb-[8px] text-[12px] mt-4">Período de suspensão temporária:</p>
                            <Form.Item name={[field.name, "need_treatment_adjustment_temporary_days"]} className="mb-0! w-full!">
                              <InputNumber size="large" className="w-full!" suffix="Dias" />
                            </Form.Item>
                            <Button icon={<AiOutlineDelete />} className="absolute! top-[-18px] right-[-10px]" onClick={() => remove(field.name)}></Button>
                          </div>
                        ))}

                        {getFieldValue("need_treatment_adjustment") === "Suspensão temporária" ? (
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

          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.need_treatment_adjustment !== currentValues.need_treatment_adjustment}>
            {({ getFieldValue }) => (
              <div>
                <div
                  className={`${
                    getFieldValue("need_treatment_adjustment") === "Descontinuação definitiva" ? "bg-[#C5E8E3]" : "bg-white"
                  } border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4`}
                >
                  <Form.Item name="need_treatment_adjustment" className="mb-0! flex items-center">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Descontinuação definitiva">Descontinuação definitiva</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.List name="need_treatment_adjustment_discontinuation">
                    {(fields, { add, remove, move }) => (
                      <div>
                        {fields.map((field) => (
                          <div className="border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px] mt-4 mb-6 relative">
                            <p className="pb-[8px] text-[12px]">Fármaco(s) que foi(oram) suspenso(s):</p>
                            <Form.Item name={[field.name, "need_treatment_adjustment_discontinuation_drugs"]} className="mb-0! w-full!">
                              <Input size="large" className="w-full!" />
                            </Form.Item>
                            <p className="pb-[8px] text-[12px] mt-4">Período de suspensão temporária:</p>
                            <Form.Item name={[field.name, "need_treatment_adjustment_discontinuation_days"]} className="mb-0! w-full!">
                              <InputNumber size="large" className="w-full!" suffix="Dias" />
                            </Form.Item>
                            <Button icon={<AiOutlineDelete />} className="absolute! top-[-18px] right-[-10px]" onClick={() => remove(field.name)}></Button>
                          </div>
                        ))}
                        {getFieldValue("need_treatment_adjustment") === "Descontinuação definitiva" ? (
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

          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.need_treatment_adjustment !== currentValues.need_treatment_adjustment}>
            {({ getFieldValue }) => (
              <div>
                <div
                  className={`${
                    getFieldValue("need_treatment_adjustment") === "Redução de dose" ? "bg-[#C5E8E3]" : "bg-white"
                  } border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4`}
                >
                  <Form.Item name="need_treatment_adjustment" className="mb-0! flex items-center">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Redução de dose">Redução de dose</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.List name="need_treatment_adjustment_reduction">
                    {(fields, { add, remove, move }) => (
                      <div>
                        {fields.map((field) => (
                          <div className="border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px] mt-4 mb-6 relative">
                            <p className="pb-[8px] text-[12px]">Fármaco(s) que foi(oram) suspenso(s):</p>
                            <Form.Item name={[field.name, "need_treatment_adjustment_reduction_drugs"]} className="mb-0! w-full!">
                              <Input size="large" className="w-full!" />
                            </Form.Item>
                            <p className="pb-[8px] text-[12px] mt-4">Período de suspensão temporária:</p>
                            <Form.Item name={[field.name, "need_treatment_adjustment_reduction_days"]} className="mb-0! w-full!">
                              <InputNumber size="large" className="w-full!" suffix="Dias" />
                            </Form.Item>
                            <Button icon={<AiOutlineDelete />} className="absolute! top-[-18px] right-[-10px]" onClick={() => remove(field.name)}></Button>
                          </div>
                        ))}

                        {getFieldValue("need_treatment_adjustment") === "Redução de dose" ? (
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
        <Form.Item name="dpyd_stats">
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
          <Form.List name="time_administration_immunotherapy_cycle">
            {(fields, { add, remove, move }) => (
              <div className="relative grid grid-cols-3 gap-4">
                {fields.map((field) => (
                  <>
                    <div>
                      <p className="pb-[8px] font-bold">{field.name}º Ciclo de imunoterapia</p>
                      <Form.Item name={[field.name, "date"]} className="mb-0! w-full!">
                        <DatePicker size="large" className="w-full!" />
                      </Form.Item>
                    </div>
                    <div>
                      <p className="pb-[8px] font-bold">Hora de ínicio</p>
                      <Form.Item name={[field.name, "time"]} className="mb-0! w-full!">
                        <TimePicker size="large" className="w-full!" />
                      </Form.Item>
                    </div>
                    <div className="flex justify-start items-end">
                      <Button icon={<AiOutlineDelete />} size="large" onClick={() => remove(field.name)}></Button>
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
        <p className="font-bold">Eventos aversos de interesse da imunoterapia</p>
      </div>
      <div className="col-span-4">
        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
      </div>
      <div className="col-span-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Form.Item name="serious_adverse_events_immunotherapy_reason" className="mb-0!">
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
            <Form.Item name="serious_adverse_events_immunotherapy_reason" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="Miocardite">Miocardite</Radio>
                <Radio value="Diabetes">Diabetes</Radio>
                <Radio value="Outra toxicidade imuno-mediada">Outra toxicidade imuno-mediada:</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.serious_adverse_events_immunotherapy !== currentValues.serious_adverse_events_immunotherapy}>
              {({ getFieldValue }) =>
                getFieldValue("serious_adverse_events_immunotherapy_reason") === "Outra toxicidade imuno-mediada" && (
                  <Form.Item name="serious_adverse_events_immunotherapy_reason_other" className="mb-0! mt-[12px]!">
                    <Input size="large" className="w-full" placeholder="Qual?" />
                  </Form.Item>
                )
              }
            </Form.Item>
          </div>
        </div>

        {/* Grau de acordo com o CTCAE v.5: */}
        <div className="col-span-4 mt-6">
          <div className="grid grid-cols-2 border-2 border-dashed border-[#8BD1C6] rounded-[10px]">
            <div className="p-4 border-r-2 border-r-[#8BD1C6] border-dashed bg-[#C5E8E3]">
              <p className="font-bold">Grau de acordo com o CTCAE v.5</p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <Form.Item name="serious_adverse_events_immunotherapy_grade" className="mb-0!">
                <Radio.Group className="flex w-full!" size="large">
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="serious_adverse_events_immunotherapy_grade" className="mb-0!">
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
            <p className="font-bold pb-[8px]">Data do diagnóstico:</p>
            <Form.Item name="serious_adverse_events_immunotherapy_date" className="mb-0!">
              <DatePicker size="large" className="w-full" />
            </Form.Item>
          </div>
        </div>
      </div>

      {/* Ciclo de tratamento */}
      <div className="col-span-4 mt-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-bold pb-[8px]">Ciclo de tratamento:</p>
            <Form.Item name="serious_adverse_events_immunotherapy_treatment_cycle" className="mb-0!">
              <InputNumber size="large" className="w-full!" placeholder="0" />
            </Form.Item>
          </div>
        </div>
      </div>

      {/* Internamento */}
      <div className="col-span-4 mt-4">
        <p className="font-bold pb-[8px]">Internamento:</p>
        <Form.Item name="serious_adverse_events_immunotherapy_hospitalization" className="mb-0!" layout="horizontal">
          <Radio.Group className="flex w-full!" size="large">
            <Radio value="Sim">Sim</Radio>
            <Radio value="Não">Não</Radio>
          </Radio.Group>
        </Form.Item>
      </div>

      {/* Necessidade de corticoterapia */}
      <div className="col-span-4 mt-4">
        <p className="font-bold pb-[8px]">Necessidade de corticoterapia:</p>
        <Form.Item name="serious_adverse_events_immunotherapy_corticosteroid_therapy" className="mb-0!" layout="horizontal">
          <Radio.Group className="flex w-full!" size="large">
            <Radio value="Sim">Sim</Radio>
            <Radio value="Não">Não</Radio>
          </Radio.Group>
        </Form.Item>
      </div>

      {/* Necessidade de ajuste do tratamento */}
      <div className="col-span-4 mt-4">
        <p className="font-bold pb-[8px]">Necessidade de ajuste do tratamento:</p>
        <Form.Item name="serious_adverse_events_immunotherapy_treatment_adjustment" className="mb-0!" layout="horizontal">
          <Radio.Group className="flex w-full!" size="large">
            <Radio value="Sim">Sim</Radio>
            <Radio value="Não">Não</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.serious_adverse_events_immunotherapy_treatment_adjustment !== currentValues.serious_adverse_events_immunotherapy_treatment_adjustment ||
            prevValues.serious_adverse_events_immunotherapy_treatment_adjustment_solution !== currentValues.serious_adverse_events_immunotherapy_treatment_adjustment_solution
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("serious_adverse_events_immunotherapy_treatment_adjustment") === "Sim" && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div
                  className={`border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4 ${
                    getFieldValue("serious_adverse_events_immunotherapy_treatment_adjustment_solution") === "Suspensão temporária da imunoterapia" ? "bg-[#C5E8E3]" : " bg-white"
                  }`}
                >
                  <Form.Item name="serious_adverse_events_immunotherapy_treatment_adjustment_solution" className="mb-0!" layout="horizontal">
                    <Radio.Group className="flex w-full!" size="large">
                      <Radio value="Suspensão temporária da imunoterapia">Suspensão temporária da imunoterapia</Radio>
                    </Radio.Group>
                  </Form.Item>
                  {getFieldValue("serious_adverse_events_immunotherapy_treatment_adjustment_solution") === "Suspensão temporária da imunoterapia" && (
                    <>
                      <p className="pb-2 mt-4">Período de suspensão temporária:</p>
                      <Form.Item name="serious_adverse_events_immunotherapy_treatment_adjustment_temporary_suspension_days" className="mb-0! max-w-[300px]">
                        <InputNumber size="large" className="w-full!" suffix="Dias" />
                      </Form.Item>
                    </>
                  )}
                </div>
                <div
                  className={`border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4 ${
                    getFieldValue("serious_adverse_events_immunotherapy_treatment_adjustment_solution") === "Descontinuação definitiva da imunoterapia"
                      ? "bg-[#C5E8E3]"
                      : " bg-white"
                  }`}
                >
                  <Form.Item name="serious_adverse_events_immunotherapy_treatment_adjustment_solution" className="mb-0!" layout="horizontal">
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
        <Form.Item name="treatment_line_ongoing" className="mb-0!" layout="horizontal">
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
      <div className="col-span-4 mt-2">
        <p className="font-bold">Data da última administração do tratamento:</p>
      </div>
      <div className="col-span-4">
        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
      </div>
      <div className="col-span-4">
        <div className="grid grid-cols-3">
          <Form.Item name="treatment_line_ending_date">
            <DatePicker className="w-full" />
          </Form.Item>
        </div>
      </div>

      {/* Motivo para o término */}
      <div className="col-span-4">
        <div className="grid grid-cols-3 gap-4">
          <p className="pb-2 font-bold">Motivo para o término:</p>
        </div>
      </div>
      <div className="col-span-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Form.Item name="treatment_line_ending_motive" className="mb-0!">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value="Progressão da doença">Progressão da doença</Radio>
                <Radio value="Evento adverso inaceitável">Evento adverso inaceitável</Radio>
                <Radio value="Degradação do estado geral">Degradação do estado geral</Radio>
                <Radio value="Morte com evidência de progressão">Morte com evidência de progressão</Radio>
                <Radio value="Morte sem evidência de progressão">Morte sem evidência de progressão</Radio>
                <Radio value="Suspensão eletiva">Suspensão eletiva</Radio>
                <Radio value="Outro">Outro</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.treatment_line_ending_motive !== currentValues.treatment_line_ending_motive}>
              {({ getFieldValue }) =>
                getFieldValue("treatment_line_ending_motive") === "Outro" && (
                  <Form.Item name="treatment_line_ending_motive_other" className="mb-0! w-full">
                    <Input size="large" className="w-full" placeholder="Qual?" />
                  </Form.Item>
                )
              }
            </Form.Item>
          </div>
          <div className="col-span-2">
            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.treatment_line_ending_motive !== currentValues.treatment_line_ending_motive}>
              {({ getFieldValue }) =>
                getFieldValue("treatment_line_ending_motive") === "Suspensão eletiva" && (
                  <div>
                    <Form.Item name="treatment_line_ending_motive_active_suspension" className="mb-0! w-full">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="Resposta prolongada a imunoterapia">Resposta prolongada a imunoterapia</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.treatment_line_ending_motive_active_suspension !== currentValues.treatment_line_ending_motive_active_suspension
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("treatment_line_ending_motive_active_suspension") === "Resposta prolongada a imunoterapia" && (
                          <div className="grid grid-cols-2 gap-4 mt-2 mb-4">
                            <div className="col-span-2 border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4">
                              <p className="pb-2">Tempo de duração da imunoterapia</p>
                              <Form.Item name="treatment_line_ending_motive_active_suspension_duration_immonutherapy" className="mb-0! w-full" layout="horizontal">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio className="w-1/2 me-0!" value="=< 2 anos">{`=< 2 anos`}</Radio>
                                  <Radio className="w-1/2 me-0!" value="2 - 3 anos">
                                    2 - 3 anos
                                  </Radio>
                                  <Radio className="w-1/2 me-0!" value="4 - 5 anos">
                                    4 - 5 anos
                                  </Radio>
                                  <Radio className="w-1/2 me-0!" value="> 5 anos">
                                    &gt; 5 anos
                                  </Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                            <div className="border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4">
                              <p className="pb-2">Resposta completa em TC / RMN:</p>
                              <Form.Item name="treatment_line_ending_motive_active_suspension_complete_response" className="mb-0! w-full">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio value="Sim">Sim</Radio>
                                  <Radio value="Não">Não</Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                            <div className="border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4">
                              <p className="pb-2">Resposta metabólica completa em PET-FDG:</p>
                              <Form.Item name="treatment_line_ending_motive_active_suspension_complete_methabolic_response" className="mb-0! w-full" layout="horizontal">
                                <Radio.Group className="flex w-full!" size="large">
                                  <Radio className="w-1/2 me-0!" value="Sim">
                                    Sim
                                  </Radio>
                                  <Radio className="w-1/2 me-0!" value="Não">
                                    Não
                                  </Radio>
                                  <Radio className="w-1/2 me-0!" value="Não avaliado">
                                    Não avaliado
                                  </Radio>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                          </div>
                        )
                      }
                    </Form.Item>

                    <Form.Item name="treatment_line_ending_motive_active_suspension" className="mb-0! w-full">
                      <Radio.Group className="flex w-full!" size="large">
                        <Radio value="Outra situação">Outra situação</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.treatment_line_ending_motive_active_suspension !== currentValues.treatment_line_ending_motive_active_suspension
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("treatment_line_ending_motive_active_suspension") === "Outra situação" && (
                          <Form.Item name="treatment_line_ending_motive_active_suspension_other" className="mb-0! mt-2! w-full">
                            <Input size="large" className="w-full" placeholder="Qual?" />
                          </Form.Item>
                        )
                      }
                    </Form.Item>
                  </div>
                )
              }
            </Form.Item>
          </div>
        </div>
      </div>

      {/* Número total de ciclos completos tratamento administrados */}
      <div className="col-span-4 mt-2">
        <p className="font-bold">Número total de ciclos completos tratamento administrados</p>
      </div>
      <div className="col-span-4">
        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
      </div>
      <div className="col-span-4">
        <div className="grid grid-cols-3">
          <Form.Item name="complete_cycles_administrated_treatment">
            <InputNumber className="w-full!" placeholder="0" />
          </Form.Item>
        </div>
      </div>

      {/* Melhor resposta imagiológica */}
      <div className="col-span-4 mt-2">
        <p className="font-bold">Melhor resposta imagiológica</p>
      </div>
      <div className="col-span-4">
        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
      </div>
      <div className="col-span-4">
        <div className="grid grid-cols-2">
          <Form.Item name="better_repsonse_imagiologic" className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="Resposta completa">Resposta completa</Radio>
              <Radio value="Resposta parcial">Resposta parcial</Radio>
              <Radio value="Doença estável">Doença estável</Radio>
              <Radio value="Progressão da doença">Progressão da doença</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.better_repsonse_imagiologic !== currentValues.better_repsonse_imagiologic}>
            {({ getFieldValue }) =>
              getFieldValue("better_repsonse_imagiologic") === "Progressão da doença" && (
                <div>
                  <p className="pb-2">Progressão da doença</p>
                  <div className="bg-[#C5E8E3] border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px]">
                    <Form.Item name="disease_progression" className="mb-0! w-full">
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
    </div>
  );
}
