import { Form, Radio } from "antd";

// The CTCAE v.6 grade picker (1-3 / 4-5 split across two Radio.Groups) — the
// same two-row layout is used for chemo/anti-EGFR and immunotherapy adverse events.
export default function CtcaeGradeSelector({ name }) {
  return (
    <>
      <div className="p-4 border-r-2 border-r-[#8BD1C6] border-dashed bg-[#C5E8E3]">
        <p className="font-bold">Grau de acordo com o CTCAE v.6</p>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <Form.Item name={name} className="mb-0!">
          <Radio.Group className="flex w-full!" size="large">
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name={name} className="mb-0!">
          <Radio.Group className="flex w-full!" size="large">
            <Radio value="4">4</Radio>
            <Radio value="5">5</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
    </>
  );
}
