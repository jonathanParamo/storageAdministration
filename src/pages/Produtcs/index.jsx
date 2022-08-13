import ProductMenu from '../../components/ProductMenu';
import NewProduct from '../../components/Storage';
import ViewProducts from '../../components/ViewProducts';
import { useDispatch } from "react-redux";
import "./styles.css";
import { useSelector } from 'react-redux';

const Products = () => {
  const dispatch = useDispatch();

  const { section, storageId } = useSelector(({ StorageReducer}) => ({
    section: StorageReducer.section,
    storageId: StorageReducer.storageId
  }));

  const productMenu = {
    create: {
      label: 'Create product',
      onClick: () => dispatch({ type: 'STORAGE_SECTION', payload: 'create'}),
      currentSection: 'create',
    },
    listView: {
      label: 'All products',
      onClick: () => dispatch({ type: 'STORAGE_SECTION', payload: 'view'}),
      currentSection: 'view',
    },
    update: {
      label: 'Update products',
      onClick: undefined,
      currentSection: 'update',
    },
  };

  return (
    <div className="containerProduct">
      <ProductMenu listItems={productMenu} />
      <div className="visualContent">
        {section === 'create' && <NewProduct />}

        {/* crear el componente ViewStorages */}
        {section === 'view' && <ViewProducts />}

        {/* crear el componente EditMode */}
        {section === 'update' && <NewProduct editMode  storageId={storageId} />}
      </div>
    </div>
  )
}

export default Products;
