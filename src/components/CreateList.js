import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CreateListForm from './CreateListForm';

const CreateList = ({ onAddList }) => {
    const [displayType, setDisplayType] = useState('none');

    return (
        <div>
            <button onClick={() => setDisplayType('block')} className='top-button'><FaPlus /> Add Another</button>
            <CreateListForm displayType={displayType} onAddList={onAddList} onClose={() => setDisplayType('none')} />
        </div>
    );
}

export default CreateList;