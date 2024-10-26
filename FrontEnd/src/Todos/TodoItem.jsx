import { useState } from "react";

const TodoItem = (props) => {
  const { listTodos } = props;
  const [edit, setEdit] = useState({ editTodo: {} });
  let { editTodo } = edit;
  let isEmptyObj = Object.keys(editTodo).length === 0;

  const handleDelete = (todo) => {
    props.deleteItem(todo);
  };

  const handleOnChangeEdit = (todo) => {
    let { listTodos } = props;
    let { editTodo } = edit;
    let isEmptyObj = Object.keys(editTodo).length === 0;
    if (!isEmptyObj && editTodo.id === todo.id) {
      let listTodosCopy = [...listTodos];
      let objIndex = listTodosCopy.findIndex((item) => item.id === todo.id);
      listTodosCopy[objIndex].title = editTodo.title;
      setEdit({
        listTodos: listTodosCopy,
        editTodo: {},
      });
      return;
    }
    setEdit({
      editTodo: todo,
    });
  };

  const handleOnChangeInput = (event) => {
    let editTodosCopy = { ...edit.editTodo };
    editTodosCopy.title = event.target.value;
    setEdit({
      editTodo: editTodosCopy,
    });
  };
  return (
    <>
      <div className="list-todo-content">
        {listTodos &&
          listTodos.length > 0 &&
          listTodos.map((item, index) => {
            return (
              <div className="todo-child" key={item.id}>
                {isEmptyObj ? ( //neu bang rong(chua can edit) thi se hien todoitem
                  <span>
                    {index + 1} - {item.title}
                  </span>
                ) : (
                  //khac rong se in ra input de edit
                  <>
                    {editTodo.id === item.id ? ( //neu cai id can sua bang voi id cua item thi cho edit
                      <span>
                        {index + 1} -
                        <input
                          value={editTodo.title}
                          onChange={(event) => handleOnChangeInput(event)}
                        />
                      </span>
                    ) : (
                      //neu kh bang(kh edit) thi se hien item
                      <span>
                        {index + 1} - {item.title}
                      </span>
                    )}
                  </>
                )}
                <button
                  className="edit"
                  onClick={() => handleOnChangeEdit(item)}
                >
                  {!isEmptyObj && editTodo.id === item.id ? "Save" : "edit"}
                </button>
                <button className="delete" onClick={() => handleDelete(item)}>
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default TodoItem;
