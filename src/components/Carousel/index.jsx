import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Carousel = () => {

  const handleDragStart = (e) => e.preventDefault();

  const items = [
    <img src="https://www.collinsdictionary.com/images/full/vegetable_82806697.jpg" onDragStart={handleDragStart} role="presentation" />,
    <img src="https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg" onDragStart={handleDragStart} role="presentation" />,
    <img src="https://bod-blog-assets.prod.cd.beachbodyondemand.com/bod-blog/wp-content/uploads/2017/08/24170609/What-Do-I-Do-If-I-Dont-Like-Vegetables.960-715x358.jpg" onDragStart={handleDragStart} role="presentation" />,
  ];

  return (
    <AliceCarousel mouseTracking autoWidth items={items} />
  )
};

export default Carousel;
