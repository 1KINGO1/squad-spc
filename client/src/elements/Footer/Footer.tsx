import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <img src="./assets/logo.svg" alt="Logo" />
      </div>
      <p className={styles.title}>Squad Permission Control (SPC)</p>
      <p className={styles.developedBy}>
        Developed by <a href="https://github.com/1KINGO1/squad-spc" target="_SEJ" rel="noreferrer">KINGO</a>
      </p>
      <p className={styles.inspiredBy}>
        Inspired by Squad_Whitelister
      </p>
      <p className={styles.bottomText}>
        OpenSource © 2024
      </p>
      <p className={styles.version}>
        Beta 0.0.1
      </p>
    </footer>
  )
}

export default Footer;