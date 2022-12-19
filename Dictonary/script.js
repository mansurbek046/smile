let root = document.querySelector(".root");
let type = 0;

let dbversion = Number(localStorage.getItem("dbversion"))+1

const idb = window.indexedDB.open("tabassum_malumotlari", dbversion);

localStorage.setItem("dbversion", dbversion);

const createDictItem = (text)=> {
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
  text ? col.innerHTML = text: col.append(input);
  row.append(col, buttons);
  root.append(row);

}

idb.onsuccess = ()=> {
  let res = idb.result;
  let names = res.objectStoreNames
  for (var i = 0; i < names.length; i++) {
    name = names[i];
    createDictItem(name)
  }
}


let plus_btn = document.querySelector(".plus-btn");

plus_btn.addEventListener("click", ()=> {
  createDictItem();
  plus_btn.classList.add("d-none");
  type = 1;
});


document.body.addEventListener("click", ()=> {
  if (document.querySelector(".name-input").value) {
    let dbversion = localStorage.getItem("dbversion");
    const db = window.indexedDB.open("tabassum_malumotlari", dbversion);
    db.onupgradeneeded = ()=> {
      let res = db.result;
      res.createObjectStore(document.querySelector(".name-input").value, {
        autoIncrement: true
      })
    }
    localStorage.setItem("dbversion", dbversion);
    createDictItem(document.querySelector(".name-input").value)
  }
});