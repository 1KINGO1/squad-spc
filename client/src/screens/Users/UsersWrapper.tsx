import { FC, PropsWithChildren } from "react";
import styles from "./Users.module.scss";

const UsersWrapper: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}

export default UsersWrapper;