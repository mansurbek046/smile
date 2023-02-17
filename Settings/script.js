let fonts = `Sans-Serif
Audiowide
BakbakOne
Creepster
DynaPuff
Kavoon
Pacifico
RubikGemstones
RubikVinyl
TwinkleStar
Aladin
AlmendraDisplay
AlmendraSC
Bonbon
EagleLake
Meddon
NextDoor
Orbitron
RussoOne
Sofia`.split("\n").sort();

const lang = JSON.parse(localStorage.getItem("__smile_language"));

const dropdown = document.querySelector(".dropdown-menu");
let option = "";
fonts.forEach((font) => {
  option += `<li class="dropdown-item text-truncate" id="${font}" onclick="setFontValue(this)" style="font-family: '${font}'!important">${font}</li>\n`;
  dropdown.innerHTML = option;
})

let def_config = {
  speaker: "male",
  language: "uz",
  font: "Sans-Serif",
};

let config = JSON.parse(localStorage.getItem("__smile_config"));
config = config == null ? def_config : config;

(function() {
  document.querySelectorAll("select").forEach((e) => {
    e.value = config[e.name]
  })
  localStorage.setItem("__smile_config", JSON.stringify(config));
})();

const input = document.querySelector('#background')
input.addEventListener("input", () => {
  var file = input.files[0]
  const fr = new FileReader();
  fr.readAsDataURL(file);
  fr.addEventListener("load", () => {
    const url = fr.result;
    localStorage.setItem("__smile_background", url);
    window.location.reload();
  })
})
document.querySelectorAll('select').forEach((select) => {
  select.addEventListener("change", () => {
    document.querySelectorAll('select').forEach((select) => {
      if (select.value != '') {
        config[select.name] = select.value;
        localStorage.setItem("__smile_config", JSON.stringify(config));
        setFont();
        setLang();
      }
    })
  })
})

const setFontValue = (li) => {
  document.querySelectorAll(".dropdown-menu .active").forEach((active) => active.classList.remove("active"));
  config["font"] = li.id;
  localStorage.setItem("__smile_config", JSON.stringify(config));
  li.classList.add("active");
  setFont();
}

document.querySelector('.share').addEventListener("click",()=>{
  if(window.navigator.share){
    window.navigator.share({
      text: lang[29],
      url: "https:smileuz.vercel.app"
    })
  }
})