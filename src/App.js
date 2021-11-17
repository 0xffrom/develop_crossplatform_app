import React, {useState} from "react";
import {nanoid} from "nanoid";
import TaskList from "./components/TaskList";
import Header from "./components/Header";

const my_tasks = [
  {
    id: "0",
    name: "Title #1",
    description: "Description #1",
    isCompleted: false
  }, {
    id: "1",
    name: "Title #2",
    description: "Description #2",
    isCompleted: false
  }, {
    id: "2",
    name: "Title!!!!",
    description: "Description? Yeap",
    isCompleted: false
  }, {
    id: "3",
    name: "it's my card title",
    description: "description",
    isCompleted: true
  }, {
    id: "todo-4",
    name: "Name #4",
    description: "Description #4",
    isCompleted: true
  }
];

function App(props) {
  const [tasks, setTasks] = useState(my_tasks);

  function changeCompleted(id) {
    setTasks(tasks.map(task => {
      if (id === task.id) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      } else {
        return task;
      }
    }));
  }

  function addTask(name, description) {
    const newTask = {
      id: nanoid(),
      name: name,
      description: description,
      isCompleted: false
    };
    setTasks([
      ...tasks,
      newTask
    ]);
  }

  function removeTask(id) {
    setTasks(tasks.filter(task => id !== task.id));
  }

  return (<div>
    <Header addTask={addTask}/>
    <TaskList tasks={tasks} changeCompleted={changeCompleted} removeTask={removeTask}/>
  </div>);
}

export default App;
