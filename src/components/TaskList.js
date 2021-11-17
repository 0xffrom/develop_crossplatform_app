import Task from "./Task";

export default function TaskList(props) {
  const tasksViews = props.tasks.map(task => (getTask(task, props)));

  const completedTasks = props.tasks.filter((item) => item.isCompleted);

  return (<div>
    <h2 >
      Количество задач: {props.tasks.length}. Из них выполнено: {completedTasks.length}/{props.tasks.length}
    </h2>
    <ul role="list" className="task_list">
      {tasksViews}
    </ul>
  </div>);
}

function getTask(task, props) {
  return <Task
     id={task.id}
     name={task.name}
     description={task.description}
     isCompleted={task.isCompleted}
     key={task.id}
     changeCompleted={props.changeCompleted}
     removeTask={props.removeTask}/>;
}
