import React, {useState} from "react";
import { isPropertySignature } from "typescript";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'



function CreateArea(props) {

  const [note,setNote] = useState({
    title:'',
    content:''
  });

  const [expanded,setExpanded] = useState(false)

  function handleChange (event) {
    const {name,value} = event.target

    setNote(prevState => {
      return {
        ...prevState,
        [name] : value
      }
    })
  }

  function submitNote (event) {
      props.onAdd(note)
      setNote({
          title:'',
          content:''
      })
      event.preventDefault()

  }

  

  return (
    <div>
      <form className='create-note'>

        {
        expanded ? 
    
        <input name="title" placeholder="Title" value={note.title} onChange={handleChange} height='100' width='300' />

        : 

        null 
        }

        <textarea 
            name="content" 
            placeholder="Take a note..." 
            rows= {expanded ? 3 : 1}
            value={note.content} 
            onChange={handleChange} 
            onClick={()=>setExpanded(true)}
        />
        <div className='addButton'>
        <Zoom in={expanded}>
            <Fab onClick={submitNote}><AddIcon/></Fab>
        </Zoom>
        </div>
        
      </form>
    </div>
  );
}

export default CreateArea;