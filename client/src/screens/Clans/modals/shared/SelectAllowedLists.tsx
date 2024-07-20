import { FC } from "react";

import { Checkbox, Form, List } from "antd";

import useLists from "../../../../hooks/lists/useLists";

interface SelectAllowedListsProps {
  initialValue?: number[];
}

const SelectAllowedLists: FC<SelectAllowedListsProps> = ({initialValue}) => {

  const {lists} = useLists();
  const data = lists.map((list) => ({id: list.id, title: list.name}));

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