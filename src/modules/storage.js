const storageKey = 'todolist';

const saveTasks = (arr) => {
  localStorage.setItem(storageKey, JSON.stringify(arr));
};

const loadTasks = () => {
  let arr = JSON.parse(localStorage.getItem(storageKey));
  if (arr === null) {
    arr = [];
  }
  return arr;
};

export { saveTasks, loadTasks };
