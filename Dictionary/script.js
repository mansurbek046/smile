const root = document.querySelector(".root");
const plus_btn = document.querySelector(".plus-btn");
const lang = JSON.parse(localStorage.getItem("__smile_language"));
document.querySelector(".dict_name").setAttribute("placeholder", lang[25]);

const createDictItem = (text) => {
  let row = document.createElement("div");
  row.setAttribute("class", "row py-2 window mt-3 mx-auto")
  let col = document.createElement("div");
  col.setAttribute("class", "col-8 text-truncate");
  col.setAttribute("onclick", "seewords(this)");
  let buttons = document.createElement("div");
  buttons.setAttribute("class", "p-0 col-4 d-flex justify-content-around");
  let delBtn = document.createElement("button");
  delBtn.setAttribute("class", "delete");
  let delIcon = document.createElement("i");
  delIcon.setAttribute("class", "fa-solid fa-trash");
  let editBtn = document.createElement("button");
  editBtn.setAttribute("class", "edit");
  editBtn.setAttribute("onclick", "edit(this)");
  editBtn.setAttribute("data-bs-toggle", "modal");
  editBtn.setAttribute("data-bs-target", "#add_dict");
  let editIcon = document.createElement("i");
  editIcon.setAttribute("class", "fa-solid fa-pen-to-square");
  editBtn.append(editIcon);
  col.innerHTML = text;
  delBtn.setAttribute("onclick", "del(this)");
  buttons.append(delBtn, editBtn);
  delBtn.append(delIcon);
  row.append(col, buttons);
  root.prepend(row);
}

let dict = {};
let dict_name = "";

const downWriter = ()=> {
  root.innerHTML = "";
  let names = Object.keys(localStorage).sort().reverse();
  for (let name of names) {
    name = name.split("_").reverse();
    if (name[0] == "dict") {
      createDictItem(name[1], "");
    }
  }
}

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", ()=> {
  save();
})


const save = ()=> {
  const first_language = document.querySelector("#first-language");
  const second_language = document.querySelector("#second-language");
  let input = document.querySelector(".dict_name");
  let value = input.value;
  if (value != "" && first_language.value != "" && second_language.value != "" && value!="notMemo") {
    dict["lang"] = {
      first: first_language.value,
      second: second_language.value
    };
    if (dict_name != "") {
      localStorage.removeItem(`__smile_${dict_name}_dict`);
    } else {
      dict["dict"] = {};
    }
    localStorage.setItem(`__smile_${value}_dict`, JSON.stringify(dict));
    downWriter();
    input.value = "";
  }
  dict_name = "";
  dict = {};
}


const del = (e)=> {
  if (window.confirm(lang[8])) {
    let name = e.parentNode.parentNode.textContent;
    localStorage.removeItem(`__smile_${name}_dict`);
    downWriter();
  }
}

const edit = (e)=> {
  let first_language = document.querySelector("#first-language");
  let second_language = document.querySelector("#second-language");
  dict_name = e.parentNode.parentNode.textContent;
  dict = JSON.parse(localStorage.getItem(`__smile_${dict_name}_dict`));
  let input = document.querySelector(".dict_name");
  input.value = dict_name;
  first_language.value = dict.lang.first;
  second_language.value = dict.lang.second;
}

const seewords = (e)=> {
  localStorage.setItem("__smile_dict_opened", e.textContent);
  close(document);
  open("./words.html");
}

