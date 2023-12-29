const form = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const list = document.querySelector("#list")
const template = document.querySelector("#list-item-template")
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST-"
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
const todos = loadTodos()

todos.forEach(renderTodo)

form.addEventListener("submit", e => {
  e.preventDefault()

  const todoName = todoInput.value

  if (todoName === "") return

  const newTodo = {
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

// This should then add the todo to the list above.

// 2. Delete Todos
// 3. Complete Todos
// 5. Load Todos
