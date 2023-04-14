import { useState } from 'react'

import AddTaskForm from './components/AddTaskForm.jsx'
import ToDo from './components/ToDo.jsx'
import UpdateForm from './components/UpdateForm.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

function App() {

  // Tasks (toDo List ) State
  const [toDo, setToDo] = useState([ ]);

  // Temp State
  const [newTask, setNewTask] = useState('')
  const [updateData, setUpdateData] = useState('')

  // Add Task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('')
    }
  }

  // delete Task  
  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id)
    setToDo(newTasks)
  }

  // Mark task as done
  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task
    })
    setToDo(newTask)
  }

  //cancel update
  const cancelUpdate = () => {
    setUpdateData('')
  }

  //change task for update
  const changeTask = (e) => {
    let newtask = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newtask)
  }

  //update Task
  const updatetask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id)
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject)
    setUpdateData('')
  }

  return (
    <div className="container App">
      <br /> <br />
      <h2>To Do List App (ReactJS)</h2>
      <br /><br />


      {updateData && updateData ? (
        <UpdateForm
        updateData ={updateData}
        changeTask ={changeTask}
        updatetask ={updatetask}
        cancelUpdate ={cancelUpdate}
        />
      ) : (
       <AddTaskForm
       newTask = {newTask}
       addTask = {addTask}
       setNewTask = {setNewTask}
       />
      )}


      {/* { Display ToDos } */}

      {toDo && toDo.length ? "" : 'No Task...'}
      <ToDo
      toDo ={toDo}
      markDone ={markDone}
      setUpdateData = {setUpdateData}
      deleteTask = {deleteTask}
      />
    </div>
  )
}

export default App