const languages = [{
  "name": "Afrikaans",
  "code": "af"
}, {
  "name": "Albanian",
  "code": "sq"
}, {
  "name": "Amharic",
  "code": "am"
}, {
  "name": "Arabic",
  "code": "ar"
}, {
  "name": "Armenian",
  "code": "hy"
}, {
  "name": "Assamese",
  "code": "as"
}, {
  "name": "Aymara",
  "code": "ay"
}, {
  "name": "Azerbaijani",
  "code": "az"
}, {
  "name": "Bambara",
  "code": "bm"
}, {
  "name": "Basque",
  "code": "eu"
}, {
  "name": "Belarusian",
  "code": "be"
}, {
  "name": "Bengali",
  "code": "bn"
}, {
  "name": "Bhojpuri",
  "code": "bho"
}, {
  "name": "Bosnian",
  "code": "bs"
}, {
  "name": "Bulgarian",
  "code": "bg"
}, {
  "name": "Catalan",
  "code": "ca"
}, {
  "name": "Cebuano",
  "code": "ceb"
}, {
  "name": "Chichewa",
  "code": "ny"
},
  {
    "name": "Chinese",
    "code": "zh"
  }, {
    "name": "Corsican",
    "code": "co"
  }, {
    "name": "Croatian",
    "code": "hr"
  }, {
    "name": "Czech",
    "code": "cs"
  }, {
    "name": "Danish",
    "code": "da"
  }, {
    "name": "Dhivehi",
    "code": "dv"
  }, {
    "name": "Dogri",
    "code": "doi"
  }, {
    "name": "Dutch",
    "code": "nl"
  }, {
    "name": "English",
    "code": "en"
  }, {
    "name": "Esperanto",
    "code": "eo"
  }, {
    "name": "Estonian",
    "code": "et"
  }, {
    "name": "Ewe",
    "code": "ee"
  }, {
    "name": "Filipino",
    "code": "tl"
  }, {
    "name": "Finnish",
    "code": "fi"
  }, {
    "name": "French",
    "code": "fr"
  }, {
    "name": "Frisian",
    "code": "fy"
  }, {
    "name": "Galician",
    "code": "gl"
  }, {
    "name": "Georgian",
    "code": "ka"
  }, {
    "name": "German",
    "code": "de"
  }, {
    "name": "Greek",
    "code": "el"
  }, {
    "name": "Guarani",
    "code": "gn"
  }, {
    "name": "Gujarati",
    "code": "gu"
  }, {
    "name": "Haitian Creole",
    "code": "ht"
  }, {
    "name": "Hausa",
    "code": "ha"
  }, {
    "name": "Hawaiian",
    "code": "haw"
  }, {
    "name": "Hebrew",
    "code": "iw"
  }, {
    "name": "Hindi",
    "code": "hi"
  }, {
    "name": "Hmong",
    "code": "hmn"
  }, {
    "name": "Hungarian",
    "code": "hu"
  }, {
    "name": "Icelandic",
    "code": "is"
  }, {
    "name": "Igbo",
    "code": "ig"
  }, {
    "name": "Ilocano",
    "code": "ilo"
  }, {
    "name": "Indonesian",
    "code": "id"
  }, {
    "name": "Irish",
    "code": "ga"
  }, {
    "name": "Italian",
    "code": "it"
  }, {
    "name": "Japanese",
    "code": "ja"
  }, {
    "name": "Javanese",
    "code": "jw"
  }, {
    "name": "Kannada",
    "code": "kn"
  }, {
    "name": "Kazakh",
    "code": "kk"
  }, {
    "name": "Khmer",
    "code": "km"
  }, {
    "name": "Kinyarwanda",
    "code": "rw"
  }, {
    "name": "Konkani",
    "code": "gom"
  }, {
    "name": "Korean",
    "code": "ko"
  }, {
    "name": "Krio",
    "code": "kri"
  }, {
    "name": "Kurdish (Kurmanji)",
    "code": "ku"
  }, {
    "name": "Kurdish (Sorani)",
    "code": "ckb"
  }, {
    "name": "Kyrgyz",
    "code": "ky"
  }, {
    "name": "Lao",
    "code": "lo"
  }, {
    "name": "Latin",
    "code": "la"
  }, {
    "name": "Latvian",
    "code": "lv"
  }, {
    "name": "Lingala",
    "code": "ln"
  }, {
    "name": "Lithuanian",
    "code": "lt"
  }, {
    "name": "Luganda",
    "code": "lg"
  }, {
    "name": "Luxembourgish",
    "code": "lb"
  }, {
    "name": "Macedonian",
    "code": "mk"
  }, {
    "name": "Maithili",
    "code": "mai"
  }, {
    "name": "Malagasy",
    "code": "mg"
  }, {
    "name": "Malay",
    "code": "ms"
  }, {
    "name": "Malayalam",
    "code": "ml"
  }, {
    "name": "Maltese",
    "code": "mt"
  }, {
    "name": "Maori",
    "code": "mi"
  }, {
    "name": "Marathi",
    "code": "mr"
  }, {
    "name": "Meiteilon",
    "code": "mni"
  }, {
    "name": "Mizo",
    "code": "lus"
  }, {
    "name": "Mongolian",
    "code": "mn"
  }, {
    "name": "Myanmar (Burmese)",
    "code": "my"
  }, {
    "name": "Nepali",
    "code": "ne"
  }, {
    "name": "Norwegian",
    "code": "no"
  }, {
    "name": "Odia (Oriya)",
    "code": "or"
  }, {
    "name": "Oromo",
    "code": "om"
  }, {
    "name": "Pashto",
    "code": "ps"
  }, {
    "name": "Persian",
    "code": "fa"
  }, {
    "name": "Polish",
    "code": "pl"
  }, {
    "name": "Portuguese",
    "code": "pt"
  }, {
    "name": "Punjabi",
    "code": "pa"
  }, {
    "name": "Quechua",
    "code": "qu"
  }, {
    "name": "Romanian",
    "code": "ro"
  }, {
    "name": "Russian",
    "code": "ru"
  }, {
    "name": "Samoan",
    "code": "sm"
  }, {
    "name": "Sanskrit",
    "code": "sa"
  }, {
    "name": "Scots Gaelic",
    "code": "gd"
  }, {
    "name": "Sepedi",
    "code": "nso"
  }, {
    "name": "Serbian",
    "code": "sr"
  }, {
    "name": "Sesotho",
    "code": "st"
  }, {
    "name": "Shona",
    "code": "sn"
  }, {
    "name": "Sindhi",
    "code": "sd"
  }, {
    "name": "Sinhala",
    "code": "si"
  }, {
    "name": "Slovak",
    "code": "sk"
  }, {
    "name": "Slovenian",
    "code": "sl"
  }, {
    "name": "Somali",
    "code": "so"
  }, {
    "name": "Spanish",
    "code": "es"
  }, {
    "name": "Sundanese",
    "code": "su"
  }, {
    "name": "Swahili",
    "code": "sw"
  }, {
    "name": "Swedish",
    "code": "sv"
  }, {
    "name": "Tajik",
    "code": "tg"
  }, {
    "name": "Tamil",
    "code": "ta"
  }, {
    "name": "Tatar",
    "code": "tt"
  }, {
    "name": "Telugu",
    "code": "te"
  }, {
    "name": "Thai",
    "code": "th"
  }, {
    "name": "Tigrinya",
    "code": "ti"
  }, {
    "name": "Tsonga",
    "code": "ts"
  }, {
    "name": "Turkish",
    "code": "tr"
  }, {
    "name": "Turkmen",
    "code": "tk"
  }, {
    "name": "Twi",
    "code": "ak"
  }, {
    "name": "Ukrainian",
    "code": "uk"
  }, {
    "name": "Urdu",
    "code": "ur"
  }, {
    "name": "Uyghur",
    "code": "ug"
  }, {
    "name": "Uzbek",
    "code": "uz"
  }, {
    "name": "Vietnamese",
    "code": "vi"
  }, {
    "name": "Welsh",
    "code": "cy"
  }, {
    "name": "Xhosa",
    "code": "xh"
  }, {
    "name": "Yiddish",
    "code": "yi"
  }, {
    "name": "Yoruba",
    "code": "yo"
  }, {
    "name": "Zulu",
    "code": "zu"
  }]
document.querySelectorAll(".name-select").forEach((select)=> {
  languages.forEach((lt) => {
    let option = document.createElement('option');
    option.textContent = `${lt.name}`;
    option.setAttribute('value', lt.name+"/"+lt.code);
    select.append(option);
  })
})
downWriter();
const closePage = () => {
  close(document);
  open("../index.html");
}