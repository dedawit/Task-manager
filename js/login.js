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
