import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch, TimePicker, Tooltip } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlineInfoCircle, AiOutlinePlusCircle } from "react-icons/ai";

import helpers from "../../utils/helpers";
import CharlsonIndex from "../charlsonIndex";

export default function Recidive({ form, next, previous }) {
  return (
    <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-4">
      <div className="col-span-4">
        <p className="label">Recidiva</p>
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
      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.palliative_treatment !== currentValues.palliative_treatment}>
        {({ getFieldValue }) =>
          getFieldValue("palliative_treatment") === "Primeira linha" && (
            <>
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
            </>
          )
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
                  <p className="mt-6 pb-2">Especifique</p>
                  <Form.Item name="palliative_treatment_symptoms_details_specify" className="mb-0!">
                    <Input size="large" className="w-full" />
                  </Form.Item>
                </div>
              )}
            </>
          )}
        </Form.Item>
      </div>
    </div>
  );
}
