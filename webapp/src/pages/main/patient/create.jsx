import { use, useContext, useState } from "react";
import { Button, Form } from "antd";

import { AiFillPlusCircle, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlinePlayCircle, AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";

import PersonalInformation from "../../../components/form/personalInformation";

import imgImportCSV from "../../../assets/Via-CSV.svg";
import imgImportStep from "../../../assets/Step-by-Step.svg";
import DiseaseCharacterization from "../../../components/form/diseaseCharacterization";
import { Context } from "../../../utils/context";

export default function Create() {
  const { messageApi } = useContext(Context);
  const [type, setType] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [initialData] = useState({
    palliative_treatment: [{}],
    treatment: [{}],
  });

  const [form] = Form.useForm();

  function next() {
    if (currentStep < 1) setCurrentStep(currentStep + 1);
    else {
      form.submit();
    }
  }

  function previous() {
    setCurrentStep(currentStep - 1);
  }

  function submitForm(values) {
    console.log(values);
    messageApi.open({
      type: "success",
      content: `Plataforma está em modo de teste, os dados submetidos não serão guardados.`,
    });
  }

  return (
    <div className="flex flex-col">
      <p className="text-xl font-bold">Adicionar paciente</p>
      {!type && (
        <div className="bg-[#17A38D] p-6 grid grid-cols-3 gap-4 items-center mt-4 rounded-[5px]">
          <div className="flex flex-col">
            <p className="text-black font-bold text-[20px]">Importação</p>
            <p className="text-white text-[30px] font-bold">Via CSV</p>
            <p className="text-white">Permite a importação de vários perfis de doentes</p>
            <img className="mt-4 max-w-37.5" src={imgImportCSV} />
          </div>
          <div className="flex justify-center items-center">
            <Button size="large" type="primary" className="rounded-full!" icon={<AiOutlinePlusCircle />}>
              Selecionar ficheiro
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <Button size="large" className="rounded-full!">
              CSV Exemplo
            </Button>
          </div>
        </div>
      )}

      <div className="bg-[#51BAAA] p-6 grid grid-cols-3 gap-4 items-center mt-4 rounded-[5px]">
        <div className="flex flex-col">
          {type !== "step" && <p className="text-black font-bold text-[20px]">Adicionar</p>}
          <p className="text-white text-[30px] font-bold">
            <i>Step by step</i>
          </p>
          <p className="text-white">Permite a submissão um a um do perfil do doente</p>
          <img className="mt-4 max-w-37.5" src={imgImportStep} />
        </div>
        {!type ? (
          <div className="flex justify-center items-center">
            <Button size="large" type="primary" className="rounded-full!" icon={<AiOutlinePlusCircle />} onClick={() => setType("step")}>
              Nova submissão
            </Button>
          </div>
        ) : null}
      </div>

      {type === "step" && (
        <Form form={form} onFinish={submitForm} layout="vertical" initialValues={initialData}>
          <div className="flex-col justify-center items-center w-full mt-6">
            <div className={`flex-col w-full ${currentStep === 0 ? "flex" : "hidden"}`}>
              <div className="grid grid-cols-3">
                <div></div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[#229B7D] font-bold text-[30px]">Identificação</p>
                  <p className="text-black font-bold text-[20px] text-center">Dados demográficos e estilo de vida</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <Button size="large" type="primary" className="rounded-full!" icon={<AiOutlineArrowRight />} onClick={next}>
                    Próximo passo
                  </Button>
                </div>
              </div>
              <PersonalInformation form={form} next={next} previous={previous} />
            </div>
            <div className={`flex-col w-full ${currentStep === 1 ? "flex" : "hidden"}`}>
              <div className="grid grid-cols-3">
                <div className="flex flex-col justify-center items-start">
                  <Button size="large" type="primary" className="rounded-full!" icon={<AiOutlineArrowLeft />} onClick={previous}>
                    Passo anterior
                  </Button>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[#229B7D] font-bold text-[30px] text-center">Caracterização da doença</p>
                  <p className="text-black font-bold text-[20px] text-center">Estadios da doença</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <Button size="large" type="primary" className="rounded-full!" icon={<AiOutlinePlus />} onClick={next}>
                    Criar
                  </Button>
                </div>
              </div>
              <DiseaseCharacterization form={form} next={next} previous={previous} />
            </div>
          </div>
        </Form>
      )}
    </div>
  );
}
