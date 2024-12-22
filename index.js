function createDiv() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  if (!title || !description) {
    alert("Please fill in both the title and description.");
    return; 
  }
  let div = document.createElement("div");
  div.setAttribute("draggable", "true");
  div.classList.add("task");

  let curDateAndTime = currentDate();
  let currentCondition = document.getElementById("type").value;

  div.innerHTML = `
    <div class="contentTitleDescAndDelte">
      <div><b>${title}</b><br>${description}</div>
      <div>
        <img class="delete" src="delete.png" alt="Delete">
      </div>
    </div>
    <div class='curCondAndDate'>
      <div class="condition">${currentCondition}</div>
      <div>
        <p class="date">${curDateAndTime}</p>
      </div>
    </div>
  `;

  let conditionDiv = div.querySelector(".condition");
  if (currentCondition.toLowerCase() === "low") {
    conditionDiv.style.backgroundColor = "green";
    conditionDiv.style.width = "35px";
  } else if (currentCondition.toLowerCase() === "medium") {
    conditionDiv.style.backgroundColor = "yellow";
    conditionDiv.style.width = "60px";
  } else {
    conditionDiv.style.backgroundColor = "red";
    conditionDiv.style.width = "55px";
  }

  const deleteButton = div.querySelector(".delete");
  deleteButton.addEventListener("click", function () {
    div.remove();
  });

  div.classList.add("content");
  addDiv(div);
}

function currentDate() {
  const now = new Date();
  return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}

function addDiv(div) {
  let value = document.getElementById("category").value;
  let toAdd = document.getElementById(value).querySelector(".contentBox");
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  toAdd.appendChild(div);

  div.addEventListener("dragstart", dragStart);
  div.addEventListener("dragend", dragEnd);
}

function start() {
  const addButton = document.getElementById("add");
  addButton.addEventListener("click", function () {
    createDiv();
  });

  const categoryBoxes = document.querySelectorAll(".category > div");
  categoryBoxes.forEach((box) => {
    box.addEventListener("dragover", allowDrop);
    box.addEventListener("drop", drop);
  });
}

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.innerHTML);
  event.target.style.opacity = "0.4";
  event.target.setAttribute("id", "dragging");
}

function dragEnd(event) {
  event.target.style.opacity = "1";
  event.target.removeAttribute("id");
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");

  let task = document.createElement("div");
  task.classList.add("content");
  task.innerHTML = data;
  task.setAttribute("draggable", "true");
  event.target.querySelector(".contentBox").appendChild(task);

  const originalTask = document.getElementById("dragging");
  if (originalTask) {
    originalTask.remove();
  }

  task.addEventListener("dragstart", dragStart);
  task.addEventListener("dragend", dragEnd);
}

start();
