import ProductMenu from '../../components/ProductMenu';
import Storage from '../../components/Storage';
import { useDispatch } from "react-redux";
import "./styles.css";
import { useSelector } from 'react-redux';

const Storages = () => {
  const dispatch = useDispatch();

  const { section } = useSelector(({ StorageReducer}) => ({
    section: StorageReducer.section,
  }));

  const storagesMenu = {
    create: {
      label: 'Create storage',
      onClick: () => dispatch({ type: 'STORAGE_SECTION', payload: 'create'}),
      currentSection: 'create',
    },
    listView: {
      label: 'All storages',
      onClick: () => dispatch({ type: 'STORAGE_SECTION', payload: 'view'}),
      currentSection: 'view',
    },
    update: {
      label: 'Update storage',
      onClick: () => dispatch({ type: 'STORAGE_SECTION', payload: 'update'}),
      currentSection: 'update',
    },
  };

  return (
    <div className="containerProductMenuProducts">
      <ProductMenu listItems={storagesMenu} />
      <div className="visualContent">
        {section === 'create' && <Storage />}

        {/* crear el componente ViewStorages */}
        {section === 'view' && <Storage />}

        {/* crear el componente ViewStorages */}
        {section === 'update' && <Storage editMode />}
      </div>
    </div>
  )
}

export default Storages;
