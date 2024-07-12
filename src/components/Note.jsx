import React from 'react'
import DeleteIcon from '../../svgs/DeleteIcon';


const Note = ({ note,getNotes }) => {
  //destructor note
  const { id, value } = note;
  const deleteNote = async() => { 
    try {
      const response = await fetch(`https://firenote-54d8d-default-rtdb.firebaseio.com/notes/${ id }.json`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      getNotes();
    }
    catch(err) {
      alert(err.message);
    }
    
  };
  return (
    <div className='card card-ctr'>
      <h3>+ { note.value }</h3>
      <div onClick={ deleteNote }>
        <DeleteIcon />
      </div>
    </div>
  )
}

export default Note
