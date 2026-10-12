let textInput = document.getElementById('textInput');
let typeSelect = document.getElementById('typeSelect')
let addButton = document.getElementById('addButton');

let tasksList = document.getElementById('tasksList');
let shoppingList = document.getElementById('shoppingList');

let tasksLeft = document.getElementById('tasksLeft');
let itemToBuy = document.getElementById('itemToBuy');

let allItems = JSON.parse(localStorage.getItem("myAppData")) || [];

function saveData() {
  localStorage.setItem("myAppData", JSON.stringify(allItems));
  updateCounters();
}

function updateCounters() {
  let tasksCount = allItems.filter(item => item.type === "task" && !item.completed).length;
  let shoppingCount = allItems.filter(item => item.type === "forShopping" && !item.completed).length;
  tasksLeft.innerText = tasksCount;
  itemToBuy.innerText = shoppingCount;
}

function renderItems() {
  tasksList.innerHTML = "";
  shoppingList.innerHTML = "";
  
  allItems.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" ${item.completed ? "checked" : ""}> <span class="task-text" style="${item.completed ? 'text-decoration: line-through; color: #888;' : ''}">${item.text}</span> <button class="deleteBtn">🗑️</button>`;

    let deleteBtn = li.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
      allItems.splice(index, 1);
      saveData();
      renderItems();
    });

    let checkbox = li.querySelector('input[type = "checkbox"]');
    let taskText = li.querySelector(".task-text");
      checkbox.addEventListener("change", () => {
        item.completed = checkbox.checked;
        saveData();
        renderItems();
        if(checkbox.checked) {

          confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 } 
          });

          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 } 
          });
        }

    });

    if (item.type === "task") {
      tasksList.appendChild(li);
    } else {
      shoppingList.appendChild(li);
    }

  });

    updateCounters(); 
}


function addItem () {
  let text = textInput.value;
  let type = typeSelect.value;
  if (text.trim() === "") return;

  allItems.push({
    text: text,
    type: type,
    completed: false
  });
  saveData();
  renderItems();
  textInput.value = "";
}
addButton.addEventListener('click', addItem);
textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addItem();
  }
});

let themeToggleBtn = document.getElementById('themeToggleBtn');

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('pink-mode');
  
  if (document.body.classList.contains('pink-mode')) {
    themeToggleBtn.innerText = "blue mode💙";
  } else {
    themeToggleBtn.innerText = "pink mode🎀";
  }
});

renderItems();



