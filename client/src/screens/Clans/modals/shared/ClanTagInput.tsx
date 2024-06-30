import { FC } from "react";

import { Form, Input } from "antd";

const ClanTagInput: FC = () => {
    return (
      <Form.Item
        layout="vertical"
        label="Clan Tag"
        name="tag"
        rules={[{ max: 10, min: 1, required: true }]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
    );
}

export default ClanTagInput;