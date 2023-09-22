//Setting up Database

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const appSettings = {
  databaseURL: "https://play-ground-18864-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

// Making the input and button function

const inputField = document.querySelector(".input-field");
const searchButton = document.querySelector(".add-button");
const shoppinglist = document.querySelector(".shopping-lists");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputValues = inputField.value.trim();
  if (inputValues.length) {
    push(shoppingListInDB, inputValues);
  }
  clearInputField();
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    const itemsArray = Object.entries(snapshot.val());

    clearShoppingList();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];

      let currentItemId = currentItem[0];
      let currentItemValue = currentItem[1];

      appedItemToShoppingList(currentItem);
    }
  } else {
    shoppinglist.innerHTML =
      "sorry no items here.... yet, click the red button above to add item";
  }
});

function clearShoppingList() {
  shoppinglist.innerHTML = "";
}
// callback functionss
function clearInputField() {
  inputField.value = "";
}

function appedItemToShoppingList(item) {
  // shoppinglist.innerHTML += `<li>${itemValues}</li>`;

  let itemId = item[0];
  let itemValues = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValues;

  newEl.addEventListener("click", () => {
    let exactItemInDb = ref(database, `shoppingList/${itemId}`);

    remove(exactItemInDb);
  });

  shoppinglist.append(newEl);
}
