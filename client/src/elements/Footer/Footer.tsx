import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <p className={styles.title}>Squad Permission Control (SPC)</p>
      <p className={styles.developedBy}>
        Developed by <a href="https://github.com/1KINGO1/squad-spc" target="_SEJ" rel="noreferrer">KINGO</a>
      </p>
      <p className={styles.sponsoredBy}>
        Sponsored by <a href="https://discord.gg/4AHFntZDTc" target="_SEJ" rel="noreferrer">HQ Ukraine</a> Squad Server
      </p>
      <p className={styles.inspiredBy}>
        Inspired by Squad_Whitelister
      </p>
      <p className={styles.bottomText}>
        OpenSource © 2024
      </p>
    </footer>
  )
}

export default Footer;