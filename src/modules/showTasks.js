import { saveTasks } from './storage.js';

const showTasks = (list) => {
  const addElement = (elementType, parent, className) => {
    const element = document.createElement(elementType);
    element.classList.add(className);
    parent.appendChild(element);
    return element;
  }

  const todoList = document.querySelector('.todo-list');
  list.arr.forEach((task) => {
    const taskItem = addElement('div', todoList, 'task-item');
    taskItem.setAttribute('id', task.id);
    const taskCheckbox = addElement('input', taskItem, 'task-checkbox');
    taskCheckbox.setAttribute('type', 'checkbox');

    if (task.completed) {
      taskCheckbox.setAttribute('checked', 'checked');
    }

    const taskDescription = addElement('input', taskItem, 'task-description');
    taskDescription.value = task.description;

    if (task.completed) {
      taskDescription.classList.add('line-through');
    }

    const taskDrag = addElement('a', taskItem, 'task-drag');
    taskDrag.classList.add('fa-solid');
    taskDrag.classList.add('fa-ellipsis-vertical');

    const taskRemove = addElement('a', taskItem, 'task-remove');
    taskRemove.classList.add('fa-solid');
    taskRemove.classList.add('fa-trash');
    taskRemove.classList.add('hide');

    taskCheckbox.addEventListener('click', () => {
      task.completed = !task.completed;
      taskDescription.classList.toggle('line-through');
      saveTasks(list.arr);
    });

    taskDescription.addEventListener('click', () => {
      taskDrag.classList.add('hide');
      taskRemove.classList.remove('hide');
      taskDescription.focus();
      taskItem.classList.add('highlighted');
      taskCheckbox.setAttribute('disabled', 'disabled');
    });

    taskDescription.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        list.editTask(task.id, taskDescription.value);
        saveTasks(list.arr);
        taskDrag.classList.remove('hide');
        taskRemove.classList.add('hide');
        taskItem.classList.remove('highlighted');
        taskCheckbox.removeAttribute('disabled');
      }
    });

    taskRemove.addEventListener('click', () => {
      list.removeTask(task.id);
      saveTasks(list.arr);
    });
  });
}

export default showTasks;
