import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch, TimePicker, Tooltip } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlineInfoCircle, AiOutlinePlusCircle } from "react-icons/ai";

import helpers from "../../utils/helpers";
import CharlsonIndex from "../charlsonIndex";

export default function Relapse({ form, next, previous }) {
  return (
    <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-3 gap-x-12 gap-y-4">
      <div className="col-span-3">
        <p className="label">Recidiva</p>
      </div>
      <div className="col-span-3">
        <div className="flex justify-between items-center">
          <Form.Item name="palliative_treatment" layout="horizontal" className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value="Sim">Sim</Radio>
              <Radio value="Não">Não</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      </div>
      <div className="col-span-3">
        <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
      </div>

      {/* Abordagem terapêutica */}
      <div className="col-span-3 mt-2">
        <p className="label">Abordagem terapêutica</p>
      </div>
      <div className="col-span-3">
        <Divider className="mt-0! mb-0! h-[.5] bg-[#17A38D]" />
      </div>
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
          getFieldValue("therapeutic_approach") === "Passível de tratamento radical" && (
            <div className="border-dashed border-2 border-[#8BD1C6] bg-[#C5E8E3] rounded-[10px] col-span-3 mt-4">
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
                        <Radio value="Outro">Outro:</Radio>
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
          )
        }
      </Form.Item>
    </div>
  );
}
