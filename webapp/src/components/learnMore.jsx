import { useState } from "react";
import { Button, Col, Row, Modal } from "antd";

import logo from "../assets/European-Pediatric-Eosinophilic-Registry.svg";
import logoESPGHAN from "../assets/European-Society-for-Paediatric-Gastroenterology-Hepatology-and-Nutrition.svg";

export default function LearnMore({ open, close }) {
  return (
    <Modal key="modal-learn-more" width={1200} style={{ top: 20 }} onCancel={close} open={open} maskClosable={false} footer={[]} className="learn-more-modal">
      <div className="flex min-h-[700px]">
        <div className="w-1/3 p-[30px] flex flex-col justify-between items-center bg-[#D5DCE1] rounded-l-[5px]">
          <img src={logo} alt="EuroPEER" className="max-w-full h-auto" />
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center mt-[30px] text-[#004A49]">About us</h2>
            <p className="text-[#707070] mt-2 text-center">
              The European Pediatric Eosinophilic Registry refers to two main initiatives: pEEr (the Pediatric Eosinophilic Esophagitis Registry), a prospective study focusing on
              children in Europe and Israel, and the retrospective RetroPEER study, also focused on pediatric EoE.
            </p>
            <p className="text-[#707070] mt-2 text-center">
              Both registries contribute to understanding the epidemiology, clinical features, treatment efficacy, and disease progression of eosinophilic esophagitis in children,
              complementing the larger adult-focused EoE CONNECT registry.
            </p>
            <p className="text-[#707070] mt-2 text-center">
              Nee more information please reach to us at <u>help@europeer.com</u>
            </p>
          </div>
          <div>
            <p className="text-[#707070] mt-[30px] text-center">Created by:</p>
            <img src={logoESPGHAN} className="w-full max-w-[150px] mx-auto mt-2" />
          </div>
        </div>
        <div className="w-2/3 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-[#004A49]">Key Registries & Their Focus:</h2>
          <p className="font-bold text-[#707070] text-xs">pEEr (Prospective Pediatric Eosinophilic Esophagitis Registry):</p>
          <p className="text-[#707070] text-xs">
            <b>-Focus:</b> Characterizes the phenotype of EoE in children.
          </p>
          <p className="text-[#707070] text-xs">
            <b>- Data Collection:</b> Prospective, anonymized data on demographics, symptoms, endoscopy findings, histology, and therapies from pediatric centers in Europe and
            Israel.
          </p>
          <p className="text-[#707070] text-xs">
            <b>- Findings:</b> Identified associations between age,symptoms (like dysphagia vs. vomiting), food allergies, and diagnosis delay.
          </p>

          <p className="mt-[30px] font-bold text-[#707070] text-xs">RetroPEER (Retrospective Pediatric Eosinophilic Esophagitis Registry):</p>

          <p className="text-[#707070] text-xs">
            <b>- Focus:</b> Assesses the real-world diagnosis and treatment practices of pediatric gastroenterologists.
          </p>
          <p className="text-[#707070] text-xs">
            <b>- Data Collection:</b> Retrospective data from 26 European pediatric gastroenterology centers.
          </p>
          <p className="text-[#707070] text-xs">
            <b>- Findings:</b> Highlighted common triggers (milk, egg, wheat), diagnostic delays, and prevalence of EoE in children.
          </p>

          <p className="mt-[30px] font-bold text-[#707070] text-xs">
            EoE CONNECT (European Registry of Clinical, Environmental, and Genetic Determinants in Eosinophilic Esophagitis):
          </p>

          <p className="text-[#707070] text-xs">
            <b>- Focus:</b> A multi-center, international registry for both pediatric and adult EoE patients.
          </p>
          <p className="text-[#707070] text-xs">
            <b>- Purpose:</b> Provides evidence on real-world therapy effectiveness, disease mechanisms, and serves as a benchmark for future EoE healthcare in Europe.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-[#004A49] mt-[30px]">What These Registries Provide:</h2>
          <p className="text-[#707070] text-xs">
            <b>- Real-World Evidence:</b> Insights into how EoE is managed and treated in clinical practice.
          </p>
          <p className="text-[#707070] text-xs">
            <b>- Epidemiological Data:</b> Understanding the prevalence, incidence, and characteristics of EoE in pediatric populations.
          </p>
          <p className="text-[#707070] text-xs">
            <b>- Therapeutic Insights:</b> Information on the effectiveness and safety of different treatments, including dietary interventions and medications.
          </p>
          <p className="text-[#707070] text-xs">
            <b>- Identification of Triggers:</b> Data on common food allergens causing EoE in children.
          </p>
          <p className="text-[#707070] text-xs">
            <b>- Benchmark for Healthcare:</b> Data to inform the planning and optimization of EoE healthcare services in Europe.
          </p>
        </div>
      </div>
    </Modal>
  );
}
