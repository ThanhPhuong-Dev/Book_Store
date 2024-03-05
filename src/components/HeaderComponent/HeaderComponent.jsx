import logo from '../../assets/img/logo.png';
import styles from '../CssComponents/HeaderComponent.module.scss';
import { FaShoppingCart } from 'react-icons/fa';
import SearchComponent from './SearchComponent';
function HeaderComponent() {
  return (
    <div className={styles.headers}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.image}>
            <img src={logo} alt=""></img>
          </div>
          <h1 className={styles.nameStore}>Phuong Book</h1>
        </div>

        <SearchComponent></SearchComponent>

        <div className={styles.action}>
          <h1 className={styles.home}>Trang Chủ</h1>
          <h1 className={styles.home}>Đăng Nhập</h1>
          <FaShoppingCart className={styles.shoppingCart}></FaShoppingCart>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
