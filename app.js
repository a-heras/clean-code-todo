//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.

const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

// Setup properties for task elements to keep the creation function clean
const setupTaskElement = function (taskElement, taskString) {
  const checkbox = taskElement.querySelector('input[type=checkbox]');
  const label = taskElement.querySelector('label');
  const textInput = taskElement.querySelector('input[type=text]');
  const editButton = taskElement.querySelector('button.edit');
  const deleteButton = taskElement.querySelector('button.delete');
  const deleteButtonImg = deleteButton.querySelector('img');

  label.innerText = taskString;
  label.className = 'task';

  checkbox.type = 'checkbox';
  textInput.type = 'text';
  textInput.className = 'task';

  editButton.innerText = 'Edit'; // innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
};

const createNewTaskElement = function (taskString) {
  const taskElement = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const textInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  deleteButton.appendChild(deleteButtonImg);

  taskElement.appendChild(checkbox);
  taskElement.appendChild(label);
  taskElement.appendChild(textInput);
  taskElement.appendChild(editButton);
  taskElement.appendChild(deleteButton);

  setupTaskElement(taskElement, taskString);

  return taskElement;
};

const addTask = function () {
  if (!taskInput.value) return;
  const taskElement = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(taskElement);
  bindTaskEvents(taskElement, toggleTaskStatus);

  taskInput.value = '';
};

const editTask = function () {
  const taskElement = this.parentNode;

  const textInput = taskElement.querySelector('input[type=text]');
  const label = taskElement.querySelector('label');
  const editButton = taskElement.querySelector('.edit');
  const isEditing = taskElement.classList.contains('editMode');

  if (isEditing) {
    label.innerText = textInput.value;
    editButton.innerText = 'Edit';
  } else {
    textInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskElement.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskElement = this.parentNode;
  const ul = taskElement.parentNode;
  ul.removeChild(taskElement);
};

const toggleTaskStatus = function () {
  const taskElement = this.parentNode;
  const isCompleted = taskElement.parentNode === completedTasksHolder;

  if (isCompleted) {
    incompleteTaskHolder.appendChild(taskElement);
  } else {
    completedTasksHolder.appendChild(taskElement);
  }

  bindTaskEvents(taskElement, toggleTaskStatus);
};

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskElement, checkBoxEventHandler) {
  const checkbox = taskElement.querySelector('input[type=checkbox]');
  const editButton = taskElement.querySelector('button.edit');
  const deleteButton = taskElement.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkBoxEventHandler;
};

const bindEventsToTasks = function (taskHolder) {
  for (let i = 0; i < taskHolder.children.length; i++) {
    bindTaskEvents(taskHolder.children[i], toggleTaskStatus);
  }
};

bindEventsToTasks(incompleteTaskHolder);
bindEventsToTasks(completedTasksHolder);
