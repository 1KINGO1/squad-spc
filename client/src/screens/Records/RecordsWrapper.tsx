import { FC, PropsWithChildren } from "react";

import styles from "./Records.module.scss";

const RecordsWrapper: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.recordsWrapper}>
      {children}
    </div>
  )
}

export default RecordsWrapper;