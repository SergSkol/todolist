"use strict";
(self["webpackChunktodolist"] = self["webpackChunktodolist"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_ToDoList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ToDoList.js */ "./src/modules/ToDoList.js");
/* harmony import */ var _modules_storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/storage.js */ "./src/modules/storage.js");
/* harmony import */ var _modules_showTasks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/showTasks.js */ "./src/modules/showTasks.js");
// import _ from 'lodash';
// import './style.css';




const toDoAdd = document.querySelector('#add');
const toDoClear = document.querySelector('.todo-clear');

const myToDoList = new _modules_ToDoList_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

toDoAdd.addEventListener('change', () => {
  myToDoList.addTask();
  (0,_modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.saveTasks)(myToDoList.arr);
});

toDoClear.addEventListener('click', () => {
  myToDoList.clearCompletedTasks();
  (0,_modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.saveTasks)(myToDoList.arr);
});

window.onload = () => {
  myToDoList.arr = (0,_modules_storage_js__WEBPACK_IMPORTED_MODULE_1__.loadTasks)();
  (0,_modules_showTasks_js__WEBPACK_IMPORTED_MODULE_2__["default"])(myToDoList);
};


/***/ }),

/***/ "./src/modules/ToDoList.js":
/*!*********************************!*\
  !*** ./src/modules/ToDoList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToDoList)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");


class ToDoList {
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


/***/ }),

