import { FC } from "react";

import { Form, Input } from "antd";

interface ClanNameInputProps {
  initialValue?: string;
}

const ClanNameInput: FC<ClanNameInputProps> = ({initialValue}) => {
    return (
      <Form.Item
        layout="vertical"
        label="Clan Name"
        initialValue={initialValue}
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