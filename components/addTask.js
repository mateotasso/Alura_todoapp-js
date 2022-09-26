import { uniqueDates } from '../services/date.js';
import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './readTasks.js';

//funcion que recibe como parametro el evento que es el que genera el formulario
export const addTask = (evento) => {
    evento.preventDefault();

    const list = document.querySelector('[data-list]');//trae la lista del elemento que hacemos las tareas 
    const input = document.querySelector('[data-form-input]');//trae el input donde el usuario escribe 
    const calendar = document.querySelector('[data-form-date]');//trae la fecha que selecciona el usuario

    const value = input.value; //trae lo que escribio el usuario
    const date = calendar.value; //trae la fecha en otro formato
    const dateFormat = moment(date).format('DD/MM/YYYY'); //moment la libreria en el formato que elegimos

    if (value === "" || date === "") {
        return;
    }

    input.value = '';//limpia input para que tenga espacio vacio
    calendar.value = '';//limpia calendario para que tenga espacio vacio
   
    const complete = false;

    //se genera un objeto donde se almacena value y dateformat
    const taskObj = {
        value,
        dateFormat,
        complete,//agregamos la llave complete q al inicio es false xq cuando agregamos una tarea no esta completada
        id: uuid.v4()//a cada uno de los elementos le agregamos un id para saber q elemento marcar como completado o eliminar
    };

    list.innerHTML = '';

    //json parse transforma el sringify nuevamente en obj utilizable
    const taskList = JSON.parse(localStorage.getItem('tasks')) || []; //tasklist va a ser igual a lo que tenga almacenado localstorage con la llave tasks. lee la info almacenada lo regresa en json y lo pasa en json parse para tranformarlo en objeto javascript || sirve para que si viene null lo define en un array vacio
    //almacenando con push los objetos en el array
    taskList.push(taskObj);//le agrega al tasklist el taskobj
    //almacenando el array en localstorage
    localStorage.setItem('tasks', JSON.stringify(taskList));//almacena el array en fomato json con stringify

    displayTasks();

};



export const createTask = ({ value, dateFormat, complete, id }) => {//recibe como objeto la llave value y dateformat y lo desectructura
    const task = document.createElement('li');//genera un elemento li
          task.classList.add('card');//le agrega la clase card

    const taskContent = document.createElement('div');//genera elemento tipo div

    const check = checkComplete(id);

    if(complete){//si complete es true se agregan las clases siguientes
        check.classList.toggle('fas');
        check.classList.toggle('completeIcon');
        check.classList.toggle('far');
    }
    const titleTask = document.createElement('span');//genera elemento tipo span
          titleTask.classList.add('task');//le agrega la clase task
          titleTask.innerText = value;//le agrega el valor o texto que escribio el usuario
          taskContent.appendChild(check);//agrega los hijos al taskcontent que contiene el checkbox y el titulo de la tarea
          taskContent.appendChild(titleTask);
    // task.innerHTML = content;

    const dateElement = document.createElement('span');//crea un span 
          dateElement.innerHTML = dateFormat;//le asigna la fecha recibida como parametro
          //agrega hijos a padres
          task.appendChild(taskContent);
          task.appendChild(dateElement);
          task.appendChild(deleteIcon(id));
    return task;//regresa la tarea
};