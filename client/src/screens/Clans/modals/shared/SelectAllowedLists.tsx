import { FC } from "react";

import { Checkbox, Form, List } from "antd";

interface SelectAllowedListsProps {
  initialValue?: number[];
}

const data = [
  { id: 1, title: "Title 1" },
  { id: 2, title: "Title 2" },
  { id: 3, title: "Title 3" },
  { id: 4, title: "Title 4" },
  { id: 5, title: "Title 5" },
  { id: 6, title: "Title 6" }
];


const SelectAllowedLists: FC<SelectAllowedListsProps> = ({initialValue}) => {
  return (
    <Form.Item
      layout="vertical"
      label="Allowed Lists"
      name="allowed_lists"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValue={initialValue || [data[0].id]}
      rules={[{ required: true, type: "array", min: 1, message: "Please select at least one allowed list"}]}
    >
      <Checkbox.Group style={{width: "100%"}}>
        <List
          size="small"
          bordered
          dataSource={data}
          style={{ maxHeight: "200px", overflow: "auto", width: "100%" }}
          renderItem={(item) => (
            <List.Item>
              <Checkbox value={item.id}>
                {item.title}
              </Checkbox>
            </List.Item>
          )}
        />
      </Checkbox.Group>
    </Form.Item>
  )
}

export default SelectAllowedLists;