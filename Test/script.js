//speechSynthesis
const synth = window.speechSynthesis;
//interface language
const lang = JSON.parse(localStorage.getItem("__smile_language"));
//page close
const closePage = () => {
  close(document);
  open("../index.html");
}
let input = document.querySelector(".answer-input");
input.focus();
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
let words;
//alert about no dictionary
if (select.value == "") {
  alert(`${lang[7]}`);
} else {
  opened_dict = JSON.parse(localStorage.getItem(`__smile_${select.value}_dict`))
  dict = opened_dict.dict;
  first_language = opened_dict.lang.first.split("/")[1];
  second_language = opened_dict.lang.second.split("/")[1];
  words = Object.entries(dict);
  if (words[0] == undefined) {
    const text = lang[6].replace("20230119smile", `"${select.value}"`)
    alert(text);
    input.setAttribute("disabled", "");
  }
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
let count = 0;
let note;
let side2;
let another_side;
let btn = document.querySelector(".question")
//reselect event
select.addEventListener("change", () => {
  opened_dict = JSON.parse(localStorage.getItem(`__smile_${select.value}_dict`));
  dict = opened_dict.dict;
  first_language = opened_dict.lang.first.split("/")[1];
  second_language = opened_dict.lang.second.split("/")[1];
  count = 0;
  words = Object.entries(dict);
  if (words[0] == undefined) {
    const text = lang[6].replace("20230119smile", `"${select.value}"`)
    alert(text);
    input.setAttribute("disabled", "");
  }
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

let notMemo = {};
let memo = [];
let word;
let plus_two_words;
//start test
const start = () => {
  if (memo.length === words.length) {
    memo = [];
    start();
  }
  //get random word object
  word = words[Math.round(Math.random() * (words.length - 1))];
  plus_two_words = word[0] + word[1];
  if (memo.indexOf(plus_two_words) != -1) {
    start();
  } else {
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
    //note for know word
    note = word;
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
        let lessMark = JSON.stringify(another_side.toLowerCase().split(", ")) == JSON.stringify(input.value.toLowerCase().split(" "));
        if (input.value.toLowerCase() === another_side.toLowerCase() || lessMark) {
          //It was write for test
          //speaktest(input.value);
          input.value = "";
          recognition.stop();
          memo.push(plus_two_words);
          count += 1;
          document.querySelector(".word-count").innerHTML = count;
          start();
        }
      })
  }
}
//know word
btn.addEventListener("click", () => {
  let word = note[0];
  let word2 = note[1];
  notMemo[word] = word2;
  localStorage.setItem("__smile_notMemo_dict", JSON.stringify({
    lang: {
      first: "_/_",
      second: "_/_"
    },
    dict: notMemo
  }));
  alert(`\n\n\t${word} - ${word2}\n\n`);
});
//first start
start();