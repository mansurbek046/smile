//Init SpeechSynth API
let synth = window.speechSynthesis;

//DOM Elements
let textInput = document.querySelector('#textInput');
let voiceSelect = document.querySelector('#voiceSelect');
let button = document.querySelector('#speak');


//Init Voices array
let voices = [];

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//Speak
let speak = () => {
  if (synth.speaking) {
    console.error('Already speaking ...')
    return;
  }
  if (textInput.value != '') {
    let speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = e => {
      button.removeAttribute("disabled");
      button.style.backgroundColor = "white";
      button.style.color = "black";
    }
    speakText.onerror = e => {
      console.error(e)
    }
    let selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });
    speakText.rate = document.querySelector("#rate").value;
    speakText.pitch = document.querySelector("#pitch").value;
    synth.speak(speakText);
  }
}

let rate = document.querySelector("#rate")
rate.addEventListener("input", ()=> {
  document.querySelector("#rate-view").innerHTML = rate.value;
})
let pitch = document.querySelector("#pitch")
pitch.addEventListener("input", ()=> {
  document.querySelector("#pitch-view").innerHTML = pitch.value;
})


button.addEventListener('click', e => {
  speak();
  textInput.blur();
  button.setAttribute("disabled", "");
  button.style.background = "none";
  button.style.color = "white";
});

voiceSelect.addEventListener('change', e => speak());

function getVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach(voice => {
    let option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute('data-name', voice.name);
    option.setAttribute('data-lang', voice.lang);
    voiceSelect.appendChild(option);
  })
  voiceSelect.selectedIndex = 0;
}


const closePage = ()=> {
  close(document);
}
