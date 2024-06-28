import { FC, PropsWithChildren } from "react";

import { PushpinOutlined } from "@ant-design/icons";

import styles from "./Clans.module.scss";

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