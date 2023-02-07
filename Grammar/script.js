let loader = document.querySelector(".loader");
let textbox = document.querySelector(".window .checked_txt");
let textarea = document.querySelector(".window textarea");
let ibtn = document.querySelector(".check div i");
let show_rule_box = document.querySelector(".show_rule");

let old_text = localStorage.getItem("__smile_grammar_old_text");

textarea.innerHTML = old_text ? old_text: "";
textarea.addEventListener("input", ()=> {
  localStorage.setItem("__smile_grammar_old_text", textarea.value);
});


const languages = [{
  "name": "Arabic",
  "code": "ar",
  "longCode": "ar"
}, {
  "name": "English",
  "code": "en",
  "longCode": "en"
}, {
  "name": "English (US)",
  "code": "en",
  "longCode": "en-US"
}, {
  "name": "English (GB)",
  "code": "en",
  "longCode": "en-GB"
}, {
  "name": "English (Australian)",
  "code": "en",
  "longCode": "en-AU"
}, {
  "name": "English (Canadian)",
  "code": "en",
  "longCode": "en-CA"
}, {
  "name": "English (New Zealand)",
  "code": "en",
  "longCode": "en-NZ"
}, {
  "name": "English (South African)",
  "code": "en",
  "longCode": "en-ZA"
}, {
  "name": "Persian",
  "code": "fa",
  "longCode": "fa"
}, {
  "name": "French",
  "code": "fr",
  "longCode": "fr"
}, {
  "name": "German",
  "code": "de",
  "longCode": "de"
}, {
  "name": "German (Germany)",
  "code": "de",
  "longCode": "de-DE"
}, {
  "name": "German (Austria)",
  "code": "de",
  "longCode": "de-AT"
}, {
  "name": "German (Swiss)",
  "code": "de",
  "longCode": "de-CH"
}, {
  "name": "Simple German",
  "code": "de-DE-x-simple-language",
  "longCode": "de-DE-x-simple-language"
}, {
  "name": "Polish",
  "code": "pl",
  "longCode": "pl-PL"
}, {
  "name": "Catalan",
  "code": "ca",
  "longCode": "ca-ES"
}, {
  "name": "Catalan (Valencian)",
  "code": "ca",
  "longCode": "ca-ES-valencia"
}, {
  "name": "Italian",
  "code": "it",
  "longCode": "it"
}, {
  "name": "Breton",
  "code": "br",
  "longCode": "br-FR"
}, {
  "name": "Dutch",
  "code": "nl",
  "longCode": "nl"
}, {
  "name": "Dutch (Belgium)",
  "code": "nl",
  "longCode": "nl-BE"
}, {
  "name": "Portuguese",
  "code": "pt",
  "longCode": "pt"
}, {
  "name": "Portuguese (Portugal)",
  "code": "pt",
  "longCode": "pt-PT"
}, {
  "name": "Portuguese (Brazil)",
  "code": "pt",
  "longCode": "pt-BR"
}, {
  "name": "Portuguese (Angola preAO)",
  "code": "pt",
  "longCode": "pt-AO"
}, {
  "name": "Portuguese (Moçambique preAO)",
  "code": "pt",
  "longCode": "pt-MZ"
}, {
  "name": "Russian",
  "code": "ru",
  "longCode": "ru-RU"
}, {
  "name": "Asturian",
  "code": "ast",
  "longCode": "ast-ES"
}, {
  "name": "Belarusian",
  "code": "be",
  "longCode": "be-BY"
}, {
  "name": "Chinese",
  "code": "zh",
  "longCode": "zh-CN"
}, {
  "name": "Danish",
  "code": "da",
  "longCode": "da-DK"
}, {
  "name": "Esperanto",
  "code": "eo",
  "longCode": "eo"
}, {
  "name": "Irish",
  "code": "ga",
  "longCode": "ga-IE"
}, {
  "name": "Galician",
  "code": "gl",
  "longCode": "gl-ES"
}, {
  "name": "Greek",
  "code": "el",
  "longCode": "el-GR"
}, {
  "name": "Japanese",
  "code": "ja",
  "longCode": "ja-JP"
}, {
  "name": "Khmer",
  "code": "km",
  "longCode": "km-KH"
}, {
  "name": "Romanian",
  "code": "ro",
  "longCode": "ro-RO"
}, {
  "name": "Slovak",
  "code": "sk",
  "longCode": "sk-SK"
}, {
  "name": "Slovenian",
  "code": "sl",
  "longCode": "sl-SI"
}, {
  "name": "Spanish",
  "code": "es",
  "longCode": "es"
}, {
  "name": "Spanish (voseo)",
  "code": "es",
  "longCode": "es-AR"
}, {
  "name": "Swedish",
  "code": "sv",
  "longCode": "sv"
}, {
  "name": "Tamil",
  "code": "ta",
  "longCode": "ta-IN"
}, {
  "name": "Tagalog",
  "code": "tl",
  "longCode": "tl-PH"
}, {
  "name": "Ukrainian",
  "code": "uk",
  "longCode": "uk-UA"
}, {
  "name": "French",
  "code": "fr",
  "longCode": "fr"
}, {
  "name": "English",
  "code": "en",
  "longCode": "en"
}, {
  "name": "English (US)",
  "code": "en",
  "longCode": "en-US"
}, {
  "name": "English (Australian)",
  "code": "en",
  "longCode": "en-AU"
}, {
  "name": "English (GB)",
  "code": "en",
  "longCode": "en-GB"
}, {
  "name": "English (Canadian)",
  "code": "en",
  "longCode": "en-CA"
}, {
  "name": "English (New Zealand)",
  "code": "en",
  "longCode": "en-NZ"
}, {
  "name": "English (South African)",
  "code": "en",
  "longCode": "en-ZA"
}, {
  "name": "German",
  "code": "de",
  "longCode": "de"
}, {
  "name": "German (Germany)",
  "code": "de",
  "longCode": "de-DE"
}, {
  "name": "German (Austria)",
  "code": "de",
  "longCode": "de-AT"
}, {
  "name": "German (Swiss)",
  "code": "de",
  "longCode": "de-CH"
}, {
  "name": "Dutch",
  "code": "nl",
  "longCode": "nl"
}, {
  "name": "Spanish",
  "code": "es",
  "longCode": "es"
}, {
  "name": "Portuguese (Angola preAO)",
  "code": "pt",
  "longCode": "pt-AO"
}, {
  "name": "Portuguese (Brazil)",
  "code": "pt",
  "longCode": "pt-BR"
}, {
  "name": "Portuguese (Moçambique preAO)",
  "code": "pt",
  "longCode": "pt-MZ"
}, {
  "name": "Portuguese (Portugal)",
  "code": "pt",
  "longCode": "pt-PT"
}, {
  "name": "Norwegian (Bokmål)",
  "code": "nb",
  "longCode": "nb"
}, {
  "name": "Norwegian (Bokmål)",
  "code": "no",
  "longCode": "no"
}, {
  "name": "Dutch",
  "code": "nl",
  "longCode": "nl-NL"
}, {
  "name": "Simple German",
  "code": "de-DE-x-simple-language",
  "longCode": "de-DE-x-simple-language-DE"
}, {
  "name": "Spanish",
  "code": "es",
  "longCode": "es-ES"
}, {
  "name": "Italian",
  "code": "it",
  "longCode": "it-IT"
}, {
  "name": "Persian",
  "code": "fa",
  "longCode": "fa-IR"
}, {
  "name": "Swedish",
  "code": "sv",
  "longCode": "sv-SE"
}, {
  "name": "German",
  "code": "de",
  "longCode": "de-LU"
}, {
  "name": "French",
  "code": "fr",
  "longCode": "fr-FR"
}]

