import styles from './Records.module.scss';
import { FC, PropsWithChildren } from "react";
import CreateRecord from "./CreateRecord";

const RecordsWrapper: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.recordsWrapper}>
      <CreateRecord />
      {children}
    </div>
  )
}

export default RecordsWrapper;