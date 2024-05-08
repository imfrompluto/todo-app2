import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// react component App
function App() {
  // state tasks
  const [tasks, setTasks] = useState([
    {
      text: "run",
    },
    {
      text: "wash",
    },
    {
      text: "fly",
    },
    {
      text: "clean",
    }
  ])
  const [tabs, setTabs] = useState([
    {
      tabname: "all",
    },
    {
      tabname: "school",
    },
    {
      tabname: "work",
    },
    {
      tabname: "home",
    }
  ])
  const [editTask, setEditTask] = useState(null)
  // state input text
  const [inputtext, setInputtext] = useState("")
  const [edittext, setEdittext] = useState("")

  function handlepin(event) {
    event.preventDefault()
    console.log("hello");
    setInputtext("")
    // used to update tasks state
    setTasks(() => {
      // three dots are used to duplicate the last tasks array
      let nexttasks = [...tasks]
      // add new task
      nexttasks.push({
        text: inputtext
      })
      return nexttasks
    })
  }

  function bin(event, id) {
    event.preventDefault()
    console.log("bin");
    setTasks(() => {
      let nexttasks = [...tasks]
      nexttasks.splice(id, 1)
      return nexttasks
    })
  }

  function bomb(event) {
    event.preventDefault()
    setTasks([])
  }
  function edit(event, id, el) {
    event.preventDefault()
    console.log("edit task");
    setEditTask(id)
    setEdittext(el.text)
  }

  function finishedit(event, id){
    event.preventDefault()
    setTasks(() => {
      let nexttasks = [...tasks]
      nexttasks[id].text = edittext
      return nexttasks
    })
    setEditTask(null)
    
  }

  return (
    <div className="App">
      <form action="">
        <h2>ToDo App</h2>
        <div className="tabs">
        <button>+ tab</button>
        {
          tabs.map((el, id) =>
          <button key={id}>
            {
              el.tabname
            }
          </button>
          )
        }
        </div>
        <ol>
          {
            // map sets li for every task in tasks array. el is an array task
            tasks.map((el, id) =>
              <li key={id}>
                <div className="itemname">
                  <pre>{1+ id + "."}  </pre>
                {
                  editTask === id ?
                    <input size={el.text.length} type="text" value={edittext} onChange={(event) => setEdittext(event.target.value)} />
                    :
                    <p>{el.text}</p>
                }
                </div>
                <div className="options">
                  {
                    editTask === id ?
                    <button onClick={(event) => finishedit(event, id)}>✅</button>
                    :
                    <button type='button' onClick={(event) => edit(event, id, el)}>✍️</button>

                  }
                  <button  type='button' onClick={(event) => bin(event, id)}>🗑️</button>
                </div>
              </li>
            )
          }
        </ol>
        <div className="botinput">
          {/* onchange works everytime when user types a character */}
          <input id='biginput' type="" value={inputtext} onChange={(event) => setInputtext(event.target.value)} />
          <button disabled={inputtext == ""? true : false} onClick={(event) => handlepin(event)}>📍</button>
          <button onClick={(event) => bomb(event)}>💣</button>
        </div>
      </form>
    </div>
  );
}
// hw:do styles
export default App;
