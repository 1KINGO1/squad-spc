import { FC, PropsWithChildren } from "react";

import styles from "./Groups.module.scss";

const GroupsWrapper:FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}

export default GroupsWrapper;