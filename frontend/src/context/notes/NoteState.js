import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
// const host = 'http://localhost:4000';
const host = '{$window.location.origin}';
const notesinitial =[]
const [notes, setNotes] = useState(notesinitial);
   

// ADD A NOTE
const addNote = async (title, description, tag) => {
  // API CALL
  const response = await fetch(`${host}/api/notes/addnotes`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "auth-Token": localStorage.getItem('Token')      
    },
    body: JSON.stringify({title, description, tag}), 
  });
  const note = await response.json();
  setNotes(notes.concat(note))
}


// GET ALL NOTE
const getNotes = async()=>{
  // API CALL 
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "auth-Token": localStorage.getItem('Token')      
    }     
  });
  const json = await response.json();
  console.log(json);
  setNotes(json)
  }
    

  // DELETE A NOTE
const deteleNote = async(id)=>{
  //  API CALL
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      "auth-Token": localStorage.getItem('Token')      
    }
  });
 const json = response.json();
  console.log(json);
  console.log('Deleting a Note with id' +id);
  const newNotes = notes.filter((note)=>{ return note._id !== id});
  setNotes(newNotes)
}

// UPDATE A NOTE
const editNote = async (id, title, description, tag)=>{
  // To do Api call 
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "auth-Token": localStorage.getItem('Token')      
    },
    body: JSON.stringify({title, description, tag}), 
  });
 const json = await response.json();
 console.log(json);
 
 let newNotes = JSON.parse(JSON.stringify(notes))
  // Logic to edit in client
  for (let index = 0; index < newNotes.length; index++) { 
    const element = newNotes[index];
    if(element._id === id){
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;   
    } 
  }
  setNotes(newNotes);
}
    return(
        <NoteContext.Provider value={{notes, getNotes, addNote, deteleNote, editNote}}>
           {props.children}
        </NoteContext.Provider>  
          )
}
export default NoteState;
