
import styles from './globalStyles.module.css';

function GlobalStylesWrapper({ children }) {
  return <div className={styles.global}>{children}</div>;
}


export default GlobalStylesWrapper;
