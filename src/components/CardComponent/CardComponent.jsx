import { useNavigate } from 'react-router-dom';
import styles from '../CssComponents/CardComponent.module.scss';

function CardComponent({ books }) {
  const navigate = useNavigate();

  const {
    'Image-URL-L': imageBook,
    'Book-Title': nameBook,
    ISBN: price,
    'Book-Author': bookAuthor,
    'Year-Of-Publication': year
  } = books;
  const handleClickCard = () => {
    navigate(`/product-details/${books._id}`);
  };
  return (
    <div className={styles.card} onClick={handleClickCard}>
      <div className={styles.card_image}>
        <img src={imageBook} alt=""></img>
      </div>
      <div className="bg-[#f5f5f5] flex  flex-col  justify-center overflow-hidden text-ellipsis w-full">
        <h1 className="text-center font-bold text-2xl text-[#2c3e50] overflow-hidden text-ellipsis whitespace-normal break-words h-[30px] py-6">
          {nameBook}
        </h1>
        <p className="text-2xl text-center text-primary font-bold mt-4">
          {!isNaN(price) ? Number(price / 1000).toLocaleString() : '120.000'}VND
        </p>
        <div className="flex justify-between mt-4 px-4">
          <span>{bookAuthor}</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
