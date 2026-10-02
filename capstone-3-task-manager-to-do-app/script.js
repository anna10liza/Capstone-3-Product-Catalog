const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskList = document.getElementById('taskList');
const totalTasks = document.getElementById('totalTasks');
const doneTasks = document.getElementById('doneTasks');
const searchInput = document.getElementById('searchInput');
const clearCompletedBtn = document.getElementById('clearCompleted');
const navButtons = document.querySelectorAll('.nav-btn');

const STORAGE_KEY = 'capstone3-task-manager';
let currentFilter = 'all';
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { id: crypto.randomUUID(), text: 'Finish HTML layout', date: '2026-10-05', done: false },
  { id: crypto.randomUUID(), text: 'Review project notes', date: '2026-10-06', done: true },
  { id: crypto.randomUUID(), text: 'Submit weekly report', date: '', done: false }
];

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleTasks = tasks.filter((task) => {
    const matchesFilter =
      currentFilter === 'all' ||
      (currentFilter === 'pending' && !task.done) ||
      (currentFilter === 'done' && task.done);

    const matchesSearch = !query || task.text.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  totalTasks.textContent = tasks.length;
  doneTasks.textContent = tasks.filter((task) => task.done).length;

  if (!visibleTasks.length) {
    taskList.innerHTML = '<li class="empty-state">No tasks found.</li>';
    return;
  }

  taskList.innerHTML = visibleTasks
    .map(
      (task) => `
        <li class="task-item ${task.done ? 'done' : ''}" data-id="${task.id}">
          <div class="task-main">
            <input type="checkbox" ${task.done ? 'checked' : ''} data-action="toggle" />
            <div class="task-text">
              <p class="task-title">${task.text}</p>
              ${task.date ? `<span class="task-date">Due: ${task.date}</span>` : ''}
            </div>
          </div>
          <div class="task-actions">
            <button class="delete-btn" data-action="delete">Delete</button>
          </div>
        </li>
      `
    )
    .join('');
}

function addTask(event) {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.unshift({
    id: crypto.randomUUID(),
    text,
    date: taskDate.value,
    done: false
  });

  taskForm.reset();
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener('submit', addTask);
searchInput.addEventListener('input', renderTasks);
clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.done);
  saveTasks();
  renderTasks();
});

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    navButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

taskList.addEventListener('click', (event) => {
  const action = event.target.dataset.action;
  const item = event.target.closest('.task-item');

  if (!item) return;

  if (action === 'delete') {
    deleteTask(item.dataset.id);
  }
});

taskList.addEventListener('change', (event) => {
  if (event.target.dataset.action === 'toggle') {
    const item = event.target.closest('.task-item');
    if (item) toggleTask(item.dataset.id);
  }
});

renderTasks();
