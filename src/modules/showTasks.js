import { saveTasks } from './storage.js';

const showTask = (list, task) => {
  const addElement = (elementType, parent, className) => {
    const element = document.createElement(elementType);
    element.classList.add(className);
    parent.appendChild(element);
    return element;
  };

  const drag = (e) => {
    const dragged = e.target.parentNode;
    e.dataTransfer.setData('text', dragged.id);
  };

  const drop = (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text');
    list.moveTask(draggedId, e.target.id);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const todoList = document.querySelector('.todo-list');
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
  taskDrag.setAttribute('draggable', true);

  const taskFinishEdit = addElement('a', taskItem, 'task-finish-edit');
  taskFinishEdit.classList.add('fa-solid');
  taskFinishEdit.classList.add('fa-check');
  taskFinishEdit.classList.add('hide');

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
    taskFinishEdit.classList.remove('hide');
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
      taskFinishEdit.classList.add('hide');
      taskRemove.classList.add('hide');
      taskItem.classList.remove('highlighted');
      taskCheckbox.removeAttribute('disabled');
    }
  });

  taskFinishEdit.addEventListener('click', () => {
    list.editTask(task.id, taskDescription.value);
    saveTasks(list.arr);
    taskDrag.classList.remove('hide');
    taskFinishEdit.classList.add('hide');
    taskRemove.classList.add('hide');
    taskItem.classList.remove('highlighted');
    taskCheckbox.removeAttribute('disabled');
  });

  taskRemove.addEventListener('click', () => {
    list.removeTask(task.id);
    saveTasks(list.arr);
  });

  taskDrag.addEventListener('dragstart', (event) => {
    drag(event);
  });

  taskItem.addEventListener('drop', (event) => {
    drop(event);
  });

  taskItem.addEventListener('dragover', (event) => {
    allowDrop(event);
  });

  taskDrag.addEventListener('click', () => {
    list.moveTask(task.id, list.arr[0].id);
    saveTasks(list.arr);
  });
};

const showTasks = (list) => {
  list.arr.forEach((task) => {
    showTask(list, task);
  });
};

export { showTasks, showTask };
