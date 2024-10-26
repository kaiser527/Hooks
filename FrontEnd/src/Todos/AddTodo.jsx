import { useState } from "react";

const AddTodo = (props) => {
  const [Title, setTitle] = useState("");
  const handleOnChange = (event) => {
    setTitle(event.target.value);
  };
  const handleOnAdd = (event) => {
    console.log(Title);
    event.preventDefault(event);
    if (!Title) alert("missing title !");
    props.addNewItem({
      id: Math.floor(Math.random() * 1001),
      title: Title,
    });
  };
  return (
    <>
      <div className="add-todo">
        <input
          type="text"
          value={Title}
          onChange={(event) => handleOnChange(event)}
        />
        <button
          type="button"
          className="add"
          onClick={(event) => handleOnAdd(event)}
        >
          add
        </button>
      </div>
    </>
  );
};

export default AddTodo;
