import { Fragment } from 'react';
import List from './List';
import CreateList from './CreateList';

const Board = ({ board, onDeleteList, onDeleteCard, onAddList, onAddCard }) => {
  return (
    <>
      <div className='board'>
        {board.map((list) => (
          <Fragment key={list.id}>
            <List list={list} onDeleteList={onDeleteList} onDeleteCard={onDeleteCard} onAddCard={onAddCard} />
          </Fragment>
        ))}
        <CreateList onAddList={onAddList} />
      </div>
    </>
  );
};

export default Board;