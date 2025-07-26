import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

export default function Noteitem(props) {
  const context = useContext(noteContext);
  const {deleteNote }= context;
  const {note,updateNote} = props
  return (
    <>
      <div className="card text-center my-4 mx-2" style={{ width: 25 + "rem" }}>
        <div className="card-header">{note.title}</div>
        <div className="card-body">
          <h5 className="card-title">{note.tag}</h5>
          <p className="card-text">{note.description}</p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
        <div className="card-footer text-body-secondary ">
          {note.date}
          <i className="fa-solid fa-trash mx-2" style={{ float: "right" }} onClick={()=>{deleteNote(note._id);  props.showAlert("Notes Deleted successfully","success")}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" style={{ float: "right" }} onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </>
  );
}


