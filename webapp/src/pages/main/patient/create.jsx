import { useState } from "react";
import { Button, Form } from "antd";

import { AiOutlinePlayCircle, AiOutlinePlusCircle } from "react-icons/ai";

import PersonalInformation from "../../../components/form/personalInformation";

import imgImportCSV from "../../../assets/Via-CSV.svg";
import imgImportStep from "../../../assets/Step-by-Step.svg";
import DiseaseCharacterization from "../../../components/form/diseaseCharacterization";

export default function Create() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(null);
  const [isOpenCharlsonIndex, setIsOpenCharlsonIndex] = useState(false);
  const [steps, setSteps] = useState([{}]);
  const [currentStep, setCurrentStep] = useState(0);

  function next() {
    setCurrentStep(currentStep + 1);
  }

  function previous() {
    setCurrentStep(currentStep - 1);
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
        <div className="flex-col justify-center items-center w-full mt-6">
          {currentStep === 0 && (
            <div className="flex flex-col w-full">
              <div className="grid grid-cols-3">
                <div></div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[#229B7D] font-bold text-[30px]">Identificação</p>
                  <p className="text-black font-bold text-[20px] text-center">Dados demográficos e estilo de vida</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <Button size="large" type="primary" className="rounded-full!" icon={<AiOutlinePlayCircle />} onClick={next}>
                    Próximo passo
                  </Button>
                </div>
              </div>
              <PersonalInformation next={next} previous={previous} />
            </div>
          )}
          {currentStep === 1 && (
            <div className="flex flex-col w-full">
              <div className="grid grid-cols-3">
                <div className="flex flex-col justify-center items-start">
                  <Button size="large" type="primary" className="rounded-full!" icon={<AiOutlinePlayCircle />} onClick={previous}>
                    Passo anterior
                  </Button>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[#229B7D] font-bold text-[30px]">Caracterização da doença</p>
                  <p className="text-black font-bold text-[20px] text-center">Estadios da doença</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <Button size="large" type="primary" className="rounded-full!" icon={<AiOutlinePlayCircle />} onClick={next}>
                    Próximo passo
                  </Button>
                </div>
              </div>
              <DiseaseCharacterization next={next} previous={previous} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
