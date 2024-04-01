const themeToggle = document.getElementById("themeToggle");

let index = 1;
let index2 = 1;

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

const logoutButton = document.getElementById("button-logout");

logoutButton.addEventListener("click", function () {
  window.location.href = "index.html";
});

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

// Find the delete icon element
const deleteIcon = document.querySelectorAll(".delete-icon");

// Add click event listener to the delete icon
deleteIcon.forEach((element) => {
  element.addEventListener("click", function () {
    // Ask for confirmation
    const confirmed = confirm("Are you sure you want to delete this item?");

    // If user confirms, delete the row
    if (confirmed) {
      // Get the parent <tr> element and remove it
      const row = this.closest("tr");
      row.remove();
    }
  });
});

// const deleteButton = document.querySelector(
//   ".table-delete button:nth-of-type(2)"
// );
// const deleteAllButton = document.querySelector(
//   ".table-delete button:nth-of-type(3)"
// );
// deleteButton.addEventListener("click", function () {
//   const checkedRows = document.querySelectorAll(
//     ".table-delete input[type='checkbox']:checked"
//   );
//   if (checkedRows.length === 0) {
//     alert("Select at least one task");
//   } else {
//     const confirmed = confirm("Are you sure you want to delete this item?");

//     // If user confirms, delete the row
//     if (confirmed) {
//       // Get the parent <tr> element and remove it
//       checkedRows.forEach(function (row) {
//         row.closest("tr").remove();
//       });
//     }
//   }
// });

// deleteAllButton.addEventListener("click", function () {
//   const confirmation = confirm("Are you sure you want to delete all tasks?");
//   if (confirmation) {
//     const rows = document.querySelectorAll(".table-delete tr");
//     rows.forEach(function (row, index) {
//       if (index !== 0 && index !== rows.length - 1) {
//         // Skip the first and last rows
//         row.remove();
//       }
//     });
//   }
// });

// const checkboxes = document.querySelectorAll(
//   ".table-delete input[type='checkbox']"
// );
// const cancelButton = document.querySelector(
//   ".table-delete button:nth-of-type(1)"
// );
// cancelButton.addEventListener("click", function () {
//   checkboxes.forEach(function (checkbox) {
//     console.log("hi");
//     checkbox.checked = false;
//   });
//   document.getElementById("table-for-delete").classList.add("hidden");
// });
// const table = document.getElementById("table-for-delete");

// document.getElementById("delete-delete").addEventListener("click", () => {
//   if (table.classList.contains("hidden")) {
//     table.classList.remove("hidden");
//   } else {
//     checkboxes.forEach(function (checkbox) {
//       checkbox.checked = false;
//     });
//     table.classList.add("hidden");
//   }
// });

document.querySelectorAll(".emp-event").forEach((element) => {
  element.addEventListener("click", () => {
    document.getElementById("emp").classList.remove("hidden");

    document.getElementById("my-account").classList.add("hidden");
    document.getElementById("detail").classList.add("hidden");
    document.getElementById("main-2").classList.add("hidden");
    document.getElementById("main").classList.add("hidden");
  });
});

// //search employee table

// const searchInput = document.getElementById("search-emp");
// const searchIcon = document.getElementById("search-icon-2");
// const reloadIcon = document.getElementById("reload-icon");
// const tableRows = document.querySelectorAll("#table-for-emp tr");

// searchIcon.addEventListener("click", function () {
//   const searchText = searchInput.value.trim().toLowerCase();

//   tableRows.forEach(function (row) {
//     if (row !== tableRows[0]) {
//       const rowData = row.textContent.toLowerCase();
//       if (rowData.includes(searchText)) {
//         row.style.display = "";
//       } else {
//         row.style.display = "none";
//       }
//     }
//   });
// });

// reloadIcon.addEventListener("click", function () {
//   tableRows.forEach(function (row) {
//     row.style.display = "";
//   });
//   searchInput.value = "";
// });

//task assign

