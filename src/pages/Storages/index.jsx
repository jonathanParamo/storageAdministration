import Menu from '../../components/Menu';
import Storage from '../../pages/Storage';
import ViewStorages from '../ViewStorages';
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

const Storages = () => {
  const dispatch = useDispatch();

  const { section, storageId } = useSelector(({ StorageReducer, MenuReducer }) => ({
    section: MenuReducer.section,
    storageId: StorageReducer.storageId
  }));

  const storagesMenu = {
    listView: {
      label: 'All storages',
      onClick: () => dispatch({ type: 'CHANGE_SECTION', payload: 'view'}),
      currentSection: 'view',
    },
    create: {
      label: 'Create storage',
      onClick: () => dispatch({ type: 'CHANGE_SECTION', payload: 'create'}),
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
