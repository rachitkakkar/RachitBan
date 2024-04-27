import {
  DndContext, DragMoveEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster"

import KanbanList from './KanbanList';
import CustomizationMenu from './CustomizationMenu';
import ListDialog from './ListDialog';
import CardDialog from './CardDialog';

export interface List {
  title: string
  cards: string[];
}

export interface BoardProps {
  title: string;
}

function KanbanBoard({ title } : BoardProps ) {
  const [lists, setLists] = useState<List[]>([
    { title: "Languages", cards: ["Javascript", "Python", "Tempest"] },
    { title: "Real Languages", cards: ["Spanish", "German", "French", "Hindi"] },
    { title: "Test", cards: ["a", "b", "c", "d"] },
    { title: "Real", cards: ["e", "f", "g", "h"] },
  ])

  const [listDialog, setListDialog] = useState(false);
  const openListDialog = () => {
    setListDialog(true);
  }
  const closeListDialog = () => {
    setListDialog(false);
  }

  const [cardDialog, setCardDialog] = useState(false);
  const [selectedList, setSelectedList] = useState("");
  const openCardDialog = (title: string) => {
    setCardDialog(true);
    setSelectedList(title);
  }
  const closeCardDialog = () => {
    setCardDialog(false);
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-2">{title}</h2>
      <CustomizationMenu />
      <div className="gap-2 sm:gap-3 md:gap-4 lg:gap-5 sm:grid sm:grid-flow-col sm:auto-cols-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragMove={handleDragMove}
        >
          {lists.map(list => <KanbanList key={list.title} title={list.title} cards={list.cards} openCardDialog={openCardDialog} />)}
          <div className="w-full min-w-max">
            <button onClick={openListDialog} className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 shadow-lg min-w-max">+ Add Another</button>
          </div>
        </DndContext>
      </div>
      <ListDialog dialog={listDialog} addList={addList} closeDialog={closeListDialog} />
      <CardDialog dialog={cardDialog} selectedList={selectedList} addCard={addCard} closeDialog={closeCardDialog} />
      <Toaster />
    </div>
  )

  // This worked first try some how...might not be the best way to do it
  // Gives me an error when accessing the id, so I just tell typescript to ignore
  function handleDragMove(event: DragMoveEvent) {
    const {active, over} = event;

    if (over == null) {
      return;
    }
    if (active.id !== over.id) {
      let newLists : List[] = [];
      let sameList : boolean = false; // If both cards are in the same list (reordering a list)
      lists.forEach((list) => {
        // @ts-ignore
        // If the list includes both cards, reorder the cards and add a list with the updated cards
        if (list.cards.includes(active.id) && list.cards.includes(over.id)) { // @ts-ignore
          const activeIndex : number = list.cards.indexOf(active.id); // @ts-ignore
          const overIndex : number = list.cards.indexOf(over.id);
          let newCards : string[] = arrayMove(list.cards, activeIndex, overIndex)
          newLists.push({ title: list.title, cards: newCards });
          sameList = true;
        } else 
          newLists.push(list); // Otherwise keep the list the same
      });
      setLists(newLists); // Set the current state to the new state

      if (!sameList) { // Moving the card across lists
        let newLists : List[] = [];
        lists.forEach((list) => {
          let newCards : string[] = list.cards; // Get the current card state
          // Remove the card that is being moved from its current list 
          // @ts-ignore
          if (list.cards.includes(active.id)) { // @ts-ignore
            const activeIndex : number = list.cards.indexOf(active.id);
            newCards.splice(activeIndex, 1);
            newLists.push({ title: list.title, cards: newCards });
          } // @ts-ignore
          // Insert active card into new list
          else if (list.cards.includes(over.id)) { // @ts-ignore
            const overIndex : number = list.cards.indexOf(over.id); // @ts-ignore
            newCards.splice(overIndex, 0, active.id);
            newLists.push({ title: list.title, cards: newCards });
          }
          // Empty list, insert active card into new list
          else if (list.title === over.id) { // @ts-ignore
            newCards.push(active.id)
            newLists.push({ title: list.title, cards: newCards });
          } else {
            newLists.push(list);
          }
        });
        setLists(newLists); // Set the current state to the new state
      }
    }
  }

  function addCard(title: string, card: string) {
    let newLists : List[] = [];
    lists.forEach((list) => {
      if (list.title == title) {
        let newCards : string[] = list.cards; // Get the current card state
        newCards.push(card);
        newLists.push({ title: list.title, cards: newCards });
      } else
        newLists.push(list); // Otherwise keep the list the same
    });
    setLists(newLists); // Set the current state to the new state
  }

  function addList(title: string) {
    let newLists : List[] = lists;
    newLists.push({ title: title, cards: [] });
    setLists(newLists);
  }
}

export default KanbanBoard;