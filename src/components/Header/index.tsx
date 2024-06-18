import styles from "./Header.module.css";

import osbLogo from "../assets/osb-logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={osbLogo} alt="OSB Logo" />
      <strong>Observatório Social do Brasil</strong>
    </header>
  );
}
