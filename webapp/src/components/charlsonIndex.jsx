import { useState } from "react";
import { Button, Col, Row, Modal, Drawer, Form, Radio } from "antd";

export default function CharlsonIndex({ open, close }) {
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  function calc(_, allValues) {
    console.log(allValues);
    let auxTotal = 0;
    const values = Object.values(allValues);

    for (let i = 0; i < values.length; i++) {
      if (values[i] >= 0 && values[i] !== undefined) {
        console.log(i);
        console.log(values[i]);
        auxTotal += values[i];
      }
    }

    console.log(auxTotal);
    setTotal(auxTotal);
  }

  return (
    <Drawer
      key="modal-learn-more"
      title="Índice de Charlson"
      width={500}
      style={{ top: 20 }}
      onClose={close}
      open={open}
      maskClosable={false}
      extra={[
        <Button type="primary" size="large" onClick={() => close(total)}>
          Submeter
        </Button>,
      ]}
      footer={[
        <div className="bg-[#51BAAA] flex justify-center items-center p-4">
          <p className="text-[38px] text-white font-bold mr-2">{total}</p>
          <p className="text-[14px] text-white">pontos</p>
        </div>,
      ]}
      className="learn-more-modal"
    >
      <div className="flex flex-col">
        <Form form={form} onValuesChange={calc} layout="vertical" id="charlson-index">
          <div className="grid grid-cols-1 gap-x-12 gap-y-4">
            <Form.Item name="age" label="Idades (anos)">
              <Radio.Group
                vertical
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>&lt; 50</p>
                        <p className="text-[10px]">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>50 - 59</p>
                        <p className="text-[10px]">+1</p>
                      </div>
                    ),
                    value: 1,
                  },
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>60 - 69</p>
                        <p className="text-[10px]">+2</p>
                      </div>
                    ),
                    value: 2,
                  },
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>70 - 79</p>
                        <p className="text-[10px]">+3</p>
                      </div>
                    ),
                    value: 3,
                  },
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>&ge; 80</p>
                        <p className="text-[10px]">+4</p>
                      </div>
                    ),
                    value: 4,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="myocardial_infarction" label="Enfarte do miocárdio">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+1</p>
                      </div>
                    ),
                    value: 1,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="chf" label="Insuficiência cardíaca congestiva">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+1</p>
                      </div>
                    ),
                    value: 1,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="peripheral_vascular_disease" label="Doença vascular periférica">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+1</p>
                      </div>
                    ),
                    value: 1,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="cva" label="AVC ou AIT">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+1</p>
                      </div>
                    ),
                    value: 1,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="dementia" label="Demência">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+1</p>
                      </div>
                    ),
                    value: 1,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="chronic_pulmonary_disease" label="Doença pulmonar crónica">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+1</p>
                      </div>
                    ),
                    value: 1,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="connective_tissue_disease" label="Doença do tecido conjuntivo">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+1</p>
                      </div>
                    ),
                    value: 1,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="peptic_ulcer_disease" label="Úlcera péptica">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+1</p>
                      </div>
                    ),
                    value: 1,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="liver_disease" label="Doença hepática">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>Nenhuma</p>
                        <p className="text-[10px]">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>Suave</p>
                        <p className="text-[10px]">+1</p>
                      </div>
                    ),
                    value: 1,
                  },
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>Moderada a severa</p>
                        <p className="text-[10px]">+3</p>
                      </div>
                    ),
                    value: 3,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item
              name="diabetes_mellitus"
              label={
                <span>
                  Diabetes <i>mellitus</i>
                </span>
              }
            >
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>Nenhuma ou controlada pela dieta</p>
                        <p className="text-[10px]">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>Sem complicações</p>
                        <p className="text-[10px]">+1</p>
                      </div>
                    ),
                    value: 1,
                  },
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>Lesão em órgãos-alvo</p>
                        <p className="text-[10px]">+2</p>
                      </div>
                    ),
                    value: 2,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="hemiplegia" label="Hemiplegia">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+2</p>
                      </div>
                    ),
                    value: 2,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="drc" label="Doença renal crónica moderada a grave">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+2</p>
                      </div>
                    ),
                    value: 2,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="solid_tumor" label="Tumor sólido">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>Nenhum</p>
                        <p className="text-[10px]">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>Localizado</p>
                        <p className="text-[10px]">+2</p>
                      </div>
                    ),
                    value: 1,
                  },
                  {
                    label: (
                      <div className="flex justify-between">
                        <p>Metastizado</p>
                        <p className="text-[10px]">+6</p>
                      </div>
                    ),
                    value: 6,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="leukemia" label="Leucemia">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+2</p>
                      </div>
                    ),
                    value: 2,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="lymphoma" label="Linfoma">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+2</p>
                      </div>
                    ),
                    value: 2,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Form.Item name="aids" label="HIV">
              <Radio.Group
                size="large"
                block
                options={[
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Não</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">0</p>
                      </div>
                    ),
                    value: 0,
                  },
                  {
                    label: (
                      <div className="flex justify-center items-center">
                        <p>Sim</p>
                        <p className="text-[10px] absolute right-[15px] top-0 bottom-0">+6</p>
                      </div>
                    ),
                    value: 6,
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Drawer>
  );
}
