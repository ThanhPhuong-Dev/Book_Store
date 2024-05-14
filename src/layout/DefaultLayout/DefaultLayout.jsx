import FooterComponent from '~/components/FooterComponent/FooterComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import styles from '~/components/CssComponents/Home.module.scss';

function DefaultLayout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <HeaderComponent></HeaderComponent>
      <div className={styles.container_children}>{children}</div>
      {/* <FooterComponent></FooterComponent> */}
    </div>
  );
}

export default DefaultLayout;
