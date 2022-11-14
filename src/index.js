// import _ from 'lodash';
import './style.css';
import ToDoList from './modules/ToDoList.js';
import { saveTasks, loadTasks } from './modules/storage.js';
import { showTask, showTasks } from './modules/showTasks.js';

const toDoAdd = document.querySelector('#add');
const toDoFinishEdit = document.querySelector('#finish-edit');
const toDoClear = document.querySelector('.todo-clear');

const myToDoList = new ToDoList();

toDoAdd.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    myToDoList.addTask();
    saveTasks(myToDoList.arr);
  }
});

toDoFinishEdit.addEventListener('click', () => {
  myToDoList.addTask();
  saveTasks(myToDoList.arr);
  const i = myToDoList.arr.length - 1;
  showTask(myToDoList, myToDoList.arr[i]);
  toDoAdd.value = '';
});

toDoClear.addEventListener('click', () => {
  myToDoList.clearCompletedTasks();
  saveTasks(myToDoList.arr);
});

window.onload = () => {
  myToDoList.arr = loadTasks();
  showTasks(myToDoList);
};
