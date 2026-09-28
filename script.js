let tasks = [];

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");
const taskCount = document.getElementById("taskCount");


function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        message.textContent = "Please enter a task.";
        return;
    }

    message.textContent = "";

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
}


function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-message">
                No tasks yet. Add your first task above.
            </div>
        `;

    } else {

        tasks.map(function(task) {

            const taskElement = document.createElement("div");
            taskElement.classList.add("task");

            if (task.completed) {
                taskElement.classList.add("completed");
            }

            taskElement.innerHTML = `
                <input
                    type="checkbox"
                    class="task-checkbox"
                    ${task.completed ? "checked" : ""}
                >

                <span class="task-text">${task.text}</span>

                <button class="delete-button">
                    Delete
                </button>
            `;

            const checkbox = taskElement.querySelector(".task-checkbox");
            const deleteButton = taskElement.querySelector(".delete-button");

            checkbox.addEventListener("change", function() {
                toggleTask(task.id);
            });

            deleteButton.addEventListener("click", function() {
                deleteTask(task.id);
            });

            taskList.appendChild(taskElement);
        });
    }

    updateTaskCount();
}


function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    renderTasks();
}


function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();
    renderTasks();
}


function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }

    renderTasks();
}


function updateTaskCount() {

    if (tasks.length === 1) {
        taskCount.textContent = "1 task";
    } else {
        taskCount.textContent = tasks.length + " tasks";
    }
}


taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    addTask();
});


loadTasks();