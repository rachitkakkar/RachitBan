import { FaTimes } from 'react-icons/fa';

const Cards = ({ cards, list_id, onDeleteCard }) => {
  return (
    <>
      {cards.map((card) => (
        <div className='card-container' key={card.id}>
          <h3 className='card'>{card.description}<FaTimes onClick={ () => onDeleteCard(list_id, card.id) } className='close-icon-card' /></h3>
        </div>
      ))}
    </>
  );
}

export default Cards;