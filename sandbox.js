//Setting up Database

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
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

searchButton.addEventListener("click", () => {
  const inputValues = inputField.value.trim();
  push(shoppingListInDB, inputValues);
  // console.log(`${inputValues} added to database`);

  // appedItemToShoppingList(inputValues);

  clearInputField();
});

onValue(shoppingListInDB, function (snapshot) {
  let itemsArray = Object.values(snapshot.val());

  shoppinglist.innerHTML = "";

  for (let i = 0; i < itemsArray.length; i++) {
    appedItemToShoppingList(itemsArray[i]);
  }
});

// callback functions
function clearInputField() {
  inputField.value = "";
}

function appedItemToShoppingList(itemValues) {
  shoppinglist.innerHTML += `<li>${itemValues}</li>`;
}
