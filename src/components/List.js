import { FaTimes, FaPlus } from 'react-icons/fa';
import Cards from './Cards';

const List = ({ list, onDeleteList, onDeleteCard }) => {
    return (
        <div className='list'>
            <FaTimes onClick={ () => onDeleteList(list.id) } className='close-icon' style={{ color: '#ffff', cursor: 'pointer', position: 'relative', right: '-92%', top: '45px', paddingright: '10px' }} />
            <h1 className='list-title'>{list.title}</h1>
            <Cards cards={list.cards} list_id={list.id} onDeleteCard={onDeleteCard} />

            <div className='add-card-container'>
                <FaPlus style={{ position: 'relative', right: '-92%', top: '47px' }} />
                <h3 className='add-card'>Add Another</h3>
            </div>
        </div>
    );
}

export default List;