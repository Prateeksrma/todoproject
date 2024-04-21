let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const addButton = document.getElementById('addButton'); // Reference to the Add button
const tasksCounter = document.getElementById('tasks-counter');

// 
function addTaskToDom(task) {
    const li = document.createElement('li'); //created li in javascript

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="images.png" class="delete" data-id="${task.id}"/>
    `; 

    tasksList.append(li);
}

function renderList() {
    tasksList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        addTaskToDom(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        task.done = !task.done;
        renderList();
        // showNotification('Task toggled successfully');
    } else {
        showNotification('Could not toggle the task');
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderList();
    // showNotification('Task deleted successfully');
}

function addTask(taskText) {
    if (taskText.trim() !== '') {
        const task = {
            text: taskText,
            id: Date.now().toString(),
            done: false
        };
        tasks.push(task);
        renderList();
        // showNotification('Task added successfully');
    } else {
        showNotification('Task text cannot be empty');
    }
}


function showNotification(text) {
    alert(text);
}

function handleInputKeyPress(e) {
    if (e.key === 'Enter') {
        addTask(addTaskInput.value);
        addTaskInput.value = '';
    }
}

function handleAddButtonClick(event) {
    event.preventDefault();
    const taskText = addTaskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        addTaskInput.value = '';
    } else {
        showNotification('Task text cannot be empty');
    }
}



function handleClickListener(e) {
    const target = e.target;

    if (target === addButton) { 
        handleAddButtonClick();
    } else if (target.className === 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
    } else if (target.className === 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
    }
}

function initializeApp() {
    addTaskInput.addEventListener('keyup', handleInputKeyPress);
    addButton.addEventListener('click', handleAddButtonClick);
    document.addEventListener('click', handleClickListener);
}

initializeApp();