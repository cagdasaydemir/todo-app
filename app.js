let todos = [];
const todoStorage = localStorage.getItem("todos");

if (todoStorage) {
  todos = [...JSON.parse(todoStorage)];
}

let Todo = {
  id: 0,
  title: "",
  descript: "",
  isComplete: false,
};

const formModalEl = document.getElementById("todoFormModal");
const todoListEl = document.getElementById("todoItems");

const noneTodos = `<li class="none-todos"> 
    No any task has been created yet </li>`;

const toggleModal = () => {
  formModalEl.classList.toggle("show");
};

formModalEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) toggleModal();
});

const idGenerator = () => {
  return Math.floor(Math.random() * 100000 + 1);
};

const addItemToHtml = (todoItem) => {
  let addedItemHtml = `<li class="todo-item ${
    todoItem.isComplete ? "completed" : ""
  }" data-id=${todoItem.id}>
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
        <div class="delete-todo"  data-id="${todoItem.id}" onclick="deleteTask(${todoItem.id})">
            <i class="fa-regular fa-trash-can fa-l" width="32" height="32"></i>
        </div>
    </div>
</li>`;
  todoListEl.insertAdjacentHTML("beforeend", addedItemHtml);
};

const saveItemsLS = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = () => {
    if(todos.length == 0) todoListEl.innerHTML="";
  const title = document.querySelector("input[name='title']").value;
  const descript = document.querySelector("textarea[name='descript']").value;

  const addedItem = { id: idGenerator(), title, descript, isComplete: false };
 
  addItemToHtml(addedItem);
  todos.push(addedItem);
  saveItemsLS();
  document.querySelector("#todoForm").reset();
  toggleModal();
};

const completeTask = (e) => {
  e.parentNode.classList.toggle("completed");
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == e.dataset.id) {
      todos[i].isComplete = !todos[i].isComplete;
      saveItemsLS();
    }
  }
};
const deleteTask = (id) => {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
          todos.splice(i,1);
          saveItemsLS();
          todoListEl.innerHTML ="";
          listTodoItems();
        }
      }
     
      
};

const listTodoItems = () => {

    if(todos.length >0){
        todos.forEach((todo) => {
            addItemToHtml(todo);
    });
    }else{
     todoListEl.insertAdjacentHTML("beforeend", noneTodos);
 
  }
};
listTodoItems();
