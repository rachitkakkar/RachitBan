import { useState } from 'react';

const CreateCardForm = ({ displayType, listID, onAddCard, onClose }) => {
  const [name, setName] = useState('New Card');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert('Please enter a card name!');
      return;
    }

    onAddCard(listID, name);
    setName('New Card');
    onClose();
  }

  return (
    <div className='modal' style={{ display: displayType }} onSubmit={onSubmit}>
        <div className='modal-content'>
            <span onClick={onClose} className="close">&times;</span>
            <form>
              <label>Card Name</label><br/ >
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} /><br />
              <input type='submit' value='Add' />
            </form>
        </div>
    </div>
  );
}

export default CreateCardForm;