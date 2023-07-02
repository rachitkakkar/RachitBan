import { useState } from 'react';
import CreateListForm from './CreateListForm';

const CreateList = ({ onAddList }) => {
  const [displayType, setDisplayType] = useState('none');

  return (
    <div>
      <button onClick={ () => setDisplayType('block') } className='top-button'>+ Add Another</button>
      <CreateListForm displayType={displayType} onAddList={onAddList} onClose={ () => setDisplayType('none') } />
    </div>
  );
}

export default CreateList;