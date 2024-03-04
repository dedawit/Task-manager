//comment adder employee

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
let num = 0;

document
  .getElementById("insertContentBtn")
  .addEventListener("click", function () {
    // Read the value of the textarea
    let position = document.getElementById("newText");
    var newText = position.value;
    if (newText.trim() !== "") {
      let imageSource = "images/profile.jpg";
      let name = "Henok Kinde";
      let date = "Jan 5, 2024";
      // Create the new content
      var newContent = `
    <div class="w-full mt-4 " >
      <div class="flex flex-row items-start">
        <div class="w-14">
          <img
            src= "${imageSource}"
            alt="profile"
            class="rounded-full h-12 w-12"
          />
        </div>
        <div class="ml-2 flex flex-col w-full px-2">
          <div class="flex items-center flex-row">
            <p class="font-s2-3 mr-2">${name}</p>
            <p class="font-s2 text-gray-400">${date}</p>
          </div>

          <p class="font-s2-3 mt-2 text-gray-600 w-full">${newText}</p>
        </div>
      </div>
    </div>
  `;
      position.value = "";

      // Append the new content at the end
      document
        .getElementById("insert-element")
        .insertAdjacentHTML("beforebegin", newContent);
      let counter = document.querySelectorAll(".count-message");

      counter.forEach((val) => {
        num++;
      });
      if (num != 1) {
        document.getElementById(
          "num-comments"
        ).textContent = `${num} private comments`;
      }
    }
  });
document.querySelectorAll(".select-detail").forEach((element) => {
  element.addEventListener("click", () => {
    const manipulateDetail = document.getElementById("detail");
    manipulateDetail.classList.remove("hidden");
    document.getElementById("main").classList.add("hidden");
  });
});

document.getElementById("back-arrow").addEventListener("click", () => {
  const manipulateDetail = document.getElementById("detail");
  manipulateDetail.classList.add("hidden");
  document.getElementById("main").classList.remove("hidden");
});

const openFileDialogBtn = document.getElementById("openFileDialogBtn");
const fileInput = document.getElementById("fileInput");

// Add event listener to the button
openFileDialogBtn.addEventListener("click", () => {
  // Trigger the file input when button is clicked
  fileInput.click();
});

// Add event listener to the file input to handle file selection
fileInput.addEventListener("change", (event) => {
  // Get the selected file
  const selectedFile = event.target.files[0];

  const detail = document.getElementById("file-span");

  // Get the selected file name
  const fileName = selectedFile.name;

  // Check if the file name length is greater than 20 characters
  const displayName =
    fileName.length > 35 ? fileName.substring(0, 35) + "..." : fileName;

  // Set the innerHTML of detail element to the displayed name
  detail.innerHTML = displayName;

  document.getElementById("remove-file").classList.remove("hidden");
});
document.getElementById("remove-file").addEventListener(
  "click",

  function () {
    const fileInput = document.getElementById("fileInput");

    // Get the file span element
    const fileSpan = document.getElementById("file-span");
    // Clear the selected file by resetting the value of the file input
    fileInput.value = "";
    // Clear the file span content
    fileSpan.textContent = "";
    document.getElementById("remove-file").classList.add("hidden");
  }
);

//My account
//
const imageFileInput = document.getElementById("imageFile");
const imagePreview = document.getElementById("imagePreview");
const openFileDialogBtn2 = document.getElementById("openFileDialogBtn-2");

openFileDialogBtn2.addEventListener("click", () => {
  // Trigger the file input when button is clicked

  imageFileInput.click();
});

imageFileInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const detail = document.getElementById("file-span-2");

    // Get the selected file name
    const fileName = file.name;

    // Check if the file name length is greater than 20 characters
    const displayName =
      fileName.length > 20 ? fileName.substring(0, 20) + "..." : fileName;

    // Set the innerHTML of detail element to the displayed name
    detail.innerHTML = displayName;

    const reader = new FileReader();
    reader.onload = function (event) {
      const imageUrl = event.target.result;
      imagePreview.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.innerHTML = ""; // Clear the image preview if no file is selected
  }
});

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  // Check if the form is valid
  if (!this.checkValidity()) {
    // If the form is invalid, prevent default submission
    event.preventDefault();
    event.stopPropagation();
  } else {
    window.alert("The data are successfully saved!");
    this.reset();
  }
});

document.getElementById("myForm2").addEventListener("submit", function (event) {
  event.preventDefault();
  // Check if the form is valid
  if (!this.checkValidity()) {
    // If the form is invalid, prevent default submission
    event.preventDefault();
    event.stopPropagation();
  } else {
    // Retrieve input values
    var oldPassword = document.getElementById("text-old").value;
    var newPassword1 = document.getElementById("text-new1").value;
    var newPassword2 = document.getElementById("text-new2").value;

    // Check if all fields have at least four characters
    if (
      oldPassword.length < 4 ||
      newPassword1.length < 4 ||
      newPassword2.length < 4
    ) {
      alert("Password must be at least 4 characters long.");
      return; // Stop further execution
    }
    if (newPassword1 !== newPassword2) {
      alert("New Password and Confirm New Password must match.");
      return; // Stop further execution
    }
    window.alert("The password is successfully changed!");
    this.reset();
  }
});
//navigation bar
const navHide = function () {
  document.getElementById("mobile-menu").classList.add("hidden");
};

document.querySelectorAll(".nav-hide").forEach((item) => {
  item.addEventListener("click", navHide);
});

document.getElementById("bars").addEventListener("click", () => {
  const val = document.getElementById("mobile-menu");
  if (val.classList.contains("hidden")) {
    val.classList.remove("hidden");
  } else {
    val.classList.add("hidden");
  }
});

document.querySelectorAll(".my-task").forEach((task) => {
  task.addEventListener("click", () => {
    document.getElementById("my-account").classList.add("hidden");
    document.getElementById("detail").classList.add("hidden");
    document.getElementById("main").classList.remove("hidden");
  });
});

document.querySelectorAll(".my-account-btn").forEach((task) => {
  task.addEventListener("click", () => {
    document.getElementById("main").classList.add("hidden");
    document.getElementById("detail").classList.add("hidden");

    document.getElementById("my-account").classList.remove("hidden");
  });
});

document.getElementById("reset-all").addEventListener("click", () => {
  imagePreview.innerHTML = "";
  // Clear the display name
  const detail = document.getElementById("file-span-2");
  detail.innerHTML = "";
});
