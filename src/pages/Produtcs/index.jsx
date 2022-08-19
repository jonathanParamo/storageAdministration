import Menu from '../../components/Menu';
import NewProduct from '../../components/Storage';
import ViewProducts from '../../components/ViewProducts';
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

const Products = () => {
  const dispatch = useDispatch();

  const { section, products } = useSelector(({ ProductReducer}) => ({
    section: ProductReducer.section,
    products: ProductReducer.products,
  }));

  const productMenu = {
    listView: {
      label: 'All products',
      onClick: () => dispatch({ type: 'CHANGE_SECTION', payload: 'view'}),
      currentSection: 'view',
    },
    create: {
      label: 'Create product',
      onClick: () => dispatch({ type: 'CHANGE_SECTION', payload: 'create'}),
      currentSection: 'create',
    },
    update: {
      label: 'Update product',
      onClick: undefined,
      currentSection: 'update',
    },
  };

  return (
    <div className="containerProduct">
      <Menu listItems={productMenu} />
      <div className="visualContent">

        {/* {section === 'view' && <ViewProducts products={products} />} */}

        {section === 'create' && <NewProduct />}

        {/* {section === 'update' && <NewProduct editMode />} */}
      </div>
    </div>
  )
}

export default Products;
