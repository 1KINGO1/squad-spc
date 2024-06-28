import { FC } from "react";

import { Form, Input } from "antd";

interface ClanTagInputProps {
  initialValue?: string;
}

const ClanTagInput: FC<ClanTagInputProps> = ({initialValue}) => {
    return (
      <Form.Item
        layout="vertical"
        label="Clan Tag"
        name="tag"
        initialValue={initialValue}
        rules={[{ max: 10, min: 1, required: true }]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
    );
}

export default ClanTagInput;