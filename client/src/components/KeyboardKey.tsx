import { FC, PropsWithChildren } from "react";

import styles from "./KeyboardKey.module.scss";

const KeyboardKey: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}

export default KeyboardKey;