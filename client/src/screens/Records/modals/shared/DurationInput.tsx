import { Form, Input, InputNumber, Select, Space } from "antd";
import { FC } from "react";

interface DurationInputProps {
  handleValueChange?: (value: number | null) => void;
  handleUnitChange?: (unit: number) => void;
  inputDurationClassName?: string;
  inputUnitClassName?: string;
  placeholder?: string;
}

const DurationInput: FC<DurationInputProps> = (
  {
    handleUnitChange,
    handleValueChange,
    inputDurationClassName,
    inputUnitClassName,
    placeholder
  }
) => {
  return (
    <Space.Compact style={{ width: "100%" }}>
      <Form.Item
        name={["duration", "value"]}
        noStyle
        className={inputDurationClassName}
      >
        <InputNumber
          placeholder={placeholder}
          className={inputDurationClassName}
          min={0}
          max={999999}
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
          <Select.Option value={60 * 60 * 24 * 30}>Months</Select.Option>
        </Select>
      </Form.Item>
    </Space.Compact>
  );
};

export default DurationInput;