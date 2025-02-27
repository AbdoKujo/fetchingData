document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Fetch and display tasks
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                console.log(task); // Log each task to the console
                addTaskToDOM(task);
            });
        });

    // Handle form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = {
            title: taskInput.value,
            completed: false
        };

        // Send POST request to add new task
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then(response => response.json())
        .then(task => {
            addTaskToDOM(task); // Use the task returned by the API, which includes the correct ID
            taskInput.value = '';
        });
    });

    // Add task to DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = task.title;
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Terminé';
        completeButton.classList.add('complete');
        completeButton.addEventListener('click', () => {
            // Send PUT request to update task
            fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...task, completed: true })
            })
            .then(response => response.json())
            .then(updatedTask => {
                li.style.textDecoration = 'line-through';
                completeButton.disabled = true;
                alert('Task marked as completed!');
            })
            .catch(error => {
                console.error('Error:', error);
                li.style.textDecoration = 'line-through';
                completeButton.disabled = true;
                alert('Its a local task tho .');
            });
        });
        li.appendChild(completeButton);
        taskList.appendChild(li);
    }
});