document.querySelectorAll(".task-assign").forEach((element) => {
  element.addEventListener("click", () => {
    document.getElementById("emp").classList.add("hidden");

    document.getElementById("main").classList.remove("hidden");
    document.getElementById("main-2").classList.add("hidden");
    document.getElementById("detail").classList.add("hidden");

    document.getElementById("my-account").classList.add("hidden");
  });
});

//private comments

// Find the button element
var viewCommentsButton = document.querySelectorAll(".view-comments-button");

let exists = false;

// Add event listener to the button
viewCommentsButton.forEach((element) => {
  element.addEventListener("click", function () {
    // Find the table row containing the button
    let tableRow = element.closest("tr");

    // Check if the private comments section is already added
    let existingPrivateComments = tableRow.nextElementSibling;

    if (existingPrivateComments) {
      let justify = existingPrivateComments.querySelector("td");

      if (justify.classList.contains("private-comments-section")) {
        existingPrivateComments.remove();

        exists = false;
      }
      // If the private comments section already exists, remove it
      else {
        let dbRef = ref(db, "Task-Manager/Assigned-Tasks");
        let sender = "";
        let receipient = "";
        return get(dbRef).then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var task = childSnapshot.val();
            var id = childSnapshot.key;
            const row = this.closest("tr");
            const cell = row.querySelectorAll("td");
            const id2 = cell[0].textContent;
            if (id === id2) {
              let username = sessionStorage
                .getItem("username")
                .replace(".", "-");
              const storageRef = storageRefNominal(
                getStorage(app),
                `Images/${username}/${username}-profile`
              );
              getDownloadURL(storageRef)
                .then((url) => {
                  // Assign the URL to an <img> element to display the image

                  sender = url;
                  const storageRef = storageRefNominal(
                    getStorage(app),
                    `Images/${username}/${task.empAssignedId}-profile`
                  );

                  getDownloadURL(storageRef)
                    .then((url) => {
                      // Assign the URL to an <img> element to display the image

                      receipient = url;
                    })
                    .catch((error) => {
                      // Handle errors if the file does not exist
                      console.error(
                        "Error downloading file1 from Storage: ",
                        error
                      );
                    });
                })
                .catch((error) => {
                  // Handle errors if the file does not exist
                  console.error(
                    "Error downloading file1 from Storage: ",
                    error
                  );
                });
              // Create a new table row for the private comments section
              var newRow = document.createElement("tr");
              newRow.innerHTML = `
                <td colspan="9" class="text-black private-comments-section">
                  <div class="w-full border border-black border-thin mt-4 rounded shadow-lg mb-2 ">
                    <!-- Private comments section content -->
                  
                    <div class="flex items-start flex-col ml-4 mt-4">
                      <div class="flex flex-row items-center">
                        <i class="fa-regular fa-user font-s2-3 mr-2"></i>
                        <p class="font-s2-3" id="num-comments">Private comments</p>
                      </div>
                   
          
                      <div
                        class="flex flex-row items-center w-full my-4"
                        id="insert-element"
                      >
                        <textarea
                          id="newText"
                          rows="2"
                          style="resize: none"
                          placeholder="Add private comment..."
                          class="task-adder border border-gray-600 focus:outline-none dark:text-white dark:border-gray-600 dark:bg-gray-600 px-4 py-2 rounded w-full mr-2"
                        ></textarea>
                        <i
                          class="fa-solid fa-arrow-right font-s2-3 mr-4 hover:cursor-pointer"
                          id="insertContentBtn"
                        ></i>
                      </div>
                    </div>
                
                </td>
              `;

              // Insert the new row after the current row
              tableRow.parentNode.insertBefore(newRow, tableRow.nextSibling);
              exists = true;

              addcomment();
            }
          });
        });
      }
    }
  });
});

let num = 1;

const addcomment = (simple = false) => {
  if (exists) {
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

          if (num != 1) {
            document.getElementById(
              "num-comments"
            ).textContent = `${num} private comments`;
          }
          num++;
        }
      });
  }
  if (simple) {
    // Read the value of the textarea
    let position = document.getElementById("newText-2");
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
        .getElementById("insert-element-2")
        .insertAdjacentHTML("beforebegin", newContent);

      if (num != 1) {
        document.getElementById(
          "num-comments-2"
        ).textContent = `${num} private comments`;
      }
      num++;
    }
  }
};

