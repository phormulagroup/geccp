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
                ) : null}
              </div>
            )
          }
        </Form.Item>
      </div>
    </div>
  );
}
