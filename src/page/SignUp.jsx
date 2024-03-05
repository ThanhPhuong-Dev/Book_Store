import { useState } from 'react';
import styles from '~/components/CssComponents/SignUp.module.scss';
import InputComponent from '~/components/InputComponent/InputComponent';
import { IoMdEye } from 'react-icons/io';
import { IoIosEyeOff } from 'react-icons/io';
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const hadnleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className={styles.signUp_body}>
        <div className={styles.signUp_header}>
          <h1>Account</h1>
          <div className={styles.signUp_title}>
            <span>Home/ </span>
            <span> Đăng Ký</span>
          </div>
        </div>
        <div className={styles.signUp_form}>
          <form>
            <h1>Đăng Ký</h1>
            <InputComponent label="Email" type="text"></InputComponent>
            <InputComponent
              label="Mật Khẩu"
              type={showPassword ? 'text' : 'password'}
              icon={showPassword ? <IoIosEyeOff></IoIosEyeOff> : <IoMdEye />}
              onClickIcon={hadnleShowPassword}
            ></InputComponent>
            <InputComponent
              label="Nhập lại Mật Khẩu"
              type={showPassword ? 'text' : 'password'}
              icon={showPassword ? <IoIosEyeOff></IoIosEyeOff> : <IoMdEye />}
              onClickIcon={hadnleShowPassword}
            ></InputComponent>
            <div className={styles.signUp_btn}>
              <button type="submit">Đăng ký</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
