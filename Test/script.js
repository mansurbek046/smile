//speechSynthesis
const synth = window.speechSynthesis;

//interface language
const lang = JSON.parse(localStorage.getItem("__smile_language"));

//page close
const closePage = () => {
  close(document);
  open("../index.html");
}

//dictionaries
let select = document.getElementById("select-dict");
let names = Object.keys(localStorage).sort().reverse();
for (let name of names) {
  name = name.split("_").reverse();
  if (name[0] == "dict") {
    let option = document.createElement("option");
    option.setAttribute("value", name[1]);
    option.innerHTML = name[1];
    select.append(option);
  }
}

//speech controll btns
const speakBtn = document.getElementById("speaking");
const listenBtn = document.getElementById("listening");
let listen = false;
let speak = false;

let opened_dict;
let dict;
let first_language;
let second_language;


//alert about no dictionary
if (select.value == "") {
  document.querySelector(".root").innerHTML = `
  <div class="alert alert-info col-11 mx-auto mt-5 weight-normal">
  ${lang[7]}
  </div>
  `
}else{
  opened_dict = JSON.parse(localStorage.getItem(`__smile_${select.value}_dict`))
  dict = opened_dict.dict;
  first_language = opened_dict.lang.first.split("/")[1];
  second_language = opened_dict.lang.second.split("/")[1];
}

let choosed_language;

//speak voices
getVoices();
window.setTimeout(function() {
  getVoices();
}, 1000);
var voices = [];
let voice = false;

function getVoices() {
  voices = synth.getVoices();
};

//check language
const checkLang = () => {
  voices.forEach((vc) => {
    if (vc.lang.split("_")[0] == choosed_language) {
      voice = vc;
    }
  })
}

//listen
listenBtn.addEventListener("click", () => {
  if (window.navigator.onLine) {
    if (listen) {
      listenBtn.classList.remove("on");
      listen = false;
      start();
    } else {
      listen = true;
      listenBtn.classList.add("on");
      start();
    }
  } else {
    alert(lang[24])
  }
})

//speak
const speak_word = (word) => {
  if (synth.speaking) {
    console.error('Already speaking ...')
    return;
  }
  let speakText = new SpeechSynthesisUtterance(word);
  speakText.onend = e => {}
  speakText.onerror = e => {
    console.error(e)
  }
  if (voice) {
    speakText.voice = voice;
    synth.speak(speakText);
    voice = false;
  }
}

//It was write for speaktest
const speaktest = (word) => {
  if (synth.speaking) {
    console.error('Already speaking ...')
    return;
  }
  let speakText = new SpeechSynthesisUtterance(word);
  speakText.onend = e => {}
  speakText.onerror = e => {
    console.error(e)
  }
  synth.speak(speakText);
}

speakBtn.addEventListener("click", () => {
  if (!speak) {
    speakBtn.classList.add("on");
    speak = true;
  } else {
    speakBtn.classList.remove("on");
    speak = false;
  }
})

//test containers
let count = -1;
let note;
let side2;
let another_side;
let btn = document.querySelector(".question")

//reselect event
select.addEventListener("input", () => {
  let alertbox = document.querySelector(".alert");
  alertbox ? alertbox.remove() : null;
  opened_dict = JSON.parse(localStorage.getItem(`__smile_${select.value}_dict`));
  dict = opened_dict.dict;
  first_language = opened_dict.lang.first.split("/")[1];
  second_language = opened_dict.lang.second.split("/")[1];
  count = -1;
  start();
})

//check sides
let leftside = true;
let rightside = true;
const left = (btn) => {
  if (leftside) {
    leftside = false;
    btn.classList.remove("on");
  } else {
    leftside = true;
    btn.classList.add("on");
  }
}
const right = (btn) => {
  if (rightside) {
    rightside = false;
    btn.classList.remove("on");
  } else {
    rightside = true;
    btn.classList.add("on");
  }
}

//stsrt test
const start = () => {
  //counter
  count += 1;
  document.querySelector(".word-count").innerHTML = count;

  //get words
  let words = Object.entries(dict);

  //alert about no words
  if (words[0] == undefined) {
    const text = lang[6].replace("20230119smile", `"${select.value}"`)
    let div = document.createElement("div");
    div.setAttribute("class", "alert alert-info col-11 mx-auto mt-5 weight-normal");
    div.innerHTML = text;
    document.querySelector(".root").prepend(div);
    input.setAttribute("disabled");
  }

  //get random word object
  let word = words[Math.round(Math.random() * (words.length - 1))];

  let p = document.querySelector(".word");

  let side = 0;
  if (leftside && !rightside) {
    side = 0;
  } else if (!leftside && rightside) {
    side = 1;
  } else {
    side = Math.round(Math.random() * 1);
  }


  //controll sides
  if (side == 0) {
    choosed_language = first_language;
    checkLang();
    side2 = 1;
  } else {
    choosed_language = second_language;
    checkLang();
    side2 = 0;
  }

  //word-view
  p.innerHTML = word[side];

  //speak word
  if (speak) {
    speak_word(word[side]);
  }

  //change word-view color
  p.style.backgroundColor = "white";
  let input = document.querySelector(".answer-input");

  //note for know word
  note = `\n\n\t${word[side]} - ${word[side2]}\n\n`;

  another_side = word[side2];

  //listen answer word
  window.SpeechRecognition = window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  //listened answer word check
  recognition.addEventListener("result", e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript);
    c
    if (transcript == word[side2].toLowerCase()) {
      input.value = "";
      start();
    }
  })

  if (listen) {
    recognition.start();
  } else {
    recognition.stop();
  }

  //get answer word and check
  input.removeAttribute("disabled");
  input.addEventListener("input",
    () => {
      let lessMark = JSON.stringify(another_side.split(", ")) == JSON.stringify(input.value.split(" "));
      if (input.value.toLowerCase() === another_side.toLowerCase() || lessMark) {
        //It was write for test
        speaktest(input.value);

        input.value = "";
        recognition.stop();
        start();
      }
    })
}

//know word
btn.addEventListener("click", () => {
  alert(note);
});

//first start
start();