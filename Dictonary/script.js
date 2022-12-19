let root = document.querySelector(".root");

let dbversion = Number(localStorage.getItem("dbversion")) + 1

// const idb = window.indexedDB.open("tabassum_malumotlari", dbversion);




localStorage.setItem("dbversion", dbversion);

const createDictItem = (text) => {
  let row = document.createElement("div");
  row.setAttribute("class", "row py-2 window mt-2 mx-auto")
  let col = document.createElement("div");
  col.setAttribute("class", "col-7 text-truncate");
  let buttons = document.createElement("div");
  buttons.setAttribute("class", "p-0 col-4 d-flex justify-content-around");
  let delBtn = document.createElement("button");
  delBtn.setAttribute("class", "delete");
  let delIcon = document.createElement("i");
  delIcon.setAttribute("class", "fa-solid fa-trash");
  let editBtn = document.createElement("button");
  editBtn.setAttribute("class", "edit");
  let editIcon = document.createElement("i");
  editIcon.setAttribute("class", "fa-solid fa-pen-to-square");
  let input = document.createElement("input");
  input.setAttribute("class", "name-input");
  input.setAttribute("placeholder", "Lug'at nomi...");
  delBtn.append(delIcon);
  editBtn.append(editIcon);
  buttons.append(delBtn, editBtn);
  text ? col.innerHTML = text : col.append(input);
  row.append(col, buttons);
  root.append(row);
}

// idb.onsuccess = () => {
//   let res = idb.result;
//   let names = res.objectStoreNames
//   for (var i = 0; i < names.length; i++) {
//     name = names[i];
//     createDictItem(name)
//   }
// }

function eventSave() {
  document.body.addEventListener("click", () => {
    let name_input = document.querySelector('.name-input');
    if (name_input.value) {
      createDictItem(name_input.value);
      plus_btn.classList.remove("d-none");
      name_input.parentNode.parentNode.remove();
      p(1234);
    }
  });
}

function p(text) {
  let dbversion = Number(localStorage.getItem("dbversion")) + 1
  const idb = window.indexedDB.open("tabassum_malumotlari", dbversion);
  idb.onupgradeneeded = () => {
    let res = idb.result;
    res.createObjectStore(text, {
      autoIncrement: true
    });
  }
}


let plus_btn = document.querySelector(".plus-btn");

plus_btn.addEventListener("click", () => {
  createDictItem();
  plus_btn.classList.add("d-none");
  eventSave();
});



