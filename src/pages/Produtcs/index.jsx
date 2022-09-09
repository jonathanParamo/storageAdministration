import Menu from '../../components/Menu';
import CreateProduct from '../../components/CreateProduct';
import ViewProducts from '../../components/ViewProducts';
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

const Products = () => {
  const dispatch = useDispatch();

  const { section } = useSelector(({ MenuReducer }) => ({
    section: MenuReducer.section,
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
    <div className="containerProductMenuProducts">
      <Menu listItems={productMenu} />
      <div className="visualContent">

        {section === 'view' && <ViewProducts />}

        {section === 'create' && <CreateProduct />}

        {/* {section === 'update' && <NewProduct editMode />} */}
      </div>
    </div>
  )
}

export default Products;
