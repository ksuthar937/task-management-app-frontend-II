import Logo from "../assets/tasks.png";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.border1}></div>
      <div className={styles.border2}></div>
      <div className={styles.border3}></div>
      <div className={styles.header}>
        <img src={Logo} alt="logo" width={50} height={50} />
        <h1>Task List</h1>
      </div>
    </>
  );
};

export default Header;
