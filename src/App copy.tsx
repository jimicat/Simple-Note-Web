import { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { NotesList } from './components/NotesList';
import { NoteEditor } from './components/NoteEditor';
import { Note } from './types';
import { formatDate } from './utils/date';
import { createNote, getAllNotes, updateNote, deleteNote } from './utils/api';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getAllNotes();
      setNotes(fetchedNotes);
      setSelectedNote(fetchedNotes[0] || null);
    };
    fetchNotes();
  }, []);

  const handleCreateNote = useCallback(async () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '新建备忘录',
      content: '',
      date: formatDate(new Date())
    };
    const createdNote = await createNote({
      title: newNote.title,
      content: newNote.content
    });
    setNotes(prev => [createdNote, ...prev]);
    setSelectedNote(createdNote);
  }, []);

  const handleUpdateNote = useCallback(async (id: string, updates: Partial<Note>) => {
    const updatedNote = await updateNote(id, updates);
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, date: formatDate(new Date()) }
        : note
    ));
    setSelectedNote(prev => prev?.id === id ? { ...prev, ...updates } : prev);
  }, []);

  const handleDeleteNote = useCallback(async (id: string) => {
    await deleteNote(id);
    setNotes(prev => prev.filter(note => note.id !== id));
    setSelectedNote(prev => prev?.id === id ? null : prev);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-[#1d1d1d] text-white flex">
      <Sidebar />
      <NotesList
        notes={filteredNotes}
        selectedNote={selectedNote}
        onSelectNote={setSelectedNote}
        onCreateNote={handleCreateNote}
        onSearch={handleSearch}
      />
      <NoteEditor
        note={selectedNote}
        onUpdateNote={handleUpdateNote}
        onDeleteNote={handleDeleteNote}
      />
    </div>
  );
}

export default App;