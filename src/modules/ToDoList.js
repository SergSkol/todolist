export default class ToDoList {
  constructor() {
    this.arr = [];
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

  moveTask(fromId, toId) {
    const fromItem = this.arr.find(task => task.id === fromId);
    const toItem = this.arr.find(task => task.id == toId);
    const toIndex = this.arr.indexOf(toItem);
    this.removeTask(fromId);
    this.arr.splice(toIndex, 0, fromItem);
    this.reindexTasks();
    window.location.reload();
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
}
