import { FC, FocusEvent, ReactNode, useState } from "react";
import { IConfigPathSettings } from "../../types/models/ConfigSettings";
import { Checkbox, Form, Input, InputNumber } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import useUpdatePropertyValue from "../../hooks/config/useUpdatePropertyValue";

interface PropertyInputProps {
  settings: IConfigPathSettings,
  propertyPath: string,
  defaultValue?: any
}

const PropertyInput: FC<PropertyInputProps> = ({settings, defaultValue, propertyPath}) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState<string | null>(null);
  const changeMutation = useUpdatePropertyValue({
    onSuccess: () => setLoading(false),
    onError: () => setLoading(false)
  })


  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target?.value ?? e.target?.checked ?? null;
    valueChangeHandler(value);
  }
  const checkboxChangeHandler = (e: CheckboxChangeEvent) => {
    const value = e.target?.value ?? e.target?.checked ?? null;
    valueChangeHandler(value);
  }
  const valueChangeHandler = (value: any) => {
    if (value === defaultValue) return;
    if (value === "") value = null;
    setLoading(true);
    changeMutation.mutate({key: propertyPath, value: value});
  }

  let input: ReactNode = null;
  switch (settings.type) {
    case "number":
      input = (
        <InputNumber
          placeholder={settings.name}
          defaultValue={defaultValue}
          style={{ width: "100%" }}
          onBlur={blurHandler}
        />
      );
      break;
    case "boolean":
      input = (
        <Checkbox
          defaultChecked={defaultValue}
          onChange={checkboxChangeHandler}
        />
      );
      break;
    default:
      input = (
        <Input
          placeholder={settings.name}
          defaultValue={defaultValue}
          onBlur={blurHandler}
        />
      );
  }

  let inputStatus;

  if (isLoading) {
    inputStatus = "validating";
  } else if (isError) {
    inputStatus = "error";
  } else inputStatus = "success";

  return (
    <Form.Item
      label={settings.name}
      name={settings.name}
      labelAlign={"left"}
      key={settings.name + settings.type}
      tooltip={settings.comment}
      style={{width: "100%"}}
      hasFeedback
      validateStatus={inputStatus as any}
    >
      {input}
    </Form.Item>
  )
}

export default PropertyInput;