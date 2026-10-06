let textInput = document.getElementById('textInput');
let typeSelect = document.getElementById('typeSelect')
let addButton = document.getElementById('addButton');

let tasksList = document.getElementById('tasksList');
let shoppingList = document.getElementById('shoppingList');

let tasksLeft = document.getElementById('tasksLeft');
let itemToBuy = document.getElementById('itemToBuy');

function updateCounters() {
  tasksLeft.innerText = tasksList.children.length;
  itemToBuy.innerText = shoppingList.children.length;
}
function addItem () {
  let text = textInput.value;
  let type = typeSelect.value;
  if (text.trim() === "") return;

  let li = document.createElement("li");
  li.innerHTML = `<input type="checkbox"> <span class="task-text">${text}</span> <button class="deleteBtn">🗑️</button>`;

  let deleteBtn = li.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateCounters();
  })

  let checkbox = li.querySelector('input[type = "checkbox"]');
  let taskText = li.querySelector(".task-text");
  checkbox.addEventListener("change", () => {
    if(checkbox.checked) {
      taskText.style.textDecoration = "line-through";
      taskText.style.color = "#888";
      checkbox.disabled = true;
      confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 } // الانطلاق من اليسار
      });

      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 } // الانطلاق من اليمين
      });
    }

  });

  if (type === "task") {
    tasksList.appendChild(li);
  } else {
    shoppingList.appendChild(li);
  }
  updateCounters();
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
