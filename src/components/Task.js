export default function Task(props) {
  return <form className="card">
    <div>
      <input id={props.id} type="checkbox" defaultChecked={props.isCompleted}
         onChange={() => props.changeCompleted(props.id)}/>
       <label className="card_title" htmlFor={props.id}>
        {props.name}
      </label>
    </div>
    <label htmlFor={props.id}>
      {props.description}
    </label>
    <div>
      <button type="button" onClick={() => props.removeTask(props.id)}>
        X
      </button>
    </div>
  </form>;
}
