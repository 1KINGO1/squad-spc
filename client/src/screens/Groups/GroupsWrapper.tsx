import styles from './Groups.module.scss';
import { FC, PropsWithChildren } from "react";

const GroupsWrapper:FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}

export default GroupsWrapper;