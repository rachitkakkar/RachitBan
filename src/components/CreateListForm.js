import { useState } from 'react';

const CreateListForm = ({ displayType, onAddList, onClose }) => {
  const [name, setName] = useState('New Category');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert('Please enter a category name!');
      return;
    }

    onAddList(name);
    setName('New Category');
    onClose();
  }

  return (
    <div className='modal' style={{ display: displayType }} onSubmit={onSubmit}>
        <div className='modal-content'>
            <span onClick={onClose} className="close">&times;</span>
            <form>
              <label>List Name</label><br/ >
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} /><br />
              <input type='submit' value='Add' />
            </form>
        </div>
    </div>
  );
}

export default CreateListForm;