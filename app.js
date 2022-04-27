let todos = [];

let Todo = {
  id: 0,
  title: "",
  descript: "",
  isComplete: false,
};

const formModalEl = document.getElementById("todoFormModal");
const todoItemsEl = document.getElementById("todoItems");

const toggleModal = () => {
  formModalEl.classList.toggle("show");
  todoItemsEl.innerHTML="";
  listTodoItems();
  
};

formModalEl.addEventListener("click", (e) => {
  if (e.target.id == "todoFormModal") toggleModal();
});

const idGenerator = () => {
  return Math.floor(Math.random() * 100000 + 1);
};

const insertTodoItemsToList = (todoItem) => {
  const listItem = `<li class="todo-item ${
    todoItem.isComplete ? "completed" : "" 
  }" data-id=${
    todoItem.id
  }>
    <div class="todo-item-check" data-id=${
      
      todoItem.id
    } onclick="completeTask(this)">
        <div class="checkBox"> <i class="fa-solid fa-check"></i></div>
    </div>
    <div class="todo-item-details">
        <span class="todo-item-title">${todoItem.title}</span>
        <span class="todo-item-descript">${todoItem.descript}</span>
    </div>
    <div class="delete-container">
        <div class="delete-todo" onclick="deleteTask(${todoItem.id})">
            <i class="fa-regular fa-trash-can fa-l" width="32" height="32" onclick="#"></i>
        </div>
    </div>
</li>`;

  todoItemsEl.insertAdjacentHTML("beforeend", listItem);
};

const saveTodosToLS = () => {
  localStorage.setItem("todoItemsLS", JSON.stringify(todos));
};

const addTodo = () => {
  let todoItem;

  todoItem = {
    ...Todo,
    id: idGenerator(),
    title: document.getElementsByName("title")[0].value,
    descript: document.getElementsByName("descript")[0].value,
  };

  todos = [...todos, todoItem];
  saveTodosToLS();

  insertTodoItemsToList(todoItem);

  document.getElementById("todoForm").reset();
  toggleModal();
};

const completeTask = (e) => {
  e.parentNode.classList.toggle("completed");
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == e.dataset.id) {
      todos[i].isComplete = !todos[i].isComplete;
      saveTodosToLS();
    }
  }
};
const noneTodos = `<li class="none-todos"> 
    No any task has been created yet </li>`;

const deleteTask = (id) => {
  const todoItemsEll = document.getElementsByClassName("todo-item");
  for (let i = 0; i < todoItemsEl.length; i++) {
    if (todoItemsEll[i].dataset.id == id) todoItemsEll[i].remove();
  };

  todos = todos.filter((item) => {
    if (item.id != id) return item;
  });
  saveTodosToLS();
  
  if (todoItemsLS) {
    todos = JSON.parse(todoItemsLS);
    if(todos.length>0) {listTodoItems(); 
    
    }else{
      
      todoItemsEl.insertAdjacentHTML("beforeend", noneTodos);
      
  }}
  saveTodosToLS();
};

const listTodoItems = () => {
  todoItemsEl.innerHTML = "";
  todos.forEach((item) => {
    insertTodoItemsToList(item);
  });
};

const todoItemsLS = localStorage.getItem("todoItemsLS");



if (todoItemsLS) {
  todos = JSON.parse(todoItemsLS);
  if(todos.length>0) {listTodoItems(); 
  
  }else{
    
    todoItemsEl.insertAdjacentHTML("beforeend", noneTodos);
    
}}


