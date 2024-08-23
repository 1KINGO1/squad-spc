import { FC } from "react";
import styles from "../Home.module.scss";
import { Avatar } from "antd";
import useConfig from "../../../hooks/config/useConfig";

const ServerLabel: FC = () => {

  const {data: config} = useConfig();

  return (
    <div className={styles.serverLabel}>
      <Avatar src={<img src={config?.general?.visual?.projectAvatarUrl || "/assets/logo.svg"} alt="avatar" />} size={36}/>
      <h1>{config?.general?.visual?.projectName || "MagicGear - SPC"}</h1>
    </div>
  )
}

export default ServerLabel;