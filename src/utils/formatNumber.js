function formatNumber(number) {
  return number.toLocaleString('en-US').replace(/,/g, '.');
}

export default formatNumber;
