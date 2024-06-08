import { FC } from "react";
import NavBar from "../../elements/NavBar/NavBar";
import { Outlet } from "react-router";

import styles from "./DefaultLayout.module.scss";

const DefaultLayout: FC = () => {
  return (
    <>
      <NavBar />
      <main className={styles.contentWrapper}>
        <Outlet />
      </main>
    </>
  );
}

export default DefaultLayout;