import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {useDroppable} from "@dnd-kit/core"

import KanbanCard from './KanbanCard';

export interface ListProps {
  title: string
  cards: string[];
  openCardDialog: (title: string) => void;
}

function KanbanList({ title, cards, openCardDialog } : ListProps) {
  const {setNodeRef} = useDroppable({
    id: title
  })

  return (
    <div className="w-full min-w-64" ref={setNodeRef}>
      <p className="bg-blue-500 text-white font-bold py-2 px-4 shadow-lg">{title}</p>
      <SortableContext
        items={cards}
        strategy={verticalListSortingStrategy}
      >
        {cards.map(card => <KanbanCard key={card} id={card}/>)}
      </SortableContext>
      <div onClick={() => openCardDialog(title)} className="bg-gray-200 hover:bg-gray-300 hover:cursor-pointer text-slate-700 py-2 px-4 mt-1 shadow-lg rounded mb-4">
        <h3>+ Add Another</h3>
      </div>
    </div>
  )
}

export default KanbanList;