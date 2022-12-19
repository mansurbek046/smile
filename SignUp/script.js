let btn = document.querySelector('button');
let dbversion=Number(localStorage.getItem("dbversion"));
btn.addEventListener('click', () => {
  let data = {};
  let count = 0;
  document.querySelectorAll('input').forEach((e) => {
    if ('' != e.value) {
      data[e.name] = e.value;
      count += 1;
    } else {
      e.style.borderColor = 'red';
      e.style.borderWidth = '3px';

    }
  })
  document.querySelectorAll('select').forEach((e) => {
    if (e.value != '') {
      data[e.name] = e.value;
      count += 1;
    } else {
      e.style.borderColor = 'red';
      e.style.borderWidth = '3px';
    }
  })
  if (count == 5) {
    const db = window.indexedDB.open("tabassum_malumotlari", dbversion);
    db.onsuccess = () => {
      let res = db.result;
      if (res.objectStoreNames.contains("foydalanuvchi")) {
        let tx = res.transaction("foydalanuvchi", "readwrite");
        let store = tx.objectStore("foydalanuvchi");
        store.put(data);
        open("../index.html");
      } else {
        alert('Xato: Omborda jadval topilmadi. (SignUp/script.js/:39)');
      }
    }
  } else {
    window.navigator.vibrate(200);
  }
})