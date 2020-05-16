import React, { useState } from "react";

function App() {

    const [inputText, setInputText] = useState('')
    const [array, setArray] = useState([])

    function handleChange (event) {
      const newValue  = event.target.value

      setInputText(newValue)
    }

    function handleAdd () {
      setArray ( (prevValue) => {
        return [
          ...prevValue,
          inputText
        ]
      })
      setInputText('')
    }


  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" value={inputText} onChange={handleChange} />
        <button onClick={handleAdd}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {
            array.map( (todo) => {
              return <li>{todo}</li>
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
