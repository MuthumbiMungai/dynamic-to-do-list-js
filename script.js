// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load existing tasks from Local Storage when page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => {
            addTask(task.text, false, task.completed); // pass completion state
        });
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.dataset.task,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask(taskText = taskInput.value.trim(), save = true, completed = false) {
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a list item
        const li = document.createElement('li');
        li.textContent = taskText;
        li.dataset.task = taskText; // Store the original text in dataset

        // Add completed class if true
        if (completed) {
            li.classList.add('completed');
        }

        // Toggle complete on click (not the remove button)
        li.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                li.classList.toggle('completed');
                saveTasks();
            }
        });

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Event to remove the task when remove button is clicked
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            saveTasks(); // Update Local Storage
        };

        // Add button to the task and append to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';

        // Save to Local Storage (unless loading from it)
        if (save) {
            saveTasks();
        }
    }

    // Add task on button click
    addButton.addEventListener('click', () => addTask());

    // Add task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
