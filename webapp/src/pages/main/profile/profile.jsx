import { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { Context } from "../../../utils/appContext";

export default function Profile() {
  const { user, update } = useContext(Context);
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  async function submitForm(values) {
    setSaving(true);
    try {
      await update({ table: "user", data: { id: user.id, new_password: values.new_password, confirm_new_password: values.confirm_new_password } }, values);
      form.resetFields();
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-2xl font-bold">Perfil</p>
        <p className="text-[#6b7280]">Os teus dados de acesso</p>
      </div>

      <div className="border-dashed border-2 border-[#8BD1C6] rounded-[10px] p-6 bg-white max-w-150 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <AiOutlineUser className="text-[#17A38D] text-[20px]" />
          <p className="font-bold">{user.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <AiOutlineMail className="text-[#17A38D] text-[20px]" />
          <p>{user.email}</p>
        </div>
      </div>

      <div className="border-dashed border-2 border-[#8BD1C6] rounded-[10px] p-6 bg-white max-w-150">
        <p className="label mb-4 flex items-center gap-2">
          <AiOutlineLock /> Alterar password
        </p>
        <Form form={form} layout="vertical" onFinish={submitForm}>
          <Form.Item name="new_password" label="Nova password" rules={[{ required: true, message: "Este campo é obrigatório" }]}>
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item
            name="confirm_new_password"
            label="Confirmar nova password"
            dependencies={["new_password"]}
            rules={[
              { required: true, message: "Este campo é obrigatório" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) return Promise.resolve();
                  return Promise.reject(new Error("As passwords não coincidem"));
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Button type="primary" size="large" htmlType="submit" loading={saving}>
            Guardar
          </Button>
        </Form>
      </div>
    </div>
  );
}
