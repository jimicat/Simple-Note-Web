import React, { useState } from 'react';
import { Trash2, Share, PenLine, Type, LayoutGrid, Settings } from 'lucide-react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import { Note } from '../types';

interface NoteEditorProps {
  note: Note | null;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

const mdParser = new MarkdownIt();

export function NoteEditor({ note, onUpdateNote, onDeleteNote }: NoteEditorProps) {
  const [content, setContent] = useState(note?.content || '');

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        选择或创建一个备忘录
      </div>
    );
  }

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
    onUpdateNote(note.id, { content: text });
  };

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
      </div>
      <div className="flex-1 flex">
        <MdEditor
          value={content}
          style={{ height: '100%' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
        <div className="flex-1 p-4 overflow-auto">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}