import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';

import styles from '~/components/CssComponents/SwiperComponent.module.scss';
// import SwiperCore, { Navigation } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { imageSlide } from '~/utils/renderImageSilde';
import InfoGroup from './InfoGroup';

function SwiperComponent() {
  return (
    <div className={styles.wrapper}>
      <Swiper navigation={true} modules={[Navigation, Autoplay]} autoplay={{ deplay: 2000 }} className={styles.swiper}>
        {imageSlide.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <img src={image}></img>
          </SwiperSlide>
        ))}
      </Swiper>
      <InfoGroup></InfoGroup>
    </div>
  );
}

export default SwiperComponent;
