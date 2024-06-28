import { FC, PropsWithChildren } from "react";

import styles from "./Clans.module.scss";

const ClansWrapper: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.clansWrapper}>
      {children}
    </div>
  )
}

export default ClansWrapper;