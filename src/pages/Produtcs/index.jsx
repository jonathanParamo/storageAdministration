import Menu from '../../components/Menu';
import NewProduct from '../../components/Storage';
import ViewProducts from '../../components/ViewProducts';
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

const Products = () => {
  const dispatch = useDispatch();

  const { section, storageId } = useSelector(({ StorageReducer}) => ({
    section: StorageReducer.section,
    storageId: StorageReducer.storageId
  }));

  const productMenu = {
    listView: {
      label: 'All products',
      onClick: () => dispatch({ type: 'STORAGE_SECTION', payload: 'view'}),
      currentSection: 'view',
    },
    create: {
      label: 'Create product',
      onClick: () => dispatch({ type: 'STORAGE_SECTION', payload: 'create'}),
      currentSection: 'create',
    },
    update: {
      label: 'Update products',
      onClick: undefined,
      currentSection: 'update',
    },
  };

  return (
    <div className="containerProduct">
      <Menu listItems={productMenu} />
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
