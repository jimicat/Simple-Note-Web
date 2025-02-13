import { Search, Plus } from 'lucide-react';
import { Note } from '../types';

interface NotesListProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onCreateNote: () => void;
  onSearch: (query: string) => void;
}

export function NotesList({ notes, selectedNote, onSelectNote, onCreateNote, onSearch }: NotesListProps) {
  return (
    <div className="w-80 border-r border-gray-700 flex flex-col">
      <div className="p-2 border-b border-gray-700">
        <div className="flex items-center gap-2 bg-[#2d2d2d] rounded px-3 py-1.5">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="搜索所有备忘录"
            onChange={(e) => onSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <button
          onClick={onCreateNote}
          className="w-full text-left p-4 border-b border-gray-700 hover:bg-[#2d2d2d]"
        >
          <div className="flex items-center gap-2 text-yellow-500">
            <Plus size={16} />
            <span>新建备忘录</span>
          </div>
        </button>
        {notes.map(note => (
          <div
            key={note.id}
            onClick={() => onSelectNote(note)}
            className={`p-4 cursor-pointer border-b border-gray-700 ${
              selectedNote?.id === note.id ? 'bg-yellow-500' : 'hover:bg-[#2d2d2d]'
            }`}
          >
            <h3 className="font-medium mb-1">{note.title}</h3>
            <div className="flex items-center text-sm text-gray-400">
              <span>{note.date}</span>
              <span className="mx-2">·</span>
              <span>{note.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}