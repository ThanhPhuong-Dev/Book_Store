import FooterComponent from '~/components/FooterComponent/FooterComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

function DefaultLayout({ children }) {
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      {children}
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default DefaultLayout;
