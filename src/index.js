// import _ from 'lodash';
import './style.css';
import ToDoList from './modules/ToDoList.js';

const toDoAdd = document.querySelector('#add');
const toDoClear = document.querySelector('.todo-clear');

const myToDoList = new ToDoList();

toDoAdd.addEventListener('change', () => {
  myToDoList.addTask();
  myToDoList.saveTasks();
});

toDoClear.addEventListener('click', () => {
  myToDoList.clearCompletedTasks();
  myToDoList.saveTasks();
});

window.onload = () => {
  myToDoList.loadTasks();
  myToDoList.showTasks();
};
