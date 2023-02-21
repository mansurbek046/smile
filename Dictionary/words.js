let synth = window.speechSynthesis;
let root = document.querySelector(".root");
let plus_btn = document.querySelector(".plus-btn");
const lang = JSON.parse(localStorage.getItem("__smile_language"));
let limit = 30;
let writedCount = 0;
const more = () => {
  limit += 30;
  writedCount = 0;
  downWriter();
}
const createDictItem = (word, word2) => {
  if (writedCount < limit) {
    let row = document.createElement("div");
    row.setAttribute("class", "row py-1 window window-2");
    row.setAttribute("name", word);
    row.setAttribute("onclick", "dropDisable(this)");
    let col = document.createElement("div");
    col.setAttribute("class", "col-12");
    let col2 = document.createElement("div");
    col2.setAttribute("class", "col-7");
    let buttons = document.createElement("div");
    buttons.setAttribute("class", "p-0 col-5 mt-2 d-flex justify-content-around buttons");
    let delBtn = document.createElement("button");
    delBtn.setAttribute("class", "delete");
    delBtn.setAttribute("onclick", "del(this)");
    delBtn.setAttribute("disabled", "");
    let delIcon = document.createElement("i");
    delIcon.setAttribute("class", "fa-solid fa-trash");
    let editBtn = document.createElement("button");
    editBtn.setAttribute("class", "edit");
    editBtn.setAttribute("onclick", "edit(this)");
    editBtn.setAttribute("data-bs-toggle", "modal");
    editBtn.setAttribute("data-bs-target", "#addword");
    editBtn.setAttribute("disabled", "");
    let editIcon = document.createElement("i");
    editIcon.setAttribute("class", "fa-solid fa-pen-to-square");
    editBtn.append(editIcon);
    let speakBtn = document.createElement("button");
    speakBtn.setAttribute("class", "speak");
    speakBtn.setAttribute("onclick", "speak(this)");
    speakBtn.setAttribute("disabled", "");
    let speakIcon = document.createElement("i");
    speakIcon.setAttribute("class", "fa-solid fa-volume-up");
    speakBtn.append(speakIcon);
    let input = document.createElement("input");
    input.setAttribute("disabled", "");
    input.setAttribute("value", word);
    let input2 = document.createElement("input");
    input2.setAttribute("disabled", "");
    input2.setAttribute("value", word2);
    col.append(input);
    col2.append(input2);
    buttons.append(delBtn, editBtn, speakBtn);
    delBtn.append(delIcon);
    row.append(col, col2, buttons);
    root.append(row);
    writedCount += 1;
  }
}

let opened_dict_name = localStorage.getItem("__smile_dict_opened");
let opened_dict = JSON.parse(localStorage.getItem(`__smile_${opened_dict_name}_dict`));
const first_language = opened_dict.lang.first.split("/");
const second_language = opened_dict.lang.second.split("/");

getVoices();
window.setTimeout(function() {
  getVoices();
  window.setTimeout(function() {
      check_disable();
    },
    100);
}, 1000);
let voice = false;

function getVoices() {
  voices = synth.getVoices();
  voices.forEach((vc) => {
    if (vc.lang.split("_")[0] == first_language[1]) {
      voice = vc;
    }
  })
};

const check_disable = () => {
  if (!voice) {
    document.querySelectorAll(".speak").forEach((btn) => {
      btn.setAttribute("disabled", "");
      btn.style.opacity = 0.3;
    });
  }
}

const controller = () => {
  downWriter();
  search();
}

const plus = () => {
  const first_word = document.querySelector(".first-word");
  first_word.setAttribute("placeholder", first_language[0]);
  first_word.value = "";
  const second_word = document.querySelector(".second-word");
  second_word.setAttribute("placeholder",
    second_language[0]);
  second_word.value = "";
  upWriter();
};

const downWriter = (search) => {
  let word_count = 0;
  root.innerHTML = "";
  let names = opened_dict.dict;
  document.querySelector(".word-count").innerHTML = Object.entries(names).length;
  for (let word in names) {
    if (search) {
      writedCount = 0;
      if (word.toLowerCase().indexOf(search.toLowerCase()) != -1) {
        createDictItem(word, names[word]);
        document.querySelector(".word-count").innerHTML = word_count += 1;
      }
    } else {
      createDictItem(word, names[word]);
      document.querySelector(".word-count").innerHTML = word_count += 1;
    }
  }
  window.setTimeout(() => check_disable(), 1200);
}