let select = document.querySelector('#text-language');
languages.forEach((lt) => {
  let option = document.createElement('option');
  option.textContent = `${lt.name} (${lt.longCode})`;
  option.setAttribute('data-name', lt.name);
  option.setAttribute('value', lt.longCode);
  select.append(option);
})

const lang = JSON.parse(localStorage.getItem("__smile_language"));

//Listen command
let play = true;
ibtn.addEventListener("click", ()=> {
  if (window.navigator.onLine) {
    if (play) {
      checkSentences();
      play = false;
    } else {
      edit_txt();
      play = true;
    }
  } else {
    alert(lang[24]);
  }
});

//Grammar API
const checkSentences = () => {
  loader.classList.remove("d-none");
  const lang = document.querySelector('#text-language').value;
  const text = document.querySelector('#full-text').value
  const encodedParams = new URLSearchParams();
  encodedParams.append("language",
    lang);
  encodedParams.append("text",
    text);
  const post_options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'd8d30974d7msh24bcdbb92bb7ba2p19685ajsn1daaec9e691e',
      'X-RapidAPI-Host': 'dnaber-languagetool.p.rapidapi.com'
    },
    body: encodedParams
  };
  fetch('https://dnaber-languagetool.p.rapidapi.com/v2/check',
    post_options)
  .then(response => response.json())
  .then(response => viewContent(response, text))
  .catch(err => {
    document.body.innerHTML = `<div class="alert alert-info w-75 mt-5 d-block mx-auto">${err}</div>`;
    loader.classList.remove("d-none");
  });
}

