// Hardcoded admin credentials for demonstration purposes
const adminCredentials = { username: "admin", password: "admin123" };
const userCredentials = { username: "user", password: "user123" };

// DOM Elements
const loginPage = document.getElementById("loginPage");
const adminDashboard = document.getElementById("adminDashboard");
const userDashboard = document.getElementById("userDashboard");
const loginForm = document.getElementById("loginForm");
const taskList = document.getElementById("taskList");
const userTaskList = document.getElementById("userTaskList");
const taskTitle = document.getElementById("taskTitle");
const taskPoints = document.getElementById("taskPoints");
const taskType = document.getElementById("taskType");

// Task and Points Data
let tasks = [];
let userPoints = 0;

// Login Function
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        loginPage.style.display = "none";
        adminDashboard.style.display = "block";
    } else if (username === userCredentials.username && password === userCredentials.password) {
        loginPage.style.display = "none";
        userDashboard.style.display = "block";
    } else {
        document.getElementById("loginError").style.display = "block";
    }
});

// Logout Function for Admin
document.getElementById("logoutAdminBtn").addEventListener("click", () => {
    adminDashboard.style.display = "none";
    loginPage.style.display = "block";
});

// Logout Function for User
document.getElementById("logoutUserBtn").addEventListener("click", () => {
    userDashboard.style.display = "none";
    loginPage.style.display = "block";
});

// Create Task Function (Admin Only)
document.getElementById("createTaskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskTitle.value;
    const points = parseInt(taskPoints.value);
    const type = taskType.value;

    const newTask = { title, points, type };
    tasks.push(newTask);

    // Display tasks in Admin dashboard
    const li = document.createElement("li");
    li.textContent = `${title} (${points} points) - ${type}`;
    taskList.appendChild(li);

    taskTitle.value = "";
    taskPoints.value = "";
});

// Assign Tasks to User (User Dashboard)
function displayUserTasks() {
    userTaskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.title} - ${task.type}`;
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = () => {
            userPoints += task.points;
            alert(`You earned ${task.points} points! Total points: ${userPoints}`);
            displayUserTasks();
        };
        li.appendChild(completeButton);
        userTaskList.appendChild(li);
    });
}

// Initial Display for User Tasks
displayUserTasks();
