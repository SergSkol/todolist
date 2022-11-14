// import _ from 'lodash';
import './style.css';
import ToDoList from './modules/ToDoList.js';
import { saveTasks, loadTasks } from './modules/storage.js';
import showTasks from './modules/showTasks.js';

const toDoAdd = document.querySelector('#add');
const toDoClear = document.querySelector('.todo-clear');

const myToDoList = new ToDoList();

toDoAdd.addEventListener('change', () => {
  myToDoList.addTask();
  saveTasks(myToDoList.arr);
});

toDoClear.addEventListener('click', () => {
  myToDoList.clearCompletedTasks();
  saveTasks(myToDoList.arr);
});

window.onload = () => {
  myToDoList.arr = loadTasks();
  showTasks(myToDoList);
};
