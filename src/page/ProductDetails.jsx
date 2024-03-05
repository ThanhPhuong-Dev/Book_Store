import styles from '~/components/CssComponents/ProductDetail.module.scss';
import { IoAddOutline } from 'react-icons/io5';
import { IoRemoveOutline } from 'react-icons/io5';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';
import { useState } from 'react';

function ProductDetails() {
  const [amount, setAmount] = useState(1);

  const handleAmount = (type) => {
    if (type == 'increase') {
      setAmount(amount + 1);
    } else if (type == 'reduce') {
      if (amount > 1) {
        setAmount(amount - 1);
      }
    }
  };
  return (
    <div className={styles.product}>
      <div className={styles.product_header}>
        <h1>Shop Book</h1>
        <div className={styles.product_title}>
          <span>Home/ </span>
          <span> Product/ </span>
          <span> Sarn pharm</span>
        </div>
      </div>

      <div className={styles.product_container}>
        <div className={styles.product_wrapper}>
          <div className={styles.product_images}>
            <div className={styles.product_images_image}>
              <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book3.png" alt="" />
            </div>
          </div>

          <div className={styles.product_content}>
            <h1>Tên sản phẩm</h1>
            <h3>2.000.000đ</h3>
            <p>
              Dynamically innovate resource-leveling customer service for state of the art customer serviceynamically
              innovate resource-leveling customer service for state of the art customer serviceynamically innovate
            </p>

            <div className={styles.product_action}>
              <div className={styles.product_salary}>
                <h4>Số Lượng</h4>
                <IoRemoveOutline
                  className={styles.product_icon}
                  onClick={() => handleAmount('reduce')}
                ></IoRemoveOutline>
                <span>{amount}</span>
                <IoAddOutline className={styles.product_icon} onClick={() => handleAmount('increase')}></IoAddOutline>
              </div>
              <div className={styles.product_buy}>
                <ButtonComponent outline>Thêm Giỏ Hàng</ButtonComponent>
                <ButtonComponent primary>Mua Hàng</ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
