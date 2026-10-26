//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task'); //Add a new task.
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTaskHolder = document.getElementById('incompleteTasks'); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
const createNewTaskElement = function (taskString) {
  const taskElement = document.createElement('li');

  //input (checkbox)
  const checkbox = document.createElement('input');
  //label
  const label = document.createElement('label');
  //input (text)
  const textInput = document.createElement('input');
  //button.edit
  const editButton = document.createElement('button');

  //button.delete
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  //Each elements, needs appending
  checkbox.type = 'checkbox';
  textInput.type = 'text';
  textInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  taskElement.appendChild(checkbox);
  taskElement.appendChild(label);
  taskElement.appendChild(textInput);
  taskElement.appendChild(editButton);
  taskElement.appendChild(deleteButton);
  return taskElement;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const taskElement = createNewTaskElement(taskInput.value);

  //Append taskElement to incompleteTaskHolder
  incompleteTaskHolder.appendChild(taskElement);
  bindTaskEvents(taskElement, toggleTaskStatus);

  taskInput.value = '';
};

//Edit an existing task.
const editTask = function () {
  const taskElement = this.parentNode;

  const textInput = taskElement.querySelector('input[type=text]');
  const label = taskElement.querySelector('label');
  const editButton = taskElement.querySelector('.edit');
  const isEditing = taskElement.classList.contains('editMode');
  
  //If class of the parent is .editmode
  if (isEditing) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = textInput.value;
    editButton.innerText = 'Edit';
  } else {
    textInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskElement.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const taskElement = this.parentNode;
  const ul = taskElement.parentNode;
  //Remove the parent taskElement from the ul.
  ul.removeChild(taskElement);
};

// Wrapper to toggle task status (moves to completed or incomplete)
const toggleTaskStatus = function () {
  const taskElement = this.parentNode;
  const isCompleted = taskElement.parentNode === completedTasksHolder;
  
  if (isCompleted) {
    incompleteTaskHolder.appendChild(taskElement);
  } else {
    completedTasksHolder.appendChild(taskElement);
  }
  
  // After moving, we must re-bind the checkbox to point to the updated state
  bindTaskEvents(taskElement, toggleTaskStatus);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskElement, checkBoxEventHandler) {
  //select ListItems children
  const checkbox = taskElement.querySelector('input[type=checkbox]');
  const editButton = taskElement.querySelector('button.edit');
  const deleteButton = taskElement.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind toggleTaskStatus to checkBoxEventHandler.
  checkbox.onchange = checkBoxEventHandler;
};

// Extract the loop logic to avoid duplication
const bindEventsToTasks = function (taskHolder) {
  for (let i = 0; i < taskHolder.children.length; i++) {
    bindTaskEvents(taskHolder.children[i], toggleTaskStatus);
  }
};

// Bind events for both lists
bindEventsToTasks(incompleteTaskHolder);
bindEventsToTasks(completedTasksHolder);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.