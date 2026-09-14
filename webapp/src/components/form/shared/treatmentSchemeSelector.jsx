import { Form, Input, Radio } from "antd";
import get from "lodash/get";

// One "Esquema de tratamento" regimen picker: a flat list of named options plus
// the "Ensaio clínico" / "Outro" reveal inputs every regimen list ends with.
// `basePath` is the relative field path (e.g. [field.name]) within the
// enclosing <Form.List name="palliative_treatment">.
export default function TreatmentSchemeSelector({ basePath, options }) {
  const schemeName = [...basePath, "treatment_scheme"];
  const absoluteSchemeName = ["palliative_treatment", ...schemeName];

  return (
    <div className="grid grid-cols-4 gap-4">
      {options.map((option) => (
        <div key={option}>
          <Form.Item name={schemeName} className="mb-0!">
            <Radio.Group className="flex w-full!" size="large">
              <Radio value={option}>{option}</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      ))}

      <div>
        <Form.Item name={schemeName} className="mb-0!">
          <Radio.Group className="flex w-full!" size="large">
            <Radio value="Ensaio clínico">Ensaio clínico</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(prev, curr) => get(prev, absoluteSchemeName) !== get(curr, absoluteSchemeName)}>
          {({ getFieldValue }) =>
            get(getFieldValue("palliative_treatment"), schemeName) === "Ensaio clínico" && (
              <Form.Item name={[...basePath, "treatment_scheme_clinical_trial"]} className="mb-0! mt-3!">
                <Input size="large" className="w-full" placeholder="Qual?" />
              </Form.Item>
            )
          }
        </Form.Item>
      </div>

      <div>
        <Form.Item name={schemeName} className="mb-0!">
          <Radio.Group className="flex w-full!" size="large">
            <Radio value="Outro">Outro</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(prev, curr) => get(prev, absoluteSchemeName) !== get(curr, absoluteSchemeName)}>
          {({ getFieldValue }) =>
            get(getFieldValue("palliative_treatment"), schemeName) === "Outro" && (
              <Form.Item name={[...basePath, "treatment_scheme_other"]} className="mb-0! mt-3!">
                <Input size="large" className="w-full" placeholder="Especifique..." />
              </Form.Item>
            )
          }
        </Form.Item>
      </div>
    </div>
  );
}
