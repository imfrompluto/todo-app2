import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// react component App
function App() {
  // state tasks
  const [tasks, setTasks] = useState([
    {
      text: "run",
      tab: 3,
    },
    {
      text: "wash",
      tab: 3,
    },
    {
      text: "fly",
      tab: 2,
    },
    {
      text: "clean",
      tab: 3,
    }
  ])
  const [tabs, setTabs] = useState([
    {
      id: 0,
      tabname: "all",

    },
    {
      id: 1,
      tabname: "school",
    },
    {
      id: 2,
      tabname: "work",
    },
    {
      id: 3,
      tabname: "home",
    }
  ])
  const [editTask, setEditTask] = useState(null)
  // state input text
  const [inputtext, setInputtext] = useState("")
  const [edittext, setEdittext] = useState("")
  const [activetab, setActivetab] = useState(0)
  const [finishp, setFinishp] = useState(null)
  const [renametab, setRenametab] = useState(null)
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
        text: inputtext,
        tab: activetab,
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

  function finishedit(event, id) {
    event.preventDefault()
    setTasks(() => {
      let nexttasks = [...tasks]
      nexttasks[id].text = edittext
      return nexttasks
    })
    setEditTask(null)

  }

  function createtab (){
    setTabs(t => {
      let nexttabs = [...t]
      nexttabs.push({
        id: nexttabs.length,
        tabname: "new tab",
      })
      return nexttabs
    })
  }

  return (
    <div className="App">
      <form action="">
        <h2>ToDo App</h2>
        <div className="tabs">
          <button  onClick={() => createtab()} type='button' id='tab'>+ tab</button>
          {
            tabs.map((el, id) =>
              <button key={id} onClick={() => setActivetab(id)} onDoubleClick={() => setRenametab(id)} type='button' className={activetab == id ? "activetab" : ""}>
                {
                  renametab == id ? <input type="text" name="" id="" /> : el.tabname
                }
              </button>

            )

          }

        </div>
        <ol>
          {
            // map sets li for every task in tasks array. el is an array task
            tasks.map((el, id) =>
              (activetab == 0 || el.tab == activetab) && <li key={id}>
                <div className="itemname">
                  <pre>{1 + id + "."}  </pre>
                  {
                    editTask === id ?
                      <input size={el.text.length} type="text" value={edittext} onChange={(event) => setEdittext(event.target.value)} />
                      :
                      <p onClick={() => setFinishp(id)} className={finishp == id ? "finishp" : ""}>{el.text}</p>
                  }
                </div>
                <div className="options">
                  {
                    editTask === id ?
                      <button onClick={(event) => finishedit(event, id)}>✅</button>
                      :
                      <button type='button' onClick={(event) => edit(event, id, el)}>✍️</button>

                  }
                  <button type='button' onClick={(event) => bin(event, id)}>🗑️</button>
                </div>
              </li>
            )
          }
        </ol>
        <div className="botinput">
          {/* onchange works everytime when user types a character */}
          <input id='biginput' type="" value={inputtext} onChange={(event) => setInputtext(event.target.value)} />
          <button disabled={inputtext == "" ? true : false} onClick={(event) => handlepin(event)}>📍</button>
          <button onClick={(event) => bomb(event)}>💣</button>
        </div>
      </form>
    </div>
  );
}
// hw:make a ? button at top of screen which shows the instructions
export default App;
