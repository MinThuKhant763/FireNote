
import { useEffect, useState } from 'react';
import './App.css'
import AddNote from './components/AddNote';
import Navbar from './components/Navbar';
import Note from './components/Note';
import Intro from './components/Intro';

function App() {
  //define state
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  //get notes when start
  useEffect(() => {
    getNotes();
  },[])
  //get notes
  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://firenote-54d8d-default-rtdb.firebaseio.com/notes.json");
      if (!response.ok) {
        throw new Error("Cannot connect to the firebase");
      }
      const notes = await response.json();

      const modifiedNote = [];

      for (const key in notes) {
        modifiedNote.push({
          id : key,
          value : notes[key]
        });
      }
      setNotes(modifiedNote)
    }
    catch (err) {
      setErr(err.message)
    }
    setLoading(false);
  }

  return (
    <>
      <div>
        <Navbar getNotes={getNotes} totalNotes={notes.length}/>
       
        {
          loading && !err &&
          <p className='loading-msg'>
            Getting Notes!   
          </p>
        }
        {
          err && !loading &&
          <p className='loading-msg err-msg'>
              {err}
           </p>
        }
        {
          !loading && !err && (  
            <>
              <AddNote getNotes={ getNotes } />
              { notes.length < 1 &&
                <Intro/>
              }
              { notes.map((note, index) => (
                <Note key={ index } note={ note } getNotes={getNotes} />
              )) }
            </>
          )
        }
      </div>
        
    </>
  )
}

export default App
