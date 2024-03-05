import styles from '../CssComponents/CardComponent.module.scss';

function CardComponent() {
  return (
    <div className={styles.card}>
      <div className={styles.card_image}>
        <img
          src="https://png.pngtree.com/thumb_back/fw800/background/20230613/pngtree-an-open-book-sits-on-top-of-several-books-image_2873009.jpg"
          alt=""
        ></img>
      </div>
      <div className={styles.card_content}>
        <h1>Sách tên</h1>
        <p>Giá</p>
      </div>
    </div>
  );
}

export default CardComponent;
