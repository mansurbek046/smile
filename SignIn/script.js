let email = document.getElementById("email");
let password = document.getElementById("password");

//submit button
const btnsubmit = document.querySelector('#submit');
btnsubmit.addEventListener("click", (e)=> {
  e.preventDefault();
  let count = 0;
  let user = {
    email: email.value,
    password: password.value
  }
  for (const value in user) {
    if (user[value] != "") {
      count += 1;
    }
  }
  if (count == 2) {
    localStorage.setItem("__smile_user", JSON.stringify(user));
    open("../index.html");
    close(document);
  } else {
    alert("Iltimos, Ma'lumotlarni to'liq kiriting!")
  }
})
