import styles from '~/components/CssComponents/ModalComponent.module.scss';
import InputComponent from '../InputComponent/InputComponent';
import { IoMdEye } from 'react-icons/io';
import { IoIosEyeOff } from 'react-icons/io';
import { useState } from 'react';
function LoginModal({ modalLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const hadnleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {modalLogin && (
        <div className={styles.modal}>
          <div className={styles.modal_login}>
            <h1>Đăng Nhập</h1>
            <InputComponent label="Tên Đăng Nhập" type="text"></InputComponent>
            <InputComponent
              label="Mật Khẩu"
              type={showPassword ? 'text' : 'password'}
              icon={showPassword ? <IoIosEyeOff></IoIosEyeOff> : <IoMdEye />}
              onClickIcon={hadnleShowPassword}
            ></InputComponent>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginModal;
