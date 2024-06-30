import { Button, Form, FormInstance, InputNumber, Select, Space } from "antd";
import React, { FC, useMemo } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import useGroups from "../../../../hooks/useGroups";
import styles from "../../../Records/Records.module.scss";

interface EditLimitsProps {
  form: FormInstance<any>;
}

const EditLimits: FC<EditLimitsProps> = ({ form }) => {
  const { groups } = useGroups();
  const values = Form.useWatch([], form);

  const formLimits = form.getFieldValue("limits") || [];

  const groupsOptions = useMemo(() => {
    if (!groups || !groups.length) return [];

    return groups
      .map(group => (
        {
          value: group.id,
          label: group.name,
          disabled: !formLimits.every((field: { group: number }) => field?.group !== group.id)
        }
      ));
  }, [values, groups]);

  return (
    <Form.List name="limits">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: "flex", marginBottom: 8, justifyContent: "center" }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, "group"]}
                rules={[{ required: true, message: "Missing first name" }]}
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
              >


                <Select
                  className={styles.selectInput}
                  showSearch
                  placeholder="Select limit group"
                  optionFilterProp="label"
                  style={{ width: 200 }}
                >
                  {groupsOptions.map(group => (
                    <Select.Option key={group.value} value={group.value} label={group.label} disabled={group.disabled}>
                      {group.label}
                    </Select.Option>
                  ))}
                </Select>


              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "limit"]}
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
              >


                <InputNumber placeholder="Unlimited" min={1} max={1000} />


              </Form.Item>


              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add limit
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default EditLimits;