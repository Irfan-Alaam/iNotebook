import React, { useContext,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function Notes(props) {
  let navigate = useNavigate()
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    //  console.log('Stored token:', storedToken);
    storedToken?getNotes():navigate('/login')
  }, []);

  const refClose = useRef(null)

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id ,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };
  const ref = useRef(null)
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Notes Updated successfully","success")
    
   
};
const onChange = (e) => {
  setNote({ ...note, [e.target.name]: e.target.value });
};
  return (
    <>
<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} >
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form action="">
          <div className="mb-3">
            <label htmlFor="title" className="form-label" >
              Title
            </label>
            <input type="text" className="form-control" id="etitle" value={note.etitle} aria-describedby="title" name="etitle" onChange={onChange} minLength={3}required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange}  value={note.edescription} minLength={3}required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              tag
            </label>
            <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} minLength={3}required/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary"ref={refClose} data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary"disabled={note.etitle.length<3 ||note.edescription.length<3 ||note.etag.length<3} onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
      <AddNote showAlert={props.showAlert}/>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {Array.isArray(notes) && notes.length === 0 && 'No notes to display'}
        </div>
        {Array.isArray(notes) && notes.map((note) => (
          <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
        ))}
      </div>
    </>
  );
}
