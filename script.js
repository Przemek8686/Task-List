console.log("hello");
{
    const tasks = [
        {
            content: "trening",
            done: false,
        },
        {
            content: "zakupy",
            done: true,
        }
    ]
}
const addNewTask = (newTaskContent) => {
    tasks.push({
        content: newTaskContent,
    });

    render();
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
      <button class="button__remove js-remove"> 🗑</button>
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

    form.addEventListener("submit", OnFormSubmit);

}
init();




