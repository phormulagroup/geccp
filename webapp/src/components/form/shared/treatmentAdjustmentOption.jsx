import { Button, Form, Input, InputNumber, Radio } from "antd";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import get from "lodash/get";

// One "how was the treatment adjusted because of this adverse event" card —
// Suspensão temporária / Descontinuação definitiva / Redução de dose, each with
// its own repeatable list of affected drugs. The three options only differ in
// wording and field names, so this is shared instead of copy-pasted per option.
export default function TreatmentAdjustmentOption({
  namePath, // array: path to the { need_treatment_adjustment, [listFieldName]: [...] } object
  value, // radio value for this option, e.g. "Suspensão temporária"
  listFieldName, // sub-list field name, e.g. "need_treatment_adjustment_temporary"
  medicationLabel, // e.g. "Fármaco(s) que foi(oram) suspenso(s):"
  secondFieldName, // e.g. "days"
  secondFieldLabel, // e.g. "Período de suspensão temporária:"
  secondFieldSuffix, // e.g. "Dias"
  withBottomMargin = true,
}) {
  // Form.Item/Form.List `name` is relative — nesting inside <Form.List name="palliative_treatment">
  // already scopes it. shouldUpdate compares full form values, and reading the current value back
  // goes through the "palliative_treatment" array directly, matching how the rest of this file reads
  // dynamically-keyed fields (getFieldValue can't reliably resolve a path through a computed key like `ad`).
  const adjustmentName = [...namePath, "need_treatment_adjustment"];
  const listName = [...namePath, listFieldName];
  const absoluteAdjustmentName = ["palliative_treatment", ...adjustmentName];

  return (
    <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => get(prevValues, absoluteAdjustmentName) !== get(currentValues, absoluteAdjustmentName)}>
      {({ getFieldValue }) => {
        const isSelected = get(getFieldValue("palliative_treatment"), adjustmentName) === value;
        return (
          <div className={`${isSelected ? "bg-[#C5E8E3]" : "bg-white"} border-2 border-dashed border-[#8BD1C6] rounded-[10px] p-4 ${withBottomMargin ? "mb-4" : ""}`}>
            <Form.Item name={adjustmentName} className="mb-0! flex items-center">
              <Radio.Group className="flex w-full!" size="large">
                <Radio value={value}>{value}</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.List name={listName}>
              {(fields, { add, remove }) => (
                <div>
                  {fields.map((f) => (
                    <div key={f.key} className="border-2 border-dashed border-[#8BD1C6] p-4 rounded-[10px] mt-4 mb-6 relative">
                      <p className="pb-2 text-[12px]">{medicationLabel}</p>
                      <Form.Item name={[f.name, "medication"]} className="mb-0! w-full!">
                        <Input size="large" className="w-full!" />
                      </Form.Item>
                      <p className="pb-2 text-[12px] mt-4">{secondFieldLabel}</p>
                      <Form.Item name={[f.name, secondFieldName]} className="mb-0! w-full!">
                        <InputNumber size="large" className="w-full!" suffix={secondFieldSuffix} />
                      </Form.Item>
                      <Button icon={<AiOutlineDelete />} className="absolute! -top-4.5 -right-2.5" onClick={() => remove(f.name)}></Button>
                    </div>
                  ))}

                  {isSelected ? (
                    <div className="flex justify-center items-center">
                      <Button type="primary" size="large" icon={<AiOutlinePlusCircle />} onClick={() => add()}>
                        Adicionar fármaco
                      </Button>
                    </div>
                  ) : null}
                </div>
              )}
            </Form.List>
          </div>
        );
      }}
    </Form.Item>
  );
}
