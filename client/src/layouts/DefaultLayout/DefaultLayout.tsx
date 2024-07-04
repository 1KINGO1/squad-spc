import { FC } from "react";

import { Outlet } from "react-router";

import styles from "./DefaultLayout.module.scss";
import NavBar from "../../elements/NavBar/NavBar";
import Footer from "../../elements/Footer/Footer";

const DefaultLayout: FC = () => {
  return (
    <>
      <div className={styles.topWrapper}>
        <NavBar />
        <main className={styles.contentWrapper}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default DefaultLayout;