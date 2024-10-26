import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import "../style/ListTodo.scss";
import { useEffect, useState } from "react";

const ListTodo = () => {
  const listTodos = [
    {
      id: "todo1",
      title: "Doing homework",
    },
    {
      id: "todo2",
      title: "Making video",
    },
    {
      id: "todo3",
      title: "Fixing bugs",
    },
  ];

  const [listItem, setListItem] = useState({ listTodos });
  const addNewItem = (todo) => {
    let listTodosCopy = [...listItem.listTodos];
    listTodosCopy.push(todo);
    setListItem({
      listTodos: listTodosCopy,
    });
  };

  const deleteItem = (todo) => {
    let listTodosCopy = [...listItem.listTodos];
    listTodosCopy = listTodosCopy.filter((item, index) => item.id !== todo.id);
    setListItem({
      listTodos: listTodosCopy,
    });
  };
  console.log(">>call me render");
  //bao gom componentDidMount
  //muon xu li DOM event thi viet vao trong useEffect
  //useEffect se duoc chay moi khi render lai giao dien
  //co the dung nhieu useEffect
  useEffect(() => {
    //=componentDidMout + componentDidUpdate
    if (listItem.listTodos.length === 0) alert("You deleted all the items");
    console.log(">>call me useEffect");
  }, [listItem.listTodos]); //neu kh viet gi vao dau [] thi ham useEffect chi chay 1 lan thoi

  return (
    <>
      <div className="list-todo-container">
        <AddTodo addNewItem={addNewItem} />
        <TodoItem listTodos={listItem.listTodos} deleteItem={deleteItem} />
      </div>
    </>
  );
};

export default ListTodo;
