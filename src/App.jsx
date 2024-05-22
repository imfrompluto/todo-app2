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
  const [tabtext, setTabtext] = useState(null)
  const [showmodal, setShowmodal] = useState(false)
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

  function createtab() {
    setTabs(t => {
      let nexttabs = [...t]
      nexttabs.push({
        id: nexttabs.length,
        tabname: "new tab",
      })
      return nexttabs
    })
  }

  function removetab(event, id) {
    event.preventDefault()
    console.log("bin");
    setTabs(() => {
      let nexttabs = [...tabs]
      nexttabs.splice(id, 1)
      return nexttabs
    })
  }



  function finishtab(event) {
    event.stopPropagation()
    if (event.target.className == "closetab") {
      setRenametab(null)
      console.log("finish tab" + event.target);
    }
  }
  return (
    <div className="App">
      <form className='closetab' onClick={(event) => finishtab(event)} action="">
        <h2 className='closetab' >ToDo App</h2>
        <button type='button' onClick={() => setShowmodal(true)} id='rules' >?</button>
        <div className={"modal " +(showmodal ? "showmodal" : "")} onClick={( ) => setShowmodal(false)}>
          <div className="box">
            <h3>instructions</h3>
            <ol>
              <li>double click on a tab to modify it</li>
              <li>press the ✍️ button to modify the task</li>
              <li>press the ✅ button to confirm the modification</li>
              <li>press the 🗑️ button to delete the task</li>
              <li>press the 📍 button to put the task in the list</li>
              <li>press the 💣 button to delete all the tasks</li>
            </ol>
          </div>
        </div>
        <div className="tabs">
          {/*  creates a new tab when clicked */}
          <button onClick={() => createtab()} type='button' id='tab'>+ tab</button>
          {
            tabs.map((el, id) =>
              <button key={id} onClick={() => setActivetab(id)} onDoubleClick={() => { setRenametab(id); setTabtext(tabs[id].tabname) }} type='button' className={activetab == id ? "activetab" : ""}>
                {
                  // if `renametab` matches `id`, you can edit the text or it'll display the tab name.
                  renametab == id ? <input type="text" value={tabtext} onChange={(event) => setTabtext(event.target.value)} name="" id="" /> : el.tabname
                }
                {id !== 0 &&
                <span onClick={(event) => removetab(event, id)}>+</span>}
              </button>

            )

          }

        </div>
        <ol>
          {
            // map sets li for every task in tasks array. el is an array task
            tasks.map((el, id) =>
            //decides if a list item should be shown based on the active tab and the tab of the element.
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
                      // when you click this button, it will run the `edit` function for editing something.
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
          {/* button in code will be clickable only when there's text entered; */}
          <button disabled={inputtext == "" ? true : false} onClick={(event) => handlepin(event)}>📍</button>
          <button onClick={(event) => bomb(event)}>💣</button>
        </div>
      </form>
    </div>
  );
}
// hw:add 5 comments and revise over the code
export default App;
