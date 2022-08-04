import List from './List';
import CreateList from './CreateList';

const Board = ({ board, onDeleteList, onDeleteCard, onAddList, onAddCard }) => {
  return (
    <>
      <div className='board'>
        {board.map((list) => (
          <>
            <List list={list} onDeleteList={onDeleteList} onDeleteCard={onDeleteCard} onAddCard={onAddCard} />
          </>
        ))}
        <CreateList onAddList={onAddList} />
      </div>
    </>
  );
};

export default Board;