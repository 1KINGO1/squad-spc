import React, { FC } from "react";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "../screens/Clans/Clans.module.scss";

interface CreateButtonProps {
  onClick: () => void,
  style?: React.CSSProperties
}

const CreateButton: FC<CreateButtonProps> = ({onClick, style}) => {
  return (
    <FloatButton icon={<PlusOutlined />}
                 type="primary"
                 onClick={onClick}
                 shape="square"
                 style={{...style, position: "absolute", bottom: "10px", right: "10px"}}
                 className={styles.addClanButton}
    />
  )
}

export default CreateButton;