document.getElementById("insertContentBtn-2").addEventListener("click", () => {
  addcomment(true);
});

//task-manage

var tableTask = document.getElementById("task-manage");

// // Get all delete buttons within the table and attach click event listener
// var deleteButtons = tableTask
//   .querySelector(".delete-button")
//   .addEventListener("click", () => {
//     const checkedRows = tableTask.querySelectorAll(
//       "input[type='checkbox']:checked"
//     );
//     if (checkedRows.length === 0) {
//       alert("Select at least one task");
//     } else {
//       checkedRows.forEach(function (row) {
//         row.closest("tr").remove();
//       });
//     }
//   });

// Get delete all button within the table and attach click event listener
// var deleteAllButton2 = tableTask.querySelector(".delete-all-button");
// deleteAllButton2.addEventListener("click", function () {
//   const confirmation = confirm("Are you sure you want to delete all tasks?");
//   if (confirmation) {
//     const rows = tableTask.querySelectorAll("tr");
//     rows.forEach(function (row, index) {
//       if (index !== 0 && index !== rows.length - 1) {
//         // Skip the first and last rows
//         row.remove();
//       }
//     });
//   }
// });

// Get all trash icons within the table and attach click event listener
// const deleteIcon2 = tableTask.querySelectorAll(".delete-icon-2");

// // Add click event listener to the delete icon
// deleteIcon2.forEach((element) => {
//   element.addEventListener("click", function () {
//     // Ask for confirmation
//     const confirmed = confirm("Are you sure you want to delete this item?");

//     // If user confirms, delete the row
//     if (confirmed) {
//       // Get the parent <tr> element and remove it
//       const row = this.closest("tr");
//       row.remove();
//     }
//   });
// });

// const checkboxes2 = tableTask.querySelectorAll("input[type='checkbox']");
// const cancelButton2 = tableTask.querySelector(".cancel-2");
// cancelButton2.addEventListener("click", function () {
//   checkboxes2.forEach(function (checkbox) {
//     checkbox.checked = false;
//   });
// });

//serach main
//var table2 = document.getElementById("task-manage");

// // Get the search input element
// var searchInput2 = document.getElementById("search-input");

// // Get the search icon element
// var searchIcon2 = document.getElementById("search-icon");

// // Get the rotate icon element
// var rotateIcon = document.getElementById("rotate-icon");

// //var taskRows = Array.from(table2.querySelectorAll("tr")).slice(1, -1);
// //console.log(taskRows);

// // Add click event listener to the search icon
// searchIcon2.addEventListener("click", function () {
//   // Get the search query
//   var searchQuery = searchInput2.value.toLowerCase().trim();

//   // Get all task rows excluding the first and last

//   // Loop through each task row
//   taskRows.forEach(function (row) {
//     const rowData = row.textContent.toLowerCase();
//     if (rowData.includes(searchQuery)) {
//       row.style.display = "";
//     } else {
//       row.style.display = "none";
//     }
//   });
// });

// rotateIcon.addEventListener("click", function () {
//   taskRows.forEach(function (row) {
//     row.style.display = "";
//   });
//   searchInput2.value = "";
// });

// // Get the select element
// var statusSelect = document.querySelector("#status-select");

// // Add change event listener to the select element
// statusSelect.addEventListener("change", function () {
//   // Get the selected status value
//   var selectedStatus = this.value.toLocaleLowerCase().trim();

//   // Get all task rows excluding the first and last
//   var taskRows2 = Array.from(document.querySelectorAll(".task-row")).slice(
//     1,
//     -1
//   );

//   // Loop through each task row
//   taskRows2.forEach(function (row) {
//     // Get the status from the row
//     var status = row
//       .querySelector(".status")
//       .textContent.toLocaleLowerCase()
//       .trim();

