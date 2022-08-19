import Menu from '../../components/Menu';
import Storage from '../../components/Storage';
import ViewStorages from '../../components/ViewStorages';
import { useDispatch } from "react-redux";
import "./styles.css";
import { useSelector } from 'react-redux';

const Storages = () => {
  const dispatch = useDispatch();

  const { section, storageId } = useSelector(({ StorageReducer }) => ({
    section: StorageReducer.section,
    storageId: StorageReducer.storageId
  }));

  const storagesMenu = {
    listView: {
      label: 'All storages',
      onClick: () => dispatch({ type: 'STORAGE_SECTION', payload: 'view'}),
      currentSection: 'view',
    },
    create: {
      label: 'Create storage',
      onClick: () => dispatch({ type: 'STORAGE_SECTION', payload: 'create'}),
      currentSection: 'create',
    },
    update: {
      label: 'Update storage',
      onClick: undefined,
      currentSection: 'update',
    },
  };

  return (
    <div className="containerProductMenuProducts">
      <Menu listItems={storagesMenu} />
      <div className="visualContent">
        {section === 'create' && <Storage />}

        {section === 'view' && <ViewStorages />}

        {section === 'update' && <Storage editMode  storageId={storageId} />}
      </div>
    </div>
  )
}

export default Storages;
