import { createTask } from "./addTask.js";//importa funcion
import dateElement from "./dateElement.js";
import { uniqueDates, orderDates } from "../services/date.js";


export const displayTasks = () => {
    const list = document.querySelector("[data-list]");//selecciona la lista a la cual queremos agregar las tareas almacenadas 

    const tasksList = JSON.parse(localStorage.getItem('tasks')) || [];//toma la info almacenada en localstorage
    const dates = uniqueDates(tasksList);
    orderDates(dates);


    dates.forEach((date) => {
        const dateMoment = moment(date, "DD/MM/YYYY");
        list.appendChild(dateElement(date));
        tasksList.forEach((task) => {//recorre el array y recibe como parametro los elementos tasks
            const taskDate = moment(task.dateFormat, "DD/MM/YYYY");
            const diff = dateMoment.diff(taskDate);
            if (diff === 0){
                list.appendChild(createTask(task));//manda la tarea o elemento dentro del arreglo con formato de objeto que tiene llave value y dateformate
            }
           
        });//y lo agrega a la lista
    });

    
};