//     // Show the row if it matches the selected status, hide otherwise
//     if (selectedStatus === "status(all)") {
//       taskRows.forEach(function (row) {
//         row.style.display = "";
//       });
//     } else {
//       if (status === selectedStatus) {
//         row.style.display = "";
//       } else {
//         row.style.display = "none";
//       }
//     }
//   });
// });

document.querySelectorAll(".my-task").forEach((task) => {
  task.addEventListener("click", () => {
    document.getElementById("emp").classList.add("hidden");

    document.getElementById("my-account").classList.add("hidden");
    document.getElementById("detail").classList.add("hidden");
    document.getElementById("main-2").classList.remove("hidden");
    document.getElementById("main").classList.add("hidden");
  });
});

// document.querySelectorAll(".my-account-btn").forEach((task) => {
//   task.addEventListener("click", () => {
//     document.getElementById("emp").classList.add("hidden");

//     document.getElementById("main").classList.add("hidden");
//     document.getElementById("main-2").classList.add("hidden");
//     document.getElementById("detail").classList.add("hidden");

//     document.getElementById("my-account").classList.remove("hidden");
//   });
// });

// document.querySelectorAll(".select-detail").forEach((element) => {
//   element.addEventListener("click", () => {
//     const manipulateDetail = document.getElementById("detail");
//     manipulateDetail.classList.remove("hidden");
//     document.getElementById("main-2").classList.add("hidden");
//   });
// });

// document.getElementById("back-arrow").addEventListener("click", () => {
//   const manipulateDetail = document.getElementById("detail");
//   manipulateDetail.classList.add("hidden");
//   document.getElementById("main-2").classList.remove("hidden");
// });

// if (task.fileNameEmpURL) {
//   document.getElementById("openFileDialogBtn").classList.add("hidden");
//   document.getElementById("remove-file").classList.remove("hidden");
//   document.getElementById("view").classList.remove("hidden");
// }

// document.getElementById("done").addEventListener("click", function () {
//   update(ref(database, `Task-Manager/Assigned-Tasks/${task.key}`), {
//     status: "Completed",
//   })
//     .then(() => {
//       alert("You accomplished the task! Congratulations!");
//       document.getElementById("undone").classList.remove("hidden");
//       document.getElementById("done").classList.add("hidden");
//     })
//     .catch((error) => {
//       console.error(error);
//       alert("You failed to complete the task!, Try again later.");
//     });
// });
// document.getElementById("undone").addEventListener("click", function () {
//   update(ref(database, `Task-Manager/Assigned-Tasks/${task.key}`), {
//     status: "On Progress",
//   })
//     .then(() => {
//       alert("You are now on progress again!");
//       document.getElementById("undone").classList.add("hidden");
//       document.getElementById("done").classList.remove("hidden");
//     })
//     .catch((error) => {
//       console.error(error);
//       alert("You failed to be on progress again!, Try again later.");
//     });
// });

// const openFileDialogBtn = document.getElementById("openFileDialogBtn");
// const fileInput = document.getElementById("fileInput");

// // Add event listener to the button
// openFileDialogBtn.addEventListener("click", () => {
//   // Trigger the file input when button is clicked
//   fileInput.click();
// });

// let selectedFile;

// // Add event listener to the file input to handle file selection
// fileInput.addEventListener("change", (event) => {
//   // Get the selected file
//   selectedFile = event.target.files[0];

//   const detail = document.getElementById("file-span");

//   // Get the selected file name
//   const fileName = selectedFile.name;

//   // Check if the file name length is greater than 20 characters
//   const displayName =
//     fileName.length > 35 ? fileName.substring(0, 35) + "..." : fileName;

//   // Set the innerHTML of detail element to the displayed name
//   detail.innerHTML = displayName;

//   document.getElementById("remove-file").classList.remove("hidden");
//   document.getElementById("uploadBtn").classList.remove("hidden");
// });

// let urlFinal2 = "";

// document.getElementById("uploadBtn").addEventListener("click", () => {
//   const storageRef = storageRefNominal(
//     getStorage(app),
//     `Completed-Tasks/${task.key}/${selectedFile.name}`
//   );
//   try {
//     // Upload the file to Firebase Storage
//     const snapshot = uploadBytes(storageRef, selectedFile);

