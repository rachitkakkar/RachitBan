import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface CardProps {
  id: string
}

function KanbanCard({ id } : CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id: id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div className="bg-gray-100 text-slate-600 py-2 px-4 mt-1 shadow-lg rounded" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p>{id}</p>
    </div>
  )
}

export default KanbanCard;