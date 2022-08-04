import { FaTimes } from 'react-icons/fa';

const Cards = ({ cards, list_id, onDeleteCard }) => {
  return (
    <>
      {cards.map((card) => (
        <div className='card-container'>
          <FaTimes onClick={ () => onDeleteCard(list_id, card.id) } style={{ color: '#ff1239', cursor: 'pointer', position: 'relative', right: '-93%', top: '40px' }} />
          <h3 className='card'>{card.description}</h3>
        </div>
      ))}
    </>
  );
}

export default Cards;