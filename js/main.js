document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const modal = document.getElementById('edit-modal');
    const closeModal = document.querySelector('.close');
    const saveButton = document.getElementById('save-task');
    const editTaskInput = document.getElementById('edit-task-input');
    const editTaskDate = document.getElementById('edit-task-date');
    let currentTaskElement = null;

    addButton.addEventListener('click', function() {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') {
            alert('Vazifa matnini kiriting!');
            return;
        }

        const listItem = document.createElement('li');
        listItem.classList.add('active');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
            listItem.classList.toggle('checked', checkbox.checked);
            listItem.classList.toggle('active', !checkbox.checked);
        });

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const editButton = document.createElement('button');
        editButton.textContent = 'Tahrirlash';
        editButton.className = 'edit-btn';
        editButton.addEventListener('click', function() {
            currentTaskElement = listItem;
            editTaskInput.value = taskSpan.textContent;
            editTaskDate.value = listItem.getAttribute('data-date') || '';
            modal.style.display = 'flex';
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'O\'chirish';
        removeButton.className = 'remove-btn';
        removeButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        newTaskInput.value = '';
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    saveButton.addEventListener('click', function() {
        if (currentTaskElement) {
            const newTaskText = editTaskInput.value.trim();
            const newTaskDate = editTaskDate.value;
            if (newTaskText !== '') {
                const taskSpan = currentTaskElement.querySelector('span');
                taskSpan.textContent = newTaskText;
                currentTaskElement.setAttribute('data-date', newTaskDate);
                modal.style.display = 'none';
                currentTaskElement = null;
            } else {
                alert('Vazifa matnini kiritishingiz kerak!');
            }
        }
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            const items = taskList.querySelectorAll('li');
            items.forEach(item => {
                switch (filter) {
                    case 'all':
                        item.style.display = 'flex';
                        break;
                    case 'active':
                        item.style.display = item.classList.contains('checked') ? 'none' : 'flex';
                        break;
                    case 'completed':
                        item.style.display = item.classList.contains('checked') ? 'flex' : 'none';
                        break;
                }
            });
        });
    });
});
