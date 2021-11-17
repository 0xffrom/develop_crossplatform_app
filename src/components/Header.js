import React, {useState} from "react";

export default function Header(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }

    props.addTask(name, description);
    setName("");
    setDescription("");
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDes(e) {
    setDescription(e.target.value);
  }

  return (<form className="header" onSubmit={handleSubmit}>
    <h1 className="header_title">Мой тудушник на реакте</h1>
    <h2 className="header_input_title">Название</h2>
    <input className="header_input" type="text" autoComplete="off" value={name} onChange={handleChangeName}/>
    <h2 className="header_input_title">
      Описание</h2>
    <input className="header_input" type="text" description="text" autoComplete="off" value={description} onChange={handleChangeDes}/>
    <div>
      <button className="header_button" type="submit">
        Добавить
      </button>
    </div>
  </form>);
}
