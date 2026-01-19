import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";

import helpers from "../../utils/helpers";
import CharlsonIndex from "../charlsonIndex";

export default function PersonalInformation({ data, next, previous }) {
  const [isOpenCharlsonIndex, setIsOpenCharlsonIndex] = useState(false);

  const [form] = Form.useForm();

  function submitForm(values) {
    console.log(values);
    next();
  }

  function closeCharlsonIndex(result) {
    console.log(result);
    form.setFieldValue("charlson_index", result);
    setIsOpenCharlsonIndex(false);
  }

  return (
    <div>
      <CharlsonIndex open={isOpenCharlsonIndex} close={closeCharlsonIndex} />
      <Form form={form} onFinish={submitForm} layout="vertical">
        <div className="border-dashed border-2 border-[#8BD1C6] p-10 rounded-[10px] grid grid-cols-3 gap-10 mt-6">
          <Form.Item name="birth_date" label="Data de nascimento" className="mb-0!">
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name="genre" label="Género" className="mb-0!">
            <Select
              size="large"
              placeholder="Selecionar o género"
              options={[
                { value: "masculino", label: "Masculino" },
                { value: "feminino", label: "Feminino" },
              ]}
            />
          </Form.Item>
          <Form.Item name="nationality" label="Nacionalidade" className="mb-0!">
            <Select size="large" placeholder="Selecionar a nacionalidade" options={[{ value: "Portugal", label: "Portugal" }]} />
          </Form.Item>
          <Form.Item name="residence" label="País de residência" className="mb-0!">
            <Select size="large" placeholder="Selecionar o país de residência nacionalidade" options={[{ value: "Portugal", label: "Portugal" }]} />
          </Form.Item>
          <Form.Item name="marital_status" label="Estado civil" className="mb-0!">
            <Select
              size="large"
              placeholder="Selecionar o país de residência nacionalidade"
              options={[
                { value: "Casada(o) / União de facto", label: "Casada(o) / União de facto" },
                { value: "Solteira(o)", label: "Solteira(o)" },
                { value: "Divorciada(o)", label: "Divorciada(o)" },
                { value: "Viúva(o)", label: "Viúva(o)" },
                { value: "Desconhecido", label: "Desconhecido" },
              ]}
            />
          </Form.Item>
          <Form.Item name="education" label="Educação" className="mb-0!">
            <Select
              size="large"
              placeholder="Considerar nível mais alto completo"
              options={[
                { value: "Ensino superior", label: "Ensino superior" },
                { value: "Ensino secundário (10º ao 12º ano)", label: "Ensino secundário (10º ao 12º ano)" },
                { value: "Ensino básico (5º ao 9º ano)", label: "Ensino básico (5º ao 9º ano)" },
                { value: "Escola primária (1º ao 4º ano)", label: "Escola primária (1º ao 4º ano)" },
                { value: "Sabe ler e escrever", label: "Sabe ler e escrever" },
                { value: "Analfabeto", label: "Analfabeto" },
                { value: "Desconhecido", label: "Desconhecido" },
              ]}
            />
          </Form.Item>
          <Form.Item name="employment" label="Situação laboral" className="mb-0!">
            <Select
              size="large"
              placeholder="Considerar nível mais alto completo"
              options={[
                { value: "Empregada(o)", label: "Empregada(o)" },
                { value: "Desempregada(o)", label: "Desempregada(o)" },
                { value: "Reformada(o)", label: "Reformada(o)" },
                { value: "Desconhecida(o)", label: "Desconhecida(o)" },
              ]}
            />
          </Form.Item>
          <div className="col-span-2 border-dashed border-2 border-[#8BD1C6] p-6 grid grid-cols-3 gap-x-12 gap-y-4 items-center mt-4 rounded-[10px]">
            <div className="col-span-3">
              <Form.Item name="smoking_habits" label="Hábitos tabágicos" layout="horizontal" className="mb-0! smoking_habits">
                <Radio.Group
                  size="large"
                  defaultValue={1}
                  options={[
                    { value: "Fumador ativo", label: "Fumador ativo" },
                    {
                      value: "Ex-fumador",
                      label: (
                        <span>
                          Ex-fumador
                          <br />
                          <span className="text-[10px]">(pelo menos 12 meses de abstinência)</span>
                        </span>
                      ),
                    },
                    { value: "Não fumador", label: "Não fumador" },
                    { value: "Desconhecido", label: "Desconhecido" },
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.smoking_habits !== currentValues.smoking_habits}>
              {({ getFieldValue }) =>
                (getFieldValue("smoking_habits") === "Fumador ativo" || getFieldValue("smoking_habits") === "Ex-fumador") && (
                  <>
                    <div className="col-span-3">
                      <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
                    </div>
                    <div className="mt-4">
                      <Form.Item name="smoking_date_start" className="mb-0!">
                        <InputNumber size="large" placeholder="Idade de início do consumo tabágico" className="w-full!" />
                      </Form.Item>
                    </div>
                    <div className="mt-4">
                      {getFieldValue("smoking_habits") === "Fumador ativo" ? (
                        <Form.Item name="smoking_units" className="mb-0!">
                          <InputNumber size="large" placeholder="Unidades maço ano" className="w-full!" />
                        </Form.Item>
                      ) : (
                        <Form.Item name="smoking_date_end" className="mb-0!">
                          <InputNumber size="large" placeholder="Idade de fim do consumo tabágico" className="w-full!" />
                        </Form.Item>
                      )}
                    </div>
                    <div className="mt-4">
                      {getFieldValue("smoking_habits") === "Fumador ativo" ? (
                        <Form.Item name="smoking_units_day" className="mb-0!">
                          <InputNumber size="large" placeholder="Número de cigarros por dia que fuma atualmente" className="w-full!" />
                        </Form.Item>
                      ) : (
                        <Form.Item name="smoking_units" className="mb-0!">
                          <InputNumber size="large" placeholder="Unidades maço ano" className="w-full!" />
                        </Form.Item>
                      )}
                    </div>
                  </>
                )
              }
            </Form.Item>
          </div>

          <Form.Item name="housing_situation" label="Situação habitacional" className="mb-0!">
            <Select
              size="large"
              placeholder="Selecionar situação habitacional"
              options={[
                { value: "Vive sozinha(o)", label: "Vive sozinha(o)" },
                { value: "Vive com cônjuge / companheira(o)", label: "Vive com cônjuge / companheira(o)" },
                { value: "Vive com outros familiares", label: "Vive com outros familiares" },
                { value: "Outra situação", label: "Outra situação" },
              ]}
            />
          </Form.Item>

          <div className="col-span-2 border-dashed border-2 border-[#8BD1C6] p-6 grid grid-cols-2 gap-x-0 gap-y-4 mt-4 rounded-[10px]">
            <div className="col-span-2">
              <p className="label">Hábitos alcoólicos - Score AUDIT-C</p>
            </div>
            <div className="col-span-2">
              <Divider className="mt-0! mb-0! h-1 bg-[#17A38D]" />
            </div>
            <div className="col-span-2 flex flex-col">
              <p className="font-bold mb-2">Com que frequência consome bebidas que contêm álcool?</p>
              <Form.Item name="alcohol_habits" className="mb-0!" layout="vertical">
                <Radio.Group
                  size="large"
                  vertical
                  options={[
                    { value: 0, label: "Nunca" },
                    { value: 1, label: "Uma vez por mês ou menos" },
                    { value: 2, label: "Duas a quatro vezes por mês" },
                    { value: 3, label: "Duas a três vezes por semana" },
                    { value: 4, label: "Quatro ou mais vezes por semana" },
                    { value: 5, label: "Desconhecido" },
                  ]}
                />
              </Form.Item>
            </div>
            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.alcohol_habits !== currentValues.alcohol_habits}>
              {({ getFieldValue }) =>
                getFieldValue("alcohol_habits") !== 0 &&
                getFieldValue("alcohol_habits") !== 5 &&
                getFieldValue("alcohol_habits") !== undefined && (
                  <div className="flex flex-col mr-6 mt-6">
                    <p className="font-bold mb-4">Quando bebe, quantas bebidas contendo álcool consome num dia normal?</p>
                    <Form.Item name="alcohol_normal_day" className="mb-0!" layout="vertical">
                      <Radio.Group
                        vertical
                        size="large"
                        options={[
                          { value: 0, label: "Uma ou duas" },
                          { value: 1, label: "Três ou quatro" },
                          { value: 2, label: "Cinco ou seis" },
                          { value: 3, label: "De sete a nove" },
                          { value: 4, label: "Dez ou mais" },
                        ]}
                      />
                    </Form.Item>
                  </div>
                )
              }
            </Form.Item>

            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.alcohol_habits !== currentValues.alcohol_habits}>
              {({ getFieldValue }) =>
                getFieldValue("alcohol_habits") !== 0 &&
                getFieldValue("alcohol_habits") !== 5 &&
                getFieldValue("alcohol_habits") !== undefined && (
                  <div className="flex flex-col mt-6">
                    <p className="font-bold mb-4">Com que frequência consome seis bebidas ou mais numa única ocasião?</p>
                    <Form.Item name="alcohol_six_or_more" className="mb-0!" layout="vertical">
                      <Radio.Group
                        vertical
                        size="large"
                        options={[
                          { value: 0, label: "Nunca" },
                          { value: 1, label: "Uma vez por mês ou menos" },
                          { value: 2, label: "Duas a quatro vezes por mês" },
                          { value: 3, label: "Duas a três vezes por semana" },
                          { value: 4, label: "Quatro ou mais vezes por semana" },
                        ]}
                      />
                    </Form.Item>
                  </div>
                )
              }
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.alcohol_habits !== currentValues.alcohol_habits ||
                prevValues.alcohol_normal_day !== currentValues.alcohol_normal_day ||
                prevValues.alcohol_six_or_more !== currentValues.alcohol_six_or_more
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("alcohol_habits") !== 0 &&
                getFieldValue("alcohol_habits") !== 5 &&
                getFieldValue("alcohol_normal_day") >= 0 &&
                getFieldValue("alcohol_six_or_more") >= 0 && (
                  <div className="flex flex-col p-6 bg-[#8BD1C6] col-span-2 justify-center items-center rounded-[5px] mt-4">
                    <p className="text-[20px]">
                      <b>Score AUDIT-C:</b> {getFieldValue("alcohol_habits") + getFieldValue("alcohol_normal_day") + getFieldValue("alcohol_six_or_more")}
                    </p>
                  </div>
                )
              }
            </Form.Item>
          </div>

          <Form.List name="other_consumption">
            {(fields, { add, remove, move }) => (
              <div>
                <p className="label mb-2">Outros consumos</p>
                {fields.map((field) => (
                  <div className="flex flex-nowrap mt-4">
                    <Form.Item name={[field.name, "name"]} className="w-full mb-0!">
                      <Input size="large" placeholder="Escrever outro consumo" />
                    </Form.Item>
                    {fields.length > 0 ? (
                      <div className="flex justify-center items-center">
                        <Button size="large" className="ml-2" onClick={() => remove(field.name)}>
                          <AiOutlineDelete />
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
                <Button className="mt-4" size="large" onClick={() => add()} icon={<AiOutlinePlusCircle />}>
                  Adicionar consumo
                </Button>
              </div>
            )}
          </Form.List>

          <div>
            <Form.List name="comorbidities">
              {(fields, { add, remove, move }) => (
                <div>
                  <p className="label mb-2">Comorbilidades</p>
                  {fields.map((field) => (
                    <div className="flex flex-col">
                      <div className="flex flex-nowrap mt-4">
                        <div className="flex flex-col w-full">
                          <Form.Item name={[field.name, "name"]} className="mb-0!">
                            <Select
                              size="large"
                              placeholder="Selecionar comorbilidades"
                              options={[
                                { value: "Doença autoimune", label: "Doença autoimune" },
                                { value: "Enfarte agudo do miocárdio", label: "Enfarte agudo do miocárdio" },
                                { value: "Insuficiência cardíaca congestiva", label: "Insuficiência cardíaca congestiva" },
                                { value: "Doença pulmonar obstrutiva crónica", label: "Doença pulmonar obstrutiva crónica" },
                                {
                                  value: "Diabetes mellitus",
                                  label: (
                                    <span>
                                      Diabetes <i>mellitus</i>
                                    </span>
                                  ),
                                },
                                { value: "Hipertensão arterial", label: "Hipertensão arterial" },
                                { value: "Dislipidemia", label: "Dislipidemia" },
                                { value: "Doença hepática", label: "Doença hepática" },
                                { value: "Infeção VIH", label: "Infeção VIH" },
                                { value: "Pós-transplante de órgão", label: "Pós-transplante de órgão" },
                                { value: "Outros tumores", label: "Outros tumores" },
                                { value: "Outra(s) comorbilidade(s) relevante(s)", label: "Outra(s) comorbilidade(s) relevante(s)" },
                              ]}
                            />
                          </Form.Item>
                          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.comorbidities !== currentValues.comorbidities}>
                            {({ getFieldValue }) =>
                              getFieldValue("comorbidities")[field.name]?.name === "Doença autoimune" && (
                                <div>
                                  <Form.Item name={[field.name, "specidfied"]} className="mb-3! mt-3!">
                                    <Input size="large" placeholder="Especifique" />
                                  </Form.Item>
                                </div>
                              )
                            }
                          </Form.Item>
                        </div>
                        {fields.length > 0 ? (
                          <div className="flex justify-center items-center">
                            <Button size="large" className="ml-2" onClick={() => remove(field.name)}>
                              <AiOutlineDelete />
                            </Button>
                          </div>
                        ) : null}
                      </div>
                      {fields.length > 1 && field.name < fields.length - 1 ? <Divider className="mt-4! mb-4!" /> : null}
                    </div>
                  ))}
                  <Button className="mt-4" size="large" onClick={() => add()} icon={<AiOutlinePlusCircle />}>
                    Adicionar comorbilidade
                  </Button>
                </div>
              )}
            </Form.List>
          </div>
          <div className="flex flex-col w-full">
            <div className="border-dashed border-2 border-[#8BD1C6] p-6 rounded-[10px]">
              <p className="label">Índice de comorbilidades de Charlson</p>
              <Form.Item hidden name="charlson_index">
                <InputNumber />
              </Form.Item>
              <div className="flex justify-between items-center mt-4">
                <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.charlson_index !== currentValues.charlson_index}>
                  {({ getFieldValue }) =>
                    getFieldValue("charlson_index") >= 0 && (
                      <div className="flex items-center">
                        <p className="text-[30px] font-bold mr-2">{getFieldValue("charlson_index")}</p>
                        <p className="text-[16px]">pontos</p>
                      </div>
                    )
                  }
                </Form.Item>
                <Button type="primary" size="large" onClick={() => setIsOpenCharlsonIndex(true)}>
                  Calculo automático
                </Button>
              </div>
            </div>

            <div className="border-dashed border-2 border-[#8BD1C6] rounded-[10px] mt-6 p-6">
              <p className="label">Índice de massa corporal</p>
              <p className="font-bold  mt-4! mb-2">Altura (cm):</p>
              <Form.Item name="height" className="w-full">
                <InputNumber size="large" className="w-full! text-center" placeholder="190" />
              </Form.Item>
              <p className="font-bold mb-2">Peso (kg):</p>
              <Form.Item name="weight" className="w-full mb-0!">
                <InputNumber size="large" className="w-full! text-center" placeholder="92" />
              </Form.Item>

              <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.height !== currentValues.height || prevValues.weight !== currentValues.weight}>
                {({ getFieldValue }) =>
                  getFieldValue("height") >= 0 &&
                  getFieldValue("weight") >= 0 && (
                    <div className="flex justify-center items-center p-4 rounded-[5px] bg-[#8BD1C6]">
                      <div className="flex items-center">
                        <p className="text-[24px]">
                          <b>IMC: </b>
                          {helpers.calcIMC(getFieldValue("height"), getFieldValue("weight"))}
                        </p>
                      </div>
                    </div>
                  )
                }
              </Form.Item>
            </div>
          </div>
        </div>
        <Button onClick={form.submit}></Button>
      </Form>
    </div>
  );
}
