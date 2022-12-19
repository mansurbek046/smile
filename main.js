let dbversion = localStorage.getItem("dbversion") ? Number(localStorage.getItem("dbversion"))+1: 1;
//Omborni ochish
const db = window.indexedDB.open("tabassum_malumotlari", dbversion);
localStorage.setItem("dbversion", dbversion);

db.onupgradeneeded = () => {
    let res = db.result;
    if (!res.objectStoreNames.contains("foydalanuvchi")) {
        res.createObjectStore("foydalanuvchi", {
            autoIncrement: true
        });

    }
}

//Ochilgandan keyin
db.onsuccess = () => {
    let res = db.result;
    let tx = res.transaction("foydalanuvchi", "readonly");
    let store = tx.objectStore("foydalanuvchi");
    let data = store.getAll();
    data.onsuccess = ()=> {
        if (data.result[0] == null) {
            open("./SignUp/index.html");
            setTimeout(function() {
                close(document)
            }, 500);
        }
    }
}