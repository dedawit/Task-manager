function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password");
  var checkbox = document.getElementById("chk");

  // Toggle password visibility based on checkbox state
  if (checkbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

themeToggle.addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("dark");
  const icon = themeToggle.querySelector("i");

  if (body.classList.contains("dark")) {
    icon.classList.remove("bx-moon");
    icon.classList.add("bx-sun");
    themeToggle.title = "Light Mode";
  } else {
    icon.classList.remove("bx-sun");
    icon.classList.add("bx-moon");
    themeToggle.title = "Dark Mode";
  }
});
