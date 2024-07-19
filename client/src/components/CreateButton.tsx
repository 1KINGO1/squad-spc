import React, { FC } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

import styles from "../screens/Clans/Clans.module.scss";

interface CreateButtonProps {
  onClick: () => void,
  style?: React.CSSProperties,
  bottom?: number,
  right?: number,
  icon?: React.ReactNode
}

const CreateButton: FC<CreateButtonProps> = ({onClick, icon, style, bottom = 30, right = 30}) => {
  return (
    <FloatButton icon={icon ?? <PlusOutlined />}
                 type="primary"
                 onClick={onClick}
                 shape="square"
                 style={{...style, position: "fixed", bottom: `${bottom}px`, right: `${right}px`}}
                 className={styles.addClanButton}
    />
  )
}

export default CreateButton;