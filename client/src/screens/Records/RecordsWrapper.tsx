import { FC, PropsWithChildren } from "react";

import CreateRecord from "./CreateRecord";
import styles from "./Records.module.scss";

const RecordsWrapper: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.recordsWrapper}>
      <CreateRecord />
      {children}
    </div>
  )
}

export default RecordsWrapper;