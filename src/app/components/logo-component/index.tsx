import mainLogo from "../../../assets/images/league-logo.png";
import styles from "./styles.module.css";

export const Logo = () => {
  return (
    <>
      <div className={styles["logo-container"]}>
        <img src={mainLogo} alt="mainLogo" className={styles.logo} />
      </div>
    </>
  );
};