//     // Update the task object with the download URL

//     // Update the database with the task including the download URL
//     update(ref(database, `Task-Manager/Assigned-Tasks/${task.key}`), {
//       fileNameEmpURL: selectedFile.name,
//     });

//     document.getElementById("openFileDialogBtn").classList.add("hidden");
//     alert("File uploaded successfully!");
//     document.getElementById("uploadBtn").classList.add("hidden");
//     document.getElementById("view").classList.remove("hidden");

//     if (task.fileNameEmpURL) {
//       let storagePath = "Assigned-Tasks/" + id + "/" + task.fileNameEmpURL;

//       // Create a reference to the file in Firebase Storage
//       let storageRef2 = storageRefNominal(getStorage(app), storagePath);

//       // Get the download URL for the file
//       getDownloadURL(storageRef2)
//         .then(function (url) {
//           // Set the file URL as the href attribute
//           urlFinal2 = url;
//           // Set the download attribute to prompt the user to save the file with the filename
//         })
//         .catch(function (error) {
//           // Handle any errors that occur
//           console.error("Error getting download URL:", error);
//           alert("Error in downloading file");
//         });
//     }
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     alert("File uploading failed!, Try again later!");
//   }
// });

// const viewer = document.getElementById("view");

// document.getElementById("view").addEventListener("click", () => {
//   if (task.fileNameEmpURL) {
//     let storagePath = "Assigned-Tasks/" + id + "/" + task.fileNameEmpURL;

//     // Create a reference to the file in Firebase Storage
//     let storageRef2 = storageRefNominal(getStorage(app), storagePath);

//     // Get the download URL for the file
//     getDownloadURL(storageRef2)
//       .then(function (url) {
//         // Set the file URL as the href attribute
//         urlFinal2 = url;
//         // Set the download attribute to prompt the user to save the file with the filename
//       })
//       .catch(function (error) {
//         // Handle any errors that occur
//         console.error("Error getting download URL:", error);
//         alert("Error in downloading file");
//       });
//   }

//   if (!task.filenameAdminURL) {
//     alert("There is no file attached");
//   } else {
//     viewer.href = urlFinal2;
//     viewer.download = task.fileNameEmpURL;
//   }
// });

// const remover = document.getElementById("remove-file");

// document.getElementById("remove-file").addEventListener(
//   "click",

//   function () {
//     if (task.fileNameEmpURL) {
//       let storagePath = "Assigned-Tasks/" + id + "/" + task.fileNameEmpURL;

//       // Create a reference to the file in Firebase Storage
//       let storageRef = storageRefNominal(getStorage(app), storagePath);

//       // Delete the file
//       deleteObject(storageRef)
//         .then(() => {
//           console.log("File deleted successfully.");
//           alert("File removed successfuly.");
//           document.getElementById("remove-file").classList.add("hidden");
//           document.getElementById("view").classList.add("hidden");

//           document
//             .getElementById("openFileDialogBtn")
//             .classList.remove("hidden");
//         })
//         .catch((error) => {
//           console.error("Error deleting file:", error);
//           alert("Error deleting file: Try again later!");
//         });
//     }

//     const fileInput = document.getElementById("fileInput");

//     // Get the file span element
//     const fileSpan = document.getElementById("file-span");
//     // Clear the selected file by resetting the value of the file input
//     fileInput.value = "";
//     // Clear the file span content
//     fileSpan.textContent = "";
//   }
// );

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
      imagePreview.src = imageUrl;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.src = ""; // Clear the image preview if no file is selected
  }
});

document.getElementById("reset-all").addEventListener("click", () => {
  imagePreview.innerHTML = "";
  // Clear the display name
  const detail = document.getElementById("file-span-2");
  detail.innerHTML = "";
});

function logout() {
  // Close the current window/tab
  window.close();
  // Replace the current URL in the browser history with the login page URL
  history.replaceState(null, "", "index.html");
  history.pushState(null, "", "index.html");
  // Redirect to the login page
  window.location.href = "index.html";
}

