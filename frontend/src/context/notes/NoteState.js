import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
const API_URL = process.env.REACT_APP_API_URL;
const NoteState = (props) => {
  // const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes

  const getNotes = async () => {
    const response = await fetch(`${API_URL}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":localStorage.getItem('token')},
        "auth-token":localStorage.getItem('token')},
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
    
  };
  //ADD note
  const addNote = async (title, description, tag) => {
  try {
    // Validate inputs first
    if (!title || title.length < 3) throw new Error("Title too short (min 3 chars)");
    if (!description || description.length < 5) throw new Error("Description too short (min 5 chars)");

    const response = await fetch(`${API_URL}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ 
        title: title.trim(), 
        description: description.trim(), 
        tag: tag?.trim() || "General" 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.msg || "Failed to add note");
    }

    const note = await response.json();
    setNotes(notes.concat(note));
    return { success: true };
  } catch (error) {
    console.error("Add Note Error:", error.message);
    return { success: false, error: error.message };
  }
};
  const deleteNote = async (id) => {
    console.log("deleting note with id " + id);
    const response = await fetch(`${API_URL}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')},
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json);
    

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    // props.showAlert("Notes deleted successfully","success")
  };

  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${API_URL}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')},
      body: JSON.stringify({ title, description, tag }),
    }); 
    // const json = await response.json();
    //Logic to edit notes
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
     
    }
    setNotes(newNotes)
  };

  return <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>{props.children}</noteContext.Provider>;
};

export default NoteState;
