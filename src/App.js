import { useState } from 'react';
import Board from './components/Board';

function App() {
  const [board, setBoard] = useState([
    {
      title: 'To-Do',
      id: 0,
      cards: 
      [
        {
          id: 0,
          description: 'Wash dishes',
        },
        {
          id: 1,
          description: 'Book tickets to Colorado',
        }
      ]
    },
    {
      title: 'Homework',
      id: 1,
      cards: 
      [
        {
          id: 0,
          description: 'Submit math assignment',
        },
        {
          id: 1,
          description: 'Write Macbeth English paper',
        },
        {
          id: 2,
          description: 'Submit AP CS Lab',
        }
      ]
    },
    {
      title: 'Party Preparations',
      id: 2,
      cards: 
      [
        {
          id: 0,
          description: 'Buy 2000 tons of sprinkles',
        }
      ]
    }
  ]);

  const [currentID, setCurrentID] = useState(3);

  const deleteList = (id) => {
    setBoard(board.filter((list) => list.id !== id));
  }

  const deleteCard = (list_id, card_id) => {
    let selectedList = board.filter((list) => list.id === list_id)[0];
    let newList = JSON.parse(JSON.stringify(selectedList)); 
    newList.cards = selectedList.cards.filter((card) => card.id !== card_id);
    let boardClone = JSON.parse(JSON.stringify(board));
    for (var i = 0; i < boardClone.length; i++) {
      if (boardClone[i].id === list_id) {
        boardClone[i] = newList;
      }
    }
    setBoard(boardClone);
  }

  const addList = (name) => {
    let boardClone = JSON.parse(JSON.stringify(board));
    setCurrentID(currentID + 1);
    boardClone.push({ title: name, id: currentID, cards: [] });
    setBoard(boardClone);
  }

  const addCard = (list_id, name) => {
    let selectedList = board.filter((list) => list.id === list_id)[0];
    let newList = JSON.parse(JSON.stringify(selectedList)); 
    setCurrentID(currentID + 1);
    newList.cards.push({ id: currentID, description: name }) 
  }

  return (
    <div className='container'>
      <Board board={board} onDeleteList={deleteList} onDeleteCard={deleteCard} onAddList={addList} />
    </div>
  );
}

export default App;