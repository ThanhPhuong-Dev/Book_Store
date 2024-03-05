import { useState } from 'react';
import styles from '~/components/CssComponents/Login.module.scss';
import InputComponent from '~/components/InputComponent/InputComponent';
import { IoMdEye } from 'react-icons/io';
import { IoIosEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const hadnleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className={styles.login_header}>
        <h1>Account</h1>
        <div className={styles.login_title}>
          <span>Home/ </span>
          <span> Đăng Nhập</span>
        </div>
      </div>

      <div className={styles.login_body}>
        <div className={styles.login_form}>
          <form>
            <h1>Đăng Nhập</h1>
            <InputComponent label="Tên Đăng Nhập" type="text"></InputComponent>
            <InputComponent
              label="Mật Khẩu"
              type={showPassword ? 'text' : 'password'}
              icon={showPassword ? <IoIosEyeOff></IoIosEyeOff> : <IoMdEye />}
              onClickIcon={hadnleShowPassword}
            ></InputComponent>
            <div className={styles.login_btn}>
              <button type="submit">Đăng Nhập</button>
            </div>
          </form>
          <p onClick={() => navigate('/sign-up')}>Tạo tài khoản</p>
        </div>
      </div>
    </>
  );
}

export default Login;
