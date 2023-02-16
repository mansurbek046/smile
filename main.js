const url = localStorage.getItem("__smile_background");
const body = document.querySelector("body")
if (url != null) {
  body.style.backgroundImage = `url(${url})`;
}

const setFont = () => {
  let font = JSON.parse(localStorage.getItem("__smile_config"));
  font = font != null ? font.font: "Sans-Serif";
  document.querySelectorAll("*").forEach((tag) => {
    if (tag.tagName != "I" && tag.tagName != "LI") {
      tag.style.fontFamily = `'${font}'`;
    }
  })
}
setFont();

//for multiple languages

const interface_lang = {
  uz: ["Sinov", "Lug\'atlar", "Tarjima", "Talaffuz", "Gramatika", "Sozlamalar", "20230119smile lug'atida so\'zlar topilmadi.", "Hech qanday lug'at topilmadi!\nLug\'at yaratish uchun, Bosh menyuga qayting va \"Lug\'atlar\" bo\'limiga o\'ting.", "Lug\'at o\'chirilmoqda!", "Qidirish...", "20230119smile so\'zi o\'chirilmoqda!", "Nusxa olindi", "Ovoz balansi", "Ovoz tezligi", "Tinglash", "Yopish", "So\'zlashuvchi", "Erkak", "Ayol", "Til", "Orqa fon", "Yuklash", "Font", "Tanlash", "Tarmoqqa ulanilmadi!", "Lug'at nomi...", "Birinchi til", "Ikkinchi til"],
  en: ["Test", "Dictionaries", "Translate", "Pronounce", "Grammar", "Settings", "No words found in dictionary 20230119smile.", "No dictionary found!\nTo create a dictionary, go back to the Main Menu and go to the \"Dictionaries\" section. ", "Deleting the dictionary!", "Search...", "Deleting the word 20230119smile!", "Copied", "Sound balance", "Sound speed", "Listen", "Close", "Speaker", "Male", "Female", "Language", "Background", "Upload", "Font", "Choose", "No network connection!", "Name of dictionary...", "First language", "Second language"]
}

const setLang = () => {
  const config = JSON.parse(localStorage.getItem("__smile_config"));
  const lang = config != null ? config.language: "uz";
  const id18 = document.getElementById("18");
  const id19 = document.getElementById("19");
  id18 ? id18.innerHTML = interface_lang[lang][17]: null;
  id19 ? id19.innerHTML = interface_lang[lang][18]: null;
  const items = document.querySelectorAll("item");
  localStorage.setItem("__smile_language",
    JSON.stringify(interface_lang[lang]));
  items.forEach((item) => {
    item.innerHTML = interface_lang[lang][item.id - 1];
  })
}
setLang();