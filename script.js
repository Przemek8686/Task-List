let tasks = [];
let hideDoneTasks = false;


const removeTask = (taskIndex) => {
  tasks = [
    ...tasks.slice(0, taskIndex),
    ...tasks.slice(taskIndex + 1),
  ];
  render();
};

const toggleTaskDone = (taskIndex) => {
  tasks = [
    ...tasks.slice(0,taskIndex),
    {...tasks[taskIndex].done,
    },
    ...tasks.slice(taskIndex + 1),
  ];
  render();
};

const addNewTask = (newTaskContent) => {
  tasks = [...tasks, {content: newTaskContent}];
  render();  
  };
  const markAllTaskDone = () => {
    tasks = tasks.map((task) =>({
      ...task,
      done: true,
    }));
  render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  

const bindEvents = () => {
  const toggleDoneButtons = document.querySelectorAll(".js-done");
  toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
    toggleDoneButton.addEventListener("click", () => {
      toggleTaskDone(taskIndex);
    });
  });

  const removeButtons = document.querySelectorAll(".js-remove");

  removeButtons.forEach((removeButtons, taskIndex) => {
    removeButtons.addEventListener("click", () => {
      removeTask(taskIndex);
      console.log(removeButtons);
    });
  });
};

const render = () => {
  let htmlString = "";

  for (const task of tasks) {
    htmlString += `<li class="list__task">
      <button class="button__done js-done">
      ${task.done ? "✓" : ""}
      </button>
      <span class="list__text ${task.done ? "list__text--done" : ""}">
      ${task.content}
      </span>
      <button class="button__remove js-remove">🗑</button>
      </li>
      `;
  }

  document.querySelector(".js-tasks").innerHTML = htmlString;

  bindEvents();
};

const onFormSubmit = (event) => {
  event.preventDefault();

  const newTask = document.querySelector(".js-inputTask");
  const newTaskContent = newTask.value.trim();

  if (newTaskContent === "") {
    return;
  }

  addNewTask(newTaskContent);
  newTask.value = "";
  newTask.focus();
};

const init = () => {
  render();

  const form = document.querySelector(".js-form");

  form.addEventListener("submit", onFormSubmit);
};

init();
