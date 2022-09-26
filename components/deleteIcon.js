import { displayTasks } from "./readTasks.js";

const deleteIcon = (id) => {
  const i = document.createElement('i');
  i.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon');
  i.addEventListener('click', () => deleteTask(id));
  return i;
};

const deleteTask = (id) => {
  const li = document.querySelector("[data-list]");//selecciona lista
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const index = tasks.findIndex( (item) => item.id === id);
  tasks.splice(index, 1);//elimina el elemento dentro del arreglo
  li.innerHTML = '';//blanquea la lista
  localStorage.setItem("tasks", JSON.stringify(tasks));//actualiza el local storage
  displayTasks();//se manda a llamar en cada evento por ej nueva tarea, eliminar, completar etc.
};

export default deleteIcon;