const openFileDialogBtnTask = document.getElementById("openFileDialogBtn-task");

openFileDialogBtnTask.addEventListener("click", function addTaskFile() {
  const fileInput = document.getElementById("fileInput-task");

  // Add event listener to the button

  // Trigger the file input when button is clicked
  fileInput.click();

  // Add event listener to the file input to handle file selection
  fileInput.addEventListener("change", (event) => {
    // Get the selected file
    const selectedFile = event.target.files[0];

    const detail = document.getElementById("file-span-task");

    // Get the selected file name
    const fileName = selectedFile.name;

    // Check if the file name length is greater than 20 characters
    const displayName =
      fileName.length > 20 ? fileName.substring(0, 20) + "..." : fileName;

    // Set the innerHTML of detail element to the displayed name
    detail.innerHTML = displayName;

    document.getElementById("remove-file-task").classList.remove("hidden");
  });
});

document.getElementById("remove-file-task").addEventListener(
  "click",

  function () {
    const fileInput = document.getElementById("fileInput-task");

    // Get the file span element
    const fileSpan = document.getElementById("file-span-task");
    // Clear the selected file by resetting the value of the file input
    fileInput.value = "";
    // Clear the file span content
    fileSpan.textContent = "";
    document.getElementById("remove-file-task").classList.add("hidden");
  }
);

let isNonEmpty = false;

function toggleRowsVisibility() {
  //const succedded = document.getElementById("success-task");
  // if (!succedded.classList.contains("hidden")) {
  //   succedded.classList.add("hidden");
  // }

  const formRows = document.querySelectorAll(".new-task");
  const iconC = document.querySelector("#i-task");

  formRows.forEach((row) => {
    if (row.classList.contains("hidden")) {
      row.classList.remove("hidden");
      iconC.classList.remove("fa-chevron-down");
      iconC.classList.add("fa-chevron-up");
    } else {
      row.classList.add("hidden");
      iconC.classList.remove("fa-chevron-up");
      iconC.classList.add("fa-chevron-down");
    }
  });
}

document.getElementById("i-task").addEventListener("click", showAlert);

function showAlert() {
  // Get all input elements
  let inputs = document.querySelectorAll(".task-adder");
  // Check if any input field is non-empty
  let temp = false;

  inputs.forEach((input) => {
    if (input.value.trim() !== "") {
      temp = true;
    }
  });

  if (temp) {
    isNonEmpty = true;
  } else {
    isNonEmpty = false;
    toggleRowsVisibility();
    const succedded = document.getElementById("success-task");

    if (!succedded.classList.contains("hidden")) {
      succedded.classList.add("hidden");
    }
  }

  // If any input field is non-empty, show the alert
  if (isNonEmpty) {
    // Set the alert text
    const confirm = window.confirm(
      "Are you sure you want to cancel? All the inserted data will be lost !"
    );
    if (confirm) {
      isNonEmpty = false;
      inputs.forEach((input) => {
        input.value = "";
      });

      toggleRowsVisibility();
      const succedded = document.getElementById("success-task");

      if (!succedded.classList.contains("hidden")) {
        succedded.classList.add("hidden");
      }
    }
  }
}

const addButton = document.getElementById("cancelButton");
addButton.addEventListener("click", showAlert);

