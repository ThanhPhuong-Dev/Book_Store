import styles from '~/components/CssComponents/SwiperComponent.module.scss';

function InfoGroup() {
  return (
    <div className={styles.info}>
      <h1>Thành Viên</h1>
      <div className={styles.groupName}>
        <p>Hồ Văn Thanh Phương</p>
        <p>Hồ Văn Thanh Phương</p>
        <p>Hồ Văn Thanh Phương</p>
        <p>Hồ Văn Thanh Phương</p>
        <p>Hồ Văn Thanh Phương</p>
      </div>
    </div>
  );
}

export default InfoGroup;
