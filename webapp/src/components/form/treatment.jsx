import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch, TimePicker, Tooltip } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlineInfoCircle, AiOutlinePlusCircle } from "react-icons/ai";

import helpers from "../../utils/helpers";
import CharlsonIndex from "../charlsonIndex";

export default function Treatment({ form, next, previous }) {
  const [selectedTreatmentLine, setSelectedTreatmentLine] = useState(1);

  function addTreatmentLine(e) {
    let lines = form.getFieldValue("treatment");
    form.setFieldValue("treatment", [...(lines || []), {}]);
  }

  function selectLine(e) {
    setSelectedTreatmentLine(e.target.value);
  }

  return (
    <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-4">
      <div className="col-span-4">
        <p className="label">Tratamento</p>
      </div>
      <div className="col-span-4">
        <div className="flex justify-between items-center">
          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.palliative_treatment !== currentValues.palliative_treatment}>
            {({ getFieldValue }) => (
              <Radio.Group className="flex w-full!" size="large" onChange={selectLine}>
                {getFieldValue("treatment") ? getFieldValue("treatment").map((item, index) => <Radio value={index + 1}>{index + 1}ª linha</Radio>) : null}
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
        <Form.List name="treatment">
          {(fields, { add, remove, move }) =>
            fields.map((field, fieldInd) => (
              <div className={`grid-cols-4 gap-x-12 gap-y-4 mt-4 ${selectedTreatmentLine === fieldInd + 1 ? "grid" : "hidden"}`}>
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

                {/* EBV plasmático ao início do tratamento */}
                <div className="col-span-4 mt-2">
                  <p className="font-bold">EBV plasmático ao início do tratamento</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
                </div>
                <div className="col-span-4 flex justify-start items-start gap-x-12">
                  <Form.Item name={[field.name, "plasmatic_ebv"]} layout="horizontal" className="mb-0!">
                    <Radio.Group size="large" options={[{ value: "Desconhecido/não realizado", label: "Desconhecido/não realizado" }]} />
                  </Form.Item>
                  <div>
                    <Form.Item name={[field.name, "plasmatic_ebv"]} layout="horizontal" className="mb-0!">
                      <Radio.Group size="large" options={[{ value: "Doseamento", label: "Doseamento" }]} />
                    </Form.Item>

                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) => prevValues.treatment[field.name].plasmatic_ebv !== currentValues.treatment[field.name].plasmatic_ebv}
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("plasmatic_ebv") === "Doseamento" && (
                          <Form.Item name={[field.name, "plasmatic_ebv_dose"]} layout="horizontal" className="mb-0! mt-2!">
                            <InputNumber size="large" className="min-w-[250px]!" />
                          </Form.Item>
                        )
                      }
                    </Form.Item>
                  </div>
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
                        shouldUpdate={(prevValues, currentValues) => prevValues.treatment[field.name]?.treatment_scheme !== currentValues.treatment[field.name]?.treatment_scheme}
                      >
                        {({ getFieldValue }) =>
                          getFieldValue("treatment")[field.name]?.treatment_scheme === "Ensaio clínico" && (
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
                        shouldUpdate={(prevValues, currentValues) => prevValues.treatment[field.name]?.treatment_scheme !== currentValues.treatment[field.name]?.treatment_scheme}
                      >
                        {({ getFieldValue }) =>
                          getFieldValue("treatment")[field.name]?.treatment_scheme === "Outro" && (
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

                {/* Data da última administração do tratamento */}
                <div className="col-span-4 mt-2">
                  <p className="font-bold">Data da última administração do tratamento:</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4">
                  <Form.Item name={[field.name, "last_administration_treatment_date"]} getValueProps={(value) => ({ value: value && dayjs(value) })}>
                    <DatePicker className="w-full" />
                  </Form.Item>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Form.Item name={[field.name, "treatment_ending_motive"]} className="mb-0!">
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

                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.treatment[field.name]?.treatment_ending_motive !== currentValues.treatment[field.name]?.treatment_ending_motive
                        }
                      >
                        {({ getFieldValue }) =>
                          getFieldValue("treatment")[field.name]?.treatment_ending_motive === "Outro" && (
                            <Form.Item name={[field.name, "treatment_ending_motive_other"]} className="mb-0! mt-3!">
                              <Input size="large" className="w-full" placeholder="Qual?" />
                            </Form.Item>
                          )
                        }
                      </Form.Item>
                    </div>
                    <div className="col-span-2">
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.treatment[field.name]?.treatment_ending_motive !== currentValues.treatment[field.name]?.treatment_ending_motive
                        }
                      >
                        {({ getFieldValue }) =>
                          getFieldValue("treatment")[field.name]?.treatment_ending_motive === "Suspensão eletiva" && (
                            <div className="flex flex-col">
                              <p>Suspensão eletiva</p>
                              <div className="grid grid-cols-2  mt-4">
                                <div className="p-4 bg-[#C5E8E3] border-[2px_2px_2px_2px] rounded-l-[10px] border-dashed border-[#8BD1C6]">
                                  <Form.Item name={[field.name, "treatment_ending_elective_suspension"]} className="mb-0!">
                                    <Radio.Group className="flex w-full!" size="large">
                                      <Radio value="Tempo de duração do tratamento">Tempo de duração do tratamento</Radio>
                                    </Radio.Group>
                                  </Form.Item>

                                  <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) =>
                                      prevValues.treatment[field.name]?.treatment_ending_elective_suspension !==
                                      currentValues.treatment[field.name]?.treatment_ending_elective_suspension
                                    }
                                  >
                                    {({ getFieldValue }) =>
                                      getFieldValue("treatment")[field.name]?.treatment_ending_elective_suspension === "Tempo de duração do tratamento" && (
                                        <>
                                          <p className="pb-2 mt-4">Início</p>
                                          <Form.Item
                                            name={[field.name, "treatment_ending_elective_suspension_time_start"]}
                                            getValueProps={(value) => ({ value: value && dayjs(value) })}
                                          >
                                            <DatePicker className="w-full" />
                                          </Form.Item>
                                          <p className="pb-2">Fim</p>
                                          <Form.Item
                                            name={[field.name, "treatment_ending_elective_suspension_time_end"]}
                                            getValueProps={(value) => ({ value: value && dayjs(value) })}
                                          >
                                            <DatePicker className="w-full" />
                                          </Form.Item>
                                        </>
                                      )
                                    }
                                  </Form.Item>
                                </div>
                                <div className="p-4 border-[2px_2px_2px_0px] rounded-r-[10px] border-dashed border-[#8BD1C6]">
                                  <Form.Item name={[field.name, "treatment_ending_elective_suspension"]} className="mb-0!">
                                    <Radio.Group className="flex w-full!" size="large">
                                      <Radio value="Ciclos de tratamento">Ciclos de tratamento</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                  <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) =>
                                      prevValues.treatment[field.name]?.treatment_ending_elective_suspension !==
                                      currentValues.treatment[field.name]?.treatment_ending_elective_suspension
                                    }
                                  >
                                    {({ getFieldValue }) =>
                                      getFieldValue("treatment")[field.name]?.treatment_ending_elective_suspension === "Ciclos de tratamento" && (
                                        <Form.Item name={[field.name, "treatment_ending_elective_suspension_cycles"]} className="mb-0! mt-3!">
                                          <InputNumber size="large" min={0} className="w-full!" placeholder="0" />
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
                      <div></div>
                    </div>
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
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Form.Item name={[field.name, "best_imaging_response"]} className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="Resposta completa">Resposta completa</Radio>
                          <Radio value="Resposta parcial">Resposta parcial</Radio>
                          <Radio value="Doença estável">Doença estável</Radio>
                          <Radio value="Progressão da doença">Progressão da doença</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div className="col-span-2">
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.treatment[field.name]?.best_imaging_response !== currentValues.treatment[field.name]?.best_imaging_response
                        }
                      >
                        {({ getFieldValue }) =>
                          getFieldValue("treatment")[field.name]?.best_imaging_response === "Progressão da doença" && (
                            <div className="flex flex-col">
                              <p>Progressão da doença</p>
                              <div className="grid grid-cols-2  mt-4">
                                <div className="p-4 bg-[#C5E8E3] border-[2px_2px_2px_2px] rounded-[10px] border-dashed border-[#8BD1C6]">
                                  <Form.Item name={[field.name, "best_imaging_response_disease_progression"]} className="mb-0!">
                                    <Radio.Group className="flex w-full!" size="large">
                                      <Radio value="Locorregional">Locorregional</Radio>
                                      <Radio value="À distância">À distância</Radio>
                                      <Radio value="Ambos">Ambos</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      </Form.Item>
                    </div>
                  </div>
                </div>

                {/* Data da melhor resposta imagiológica */}
                <div className="col-span-4 mt-2">
                  <p className="font-bold">Data da melhor resposta imagiológica:</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4">
                  <Form.Item name={[field.name, "best_imaging_response_date"]} getValueProps={(value) => ({ value: value && dayjs(value) })}>
                    <DatePicker className="w-full" />
                  </Form.Item>
                </div>

                {/* Eventos adversos graves que motivaram ajuste de dose ou suspensão do tratamento */}
                <div className="col-span-4 mt-2">
                  <p className="font-bold">Eventos adversos graves que motivaram ajuste de dose ou suspensão do tratamento</p>
                </div>
                <div className="col-span-4">
                  <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
                </div>
                <div className="col-span-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Form.Item name={[field.name, "adverses_events"]} className="mb-0!">
                        <Radio.Group className="flex w-full!" size="large">
                          <Radio value="Classificação segundo CTCAE v.6">Classificação segundo CTCAE v.6</Radio>
                          <Radio value="Data do diagnóstico">Data do diagnóstico</Radio>
                          <Radio value="Ciclo de tratamento">Ciclo de tratamento</Radio>
                          <Radio value="Necessidade de ajuste do tratamento">Necessidade de ajuste do tratamento</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div className="col-span-2">
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.treatment[field.name]?.adverses_events !== currentValues.treatment[field.name]?.adverses_events}
                      >
                        {({ getFieldValue }) =>
                          getFieldValue("treatment")[field.name]?.adverses_events === "Necessidade de ajuste do tratamento" && (
                            <div className="flex flex-col">
                              <p>Necessidade de ajuste do tratamento</p>
                              <div className="p-4 bg-[#C5E8E3] border-[2px_2px_2px_2px] rounded-[10px] border-dashed border-[#8BD1C6] mt-4">
                                <div>
                                  <Form.Item name={[field.name, "adverses_events_adjustment_treatment"]} className="mb-0!">
                                    <Radio.Group className="flex w-full!" size="large">
                                      <Radio value="Suspensão temporária">Suspensão temporária</Radio>
                                    </Radio.Group>
                                  </Form.Item>

                                  <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) =>
                                      prevValues.treatment[field.name]?.adverses_events_adjustment_treatment !==
                                      currentValues.treatment[field.name]?.adverses_events_adjustment_treatment
                                    }
                                  >
                                    {({ getFieldValue }) =>
                                      getFieldValue("treatment")[field.name]?.adverses_events_adjustment_treatment === "Suspensão temporária" && (
                                        <div className="flex gap-4 justify-start items-center pl-8 mb-4">
                                          <p>Período de suspensão temporária:</p>
                                          <Form.Item name={[field.name, "adverses_events_adjustment_treatment_suspension"]} className="mb-0!">
                                            <InputNumber size="large" min={0} placeholder="0" className="mb-0!" />
                                          </Form.Item>
                                          <p>dias</p>
                                        </div>
                                      )
                                    }
                                  </Form.Item>
                                </div>
                                <div>
                                  <Form.Item name={[field.name, "adverses_events_adjustment_treatment"]} className="mb-0!">
                                    <Radio.Group className="flex w-full!" size="large">
                                      <Radio value="Descontinuação">Descontinuação</Radio>
                                    </Radio.Group>
                                  </Form.Item>

                                  <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) =>
                                      prevValues.treatment[field.name]?.adverses_events_adjustment_treatment !==
                                      currentValues.treatment[field.name]?.adverses_events_adjustment_treatment
                                    }
                                  >
                                    {({ getFieldValue }) =>
                                      getFieldValue("treatment")[field.name]?.adverses_events_adjustment_treatment === "Descontinuação" && (
                                        <div className="flex gap-4 justify-start items-center pl-8 mb-4">
                                          <p>Fármaco que foi descontinuado:</p>
                                          <Form.Item name={[field.name, "adverses_events_adjustment_treatment_discontinuation"]} className="mb-0!">
                                            <Input size="large" className="mb-0!" />
                                          </Form.Item>
                                        </div>
                                      )
                                    }
                                  </Form.Item>
                                </div>
                                <div>
                                  <Form.Item name={[field.name, "adverses_events_adjustment_treatment"]} className="mb-0!">
                                    <Radio.Group className="flex w-full!" size="large">
                                      <Radio value="Redução de dose">Redução de dose</Radio>
                                    </Radio.Group>
                                  </Form.Item>

                                  <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) =>
                                      prevValues.treatment[field.name]?.adverses_events_adjustment_treatment !==
                                      currentValues.treatment[field.name]?.adverses_events_adjustment_treatment
                                    }
                                  >
                                    {({ getFieldValue }) =>
                                      getFieldValue("treatment")[field.name]?.adverses_events_adjustment_treatment === "Redução de dose" && (
                                        <div className="flex flex-col pl-8 mb-4">
                                          <div className="flex gap-4 justify-start items-center">
                                            <p>Fármaco que foi descontinuado:</p>
                                            <Form.Item name={[field.name, "adverses_events_adjustment_treatment_reduction"]} className="mb-0!">
                                              <Input size="large" className="mb-0!" />
                                            </Form.Item>
                                          </div>
                                          <div className="flex gap-4 justify-start items-center mt-4">
                                            <p>Percent. em que a dose foi reduzida:</p>
                                            <Form.Item name={[field.name, "adverses_events_adjustment_treatment_reduction_percentage"]} className="mb-0!">
                                              <InputNumber size="large" className="mb-0!" />
                                            </Form.Item>
                                            <p>%</p>
                                          </div>
                                        </div>
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
                  </div>
                </div>
              </div>
            ))
          }
        </Form.List>
      </div>
    </div>
  );
}
