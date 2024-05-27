import styles from '~/components/CssComponents/Home.module.scss';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

function DefaultLayout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <HeaderComponent></HeaderComponent>
      <div className={styles.container_children}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
