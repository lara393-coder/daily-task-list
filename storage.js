export let allItems = JSON.parse(localStorage.getItem("myAppData")) || [];

export function saveData() {
  localStorage.setItem("myAppData", JSON.stringify(allItems));
}

