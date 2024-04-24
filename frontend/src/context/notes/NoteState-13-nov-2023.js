import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const s1 ={
        "Name": "Amir",
        "Class": "5b",
        "Love": "Angle"
    }
    // this functions is make for upadte the state value as name,class and love
   const [state, setstate] = useState(s1)
    const update = ()=>{
        setTimeout(() => {            
            setstate ({
              "Name": "Mr Amir",
              "Class": "10b",
              "Love": "Miss Angle"
            })
        }, 4000);
    }
    return(
        <NoteContext.Provider value={{state, update}}>
           {props.children}
        </NoteContext.Provider>  
          )
}
export default NoteState;
