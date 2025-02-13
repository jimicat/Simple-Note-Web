import { Trash2, Share, PenLine, Type, LayoutGrid, Settings } from 'lucide-react';
import { Note } from '../types';

interface NoteEditorProps {
  note: Note | null;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

export function NoteEditor({ note, onUpdateNote, onDeleteNote }: NoteEditorProps) {
  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        选择或创建一个备忘录
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-[#3d3d3d] rounded"
            onClick={() => onDeleteNote(note.id)}
          >
            <Trash2 size={20} />
          </button>
          <button className="p-2 hover:bg-[#3d3d3d] rounded">
            <Share size={20} />
          </button>
          <button className="p-2 hover:bg-[#3d3d3d] rounded">
            <PenLine size={20} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#3d3d3d] rounded text-yellow-500">
            <Type size={20} />
          </button>
          <button className="p-2 hover:bg-[#3d3d3d] rounded">
            <LayoutGrid size={20} />
          </button>
          <button className="p-2 hover:bg-[#3d3d3d] rounded">
            <Settings size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 p-6">
        <input
          type="text"
          value={note.title}
          onChange={(e) => onUpdateNote(note.id, { title: e.target.value })}
          className="text-2xl font-semibold bg-transparent outline-none w-full mb-4"
        />
        <textarea
          value={note.content}
          onChange={(e) => onUpdateNote(note.id, { content: e.target.value })}
          className="w-full h-full bg-transparent outline-none resize-none"
        />
      </div>
    </div>
  );
}