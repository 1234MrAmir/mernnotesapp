import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";


const Notesitem = (props) => {
  const context = useContext(noteContext);
  const { deteleNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3 my-2">
      <div className="card" style={{ backgroundColor: '#dedee8', boxShadow: '2px 2px 7px 1px #80808052' }}>
        <div className="card-body">
            <div className="d-flex align-items-baseline flex-wrap">
            <h5 className="card-title">{note.title}</h5>
          <i className="fa-solid fa-trash mx-3" onClick={()=>{deteleNote(note._id); props.showAlert("success", "Your note has been deleted successfully!!!")}}></i>
          <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
            </div>          
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Notesitem;