let add_word_count=0;
const upWriter = (word, word2) => {
  let add_word_count = 0;
  let firstWord = document.querySelector(".first-word");
  let secondWord = document.querySelector(".second-word");
  if (word != undefined && word2 != undefined) {
    firstWord.value = word;
    secondWord.value = word2;
  }
  let addBtn = document.querySelector(".add");
  addBtn.addEventListener("click", (e) => {
    addWord();
  })
  let saveBtn = document.querySelector(".save");
  saveBtn.addEventListener("click", () => {
    document.querySelector(".all").innerHTML = 0;
    addWord();
  })
}

const addWord = () => {
  let firstWord = document.querySelector(".first-word");
  let secondWord = document.querySelector(".second-word");
  word = firstWord.value;
  word2 = secondWord.value;
  if (word != "" && word2 != "") {
    opened_dict.dict[word] = word2;
    localStorage.setItem(`__smile_${opened_dict_name}_dict`, JSON.stringify(opened_dict));
    document.querySelector(".all").innerHTML = (add_word_count += 1)
    firstWord.value = ""
    secondWord.value = ""
    writedCount = 0;
    downWriter();
  }
}

const del = (e) => {
  const word = e.parentNode.parentNode.getAttribute("name");
  const text = lang[10].replace("20230119smile", `"${word}"`)
  if (window.confirm(text)) {
    delete opened_dict.dict[word]
    localStorage.setItem(`__smile_${opened_dict_name}_dict`, JSON.stringify(opened_dict));
    writedCount = 0;
    downWriter();
  }
}

const edit = (e) => {
  let word = e.parentNode.parentNode.getAttribute("name");
  let word2 = opened_dict.dict[word];
  delete opened_dict.dict[word]
  localStorage.setItem(`__smile_${opened_dict_name}_dict`, JSON.stringify(opened_dict));
  upWriter(word, word2);
}

const search = () => {
  let search_input = document.querySelector(".search");
  search_input.placeholder = lang[9];
  search_input.addEventListener("input", () => {
    downWriter(search_input.value);
  })
}

controller();

const speak = (btn) => {
  let word = btn.parentNode.parentNode.getAttribute("name");
  btn.setAttribute("disabled", "");
  btn.style.opacity = 0.3;
  if (synth.speaking) {
    console.error('Already speaking ...')
    return;
  }
  let speakText = new SpeechSynthesisUtterance(word);
  speakText.onend = e => {
    btn.removeAttribute("disabled");
    btn.style.opacity = 1;
  }
  speakText.onerror = e => {
    console.error(e)
  }
  if (voice) {
    speakText.voice = voice;
    synth.speak(speakText);
  }
}

const dropDisable = (row) => {
  disable();
  row.querySelectorAll("button").forEach((btn) => {
    btn.removeAttribute("disabled");
  })
}

const disable = () => {
  root.querySelectorAll("button").forEach((btn) => {
    btn.setAttribute("disabled", "");
  })
}

let select = document.querySelector(".dict");
let names = Object.keys(localStorage).sort().reverse();
for (let name of names) {
  name = name.split("_").reverse();
  if (name[0] == "dict" && name[1] != opened_dict_name) {
    let option = document.createElement("option");
    option.setAttribute("value", name[1]);
    option.innerHTML = name[1];
    select.append(option);
  }
}

document.querySelector(".unite").addEventListener("click", () => {
  const target_dict = JSON.parse(localStorage.getItem(`__smile_${select.value}_dict`)).dict;

  if (Object.entries(target_dict)[0] != undefined) {
    opened_dict.dict = Object.assign(target_dict, opened_dict.dict);
    localStorage.setItem(`__smile_${opened_dict_name}_dict`, JSON.stringify(opened_dict));
    writedCount = 0;
    downWriter();
  }
})

let secondWord = document.querySelector(".second-word");
let firstWord = document.querySelector(".first-word");
firstWord.addEventListener("keypress", () => {
  secondWord.focus();
})

secondWord.addEventListener("keypress", () => {
  document.querySelector(".all").innerHTML = 0;
  firstWord.focus();
  addWord();
})


const closePage = () => {
  close(document);
  open("./index.html");
}