import { FC } from "react";

import { Form, Input } from "antd";

const ClanNameInput: FC = () => {
    return (
      <Form.Item
        layout="vertical"
        label="Clan Name"
        name="name"
        rules={[{ max: 50, min: 4, required: true }]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
    );
}

export default ClanNameInput;