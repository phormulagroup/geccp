import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Switch } from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

import helpers from "../../utils/helpers";

export default function PersonalInformation({ initialValues }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues.patient.length > 0) {
      const formObj = {
        ...initialValues.patient[0],
      };

      form.setFieldsValue(formObj);
    }
  }, []);

  function submitForm(values) {
    console.log(values);
  }

  return (
    <Form form={form} onFinish={submitForm} layout="vertical">
      <div className="flex flex-col">
        <div id="personal-information" className="p-6 border-dashed border-2 border-[#8096A4] rounded-[10px] gap-x-10 gap-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <Form.Item name="id" className="mb-0!" label="ID">
                <Input size="large" readOnly />
              </Form.Item>
            </div>
            <div>
              <Form.Item name="institution" className="mb-0!" label="Institution">
                <Input size="large" readOnly />
              </Form.Item>
            </div>
            <div>
              <Form.Item name="process_number" className="mb-0!" label="Local Patient Log">
                <Input size="large" />
              </Form.Item>
            </div>
            <div>
              <Form.Item name="gender" className="mb-0!" label="Gender">
                <Radio.Group
                  block
                  options={[
                    { value: 1, label: "Male" },
                    { value: 2, label: "Female" },
                  ]}
                  size="large"
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
            </div>
            <div className="flex gap-2 items-end">
              <div className="w-2/3">
                <Form.Item name="birth_date" label="Birth date" className="mb-0!">
                  <DatePicker size="large" format={"DD-MM-YYYY"} />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button className="mt-4" type="primary" size="large" onClick={form.submit}>
        Save
      </Button>
    </Form>
  );
}
