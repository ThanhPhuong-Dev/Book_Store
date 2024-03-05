import { FaSearch } from 'react-icons/fa';
import styles from '../CssComponents/SearchCompomnent.module.scss';
import { IoCloseCircleOutline } from 'react-icons/io5';
function SearchComponent() {
  return (
    <div className={styles.search}>
      <input></input>
      <IoCloseCircleOutline className={styles.close}></IoCloseCircleOutline>
      <FaSearch className={styles.FaSearch}></FaSearch>
    </div>
  );
}

export default SearchComponent;
