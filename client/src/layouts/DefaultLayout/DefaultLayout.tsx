import { FC } from "react";

import { Outlet } from "react-router";

import styles from "./DefaultLayout.module.scss";
import NavBar from "../../elements/NavBar/NavBar";

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