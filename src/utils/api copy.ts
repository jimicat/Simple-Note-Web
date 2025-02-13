import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000';

export const createNote = async (note: { title: string; content: string }) => {
  const response = await axios.post(`${baseURL}/notes`, note);
  return response.data;
};

export const getAllNotes = async () => {
  const response = await axios.get(`${baseURL}/notes`);
  return response.data;
};

export const getNote = async (noteId: string) => {
  const response = await axios.get(`${baseURL}/notes/${noteId}`);
  return response.data;
};

export const updateNote = async (noteId: string, updates: Partial<{ title: string; content: string }>) => {
  const response = await axios.put(`${baseURL}/notes/${noteId}`, updates);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await axios.delete(`${baseURL}/notes/${noteId}`);
  return response.data;
};    