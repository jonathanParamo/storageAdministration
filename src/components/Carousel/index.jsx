import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ViewProducts from '../ViewProducts'

const Carousel = ({products}) => {

  const handleDragStart = (e) => e.preventDefault();

  const items = products

  return (
    <AliceCarousel mouseTracking autoWidth items={items} />
  )
};

export default Carousel;
