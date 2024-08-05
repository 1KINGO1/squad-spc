import { ConfigPath, ConfigSettings, IConfigPathSettings } from "../../types/models/ConfigSettings";
import { FC, ReactNode, useMemo } from "react";
import { Checkbox, Form, Input, InputNumber } from "antd";
import PropertyInput from "./PropertyInput";
import useConfig from "../../hooks/config/useConfig";

interface ConfigPropertyEditProps {
  selectedProperty: string[];
  configSettings: ConfigSettings;
}

function getPropertyList(configSettings: ConfigSettings, selectedProperty: string[]): {
  [key: string]: IConfigPathSettings
} {
  let nextProperty: ConfigSettings | ConfigPath = configSettings;
  for (const property of selectedProperty) {
    nextProperty = nextProperty[property] as ConfigPath;
  }

  if (nextProperty && Object.keys(nextProperty).some(property => Object.prototype.hasOwnProperty.call(nextProperty[property], "get"))) {
    return nextProperty as { [key: string]: IConfigPathSettings };
  } else return {};
}

const getConfigByPath = (configObj: any, path: string[]) => {
  let nextProperty = configObj;
  for (const property of path) {
    if (!Object.prototype.hasOwnProperty.call(nextProperty, property)) return null;
    nextProperty = nextProperty[property as any];
  }
  return nextProperty;
}

const ConfigPropertyEdit: FC<ConfigPropertyEditProps> = ({ configSettings, selectedProperty }) => {
  const {data: configData} = useConfig()
  const propertyList = getPropertyList(configSettings, selectedProperty);

  const config = getConfigByPath(configData, selectedProperty);

  console.log( selectedProperty, config);

  const inputs = Object.keys(propertyList).map((property) => {
    return (
      <PropertyInput
        settings={propertyList[property]}
        key={propertyList[property].name + propertyList[property].type}
        propertyPath={selectedProperty.join(".") + "." + property}
        defaultValue={config ? config[property] : undefined}
      />
    );
  });

  return (
    <Form
      autoComplete="off"
      style={{ width: "100%", padding: "10px 40px" }}
      labelCol={{ span: 6 }}
    >
      {inputs}
    </Form>
  );
};

export default ConfigPropertyEdit;