{
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
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };
  const markAllTaskDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };


  const renderTasks = () => {
    const taskToHtml = task => `
<li class="list__task${task.done && hideDoneTasks ? " list__task--hidden" : ""} js-task">
      <button class="tasks__button tasks__button--toggleDone js-toggleDone">
      ${task.done ? "✓" : ""}
      </button>
      <span class="list__text ${task.done ? "list__text--done" : ""}">
      ${task.content}
      </span>
      <button class=" tasks__button  tasks__button--remove js-remove">🗑</button>
      </li>
      `;


    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHtml).join("");

  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector("js-buttons");
    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;

    }
    buttonsElement.innerHTML = `
 <button class= "buttons__buton js-toggleHideDoneTasks">
  ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
  </button>
  <button class= "buttons__button js-markAllDone"
  ${tasks.every(({ done }) => done) ? "disabled" : ""}
  ></button>
  `;
  };

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");
    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTaskDone);

    }
    const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");
    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);

    }
  };

  const render = () => {
    renderTasks();
    bindRemoveEvents();
    bindToggleDoneEvents();
    renderButtons();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTask = document.querySelector(".js-inputTask");
    const newTaskContent = newTask.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTask.value = "";

    }
    newTask.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
};

