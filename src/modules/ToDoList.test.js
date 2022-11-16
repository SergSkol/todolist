
/**
 * @jest-environment jsdom
 */
import ToDoList from './ToDoList.js';

const toDoList = new ToDoList();

describe ('Check add and remove of ToDoList class', () => {
  test('Add task 1', () => {
    toDoList.addTask('task 1');
    expect(toDoList.arr[0].description).toEqual('task 1');
  })

  test('Add task 2', () => {
    toDoList.addTask('task 2');
    const task2 = {description: 'task 2', index: 2, completed: false};
    expect(toDoList.arr[1]).toMatchObject(task2);
  })

  test('Add task 3', () => {
    toDoList.addTask('');
    const task3 = {description: '', index: 3, completed: false};
    expect(toDoList.arr[2]).toMatchObject(task3);
  })

  test('Remove first task', () => {
    const id = toDoList.arr[0].id;
    document.body.innerHTML = `
    <div>
      <div id=${id}></div>
    </div>`;
    toDoList.removeTask(id);
    expect(toDoList.arr.length).toEqual(2);
  })
});
