/**
 * @jest-environment jsdom
 */
 import ToDoList from './ToDoList.js';

 const toDoList = new ToDoList();
 
 describe('Check edit, complete and clear of ToDoList class', () => {
   test('Edit task 1', () => {
     toDoList.addTask('task 1');
     toDoList.addTask('task 2');
     const id = toDoList.arr[0].id;
     toDoList.editTask(id, 'new task 1');
     expect(toDoList.arr[0].description).toEqual('new task 1');
   });
 
   test('Complete task 1', () => {
     const id = toDoList.arr[0].id;
     toDoList.completeTask(id);
     expect(toDoList.arr[0].completed).toEqual(true);
   });
 
    test('Clear all completed', () => {
     const id = toDoList.arr[0].id;
     document.body.innerHTML = `
     <div>
       <div id=${id}></div>
     </div>`;
     toDoList.clearCompletedTasks();
     expect(toDoList.arr.length).toEqual(1);
   });
 });
 