function capitalizeFirstLetter(string) {
  // Chuyển tất cả thành chữ thường và tách từng từ
  const words = string.toLowerCase().split(' ');

  // Chuyển đổi chữ cái đầu tiên của mỗi từ thành chữ hoa
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  // Ghép các từ lại và trả về chuỗi kết quả
  return capitalizedWords.join(' ');
}

export default capitalizeFirstLetter;
