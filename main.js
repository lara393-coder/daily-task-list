import { allItems, saveData } from "./storage.js";
import { updateCounters, renderItems } from "./ui.js";

let textInput = document.getElementById('textInput');
let typeSelect = document.getElementById('typeSelect')
let addButton = document.getElementById('addButton');

let tasksList = document.getElementById('tasksList');
let shoppingList = document.getElementById('shoppingList');

let tasksLeft = document.getElementById('tasksLeft');
let itemToBuy = document.getElementById('itemToBuy');

let themeToggleBtn = document.getElementById('themeToggleBtn');



let savedTheme = localStorage.getItem("myAppTheme");
if (savedTheme === "pink") {
  document.body.classList.add('pink-mode');
  themeToggleBtn.innerText = "blue mode💙";
}
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('pink-mode');
  
  if (document.body.classList.contains('pink-mode')) {
    themeToggleBtn.innerText = "blue mode💙";
    localStorage.setItem("myAppTheme", "pink");
  } else {
    themeToggleBtn.innerText = "pink mode🎀";
    localStorage.setItem("myAppTheme", "blue");
  }
});


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


renderItems();
updateCounters();



