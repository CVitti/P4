function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".closebtn");
const modalFormClose = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.forEach((close) => close.addEventListener("click", closeModal));

// Reset form on form close
modalFormClose.forEach((formClose) => formClose.addEventListener("click", resetForm));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// reset form on form close
function resetForm() {
  document.forms["reserve"].reset();

  // Reseting error on fields
  let fields = document.querySelectorAll("#reserve input[type='text'], #reserve input[type='email'], #reserve input[type='date'], #reserve input[type='number'], #reserve #checkbox1");
  const spanError = document.querySelectorAll(".error");
  for (const field of fields) {
    field.style.border = "none";
  }
  spanError.forEach((span) => span.innerHTML = "");

}


