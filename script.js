const form = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const list = document.querySelector("#list")
const template = document.querySelector("#list-item-template")
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST-"
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
let todos = loadTodos()

todos.forEach(renderTodo)

list.addEventListener("change", e => {
  if (!e.target.matches("[data-list-item-checkbox]")) return

  const parent = e.target.closest(".list-item")

  const todoId = parent.dataset.todoId
  const todo = todos.find(t => t.id === todoId)
  todo.complete = e.target.checked
  saveTodos()
})

list.addEventListener("click", e => {
  if (!e.target.matches("[data-button-delete]")) return

  const parent = e.target.closest(".list-item")
  const todoId = parent.dataset.todoId
  parent.remove() // remove todo from the screen
  todos = todos.filter(todo => todo.id !== todoId) // remove todo from the list
  saveTodos() // resave the todos
})

form.addEventListener("submit", e => {
  e.preventDefault()

  const todoName = todoInput.value

  if (todoName === "") return

  const newTodo = {
    id: new Date().valueOf().toString(), // converting it to string becuase of easy comparison as local storage converts everything to string. Using this id to be able to uniquely identify each of the todo when it's clicked to be completed or uncompleted
    name: todoName,
    complete: false
  }

  todos.push(newTodo)
  renderTodo(newTodo)
  saveTodos()
  todoInput.value = ""
})

function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true)
  const listItem = templateClone.querySelector(".list-item")
  listItem.dataset.todoId = todo.id
  const textElement = templateClone.querySelector("[data-list-item-text]")
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]")

  textElement.innerText = todo.name
  checkbox.checked = todo.complete

  list.appendChild(templateClone)
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY)
  return JSON.parse(todosString) || []
}
