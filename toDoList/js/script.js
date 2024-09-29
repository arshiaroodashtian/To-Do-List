
var taskInp = document.querySelector(".task-Inp");
const taskList = document.querySelector("ul");
const addBtn = document.querySelector(".add-icon");
const deleteBtn = document.querySelector(".delete-icon");

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("ul li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      checked: li.classList.contains('checked')
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks && tasks.length > 0) {
    tasks.forEach(task => {
      addTaskToList(task.text, task.checked);
    });
  } else {
 
    const defaultTask = { text: "This is a default task", checked: false };
    addTaskToList(defaultTask.text, defaultTask.checked);
    saveTasks();
  }
}


function addTaskToList(task, checked = false) {
  var li = document.createElement("li");
  var t = document.createTextNode(task);
  li.appendChild(t);

  var img = document.createElement("img");
  img.src = "/icons8-delete-100.png";
  img.className = "delete-icon";
  img.alt = "Close";

  li.appendChild(img);
  taskList.appendChild(li);


  if (checked) {
    li.classList.add('checked');
  }


  li.addEventListener("click", function() {
    li.classList.toggle('checked');
    saveTasks();
  });

  img.onclick = function(e) {
    e.stopPropagation(); 
    var li = this.parentElement;
    li.remove();
    saveTasks();
  };
}


function handleAddTask() {
  var inputValue = taskInp.value;


  if (inputValue === '') {
    alert("You must write something!");
  } else {
    addTaskToList(inputValue);
    saveTasks();
  }

 
  taskInp.value = "";
}


addBtn.addEventListener("click", handleAddTask);


taskInp.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    handleAddTask();
  }
});


loadTasks();