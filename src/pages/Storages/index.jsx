import ProductMenu from '../../components/ProductMenu';
import Storage from '../../components/Storage';
import ViewStorages from '../../components/ViewStorages';
import { useDispatch } from "react-redux";
import "./styles.css";
import { useSelector } from 'react-redux';

const Storages = () => {
  const dispatch = useDispatch();

  const { section, storageId } = useSelector(({ StorageReducer}) => ({
    section: StorageReducer.section,
    storageId: StorageReducer.storageId
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
        {section === 'view' && <ViewStorages />}

        {/* crear el componente EditMode */}
        {section === 'update' && <Storage editMode  storageId={storageId} />}
      </div>
    </div>
  )
}

export default Storages;