//See checked sentences
const viewContent = (res_txt, user_txt) => {
  let id = 0;
  let matches = res_txt.matches;
  let words_list = user_txt.split(" ");
  let checked_txt = "";
  localStorage.setItem("__smile_grammar_",
    JSON.stringify(matches));
  for (sentence of matches) {
    for (var i = 0; i < words_list.length; i++) {
      let offset = sentence.offset;
      let lenght = offset + sentence.length;
      let word = user_txt.slice(offset, lenght);
      if (word == words_list[i]) {
        let wordSpan = ` <span id="${id}" onclick="show_rule(this)">${word}</span>`;
        checked_txt += wordSpan;
      } else if (words_list[i][words_list[i].length-1] == "," && words_list[i].slice(0, words_list[i].length-1) == word) {
        let wordSpan = ` <span id="${id}" onclick="show_rule(this)">${word}</span>`;
        checked_txt += wordSpan;
      } else {
        checked_txt += " "+words_list[i];
      }
    };
    words_list = checked_txt.split(" ");
    if (matches.indexOf(sentence) != matches.length-1) {
      checked_txt = "";
    }
    id += 1;
  };
  textbox.innerHTML = checked_txt;
  textbox.classList.remove('d-none')
  loader.classList.add("d-none");
  textarea.classList.add("d-none");
  ibtn.classList.remove("fa-play");
  ibtn.classList.add("fa-edit");
}

window.setInterval(function() {
  let text = loader.textContent;
  if (text.length != 3) {
    loader.innerHTML = text+"•";
  } else {
    loader.innerHTML = "";
  }
}, 300);

const show_rule = (e)=> {
  let matches = JSON.parse(localStorage.getItem("__smile_grammar_"));
  let sentence = matches[e.id];
  const {
    message, replacements, rule
  } = sentence;
  let replacements_txt = "";
  replacements.slice(0,
    10).forEach((obj)=> {
      let p = `${obj.value}, `;
      if (obj.shortDescription) {
        p = `${obj.value} (${obj.shortDescription}), `;
      }
      replacements_txt += p;
    })
  document.querySelector(".message").innerHTML = message;
  document.querySelector(".replacements").innerHTML = replacements_txt;
  document.querySelector(".rule").innerHTML = `${rule.description} (${rule.category.name})`;

  show_rule_box.classList.add("open");
}
const close_box = ()=> {
  show_rule_box.classList.add("close");
  show_rule_box.classList.remove("open");
  setTimeout(function() {
    show_rule_box.classList.remove("close")
  },
    250);
}

const edit_txt = ()=> {
  textbox.classList.add("d-none");
  textarea.classList.remove("d-none");
  ibtn.classList.remove("fa-edit");
  ibtn.classList.add("fa-play");
}
let input = document.querySelector("#file")
input.addEventListener("input", ()=> {
  if (window.navigator.onLine) {
    if (play) {
      loader.classList.remove("d-none");
      const data = new FormData();
      data.append("image", input.files[0]);

      const options = {
        method: 'POST',
        headers: {
          'X-RapidAPI-Key': 'd8d30974d7msh24bcdbb92bb7ba2p19685ajsn1daaec9e691e',
          'X-RapidAPI-Host': 'ocr-extract-text.p.rapidapi.com'
        },
        body: data
      };

      fetch('https://ocr-extract-text.p.rapidapi.com/ocr', options)
      .then(response => response.json())
      .then(response => {
        textarea.innerHTML = response.text;
        loader.classList.add("d-none");
      })
      .catch(err => {
        document.body.innerHTML = `<div class="alert alert-info w-75 mt-5 d-block mx-auto">${err}</div>`;
        loader.classList.remove("d-none");
      });
    }
  } else {
    alert(lang[24]);
  }
})

const rule = document.querySelector(".rule");
rule.addEventListener("dblclick", ()=> {
  const text = rule.textContent;
  rule.innerHTML = "...";
  if (window.navigator.onLine) {
    let body = JSON.stringify({
      texts: [text],
      tls: ["uz"],
      sl: "en"
    })
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'd8d30974d7msh24bcdbb92bb7ba2p19685ajsn1daaec9e691e',
        'X-RapidAPI-Host': 'ai-translate.p.rapidapi.com'
      },
      body: body
    };
    fetch('https://ai-translate.p.rapidapi.com/translates',
      options)
    .then(response => response.json())
    .then(response => {
      rule.innerHTML = response[0].texts;
      loader.classList.add("d-none");
    })
    .catch(err => {
      document.body.innerHTML = `<div class="alert alert-info w-75 mt-5 d-block mx-auto">${err}</div>`;
    });
  } else {
    alert(lang[24]);
  }
})

const message = document.querySelector(".message");
message.addEventListener("dblclick", ()=> {
  const text = message.textContent;
  message.innerHTML = "...";
  if (window.navigator.onLine) {
    let body = JSON.stringify({
      texts: [text],
      tls: ["uz"],
      sl: "en"
    })
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'd8d30974d7msh24bcdbb92bb7ba2p19685ajsn1daaec9e691e',
        'X-RapidAPI-Host': 'ai-translate.p.rapidapi.com'
      },
      body: body
    };
    fetch('https://ai-translate.p.rapidapi.com/translates',
      options)
    .then(response => response.json())
    .then(response => {
      message.innerHTML = response[0].texts;
      loader.classList.add("d-none");
    })
    .catch(err => {
      document.body.innerHTML = `<div class="alert alert-info w-75 mt-5 d-block mx-auto">${err}</div>`;
    });
  } else {
    alert(lang[24]);
  }
})

