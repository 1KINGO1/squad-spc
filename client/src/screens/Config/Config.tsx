import useConfigSettings from "../../hooks/config/useConfigSettings";
import styles from "./Config.module.scss";
import { useState } from "react";
import ConfigLocation from "./ConfigLocation";
import { ConfigSettings } from "../../types/models/ConfigSettings";
import ConfigPropertyEdit from "./ConfigPropertyEdit";

const Config = () => {
  const { data: settings, isLoading } = useConfigSettings();
  const [selectedProperty, setSelectedProperty] = useState<string[]>([]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.configLocationWrapper}>
        <ConfigLocation
          configSettings={settings as ConfigSettings}
          setSelectedProperty={setSelectedProperty}
          selectedProperty={selectedProperty}
        />
      </div>
      <ConfigPropertyEdit
        selectedProperty={selectedProperty}
        configSettings={settings as ConfigSettings}
      />
    </div>
  );
};

export default Config;