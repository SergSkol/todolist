export default class ToDoList {
  constructor() {
    this.arr = [];
    this.storageKey = 'todolist';
  }

  addTask() {
    const toDoAdd = document.querySelector('#add');
    const newItem = {
      id: Date.now(),
      index: this.arr.length + 1,
      description: toDoAdd.value,
      completed: false,
    };

    this.arr.push(newItem);
  }

  reindexTasks() {
    let i = 1;
    this.arr.forEach((task) => {
      task.index = i;
      i += 1;
    });
  }

  removeTask(id) {
    this.arr = this.arr.filter((task) => task.id !== id);
    const task = document.getElementById(id);
    task.remove();
    this.reindexTasks();
  }

  clearCompletedTasks() {
    this.arr.forEach((task) => {
      if (task.completed) {
        const taskItem = document.getElementById(task.id);
        taskItem.remove();
      }
    });
    this.arr = this.arr.filter((task) => !task.completed);
    this.reindexTasks();
  }

  editTask(id, newDescription) {
    this.arr.forEach((task) => {
      if (task.id === id) {
        task.description = newDescription;
      }
    });
  }

  saveTasks() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.arr));
  }

  loadTasks() {
    this.arr = JSON.parse(localStorage.getItem(this.storageKey));
    if (this.arr == null) {
      this.arr = [];
    }
  }

  showTasks() {
    function addElement(elementType, parent, className) {
      const element = document.createElement(elementType);
      element.classList.add(className);
      parent.appendChild(element);
      return element;
    }

    const todoList = document.querySelector('.todo-list');
    this.arr.forEach((task) => {
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
        this.saveTasks();
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
          this.editTask(task.id, taskDescription.value);
          this.saveTasks();
          taskDrag.classList.remove('hide');
          taskRemove.classList.add('hide');
          taskItem.classList.remove('highlighted');
          taskCheckbox.removeAttribute('disabled');
        }
      });

      taskRemove.addEventListener('click', () => {
        this.removeTask(task.id);
        this.saveTasks();
      });
    });
  }
}
