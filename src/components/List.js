import { useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import Cards from './Cards';
import CreateCardForm from './CreateCardForm';

const List = ({ list, onDeleteList, onDeleteCard, onAddCard }) => {
  const [displayType, setDisplayType] = useState('none');

  return (
    <div className='list'>
      <FaTimes onClick={ () => onDeleteList(list.id) } className='close-icon' style={{ color: '#ffff', cursor: 'pointer', position: 'relative', right: '-92%', top: '45px', paddingright: '10px' }} />
      <h1 className='list-title'>{list.title}</h1>
      <Cards cards={list.cards} list_id={list.id} onDeleteCard={onDeleteCard} />

      <div onClick={ () => setDisplayType('block') } className='add-card-container'>
        <FaPlus style={{ position: 'relative', right: '-92%', top: '47px' }} />
        <h3 className='add-card'>Add Another</h3>
      </div>
      <CreateCardForm displayType={displayType} listID={list.id} onAddCard={onAddCard} onClose={ () => setDisplayType('none') } />
    </div>
  );
}

export default List;