import { allItems, saveData } from "./storage.js";

export function updateCounters() {

  let tasksCount = allItems.filter(item => item.type === "task" && !item.completed).length;
  let shoppingCount = allItems.filter(item => item.type === "forShopping" && !item.completed).length;

  document.getElementById('tasksLeft').innerText = tasksCount;
  document.getElementById('itemToBuy').innerText = shoppingCount;
}

export function renderItems() {
  let tasksList = document.getElementById('tasksList');
  let shoppingList = document.getElementById('shoppingList');

  tasksList.innerHTML = "";
  shoppingList.innerHTML = "";
  
  allItems.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="checkbox-item" ${item.completed ? "checked disabled" : ""}> 
      <span class="task-text" style="${item.completed ? 'text-decoration: line-through; color: #888;' : ''}">${item.text}</span> 
      <button class="deleteBtn">🗑️</button>
    `;

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