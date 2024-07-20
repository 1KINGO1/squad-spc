import React, { FC, useEffect } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { FloatButton, Popover } from "antd";

import styles from "../screens/Clans/Clans.module.scss";
import KeyboardKey from "./KeyboardKey";

interface CreateButtonProps {
  onClick: () => void,
  style?: React.CSSProperties,
  bottom?: number,
  right?: number,
  icon?: React.ReactNode
}

const CreateButton: FC<CreateButtonProps> = ({ onClick, icon, style, bottom = 30, right = 30 }) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "c") {
        onClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Popover content={(
      <>
        <KeyboardKey>
          Alt + C
        </KeyboardKey>
      </>
    )}>
      <FloatButton icon={icon ?? <PlusOutlined />}
                   type="primary"
                   onClick={onClick}
                   shape="square"
                   style={{ ...style, position: "fixed", bottom: `${bottom}px`, right: `${right}px` }}
                   className={styles.addClanButton}
      />
    </Popover>
  );
};

export default CreateButton;