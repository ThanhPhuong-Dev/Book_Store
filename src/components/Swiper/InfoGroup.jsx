import styles from '~/components/CssComponents/SwiperComponent.module.scss';

function InfoGroup() {
  return (
    <div className="absolute bottom-0 bg-green-600 h-28 flex items-center text-3xl text-white font-bold w-full px-8">
      <h1 className="pr-4 border-r-[2px] border-r-[#ccc]">Thành Viên</h1>
      <div className="flex flex-1 justify-around  items-center pl-4">
        <p>Mai Đăng Lanh</p>
        <p>Phan Quốc Đạt</p>
        <p>Hồ Văn Thanh Phương</p>
        <p>Lưu Tấn Đạt</p>
        <p>Hoàng Minh Thắng</p>
      </div>
    </div>
  );
}

export default InfoGroup;
