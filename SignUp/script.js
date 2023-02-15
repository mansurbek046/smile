//inputes
let first_name = document.getElementById("first_name");
let second_name = document.getElementById("second_name");
let date_of_birth = document.getElementById("date_of_birth");
let gender = document.getElementById("gender");
let mother_tongue = document.getElementById("mother_tongue");
let email = document.getElementById("email");
let password = document.getElementById("password");

//submit button
const btnsubmit = document.querySelector('#submit');
btnsubmit.addEventListener("click", ()=> {
  let count = 0;
  let user = {
    first_name: first_name.value,
    second_name: second_name.value,
    date_of_birth: date_of_birth.value,
    gender: gender.value,
    mother_tongue: mother_tongue.value,
    email: email.value,
    password: password.value
  }
  for (const value in user) {
    if (user[value] != "") {
      count += 1;
    }
  }
  if (count == 7) {
    localStorage.setItem("__smile_user", JSON.stringify(user));
    open("../index.html");
    close(document);
  } else {
    alert("Iltimos, Ma'lumotlarni to'liq kiriting!")
  }
})
