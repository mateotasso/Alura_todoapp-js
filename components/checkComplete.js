const checkComplete = (id) => {//recibe el id
  const i = document.createElement('i');
  i.classList.add('far', 'fa-check-square', 'icon');
  i.addEventListener('click', (event) => completeTask(event, id));
  return i;
};
// Immediately invoked function expression IIFE
const completeTask = (event, id) => {
  const element = event.target;
  element.classList.toggle('fas');
  element.classList.toggle('completeIcon');
  element.classList.toggle('far');
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const index = tasks.findIndex(item => item.id === id);//busca que posicion es la del arreglo dentro de la tarea
  tasks[index]["complete"] = !tasks[index]["complete"];//accede a la propiedad complete que al inicio es false y lo niega. El caso de q sea true se convierte en false
  localStorage.setItem("tasks", JSON.stringify(tasks));//despues de la modificacion del arreglo se almacena en el storage ya modificado
};

export default checkComplete;
