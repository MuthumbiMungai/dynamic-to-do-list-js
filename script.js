// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // ----- Select DOM Elements -----
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // ----- Add Task Function -----
    function addTask(taskText = taskInput.value.trim(), save = true) {
        // Check for empty input
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create <li> element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task on click
        removeBtn.onclick = () => {
            taskList.removeChild(li);

            // Update localStorage
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = tasks.indexOf(taskText);
            if (index !== -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };

        // Append button to <li>, and <li> to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';

        // Save to localStorage (unless loading from storage)
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // ----- Load Tasks on Page Load -----
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }

    // ----- Event Listeners -----
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize tasks
    loadTasks();
});
