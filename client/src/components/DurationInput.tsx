import { FC } from "react";

import { Form, InputNumber, Select, Space } from "antd";

interface DurationInputProps {
  handleValueChange?: (value: number | null) => void;
  handleUnitChange?: (unit: number) => void;
  inputDurationClassName?: string;
  inputUnitClassName?: string;
  inputActionClassName?: string;
  placeholder?: string;
  label?: string;
  noStyle?: boolean;
  withAction?: boolean;
}

const DurationInput: FC<DurationInputProps> = (
  {
    handleUnitChange,
    handleValueChange,
    inputDurationClassName,
    inputUnitClassName,
    placeholder,
    withAction,
    inputActionClassName
  }
) => {
  return (
    <Space.Compact style={{ width: "100%" }}>
      {withAction && (
        <Form.Item
          name={["duration", "action"]}
          noStyle
          className={inputActionClassName}
        >
          <Select>
            <Select.Option value="add">ADD</Select.Option>
            <Select.Option value="subtract">SUBTRACT</Select.Option>
            <Select.Option value="set">SET</Select.Option>
          </Select>
        </Form.Item>
      )}
      <Form.Item
        name={["duration", "value"]}
        noStyle
        className={inputDurationClassName}
      >
        <InputNumber
          placeholder={placeholder}
          className={inputDurationClassName}
          min={0}
          max={999}
          onChange={handleValueChange}
        />
      </Form.Item>
      <Form.Item
        name={["duration", "unit"]}
        noStyle
        initialValue={60 * 60}
        className={inputUnitClassName}
      >
        <Select onChange={handleUnitChange} className={inputUnitClassName}>
          <Select.Option value={60}>Minutes</Select.Option>
          <Select.Option value={60 * 60}>Hours</Select.Option>
          <Select.Option value={60 * 60 * 24}>Days</Select.Option>
        </Select>
      </Form.Item>
    </Space.Compact>
  );
};

export default DurationInput;