function cancelButtonClick() {
  const succedded = document.getElementById("success-task");
  const succedded2 = document.getElementById("success-task2");
  const table = document.getElementById("tableContainer");
  // Get all checkboxes in the tasks
  const taskCheckboxes = document.querySelectorAll(
    '#tableContainer input[type="checkbox"]'
  );

  // Check if at least one checkbox is checked
  const atLeastOneChecked = [...taskCheckboxes].some(
    (checkbox) => checkbox.checked
  );
  // Get all input elements
  let inputs = document.querySelectorAll(".task-adder");
  // Check if any input field is non-empty
  let temp = false;

  inputs.forEach((input) => {
    if (input.value.trim() !== "") {
      temp = true;
    }
  });

  if (temp) {
    isNonEmpty = true;
  } else {
    isNonEmpty = false;
  }

  // If any input field is non-empty, show the alert

  // If at least one checkbox is checked, prompt confirmation
  if (atLeastOneChecked || isNonEmpty) {
    if (!succedded.classList.contains("hidden")) {
      succedded.classList.add("hidden");
    }
    if (!succedded2.classList.contains("hidden")) {
      succedded2.classList.add("hidden");
    }
    const confirmed = confirm(
      "Are you sure you want to cancel? All the inserted data will be lost!"
    );

    // If confirmed, perform cancel action
    if (confirmed) {
      table.classList.add("hidden");

      // Get all checkboxes in the tasks
      const taskCheckboxes = document.querySelectorAll(
        'input[type="checkbox"][id^="task"]'
      );
      const employeeCheckboxes = document.querySelectorAll(
        'input[type="checkbox"][id^="employee"]'
      );

      // Check if at least one checkbox is checked
      const atLeastOnetaskChecked = [...taskCheckboxes].some(
        (checkbox) => checkbox.checked
      );
      const atLeastOneemployeeChecked = [...employeeCheckboxes].some(
        (checkbox) => checkbox.checked
      );

      const startDate = document.getElementById("startDate").value;
      const completionDate = document.getElementById("completionDate").value;
      const datesFilled = startDate !== "" && completionDate !== "";
      const startDateObj = new Date(startDate);
      const completionDateObj = new Date(completionDate);
      const isValidDates = completionDateObj >= startDateObj;
      isNonEmpty = false;
      inputs.forEach((input) => {
        input.value = "";
      });
      const succedded = document.getElementById("success-task");

      // If at least one checkbox is checked, prompt confirmation

      startDate.value = null;
      completionDate.value = null;
      // Uncheck all task checkboxes
      taskCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      // Uncheck all employee checkboxes
      employeeCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      // Get the file input element
      const fileInput = document.getElementById("fileInput");

      // Get the file span element
      const fileSpan = document.getElementById("file-span");
      // Clear the selected file by resetting the value of the file input
      fileInput.value = "";
      // Clear the file span content
      fileSpan.textContent = "";
    }
  } else {
    if (!succedded.classList.contains("hidden")) {
      succedded.classList.add("hidden");
    }
    if (!succedded2.classList.contains("hidden")) {
      succedded2.classList.add("hidden");
    }
    table.classList.add("hidden");
    // Get all checkboxes in the tasks
    const taskCheckboxes = document.querySelectorAll(
      'input[type="checkbox"][id^="task"]'
    );
    const employeeCheckboxes = document.querySelectorAll(
      'input[type="checkbox"][id^="employee"]'
    );

    // Check if at least one checkbox is checked
    const atLeastOnetaskChecked = [...taskCheckboxes].some(
      (checkbox) => checkbox.checked
    );
    const atLeastOneemployeeChecked = [...employeeCheckboxes].some(
      (checkbox) => checkbox.checked
    );

    const startDate = document.getElementById("startDate").value;
    const completionDate = document.getElementById("completionDate").value;
    const datesFilled = startDate !== "" && completionDate !== "";
    const startDateObj = new Date(startDate);
    const completionDateObj = new Date(completionDate);
    const isValidDates = completionDateObj >= startDateObj;

    // If at least one checkbox is checked, prompt confirmation

    startDate.value = null;
    completionDate.value = null;
    // Uncheck all task checkboxes
    taskCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Uncheck all employee checkboxes
    employeeCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    // Get the file input element
    const fileInput = document.getElementById("fileInput");

    // Get the file span element
    const fileSpan = document.getElementById("file-span");
    // Clear the selected file by resetting the value of the file input
    fileInput.value = "";
    // Clear the file span content
    fileSpan.textContent = "";
  }
}
document
  .getElementById("cancelButton2")
  .addEventListener("click", cancelButtonClick);

document.getElementById("generateTableButton").addEventListener("click", () => {
  const table = document.getElementById("tableContainer");
  if (table.classList.contains("hidden")) {
    table.classList.remove("hidden");
  } else {
    cancelButtonClick();
  }
});
