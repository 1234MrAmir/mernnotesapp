import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Notesitem from "./Notesitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const navigate = useNavigate();
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "default"});
    
    // GET NOTE FUNCTION
    useEffect(() => {
      if(localStorage.getItem('Token')){
        getNotes();
      }
      else{
        navigate('/login');
      }
      // eslint-disable-next-line 
    }, [])
        
    // REF FUNCTION 
    const updateNote = (currentNote)=>{
      ref.current.click();
      setnote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});     
    }
   // useref hook se hum kise bhi ek element ko reference de skate h
    const ref = useRef(null);
    const refClose = useRef(null);
   

  // ONCHANGE CHANGE AND HANDLE CLICK
  const handleClick = (e) => {
    // console.log('updating note.....', note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("success", "Note has been Updated!!!");
  }
  const onchange = (e) => {
    setnote({...note, [e.target.name]: e.target.value});
  }

  return (
    <> 
    <Addnote showAlert={props.showAlert} />   
   {/* useref hook se hum kise bhi ek element ko reference de skate h */}
<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input  type="text"
          value={note.etitle}
            className="form-control"
            id="etitle"
            name="etitle"
            aria-describedby="emailHelp"
            onChange={onchange} minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            value={note.edescription}
            className="form-control"
            id="edescription" name="edescription"
            onChange={onchange} minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            value={note.etag}
            className="form-control"
            id="etag" name="etag"
            onChange={onchange}
          />
        </div>
       </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div> 
</div>
    <div className="container">
      <div className=" row my-3">
          <h3>Your Note</h3>
          <div className="containet">
          {notes.length === 0 && 'No notes available to display'}
          </div>
          {notes.map((note) => {
            return <Notesitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          })}
        </div>
    </div> 
    </>
  )
}

export default Notes
