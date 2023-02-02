//inputes
let name = document.getElementById("name");
let surname = document.getElementById("surname");
let date_of_birth = document.getElementById("date_of_birth");
let gender = document.getElementById("gender");
let mother_tongue = document.getElementById("mother_tongue");
let avatar_url="";

//submit button
const btnsubmit = document.querySelector('#submit');
btnsubmit.addEventListener("click", ()=> {
  let count = 0;
  let user = {
    avatar_url: avatar_url,
    name: name.value,
    surname: surname.value,
    date_of_birth: date_of_birth.value,
    gender: gender.value,
    mother_tongue: mother_tongue.value
  }
  for (const value in user) {
    if (user[value] != "") {
      count += 1;
    }
  }
  if (count == 5) {
    localStorage.setItem("__smile_user", JSON.stringify(user));
    open("../index.html");
    close(document);
  } else {
    alert("Iltimos, Ma'lumotlarni to'liq kiriting!")
  }
})

const avatar = document.querySelector(".avatar");
const photo = document.querySelector("#photo");
photo.addEventListener("input", ()=> {
  var file = photo.files[0]
  const fr = new FileReader();
  fr.readAsDataURL(file);
  fr.addEventListener("load", ()=> {
    avatar_url = fr.result;
    avatar.style.backgroundImage = `url(${avatar_url})`;
  })
})