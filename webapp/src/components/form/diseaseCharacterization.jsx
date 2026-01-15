import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";

import helpers from "../../utils/helpers";
import CharlsonIndex from "../charlsonIndex";

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
                name="radiogroup"
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
                name="radiogroup"
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
                name="radiogroup"
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

        <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-4 gap-x-12 gap-y-4 mt-6">
          <div className="col-span-4">
            <p className="label">Traqueostomia</p>
          </div>
          <div className="col-span-4 flex flex-col">
            <Form.Item name="tracheostomy" layout="horizontal" className="mb-0!">
              <Radio.Group
                size="large"
                name="radiogroup"
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
                name="radiogroup"
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
              <Select
                size="large"
                placeholder="Selecionar a histologia"
                options={[
                  { value: "Carcinoma epidermoide", label: "Carcinoma epidermoide" },
                  { value: "Outro", label: "Outro" },
                ]}
              />
            </Form.Item>
            <p className="mb-2">Data da remoção:</p>
            <Form.Item name="tracheostomy_removal_date" layout="horizontal">
              <Select
                size="large"
                placeholder="Selecionar a histologia"
                options={[
                  { value: "Carcinoma epidermoide", label: "Carcinoma epidermoide" },
                  { value: "Outro", label: "Outro" },
                ]}
              />
            </Form.Item>
            <p>Em curso</p>
            <Form.Item name="tracheostomy_ongoing" layout="horizontal" className="mb-0!" valuePropName="checked">
              <Switch size="large" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}
