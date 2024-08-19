import { useState } from "react";
import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
    props.showAlert("Notes added successfully","success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div>
        <h1 className="my-3">Add a note</h1>
        <form action="">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text"value={note.title} minLength={3}required className="form-control" id="title" aria-describedby="title" name="title" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input type="text"value={note.description} minLength={3}required className="form-control" id="description" name="description" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              tag
            </label>
            <input type="text"value={note.tag} minLength={3}required className="form-control" id="tag" name="tag" onChange={onChange} />
          </div>

          <button disabled={note.title.length<3 ||note.description.length<3 ||note.tag.length<3} type="submit" className="btn btn-primary"onClick={handleClick} >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
