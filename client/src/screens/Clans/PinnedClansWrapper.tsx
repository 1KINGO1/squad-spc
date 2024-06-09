import { FC, PropsWithChildren } from "react";
import styles from "./Clans.module.scss";
import { PushpinOutlined } from "@ant-design/icons";

const PinnedClansWrapper: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.pinnedClansWrapper}>
      <p><PushpinOutlined /> Pinned</p>

      <div className={styles.clansWrapper}>
        {children}
      </div>
    </div>
  )
}

export default PinnedClansWrapper;