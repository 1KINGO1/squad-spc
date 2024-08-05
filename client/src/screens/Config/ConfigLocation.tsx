import { FC, useState } from "react";
import { ConfigSettings } from "../../types/models/ConfigSettings";
import styles from "./Config.module.scss";

interface ConfigLocationProps {
  configSettings: ConfigSettings,
  selectedProperty: string[],
  setSelectedProperty: React.Dispatch<React.SetStateAction<string[]>>,
  topSpan?: number
  depth?: number
}

const ConfigLocation: FC<ConfigLocationProps> = (
  {
    configSettings,
    selectedProperty,
    setSelectedProperty,
    topSpan = 0
  }
) => {
  const [currentTopSpan, setCurrentTopSpan] = useState<number>(topSpan);

  const propertyClickHandler = (currentProperty: string) => {
    setSelectedProperty(prev => {
      const result = [];

      for (const property of prev) {
        if (selectedProperty.includes(property)) break;
        result.push(property);
      }

      return [...result, currentProperty];
    });
  };

  const isLastPropertyList = selectedProperty.length === 0 ||
    Object.keys(configSettings[selectedProperty[0]])
      .some(property => {
        return Object.prototype.hasOwnProperty.call((configSettings[selectedProperty[0]] as ConfigSettings)[property], "get");
      });

  return (
    <>
      <ul className={styles.propertyList}>
        {new Array(topSpan).fill(0).map((_, index) => (
          <li
            key={index}
            style={{visibility: "hidden"}}
          >
            Empty
          </li>
        ))
        }
        {configSettings && Object.keys(configSettings).map((setting: string, index: number) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            key={setting}
            onClick={() => {
              propertyClickHandler(setting);
              setCurrentTopSpan(topSpan + index);
            }}
            className={selectedProperty.includes(setting) ? styles.selected : ""}
          >
            {setting}
          </li>
        ))}
      </ul>
      {
        !isLastPropertyList &&
        <ConfigLocation
          configSettings={configSettings[selectedProperty[0]] as ConfigSettings}
          selectedProperty={selectedProperty.slice(1)}
          setSelectedProperty={setSelectedProperty}
          topSpan={currentTopSpan}
        />
      }
    </>
  );
};

export default ConfigLocation;