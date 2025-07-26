import React, { useState } from 'react';
import { useNotes } from '../context/NoteState';

const AddNote = () => {
  // State management
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('General');
  
  // Get addNote function from context
  const { addNote } = useNotes();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNote(title, description, tag);
      // Reset form
      setTitle('');
      setDescription('');
      setTag('General');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            id="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
            className="form-control" 
            id="description" 
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minLength={5}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input 
            type="text" 
            className="form-control" 
            id="tag" 
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;