/***/ "./src/modules/showTasks.js":
/*!**********************************!*\
  !*** ./src/modules/showTasks.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");


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
      (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.saveTasks)(list.arr);
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
        (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.saveTasks)(list.arr);
        taskDrag.classList.remove('hide');
        taskRemove.classList.add('hide');
        taskItem.classList.remove('highlighted');
        taskCheckbox.removeAttribute('disabled');
      }
    });

    taskRemove.addEventListener('click', () => {
      list.removeTask(task.id);
      (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.saveTasks)(list.arr);
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showTasks);


/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadTasks": () => (/* binding */ loadTasks),
/* harmony export */   "saveTasks": () => (/* binding */ saveTasks)
/* harmony export */ });
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




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDNkM7QUFDZTtBQUNiO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDREQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLEVBQUUsOERBQVM7QUFDWCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsRUFBRSw4REFBUztBQUNYLENBQUM7QUFDRDtBQUNBO0FBQ0EsbUJBQW1CLDhEQUFTO0FBQzVCLEVBQUUsaUVBQVM7QUFDWDs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCeUM7QUFDekM7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRHlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sc0RBQVM7QUFDZixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFTO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBTSxzREFBUztBQUNmLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNnQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL21vZHVsZXMvVG9Eb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy9zaG93VGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy9zdG9yYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbi8vIGltcG9ydCAnLi9zdHlsZS5jc3MnO1xyXG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi9tb2R1bGVzL1RvRG9MaXN0LmpzJztcclxuaW1wb3J0IHsgc2F2ZVRhc2tzLCBsb2FkVGFza3MgfSBmcm9tICcuL21vZHVsZXMvc3RvcmFnZS5qcyc7XHJcbmltcG9ydCBzaG93VGFza3MgZnJvbSAnLi9tb2R1bGVzL3Nob3dUYXNrcy5qcyc7XHJcblxyXG5jb25zdCB0b0RvQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZCcpO1xyXG5jb25zdCB0b0RvQ2xlYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1jbGVhcicpO1xyXG5cclxuY29uc3QgbXlUb0RvTGlzdCA9IG5ldyBUb0RvTGlzdCgpO1xyXG5cclxudG9Eb0FkZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgbXlUb0RvTGlzdC5hZGRUYXNrKCk7XHJcbiAgc2F2ZVRhc2tzKG15VG9Eb0xpc3QuYXJyKTtcclxufSk7XHJcblxyXG50b0RvQ2xlYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbXlUb0RvTGlzdC5jbGVhckNvbXBsZXRlZFRhc2tzKCk7XHJcbiAgc2F2ZVRhc2tzKG15VG9Eb0xpc3QuYXJyKTtcclxufSk7XHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gIG15VG9Eb0xpc3QuYXJyID0gbG9hZFRhc2tzKCk7XHJcbiAgc2hvd1Rhc2tzKG15VG9Eb0xpc3QpO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBzYXZlVGFza3MgfSBmcm9tICcuL3N0b3JhZ2UuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3Qge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5hcnIgPSBbXTtcclxuICB9XHJcblxyXG4gIGFkZFRhc2soKSB7XHJcbiAgICBjb25zdCB0b0RvQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZCcpO1xyXG4gICAgY29uc3QgbmV3SXRlbSA9IHtcclxuICAgICAgaWQ6IERhdGUubm93KCksXHJcbiAgICAgIGluZGV4OiB0aGlzLmFyci5sZW5ndGggKyAxLFxyXG4gICAgICBkZXNjcmlwdGlvbjogdG9Eb0FkZC52YWx1ZSxcclxuICAgICAgY29tcGxldGVkOiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5hcnIucHVzaChuZXdJdGVtKTtcclxuICB9XHJcblxyXG4gIHJlaW5kZXhUYXNrcygpIHtcclxuICAgIGxldCBpID0gMTtcclxuICAgIHRoaXMuYXJyLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgdGFzay5pbmRleCA9IGk7XHJcbiAgICAgIGkgKz0gMTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlVGFzayhpZCkge1xyXG4gICAgdGhpcy5hcnIgPSB0aGlzLmFyci5maWx0ZXIoKHRhc2spID0+IHRhc2suaWQgIT09IGlkKTtcclxuICAgIGNvbnN0IHRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICB0YXNrLnJlbW92ZSgpO1xyXG4gICAgdGhpcy5yZWluZGV4VGFza3MoKTtcclxuICB9XHJcblxyXG4gIGNsZWFyQ29tcGxldGVkVGFza3MoKSB7XHJcbiAgICB0aGlzLmFyci5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgIGlmICh0YXNrLmNvbXBsZXRlZCkge1xyXG4gICAgICAgIGNvbnN0IHRhc2tJdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFzay5pZCk7XHJcbiAgICAgICAgdGFza0l0ZW0ucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5hcnIgPSB0aGlzLmFyci5maWx0ZXIoKHRhc2spID0+ICF0YXNrLmNvbXBsZXRlZCk7XHJcbiAgICB0aGlzLnJlaW5kZXhUYXNrcygpO1xyXG4gIH1cclxuXHJcbiAgZWRpdFRhc2soaWQsIG5ld0Rlc2NyaXB0aW9uKSB7XHJcbiAgICB0aGlzLmFyci5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgIGlmICh0YXNrLmlkID09PSBpZCkge1xyXG4gICAgICAgIHRhc2suZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IHNhdmVUYXNrcyB9IGZyb20gJy4vc3RvcmFnZS5qcyc7XHJcblxyXG5jb25zdCBzaG93VGFza3MgPSAobGlzdCkgPT4ge1xyXG4gIGNvbnN0IGFkZEVsZW1lbnQgPSAoZWxlbWVudFR5cGUsIHBhcmVudCwgY2xhc3NOYW1lKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgIHJldHVybiBlbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XHJcbiAgbGlzdC5hcnIuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgY29uc3QgdGFza0l0ZW0gPSBhZGRFbGVtZW50KCdkaXYnLCB0b2RvTGlzdCwgJ3Rhc2staXRlbScpO1xyXG4gICAgdGFza0l0ZW0uc2V0QXR0cmlidXRlKCdpZCcsIHRhc2suaWQpO1xyXG4gICAgY29uc3QgdGFza0NoZWNrYm94ID0gYWRkRWxlbWVudCgnaW5wdXQnLCB0YXNrSXRlbSwgJ3Rhc2stY2hlY2tib3gnKTtcclxuICAgIHRhc2tDaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcclxuXHJcbiAgICBpZiAodGFzay5jb21wbGV0ZWQpIHtcclxuICAgICAgdGFza0NoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gYWRkRWxlbWVudCgnaW5wdXQnLCB0YXNrSXRlbSwgJ3Rhc2stZGVzY3JpcHRpb24nKTtcclxuICAgIHRhc2tEZXNjcmlwdGlvbi52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XHJcblxyXG4gICAgaWYgKHRhc2suY29tcGxldGVkKSB7XHJcbiAgICAgIHRhc2tEZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdsaW5lLXRocm91Z2gnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXNrRHJhZyA9IGFkZEVsZW1lbnQoJ2EnLCB0YXNrSXRlbSwgJ3Rhc2stZHJhZycpO1xyXG4gICAgdGFza0RyYWcuY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnKTtcclxuICAgIHRhc2tEcmFnLmNsYXNzTGlzdC5hZGQoJ2ZhLWVsbGlwc2lzLXZlcnRpY2FsJyk7XHJcblxyXG4gICAgY29uc3QgdGFza1JlbW92ZSA9IGFkZEVsZW1lbnQoJ2EnLCB0YXNrSXRlbSwgJ3Rhc2stcmVtb3ZlJyk7XHJcbiAgICB0YXNrUmVtb3ZlLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XHJcbiAgICB0YXNrUmVtb3ZlLmNsYXNzTGlzdC5hZGQoJ2ZhLXRyYXNoJyk7XHJcbiAgICB0YXNrUmVtb3ZlLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuXHJcbiAgICB0YXNrQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRhc2suY29tcGxldGVkID0gIXRhc2suY29tcGxldGVkO1xyXG4gICAgICB0YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LnRvZ2dsZSgnbGluZS10aHJvdWdoJyk7XHJcbiAgICAgIHNhdmVUYXNrcyhsaXN0LmFycik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0YXNrRGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRhc2tEcmFnLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgICAgdGFza1JlbW92ZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICAgIHRhc2tEZXNjcmlwdGlvbi5mb2N1cygpO1xyXG4gICAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKCdoaWdobGlnaHRlZCcpO1xyXG4gICAgICB0YXNrQ2hlY2tib3guc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGFza0Rlc2NyaXB0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgICBsaXN0LmVkaXRUYXNrKHRhc2suaWQsIHRhc2tEZXNjcmlwdGlvbi52YWx1ZSk7XHJcbiAgICAgICAgc2F2ZVRhc2tzKGxpc3QuYXJyKTtcclxuICAgICAgICB0YXNrRHJhZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICAgICAgdGFza1JlbW92ZS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgICAgICAgdGFza0l0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlnaGxpZ2h0ZWQnKTtcclxuICAgICAgICB0YXNrQ2hlY2tib3gucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0YXNrUmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBsaXN0LnJlbW92ZVRhc2sodGFzay5pZCk7XHJcbiAgICAgIHNhdmVUYXNrcyhsaXN0LmFycik7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2hvd1Rhc2tzO1xyXG4iLCJjb25zdCBzdG9yYWdlS2V5ID0gJ3RvZG9saXN0JztcclxuXHJcbmNvbnN0IHNhdmVUYXNrcyA9IChhcnIpID0+IHtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlS2V5LCBKU09OLnN0cmluZ2lmeShhcnIpKTtcclxufTtcclxuXHJcbmNvbnN0IGxvYWRUYXNrcyA9ICgpID0+IHtcclxuICBsZXQgYXJyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KSk7XHJcbiAgaWYgKGFyciA9PT0gbnVsbCkge1xyXG4gICAgYXJyID0gW107XHJcbiAgfVxyXG4gIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG5leHBvcnQgeyBzYXZlVGFza3MsIGxvYWRUYXNrcyB9O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=