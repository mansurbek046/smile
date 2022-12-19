let data = {
    speaker: "male",
    language: "uz-uz",
    background: "bg.jpg",
    font: "sans-serif",
};


const idb = window.indexedDB.open("tabbmassum_malumotlari", 2);

idb.onsuccess = ()=> {
    let res = idb.result;
    if (res.objectStoreNames.contains("sozlamalar")) {
        let tx = res.transaction("sozlamalar", "readonly");
        let store = tx.objectStore("sozlamalar");
        data = store.get(0);
    }
}

document.querySelectorAll("select").forEach((e)=> {
    e.value = data[e.name]
})




const db = window.indexedDB.open("tabassum_malumotlari",
    1);

db.onupgradeneeded = () => {
    let res = db.result;
    res.createObjectStore("sozlamalar", {
        autoIncrement: true
    });
}


document.querySelector('input').addEventListener("change", (e)=> {
    data[e.name] = e.value;
})
document.querySelectorAll('select').forEach((d)=> {
    d.addEventListener("change", () => {
        document.querySelectorAll('select').forEach((e) => {
            if (e.value != '') {
                data[e.name] = e.value;
            }
        })
        db.onsuccess = () => {
            let res = db.result;
            if (res.objectStoreNames.contains("sozlamalar")) {
                let tx = res.transaction("sozlamalar", "readwrite");
                let store = tx.objectStore("sozlamalar");
                store.put(data, 0);
            } else {
                alert('Xato: Omborda jadval topilmadi. (Settings/script.js/:35)');
            }
        }
    })
})