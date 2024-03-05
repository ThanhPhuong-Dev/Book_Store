import styles from '~/components/CssComponents/InputComponent.module.scss';

function InputComponent({ label, type, icon, onClickIcon }) {
  return (
    <div className={styles.inputt}>
      <span>{label}</span>
      <div className={styles.inputt_text}>
        <input type={type} />
        <div className={styles.icon} onClick={onClickIcon}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default InputComponent;
