// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7EWHQ6ymj8nUX-KuP7S2DZ1jTdrziA9I",
  authDomain: "task-management-system-5592f.firebaseapp.com",
  projectId: "task-management-system-5592f",
  storageBucket: "task-management-system-5592f.appspot.com",
  messagingSenderId: "128335038762",
  appId: "1:128335038762:web:27e63bef89ddccb34c7653",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  query,
  child,
  orderByChild,
  equalTo,
  get,
  orderByKey,
  update,
  push,
  set,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

import {
  getStorage,
  uploadBytes,
  ref as storageRefNominal,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

const database = getDatabase(app);

// Function to update password for a given username
function updatePasswordForUsername(username, newPassword, oldPassword) {
  // Reference to the "Task-Manager/Login" collection
  const loginRef = ref(database, "Task-Manager/Login");

  // Query to search for the username
  const usernameQuery = query(loginRef, orderByKey());

  // Execute the query
  get(usernameQuery)
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          // Get the username from childSnapshot value
          const childValue = childSnapshot.val();
          if (childValue.username === username) {
            if (childValue.password !== oldPassword) {
              alert("The old password is incorrect!");
              return false;
            }
            // Update the password for the matching entry
            const updates = {};
            updates[childSnapshot.key + "/password"] = newPassword;

            update(loginRef, updates)
              .then(() => {
                alert("Password updated successfully.");
                return true;
              })
              .catch((error) => {
                alert("Error updating password:", error);
                return false;
              });
          }
        });
      } else {
        alert("Username not found.");
        return false;
      }
    })
    .catch((error) => {
      alert("Error getting data:", error);
      return false;
    });
}

document.getElementById("myForm").addEventListener("reset", function (event) {
  document.getElementById("imagePreview").src = "";
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
    let username = sessionStorage.getItem("username");
    const flag = updatePasswordForUsername(username, newPassword1, oldPassword);
    if (flag) {
      this.reset();
    }
  }
});

// task adder

function insertTaskData(name, description) {
  return new Promise((resolve, reject) => {
    let check = true;
    const taskRef = ref(getDatabase(app), "Task-Manager/Saved-Tasks");

    // Fetch existing tasks
    get(taskRef).then((snapshot) => {
      if (snapshot.exists()) {
        // Iterate through existing tasks to check for duplicate names
        snapshot.forEach((childSnapshot) => {
          const task = childSnapshot.val();
          if (task.name === name && check) {
            check = false;
            alert("Task with the same name already exists.");
            const succedded = document.getElementById("success-task");

            if (!succedded.classList.contains("hidden")) {
              succedded.classList.add("hidden");
            }
            return; // Exit the function without inserting data
          }
        });
      }
      if (check === false) {
        return;
      }

      // No duplicate name found, proceed to insert the new task
      const newTaskRef = push(taskRef); // Generate a unique ID for the new Task data
      const newTaskKey = newTaskRef.key;

      const newData = {
        name: name,
        description: description,
      };

      // Set the new data under the generated key
      set(newTaskRef, newData)
        .then(() => {
          const tableDel = document.getElementById("table-for-delete");
          const rowsToDelete1 = Array.from(
            tableDel.querySelectorAll("tr:not(:first-child):not(:last-child)")
          );

          // Delete each row
          rowsToDelete1.forEach((row) => row.remove());

          setTimeout(deleteTasksFromDatabase, 1000);

          const table2 = document.getElementById("table-for-show");

          const rowsToDelete = Array.from(
            table2.querySelectorAll("tr:not(:first-child)")
          );

          // Delete each row
          rowsToDelete.forEach((row) => row.remove());

          copyTasksFromDatabase();
          const successTask = document.getElementById("success-task");
          if (successTask.classList.contains("hidden")) {
            successTask.classList.remove("hidden");
          }
        })
        .catch((error) => {
          alert("Error inserting data:", error);
        });
    });
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

document.getElementById("addTaskButton").addEventListener("click", () => {
  const taskNameInput = document.querySelector("input.task-adder");
  const descriptionInput = document.querySelector("textarea.task-adder");
  const succedded = document.getElementById("success-task");

  // Validate Task Name is not empty
  if (taskNameInput.value.trim() === "") {
    if (!succedded.classList.contains("hidden")) {
      succedded.classList.add("hidden");
    }
    alert("Task Name is required.");

    return; // Stop the function if Task Name is empty
  }
  let name = taskNameInput.value;
  let description = descriptionInput.value;

  insertTaskData(name, description)
    .then(() => {
      // Call the function with no parameters here
      updateTaskManagerTable();
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
  taskNameInput.value = "";
  descriptionInput.value = "";
});

function saveAccount() {
  let username = sessionStorage.getItem("username").replace(".", "-");
  let firstName = document.getElementById("text-first").value;
  let middleName = document.getElementById("text-middle").value;
  let lastName = document.getElementById("text-last").value;
  let dob = document.getElementById("date-birth").value;
  let place = document.getElementById("text-place").value;
  let phone = document.getElementById("text-phone").value;
  let nationality = document.getElementById("text-nationality").value;
  let region = document.getElementById("selectElement").value;
  let zone = document.getElementById("text-zone").value;
  let woreda = document.getElementById("text-woreda").value;
  let kebele = document.getElementById("text-kebele").value;
  let town = document.getElementById("text-town").value;
  let house = document.getElementById("text-house").value;
  let pob = document.getElementById("text-pob").value;
  let email = document.getElementById("text-email").value;
  const file = document.getElementById("imageFile").files[0];

  // Initialize updates object
  let updates = {};

  // Check and add fields to the updates object
  if (firstName !== null && firstName.trim() !== "")
    updates.firstName = firstName;
  if (middleName !== null && middleName.trim() !== "")
    updates.middleName = middleName;
  if (lastName !== null && lastName.trim() !== "") updates.lastName = lastName;
  if (dob !== null && dob.trim() !== "") updates.dob = dob;
  if (place !== null && place.trim() !== "") updates.place = place;
  if (phone !== null && phone.trim() !== "") updates.phone = phone;
  if (nationality !== null && nationality.trim() !== "")
    updates.nationality = nationality;
  if (region !== null && region.trim() !== "") updates.region = region;
  if (zone !== null && zone.trim() !== "") updates.zone = zone;
  if (woreda !== null && woreda.trim() !== "") updates.woreda = woreda;
  if (kebele !== null && kebele.trim() !== "") updates.kebele = kebele;
  if (town !== null && town.trim() !== "") updates.town = town;
  if (house !== null && house.trim() !== "") updates.house = house;
  if (pob !== null && pob.trim() !== "") updates.pob = pob;
  if (email !== null && email.trim() !== "") updates.email = email;
  const db = getDatabase(app);

  // Push data to Realtime Database
  const userDataRef = ref(db, "Task-Manager/MyAccount/" + username);
  update(userDataRef, updates)
    .then(() => {})
    .catch((error) => {
      alert("Error adding/updating user data to Realtime Database: ", error);
    });

  // Upload file to Firebase Storage
  if (file) {
    const storageRef = storageRefNominal(
      getStorage(app),
      "Images/" + username + "/" + username + "-profile"
    );
    uploadBytes(storageRef, file)
      .then((snapshot) => {})
      .catch((error) => {
        alert("Error uploading file to Storage: ", error);
      });
  }
}

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const image = document.getElementById("imagePreview");

  if (image.src === "") {
    alert("Please choose profile image!");
    return;
  }
  // Check if the form is valid
  if (!this.checkValidity()) {
    // If the form is invalid, prevent default submission
    event.preventDefault();
    event.stopPropagation();
  } else {
    saveAccount();

    window.alert("The data are successfully saved!");
    this.reset();
  }
});

function loadAccount() {
  let username = sessionStorage.getItem("username").replace(".", "-");

  // Reference to the user's data in Firebase
  const userDataRef = ref(
    getDatabase(app),
    "Task-Manager/MyAccount/" + username
  );

  // Fetch user's data from Firebase
  get(userDataRef)
    .then((snapshot) => {
      // Check if user exists
      if (snapshot.exists()) {
        const userData = snapshot.val();

        // Populate form fields with user data
        document.getElementById("text-first").value = userData.firstName || "";
        document.getElementById("text-middle").value =
          userData.middleName || "";
        document.getElementById("text-last").value = userData.lastName || "";
        document.getElementById("date-birth").value = userData.dob || "";
        document.getElementById("text-place").value = userData.place || "";
        document.getElementById("text-phone").value = userData.phone || "";
        document.getElementById("text-nationality").value =
          userData.nationality || "";
        document.getElementById("selectElement").value = userData.region || "";
        document.getElementById("text-zone").value = userData.zone || "";
        document.getElementById("text-woreda").value = userData.woreda || "";
        document.getElementById("text-kebele").value = userData.kebele || "";
        document.getElementById("text-town").value = userData.town || "";
        document.getElementById("text-house").value = userData.house || "";
        document.getElementById("text-pob").value = userData.pob || "";
        document.getElementById("text-email").value = userData.email || "";

        // Download file from Firebase Storage if exists
        const storageRef = storageRefNominal(
          getStorage(app),
          `Images/${username}/${username}-profile`
        );
        getDownloadURL(storageRef)
          .then((url) => {
            // Assign the URL to an <img> element to display the image

            document.getElementById("imagePreview").src = url;
            document.getElementById("imageFile").value = "";
          })
          .catch((error) => {
            // Handle errors if the file does not exist
            console.error("Error downloading file from Storage: ", error);
          });
      } else {
        console.log("User data not found in Firebase.");
      }
    })
    .catch((error) => {
      console.error("Error loading user data from Firebase: ", error);
    });
}

document.querySelectorAll(".my-account-btn").forEach((task) => {
  task.addEventListener("click", () => {
    document.getElementById("emp").classList.add("hidden");

    document.getElementById("main").classList.add("hidden");
    document.getElementById("main-2").classList.add("hidden");
    document.getElementById("detail").classList.add("hidden");
    loadAccount();

    document.getElementById("my-account").classList.remove("hidden");
  });
});
let assigner = [];

function loadEmployee() {
  let username = sessionStorage.getItem("username").replace(".", "-");
  const db = getDatabase(app);
  const empRef = ref(db, "Task-Manager/MyAccount");
  const empNames = [];
  let refer = [];
  let full = [];

  // Fetch tasks from Firebase Realtime Database
  get(empRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Iterate through each task
        snapshot.forEach((empSnapshot) => {
          // Extract name and description from the task
          const empData = empSnapshot.val();

          if (empSnapshot.key === username) {
            const firstName = empData.firstName || "";
            const middleName = empData.middleName || "";

            const lastName = empData.lastName || "";
            let fullName = firstName + " " + middleName + " " + lastName;
            assigner.push(empSnapshot.key, fullName);
            return;
          }

          const firstName = empData.firstName || "";
          const middleName = empData.middleName || "";

          const lastName = empData.lastName || "";
          let fullName = firstName + " " + middleName + " " + lastName;

          // Add name and description to the respective arrays

          empNames.push(fullName);

          refer.push(empSnapshot.key);
          full.push(fullName);
        });

        // Get the table element by its id

        let tableTask = document
          .getElementById("tableContainer")
          .getElementsByTagName("tr")[0];

        // Get the last row element
        const tableRows = tableTask.parentNode.getElementsByTagName("tr");
        let lastRowIndex = tableRows.length - 2;

        // Iterate from the last row until a row with id "emp" is found
        for (let i = lastRowIndex; i >= 0; i--) {
          let row = tableRows[i];
          if (row.id === "emp-row-add") {
            lastRowIndex = i;
            break; // Exit the loop if row with id "emp" is found
          } else {
            // Remove the row if it doesn't have id "emp"
            tableRows[i].remove();
          }
        }
        let tableEmp = tableRows[lastRowIndex];

        // Loop through the taskNames and taskDescriptions arrays
        for (let i = 0; i < empNames.length; i++) {
          // Create a new table row
          const newRow2 = document.createElement("tr");

          // Create table data (cell) elements for the row
          const checkboxCell = document.createElement("td");
          checkboxCell.colSpan = 2;
          checkboxCell.innerHTML = `
    <div class="flex items-center px-4">
      <input
        type="checkbox"
        id="emp-${i + 1}-added"
        class="rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white border-blue-500 text-blue-600 focus:ring-blue-400 focus:border-blue-400"
      />
      <label for="emp-${i + 1}-added">${empNames[i]}</label>
      <p class ="hidden">${refer[i]}</p>
      <span class="hidden">${full[i]}</span>
    </div>`;
          newRow2.appendChild(checkboxCell);

          // Append the new row to the table

          tableEmp.insertAdjacentElement("afterend", newRow2);
          tableEmp = newRow2;
        }
      } else {
        console.log("No tasks found in the database.");
      }
    })
    .catch((error) => {
      console.error("Error fetching tasks from database:", error);
    });
}

loadEmployee();

function copyTasksFromDatabase() {
  const db = getDatabase(app);
  const tasksRef = ref(db, "Task-Manager/Saved-Tasks");

  // Arrays to store task names and descriptions
  const taskNames = [];
  const taskDescriptions = [];

  // Fetch tasks from Firebase Realtime Database
  get(tasksRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Iterate through each task
        snapshot.forEach((taskSnapshot) => {
          // Extract name and description from the task
          const taskData = taskSnapshot.val();
          const taskName = taskData.name || "";
          const taskDescription = taskData.description || "";

          // Add name and description to the respective arrays
          taskNames.push(taskName);
          taskDescriptions.push(taskDescription);
        });

        // Get the table element by its id
        const table = document.getElementById("table-for-show");
        let tableTask = document
          .getElementById("tableContainer")
          .getElementsByTagName("tr")[0];
        let tableRows = document
          .getElementById("tableContainer")
          .getElementsByTagName("tr");
        let tableRows2 = document.getElementById("tableContainer");

        if (tableRows[1].id !== "final") {
          const rowsToDelete1 = Array.from(
            tableRows2.querySelectorAll(".added-tasks")
          );
          rowsToDelete1.forEach((row) => row.remove());
        }

        // Loop through the taskNames and taskDescriptions arrays
        for (let i = 0; i < taskNames.length; i++) {
          // Create a new table row
          const newRow = document.createElement("tr");

          // Create table data (cell) elements for the row
          const indexCell = document.createElement("td");
          indexCell.className = "border-delete dark:border-gray-600";
          indexCell.innerHTML = `<div class="flex items-center px-4 py-2">${
            i + 1
          }</div>`;
          newRow.appendChild(indexCell);

          const nameCell = document.createElement("td");
          nameCell.className = "border-delete dark:border-gray-600";
          nameCell.innerHTML = `<div class="flex items-center px-4 py-2"><label >${taskNames[i]}</label></div>`;
          newRow.appendChild(nameCell);

          const descriptionCell = document.createElement("td");
          descriptionCell.className = "border-delete dark:border-gray-600";
          descriptionCell.innerHTML = `<div class="flex items-center px-4 py-2"><p>${taskDescriptions[i]}</p></div>`;
          newRow.appendChild(descriptionCell);

          // Append the new row to the table
          table.appendChild(newRow);

          // Create a new table row
          const newRow2 = document.createElement("tr");
          newRow2.className = "added-tasks";

          // Create table data (cell) elements for the row
          const checkboxCell = document.createElement("td");
          checkboxCell.colSpan = 2;
          checkboxCell.innerHTML = `
    <div class="flex items-center px-4">
      <input
        type="checkbox"
        id="task-${i + 1}-added"
        class="rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white border-blue-500 text-blue-600 focus:ring-blue-400 focus:border-blue-400"
      />
      <label for="task-${i + 1}-added">${taskNames[i]}</label>
    </div>`;
          newRow2.appendChild(checkboxCell);

          // Append the new row to the table

          tableTask.insertAdjacentElement("afterend", newRow2);
          tableTask = newRow2;
        }
      } else {
        console.log("No tasks found in the database.");
      }
    })
    .catch((error) => {
      console.error("Error fetching tasks from database:", error);
    });
}
copyTasksFromDatabase();

document.getElementById("showTaskButton").addEventListener("click", () => {
  const table2 = document.getElementById("table-for-show");
  table2.classList.toggle("hidden");
});

function deleteTasksFromDatabase() {
  const db = getDatabase(app);
  const tasksRef = ref(db, "Task-Manager/Saved-Tasks");

  // Arrays to store task names and descriptions
  const taskNames = [];
  const taskDescriptions = [];

  // Fetch tasks from Firebase Realtime Database
  get(tasksRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Iterate through each task
        snapshot.forEach((taskSnapshot) => {
          // Extract name and description from the task
          const taskData = taskSnapshot.val();
          const taskName = taskData.name || "";
          const taskDescription = taskData.description || "";

          // Add name and description to the respective arrays
          taskNames.push(taskName);
          taskDescriptions.push(taskDescription);
        });

        // Get the table element by its id
        const table = document.getElementById("table-for-delete");

        // Get the last row of the table
        const lastRow = table.rows[table.rows.length - 1];
        // Get the parent node of the last row, which is the table's <tbody> element
        const tbody = lastRow.parentNode;

        // Loop through the taskNames and taskDescriptions arrays
        for (let i = 0; i < taskNames.length; i++) {
          // Create a new table row

          const newRow = document.createElement("tr");
          newRow.className = ""; // Add any additional classes if needed

          // Create table data (cell) elements for the row
          const indexCell = document.createElement("td");
          indexCell.className = "border-delete dark:border-gray-600";
          indexCell.innerHTML = `<div class="flex items-center px-4 py-2">${
            i + 1
          }</div>`;
          newRow.appendChild(indexCell);

          const checkboxCell = document.createElement("td");
          checkboxCell.className = "border-delete dark:border-gray-600";
          checkboxCell.innerHTML = `
    <div class="flex items-center px-4 py-2">
      <input id=${
        taskNames + i
      } type="checkbox" class="rounded dark:border-gray-600 dark:text-white border-blue-500 text-blue-600 focus:ring-blue-400 focus:border-blue-400" />
      <label for=${taskNames + i}>${taskNames[i]}</label>
    </div>
  `;
          newRow.appendChild(checkboxCell);

          const descriptionCell = document.createElement("td");
          descriptionCell.className = "border-delete dark:border-gray-600";
          descriptionCell.innerHTML = `
    <div class="flex items-center px-4 py-2">
      <p>${taskDescriptions[i]}</p>
      <i class="delete-icon dark:text-gray-800 text-red-600 fa-solid fa-trash hover:cursor-pointer text-right ml-auto" id=""></i>
    </div>
  `;
          newRow.appendChild(descriptionCell);

          tbody.insertBefore(newRow, lastRow);
        }

        const checkboxesDelete = document.querySelectorAll(
          ".table-delete input[type='checkbox']"
        );
        const cancelButtonDelete = document.querySelector(
          ".table-delete button:nth-of-type(1)"
        );
        cancelButtonDelete.addEventListener("click", function () {
          checkboxesDelete.forEach(function (checkbox) {
            checkbox.checked = false;
          });
          document.getElementById("table-for-delete").classList.add("hidden");
        });

        document
          .getElementById("delete-delete")
          .addEventListener("click", () => {
            if (table.classList.contains("hidden")) {
              document
                .getElementById("table-for-delete")
                .classList.remove("hidden");
            } else {
              checkboxesDelete.forEach(function (checkbox) {
                checkbox.checked = false;
              });
              document
                .getElementById("table-for-delete")
                .classList.add("hidden");
            }
          });
        const deleteIcon = document.querySelectorAll(".delete-icon");
        // Add click event listener to the delete icon
        deleteIcon.forEach((element) => {
          element.addEventListener("click", function () {
            // Ask for confirmation
            const confirmed = confirm(
              "Are you sure you want to delete this item?"
            );

            // If user confirms, delete the task from Firebase and remove the row
            if (confirmed) {
              // Get the parent <tr> element
              const row = this.closest("tr");

              // Get the task name from the second column of the row
              const taskName = row.querySelector(
                "td:nth-child(2) label"
              ).textContent;

              // Remove the task from Firebase "Task-Manager/Saved-Tasks"

              const db = getDatabase(app);
              const assignedTasksRef = ref(db, "Task-Manager/Assigned-Tasks");
              let assignedTasks = [];

              get(assignedTasksRef)
                .then((assignedSnapshot) => {
                  if (assignedSnapshot.exists()) {
                    // Iterate over assigned tasks to check if any task has the same name
                    assignedSnapshot.forEach((assignedTaskSnapshot) => {
                      const assignedTaskData = assignedTaskSnapshot.val();

                      if (!assignedTasks.includes(assignedTaskData.name)) {
                        assignedTasks.push(assignedTaskData.name);
                      }
                    });
                  }

                  if (assignedTasks.includes(taskName)) {
                    alert(
                      `Task is already assigned, please delete it from assignemnt first, ${taskName}`
                    );
                  } else {
                    deleteTaskByIconFromFirebase(taskName)
                      .then(() => {
                        const tableDel =
                          document.getElementById("table-for-delete");
                        const rowsToDelete1 = Array.from(
                          tableDel.querySelectorAll(
                            "tr:not(:first-child):not(:last-child)"
                          )
                        );

                        // Delete each row
                        rowsToDelete1.forEach((row) => row.remove());
                        deleteTasksFromDatabase();

                        const table2 =
                          document.getElementById("table-for-show");

                        const rowsToDelete = Array.from(
                          table2.querySelectorAll("tr:not(:first-child)")
                        );

                        // Delete each row
                        rowsToDelete.forEach((row) => row.remove());

                        copyTasksFromDatabase();
                      })
                      .catch((error) => {
                        console.error(
                          "Error deleting task from Firebase:",
                          error
                        );
                        alert(
                          "Failed to delete the task. Please try again later."
                        );
                      });
                  }
                })
                .catch((error) => {
                  throw error;
                });
            }
          });
        });
      } else {
        console.log("No tasks found in the database.");
      }
    })
    .catch((error) => {
      console.error("Error fetching tasks from database:", error);
    });
}

deleteTasksFromDatabase();

function deleteTaskByIconFromFirebase(taskName) {
  const db = getDatabase(app);
  const tasksRef = ref(db, "Task-Manager/Saved-Tasks");

  // If no assigned tasks have the same name, proceed to delete the task
  return get(tasksRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((taskSnapshot) => {
          const taskData = taskSnapshot.val();
          if (taskData.name === taskName) {
            // Delete the task from Firebase
            remove(taskSnapshot.ref);
          }
        });
      }
    })

    .catch((error) => {
      throw error;
    });
}

const tableDelete = document.querySelector(".table-delete");

const deleteButton = document.querySelector(
  ".table-delete button:nth-of-type(2)"
);
const deleteAllButton = document.querySelector(
  ".table-delete button:nth-of-type(3)"
);
deleteButton.addEventListener("click", function () {
  const db = getDatabase(app);
  const assignedTasksRef = ref(db, "Task-Manager/Assigned-Tasks");
  let assignedTasks = [];

  get(assignedTasksRef)
    .then((assignedSnapshot) => {
      if (assignedSnapshot.exists()) {
        // Iterate over assigned tasks to check if any task has the same name
        assignedSnapshot.forEach((assignedTaskSnapshot) => {
          const assignedTaskData = assignedTaskSnapshot.val();

          if (!assignedTasks.includes(assignedTaskData.name)) {
            assignedTasks.push(assignedTaskData.name);
          }
        });
      }

      // Return true if the number of rows is greater than 2, otherwise return false
      const checkedRows = tableDelete.querySelectorAll(
        "input[type='checkbox']:checked"
      );

      if (checkedRows.length === 0 && table.rows.length > 2) {
        alert("Select at least one task");
      } else {
        if (tableDelete.rows.length <= 2) {
          alert("There is no task to delete!");
          return;
        }
        const confirmed = confirm("Are you sure you want to delete this item?");

        // If user confirms, delete the row
        if (confirmed) {
          // Get all checkboxes that are checked
          const checkedCheckboxes = tableDelete.querySelectorAll(
            "input[type='checkbox']:checked"
          );

          // Create an array to store the task names
          const taskNames = [];

          // Iterate over the checked checkboxes
          checkedCheckboxes.forEach(function (checkbox) {
            // Get the parent row of the checkbox
            const row = checkbox.closest("tr");

            // Get the task name from the label in the second column of the row
            const taskName = row.querySelector(
              "td:nth-child(2) label"
            ).textContent;

            // Add the task name to the array
            taskNames.push(taskName);
          });
          let intersection = [];

          intersection = taskNames.filter((value) => {
            const isIncluded = assignedTasks.includes(value);

            return isIncluded;
          });
          if (intersection.length > 0) {
            let values = "";
            intersection.forEach((value, index) => {
              // Check if the current value is the last one in the array
              if (index === intersection.length - 1) {
                // If it's the last one, don't add a comma
                values += value;
              } else {
                // If it's not the last one, add a comma
                values += value + ", ";
              }
            });

            alert(
              `The following tasks are already assinged, please delete the assignment before deleting the tasks : ${values}`
            );
          } else {
            // Delete tasks from Firebase
            taskNames.forEach(function (taskName) {
              // Remove the task from Firebase "Task-Manager/Saved-Tasks"
              deleteTaskByIconFromFirebase(taskName)
                .then(() => {
                  //console.log("counter");
                })
                .catch((error) => {
                  console.error("Error deleting task from Firebase:", error);
                  alert("Failed to delete the task. Please try again later.");
                });
            });

            const tableDel = document.getElementById("table-for-delete");
            const rowsToDelete1 = Array.from(
              tableDel.querySelectorAll("tr:not(:first-child):not(:last-child)")
            );

            // Delete each row
            rowsToDelete1.forEach((row) => row.remove());

            setTimeout(deleteTasksFromDatabase, 1000);

            const table2 = document.getElementById("table-for-show");

            const rowsToDelete = Array.from(
              table2.querySelectorAll("tr:not(:first-child)")
            );

            // Delete each row
            rowsToDelete.forEach((row) => row.remove());
            setTimeout(copyTasksFromDatabase, 1000);
          }
        }
      }
    })
    .catch((error) => {
      throw error;
    });
});

deleteAllButton.addEventListener("click", function () {
  if (tableDelete.rows.length <= 2) {
    alert("There is no task to delete!");
    return;
  }

  const confirmation = confirm("Are you sure you want to delete all tasks?");
  if (confirmation) {
    const db = getDatabase(app);
    const assignedTasksRef = ref(db, "Task-Manager/Assigned-Tasks");
    let assignedTasks = [];

    get(assignedTasksRef)
      .then((assignedSnapshot) => {
        if (assignedSnapshot.exists()) {
          // Iterate over assigned tasks to check if any task has the same name
          assignedSnapshot.forEach((assignedTaskSnapshot) => {
            const assignedTaskData = assignedTaskSnapshot.val();

            if (!assignedTasks.includes(assignedTaskData.name)) {
              assignedTasks.push(assignedTaskData.name);
            }
          });
        }

        const rows = Array.from(
          document.querySelectorAll(".table-delete tr")
        ).slice(1, -1);

        const taskNames = [];

        // Create an array to store the task names

        // Skip the first and last rows

        rows.forEach(function (checkbox) {
          // Get the parent row of the checkbox

          // Get the task name from the label in the second column of the row
          const taskName = checkbox.querySelector(
            "td:nth-child(2) label"
          ).textContent;

          // Add the task name to the array
          taskNames.push(taskName);
        });

        let intersection = [];

        intersection = taskNames.filter((value) => {
          const isIncluded = assignedTasks.includes(value);

          return isIncluded;
        });

        if (intersection.length > 0) {
          let values = "";
          intersection.forEach((value, index) => {
            // Check if the current value is the last one in the array
            if (index === intersection.length - 1) {
              // If it's the last one, don't add a comma
              values += value;
            } else {
              // If it's not the last one, add a comma
              values += value + ", ";
            }
          });

          alert(
            `The following tasks are already assinged, please delete the assignment before deleting the tasks : ${values}`
          );
        } else {
          // Delete tasks from Firebase
          taskNames.forEach(function (taskName) {
            // Remove the task from Firebase "Task-Manager/Saved-Tasks"
            deleteTaskByIconFromFirebase(taskName)
              .then(() => {})
              .catch((error) => {
                console.error("Error deleting task from Firebase:", error);
                alert("Failed to delete the task. Please try again later.");
              });
          });

          const tableDel = document.getElementById("table-for-delete");
          const rowsToDelete1 = Array.from(
            tableDel.querySelectorAll("tr:not(:first-child):not(:last-child)")
          );

          // Delete each row
          rowsToDelete1.forEach((row) => row.remove());

          setTimeout(deleteTasksFromDatabase, 1000);

          const table2 = document.getElementById("table-for-show");

          const rowsToDelete = Array.from(
            table2.querySelectorAll("tr:not(:first-child)")
          );

          // Delete each row
          rowsToDelete.forEach((row) => row.remove());
          let tableRows = document
            .getElementById("tableContainer")
            .getElementsByTagName("tr");
          let tableRows2 = document.getElementById("tableContainer");

          if (tableRows[1].id !== "final") {
            const rowsToDelete1 = Array.from(
              tableRows2.querySelectorAll(".added-tasks")
            );
            rowsToDelete1.forEach((row) => row.remove());
          }

          setTimeout(copyTasksFromDatabase, 1000);
        }
      })
      .catch((error) => {
        throw error;
      });
  }
});

// Check if the flag is set in localStorage and call loadEmployee() if it is
if (localStorage.getItem("callLoadEmployee") === "true") {
  loadEmployee();
  localStorage.removeItem("callLoadEmployee"); // Clean up after calling the function
}

document.getElementById("assignTaskButton").addEventListener("click", () => {
  const succedded = document.getElementById("success-task2");

  succedded.classList.add("hidden");
  // Get all checkboxes in the tasks
  const taskCheckboxes = document.querySelectorAll(
    'input[type="checkbox"][id^="task"]'
  );
  const employeeCheckboxes = document.querySelectorAll(
    'input[type="checkbox"][id^="emp"]'
  );

  // Check if at least one checkbox is checked
  const atLeastOnetaskChecked = [...taskCheckboxes].some(
    (checkbox) => checkbox.checked
  );
  const atLeastOneemployeeChecked = [...employeeCheckboxes].some(
    (checkbox) => checkbox.checked
  );

  const startDate = document.getElementById("startDate").value;
  const start = document.getElementById("startDate");
  const completionDate = document.getElementById("completionDate").value;
  const end = document.getElementById("completionDate");
  const datesFilled = startDate !== "" && completionDate !== "";
  const startDateObj = new Date(startDate);
  const completionDateObj = new Date(completionDate);
  const isValidDates = completionDateObj >= startDateObj;

  // If at least one checkbox is checked, prompt confirmation
  if (
    atLeastOnetaskChecked &&
    atLeastOneemployeeChecked &&
    datesFilled &&
    isValidDates
  ) {
    assignTasks()
      .then(() => {
        updateTaskManagerTable();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });

    start.value = null;
    end.value = null;
    // Uncheck all task checkboxes
    taskCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Uncheck all employee checkboxes
    employeeCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  } else {
    if (!succedded.classList.contains("hidden")) {
      succedded.classList.add("hidden");
    }
    alert(
      "Please choose atleast one task, one employee and fill start and completion dates, and completion date can not be before start date!"
    );
  }
});

function assignTasks() {
  return new Promise((resolve, reject) => {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("completionDate").value;
    const file = document.getElementById("fileInput-task").files[0];

    const selectedTasks = [];
    const selectedEmployees = [];
    const database = getDatabase();
    const savedTasksRef = ref(database, "Task-Manager/Saved-Tasks");
    const table = document.querySelector(".mobile-manip");

    // Step 1: Read selected tasks
    const taskCheckboxes = table.querySelectorAll(
      'input[type="checkbox"][id^="task"]:checked'
    );
    taskCheckboxes.forEach((checkbox) => {
      const label = checkbox.parentNode.querySelector("label");
      selectedTasks.push(label.textContent.trim());
    });

    // Step 2: Read selected employees
    const employeeCheckboxes = table.querySelectorAll(
      'input[type="checkbox"][id^="emp"]:checked'
    );
    employeeCheckboxes.forEach((checkbox) => {
      const label = checkbox.parentNode.querySelector("p");
      const label2 = checkbox.parentNode.querySelector("span");

      selectedEmployees.push({
        id: label.textContent,
        name: label2.textContent,
      });
    });

    // Step 3: Read from Firebase and create description array
    const descriptionArray = [];

    get(savedTasksRef).then((snapshot) => {
      snapshot.forEach((taskSnapshot) => {
        const taskData = taskSnapshot.val();
        if (selectedTasks.includes(taskData.name)) {
          let description = taskData.description;
          if (description === "") {
            descriptionArray.push("Not given");
          } else {
            descriptionArray.push(taskData.description);
          }
        }
      });

      // Step 4: Get start and end dates

      let assignedTasks2 = [];
      if (file) {
        selectedTasks.forEach((task) => {
          selectedEmployees.forEach((employee) => {
            assignedTasks2.push({
              name: task,
              description: descriptionArray[selectedTasks.indexOf(task)],
              startDate: startDate,
              endDate: endDate,
              status: "On Progress",
              empAssignedId: employee.id,
              empAssignedName: employee.name,
              empAssignerId: assigner[0],
              empassignerName: assigner[1],
              filenameAdmin: "fileInput-task",
            });
          });
        });
      } else {
        selectedTasks.forEach((task) => {
          selectedEmployees.forEach((employee) => {
            assignedTasks2.push({
              name: task,
              description: descriptionArray[selectedTasks.indexOf(task)],
              startDate: startDate,
              endDate: endDate,
              status: "On Progress",
              empAssignedId: employee.id,
              empAssignedName: employee.name,
              empAssignerId: assigner[0],
              empassignerName: assigner[1],
            });
          });
        });
      }

      const assignedTasksRef = ref(database, "Task-Manager/Assigned-Tasks");
      assignedTasks2.forEach(async (task) => {
        const succedded = document.getElementById("success-task2");
        // Check if there's a file selected for this task
        if (task.filenameAdmin) {
          const newAssignedTaskRef = push(assignedTasksRef);
          // Get the file from the input element
          const file = document.getElementById(task.filenameAdmin).files[0];

          // Create a reference to the Firebase Storage location
          const storageRef = storageRefNominal(
            getStorage(app),
            `Assigned-Tasks/${newAssignedTaskRef.key}/${file.name}`
          );

          try {
            // Upload the file to Firebase Storage
            const snapshot = await uploadBytes(storageRef, file);

            // Update the task object with the download URL
            task.filenameAdminURL = file.name;

            // Update the database with the task including the download URL
            update(
              ref(
                database,
                `Task-Manager/Assigned-Tasks/${newAssignedTaskRef.key}`
              ),
              task
            );

            // Get the file input element
            const fileInput = document.getElementById("fileInput-task");

            // Get the file span element
            const fileSpan = document.getElementById("file-span-task");
            // Clear the selected file by resetting the value of the file input
            fileInput.value = "";
            // Clear the file span content
            fileSpan.textContent = "";
            if (succedded.classList.contains("hidden")) {
              succedded.classList.remove("hidden");
            }
            document.getElementById("remove-file-task").classList.add("hidden");
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        } else {
          // If no file is selected, just update the database with the task
          const newAssignedTaskRef = push(assignedTasksRef);
          set(newAssignedTaskRef, task);
          if (succedded.classList.contains("hidden")) {
            succedded.classList.remove("hidden");
          }
        }
      });
    });
    setTimeout(() => {
      resolve(); // Resolve the promise when tasks are assigned
    }, 1000);
  });
}

//serach main
var table2 = document.getElementById("task-manage");

let tableRows = [];

function updateTaskManagerTable() {
  return new Promise((resolve, reject) => {
    let empAssignerId = sessionStorage.getItem("username").replace(".", "-");

    const db = getDatabase(app);
    // Get reference to the table
    var table = document.getElementById("task-manage");

    // Remove all rows except first and last
    for (var i = table.rows.length - 2; i > 0; i--) {
      table.deleteRow(i);
    }

    // Access Firebase Realtime Database
    let dbRef = ref(db, "Task-Manager/Assigned-Tasks");
    let rowIndex = 1;

    // Retrieve data from Firebase and filter by empAssignerId
    return get(dbRef)
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var task = childSnapshot.val();
          var id = childSnapshot.key;

          if (task.empAssignerId === empAssignerId) {
            // Create new row
            var row = table.insertRow(rowIndex);
            row.className = "text-black new-rows";
            var secret = row.insertCell();
            secret.className = "hidden";
            secret.appendChild(document.createTextNode(id));

            var firstCell = row.insertCell();
            firstCell.className =
              "border-delete dark:border-gray-600 text-center";
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "task-view-" + rowIndex; // Use rowIndex for unique ID
            checkbox.className =
              "rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white border-blue-500 text-blue-600 focus:ring-blue-400 focus:border-blue-400";
            var label = document.createElement("label");
            label.htmlFor = "task-view-" + rowIndex;
            label.textContent = rowIndex; // Incremental row number
            firstCell.appendChild(checkbox);
            firstCell.appendChild(label);

            rowIndex++;

            // Add necessary columns
            var columns = [
              "name",
              "empAssignedName",
              "status",
              "startDate",
              "endDate",
            ];
            columns.forEach((columnName) => {
              if (columnName === "status") {
                var cell = row.insertCell();
                cell.className =
                  "border-delete dark:border-gray-600 text-center status";
                cell.appendChild(document.createTextNode(task[columnName]));
              } else {
                var cell = row.insertCell();
                cell.className =
                  "border-delete dark:border-gray-600 text-center";
                cell.appendChild(document.createTextNode(task[columnName]));
              }
            });

            // Add buttons
            let def1 = false;

            var viewFileBtn = document.createElement("a");
            viewFileBtn.className =
              "anchor-style bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded dark:bg-gray-800 ml-2 mt-2 mb-2 mr-2 text-center";
            viewFileBtn.textContent = "View File";

            if (task.filenameAdminURL) {
              def1 = true;
              var storagePath =
                "Assigned-Tasks/" + id + "/" + task.filenameAdminURL;

              // Create a reference to the file in Firebase Storage
              var storageRef = storageRefNominal(getStorage(app), storagePath);

              // Get the download URL for the file
              getDownloadURL(storageRef)
                .then(function (url) {
                  // Set the file URL as the href attribute
                  viewFileBtn.href = url;
                  // Set the download attribute to prompt the user to save the file with the filename
                  viewFileBtn.download = task.filenameAdminURL;
                })
                .catch(function (error) {
                  // Handle any errors that occur
                  console.error("Error getting download URL:", error);
                  alert("Error in downloading file");
                });
            }

            if (def1) {
              //
            } else {
              viewFileBtn.addEventListener("click", () => {
                alert("There is no file attached");
              });
            }
            let cell1 = row.insertCell();
            cell1.className = "border-delete dark:border-gray-600";

            cell1.appendChild(viewFileBtn);

            let def2 = false;
            var completedFileBtn = document.createElement("a");
            completedFileBtn.className =
              " anchor-style bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded dark:bg-gray-800 ml-2 mt-2 mb-2 mr-2 text-center";
            completedFileBtn.textContent = "View Completed File";
            if (task.fileNameEmpURL) {
              def2 = true;

              var storagePath =
                "Completed-Tasks/" + id + "/" + task.fileNameEmpURL;

              // Create a reference to the file in Firebase Storage
              var storageRef = storageRefNominal(getStorage(app), storagePath);

              // Get the download URL for the file
              getDownloadURL(storageRef)
                .then(function (url) {
                  // Create a temporary anchor element

                  // Set the file URL as the href attribute
                  completedFileBtn.href = url;
                  // Set the download attribute to prompt the user to save the file with the filename
                  completedFileBtn.download = task.fileNameEmpURL;
                })
                .catch(function (error) {
                  // Handle any errors that occur
                  console.error("Error getting download URL:", error);
                  alert("Error in downloading file");
                });
            }

            if (def2) {
              //
            } else {
              completedFileBtn.addEventListener("click", () => {
                alert("There is no file attached");
              });
            }
            let cell2 = row.insertCell();
            cell2.className = "border-delete dark:border-gray-600";
            cell2.appendChild(completedFileBtn);

            // Add last button
            var commentsBtn = document.createElement("button");
            commentsBtn.className =
              "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded dark:bg-gray-800 ml-2 mt-2 mb-2 mr-2 view-comments-button";
            commentsBtn.textContent = "View/ Add Comments";

            let cell3 = row.insertCell();
            cell3.className = "border-delete-no-left dark:border-gray-600";
            cell3.appendChild(commentsBtn);

            // Add delete icon
            var deleteIcon = document.createElement("i");
            deleteIcon.className =
              "dark:text-gray-800 text-red-600 fa-solid fa-trash hover:cursor-pointer text-right ml-auto delete-icon-2";

            let cell4 = row.insertCell();
            cell4.className = "border-delete dark:border-gray-600";
            cell4.appendChild(deleteIcon);
            tableRows.push(row);
          }
        });
        resolve();
      })
      .catch((error) => {
        console.log("Error getting data:", error);
        reject(error);
      });
  });
}

updateTaskManagerTable()
  .then(after)
  .catch((error) => {
    console.error("Error updating task manager table:", error);
  });

table2 = document.getElementById("task-manage");

// Get the search input element
var searchInput2 = document.getElementById("search-input");

// Get the search icon element
var searchIcon2 = document.getElementById("search-icon");

// Get the rotate icon element
var rotateIcon = document.getElementById("rotate-icon");

var taskRows = Array.from(table2.rows).slice(1, -1);

// Add click event listener to the search icon
searchIcon2.addEventListener("click", function () {
  // Get the search query
  var searchQuery = searchInput2.value.toLowerCase().trim();

  // Get all task rows excluding the first and last

  // Loop through each task row
  tableRows.forEach(function (row) {
    let rowData = "";
    const cells = row.querySelectorAll("td");

    for (let i = 1; i < cells.length - 3; i++) {
      rowData += cells[i].textContent.toLowerCase() + " ";
    }

    if (rowData.includes(searchQuery)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

rotateIcon.addEventListener("click", function () {
  tableRows.forEach(function (row) {
    row.style.display = "";
  });
  searchInput2.value = "";
});

// Get the select element
var statusSelect = document.querySelector("#status-select");

// Add change event listener to the select element
statusSelect.addEventListener("change", function () {
  // Get the selected status value
  var selectedStatus = this.value.toLocaleLowerCase().trim();

  // Get all task rows excluding the first and last
  var taskRows2 = Array.from(tableRows);

  // Loop through each task row
  taskRows2.forEach(function (row) {
    // Get the status from the row
    var status = row
      .querySelector(".status")
      .textContent.toLocaleLowerCase()
      .trim();

    // Show the row if it matches the selected status, hide otherwise
    if (selectedStatus === "status(all)") {
      tableRows.forEach(function (row) {
        row.style.display = "";
      });
    } else {
      if (status === selectedStatus) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });
});

//manage delete

function after() {
  const cancelButton2 = document.querySelector(".cancel-2");
  cancelButton2.addEventListener("click", function () {
    const checkboxes2 = [];
    tableRows.forEach((row) => {
      const checkbox = row.querySelector("input[type='checkbox']:checked");
      if (checkbox) {
        checkboxes2.push(checkbox);
      }
    });
    checkboxes2.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  });
  tableRows.forEach(function (row) {
    const deleteIcon2 = row.querySelector(".delete-icon-2");

    // Add click event listener to the delete icon
    deleteIcon2.addEventListener("click", function () {
      // Ask for confirmation
      const confirmed = confirm("Are you sure you want to delete this item?");

      // If user confirms, delete the row
      if (confirmed) {
        const row = this.closest("tr");
        const cell = row.querySelectorAll("td");
        const id = cell[0].textContent;

        deleteTaskByIconAssigned(id);
        updateTaskManagerTable();
      }
    });
  });

  const deleteAssign = document.querySelector(".delete-button");

  deleteAssign.addEventListener("click", () => {
    const checkedRows = [];
    tableRows.forEach((row) => {
      const checkbox = row.querySelector("input[type='checkbox']:checked");
      if (checkbox) {
        checkedRows.push(checkbox);
      }
    });

    if (checkedRows.length === 0 && tableRows.length > 0) {
      alert("Select at least one task");
    } else {
      if (tableRows.length === 0) {
        alert("There is no task to delete!");
        return;
      }
      const confirmed = confirm("Are you sure you want to delete this item/s?");

      // If user confirms, delete the row
      if (confirmed) {
        checkedRows.forEach((row2) => {
          const row = row2.closest("tr");
          const cell = row.querySelectorAll("td");

          const id = cell[0].textContent;

          deleteTaskByIconAssigned(id);
        });
        updateTaskManagerTable();
      }
    }
  });

  const deleteAssignAll = document.querySelector(".delete-all-button");

  deleteAssignAll.addEventListener("click", () => {
    if (tableRows.length === 0) {
      alert("There is no task to delete!");
      return;
    }
    const confirmed = confirm("Are you sure you want to delete all items?");

    // If user confirms, delete the row
    if (confirmed) {
      tableRows.forEach((row) => {
        const cell = row.querySelectorAll("td");

        const id = cell[0].textContent;

        deleteTaskByIconAssigned(id);
      });
      updateTaskManagerTable();
    }
  });
}

function deleteTaskByIconAssigned(id) {
  const db = getDatabase(app);
  const tasksRef = ref(db, "Task-Manager/Assigned-Tasks/" + id); // Construct reference to the specific task using its unique ID

  return remove(tasksRef) // Remove the task directly using its reference
    .then(() => {
      console.log("Task deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting task: ", error);
      throw error;
    });
}

function empUpdateTaskManagerTable() {
  return new Promise((resolve, reject) => {
    let counter = 0;
    let empAssignedId = sessionStorage.getItem("username").replace(".", "-");

    const db = getDatabase(app);
    let contain = document.getElementById("main-10");
    let giantContainer = document.getElementById("main-detail");

    // Access Firebase Realtime Database
    var dbRef = ref(db, "Task-Manager/Assigned-Tasks");
    let taskIndex = 1;

    // Remove any existing div elements inside the assigned-tasks div
    contain.innerHTML = "";

    // Retrieve data from Firebase and filter by empAssignerId
    return get(dbRef)
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var task = childSnapshot.val();
          var id = childSnapshot.key;
          let urlFinal = "";
          let urlFinal2 = "";

          if (task.empAssignedId === empAssignedId) {
            if (task.filenameAdminURL) {
              var storagePath =
                "Assigned-Tasks/" + id + "/" + task.filenameAdminURL;

              // Create a reference to the file in Firebase Storage
              var storageRef = storageRefNominal(getStorage(app), storagePath);

              // Get the download URL for the file
              getDownloadURL(storageRef)
                .then(function (url) {
                  // Set the file URL as the href attribute
                  urlFinal = url;
                  // Set the download attribute to prompt the user to save the file with the filename
                })
                .catch(function (error) {
                  // Handle any errors that occur
                  console.error("Error getting download URL:", error);
                  alert("Error in downloading file");
                });
            }
            if (task.fileNameEmpURL) {
              var storagePath =
                "Completed-Tasks/" + id + "/" + task.fileNameEmpURL;

              // Create a reference to the file in Firebase Storage
              var storageRef = storageRefNominal(getStorage(app), storagePath);

              // Get the download URL for the file
              getDownloadURL(storageRef)
                .then(function (url) {
                  // Set the file URL as the href attribute
                  urlFinal2 = url;
                  console.log(urlFinal2);

                  // Set the download attribute to prompt the user to save the file with the filename
                })
                .then(() => {})
                .catch(function (error) {
                  // Handle any errors that occur
                  console.error("Error getting download URL:", error);
                  alert("Error in downloading file");
                });
            }
            counter++;

            // Create new row for task
            const taskDiv = document.createElement("div");
            taskDiv.classList.add(
              "select-detail",
              "w-full",
              "border",
              "hover:cursor-pointer",
              "hover:bg-gray-100",
              "dark:hover:bg-gray-700",
              "dark:bg-gray-800",
              "border-black",
              "border-thin",
              "p-6",
              "h-32",
              "mt-2",
              "mb-2",
              "rounded"
            );
            taskDiv.id = `task-${taskIndex}`;

            // Add task details
            taskDiv.innerHTML = `
              <div class="flex items-center flex-row">
                <i class="fa-solid fa-clipboard-check font-s3 mr-4 dark:text-white"></i>
                <div>
                  <p class="font-s2-3 dark:text-white">${task.name}</p>
                  <p class="font-s text-gray-400">${task.startDate}</p>
                </div>
              </div>
            `;

            // Create div for task details
            const detailsDiv = document.createElement("div");
            detailsDiv.classList.add(
              "flex",
              "flex-col",
              "item-start",
              "mx-4",
              "my-4",
              "hidden"
            );
            detailsDiv.id = `detail-${taskIndex}`;

            detailsDiv.innerHTML = `
              <i class="fa-solid fa-arrow-left hover:cursor-pointer font-s3 text-gray-600 py-4" id="back-arrow-${taskIndex}"  onclick="this.parentElement.classList.add('hidden'); document.getElementById('main-10').classList.remove('hidden');"></i>
              <div class="flex flex-row item-start">
                <i class="fa-solid fa-circle-info font-s3 text-gray-600 pad-l"></i>
                <div class="flex flex-col w-full">
                  <h1 class="font-s3">Details</h1>
                  <p class="font-s text-gray-400">Task Name: ${task.name}</p>
                  <p class="font-s text-gray-400">Description: ${task.description}</p>
                  <p class="font-s text-gray-400">Assigned By: ${task.empassignerName}</p>
                  <p class="font-s text-gray-400">Start Date: ${task.startDate}</p>
                  <p class="font-s text-gray-400">End Date: ${task.endDate}</p>
                  <!-- Additional details here -->
                  <div class="border-me flex flex-row">
                  <p class="font-s2-3 mr-4">File:</p>
                  <a id="link-${taskIndex}" class="anchor-style bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded dark:bg-gray-800 ml-2 mt-2 mb-2 mr-2 text-center" 
     >View File</a>
                </div>
                </div>
              </div>
              <div
              class="w-full border border-black border-thin mt-4 rounded shadow-lg"
            >
              <div class="flex items-start flex-col ml-4 mt-4">
                <p class="font-s2-3" id="num-comments">Your work</p>

                <div class="flex items-center">
                  <input type="file" class="hidden" id="fileInput-${taskIndex}" />
                 
                  <div id="button-file" class="mb-2">
                  <div class="mt-2 ">
                  <button
                      class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded dark:bg-gray-800 mb-2 mt-2"
                      id="done-${taskIndex}"
                    >
                      Mark As Done
                    </button>
                  </div>
                  <div class=" mt-2" id="">
                  <button
                      class=" hidden bg-red-500  hover:bg-red-600 text-white py-2 px-4 rounded dark:bg-gray-800 mb-2 mt-2"
                      id="undone-${taskIndex}"
                    >
                      Unmark As Done
                    </button>
                  </div>
                  <div class="mt-2 ">
                  <a id="view-${taskIndex}" class="hidden anchor-style bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded dark:bg-gray-800  mt-2 mb-2 mr-2 text-center" 
     >View File</a>
                 
                  </div>
                    <button
                      class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded dark:bg-gray-800 mb-2 mt-2"
                      id="openFileDialogBtn-${taskIndex}"
                    >
                      Choose File
                    </button>
                    <div class="mt-2 mb-2">
                    <button
                      class=" hidden bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded dark:bg-gray-800 mb-2 mt-2"
                      id="uploadBtn-${taskIndex}"
                    >
                      Upload File
                    </button>
                    <span id="file-span-${taskIndex}"></span>
                    </div>
                    <div class="mt-2 mb-2">
                      <button
                        class="hidden bg-red-500 dark:bg-gray-800 hover:bg-red-600 text-white py-2 px-4 rounded mr-4 border-red-600"
                        id="remove-file-${taskIndex}"
                      >
                        Remove File
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-full border border-black border-thin mt-4 rounded shadow-lg"
            >
              <div class="flex items-start flex-col ml-4 mt-4">
                <div class="flex flex-row items-center">
                  <i class="fa-regular fa-user font-s2-3 mr-2"></i>
                  <p class="font-s2-3" id="num-comments-2">Private comments</p>
                </div>

                <div
                  class="flex flex-row items-center w-full my-4"
                  id="insert-element-2"
                >
                  <textarea
                    id="newText-2"
                    rows="2"
                    style="resize: none"
                    placeholder="Add private comment..."
                    class="task-adder border border-gray-600 focus:outline-none dark:text-white dark:border-gray-600 dark:bg-gray-600 px-4 py-2 rounded w-full mr-2"
                  ></textarea>
                  <i
                    class="fa-solid fa-arrow-right font-s2-3 mr-4 hover:cursor-pointer"
                    id="insertContentBtn-2"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            `;

            // Append task div and details div to container
            contain.appendChild(taskDiv);
            giantContainer.appendChild(detailsDiv);

            taskDiv.addEventListener("click", () => {
              detailsDiv.classList.remove("hidden");
              contain.classList.add("hidden");
            });
            const viewer = document.getElementById(`view-${taskIndex}`);

            if (task.fileNameEmpURL) {
              viewer.href = urlFinal2;
              console.log(urlFinal2);
              viewer.download = task.fileNameEmpURL;
            }
            let linkControl = document.getElementById(`link-${taskIndex}`);
            linkControl.addEventListener("click", () => {
              if (!task.filenameAdminURL) {
                alert("There is no file attached");
              } else {
                linkControl.href = urlFinal;
                linkControl.download = task.filenameAdminURL;
              }
            });

            if (task.fileNameEmpURL) {
              document
                .getElementById(`openFileDialogBtn-${taskIndex}`)
                .classList.add("hidden");
              document
                .getElementById(`remove-file-${taskIndex}`)
                .classList.remove("hidden");
              document
                .getElementById(`view-${taskIndex}`)
                .classList.remove("hidden");
            }

            const chooser = document.getElementById(
              `openFileDialogBtn-${taskIndex}`
            );
            const dones = document.getElementById(`done-${taskIndex}`);
            const undones = document.getElementById(`undone-${taskIndex}`);
            const filesManage = document.getElementById(
              `fileInput-${taskIndex}`
            );
            const fileSpanManage = document.getElementById(
              `file-span-${taskIndex}`
            );

            if (task.status === "Completed") {
              dones.classList.add("hidden");
              undones.classList.remove("hidden");
            } else {
              dones.classList.remove("hidden");
              undones.classList.add("hidden");
            }

            document
              .getElementById(`done-${taskIndex}`)
              .addEventListener("click", function () {
                update(ref(database, `Task-Manager/Assigned-Tasks/${id}`), {
                  status: "Completed",
                })
                  .then(() => {
                    alert("You accomplished the task! Congratulations!");
                    dones.classList.add("hidden");
                    undones.classList.remove("hidden");
                  })
                  .catch((error) => {
                    console.error(error);
                    alert("You failed to complete the task! Try again later.");
                  });
              });
            document
              .getElementById(`undone-${taskIndex}`)
              .addEventListener("click", function () {
                update(ref(database, `Task-Manager/Assigned-Tasks/${id}`), {
                  status: "On Progress",
                })
                  .then(() => {
                    alert("You are now on progress again!");
                    undones.classList.add("hidden");
                    dones.classList.remove("hidden");
                  })
                  .catch((error) => {
                    console.error(error);
                    alert(
                      "You failed to be on progress again!, Try again later."
                    );
                  });
              });

            const openFileDialogBtn = document.getElementById(
              `openFileDialogBtn-${taskIndex}`
            );
            const fileInput = filesManage;

            // Add event listener to the button
            openFileDialogBtn.addEventListener("click", () => {
              // Trigger the file input when button is clicked
              fileInput.click();
            });

            let selectedFile;
            let detail = document.getElementById(`file-span-${taskIndex}`);
            const remover = document.getElementById(`remove-file-${taskIndex}`);
            const uploader = document.getElementById(`uploadBtn-${taskIndex}`);

            // Add event listener to the file input to handle file selection
            fileInput.addEventListener("change", (event) => {
              // Get the selected file
              selectedFile = event.target.files[0];

              // const detail = document.getElementById(`file-span-${taskIndex}`);

              // Get the selected file name
              const fileName = selectedFile.name;

              // Check if the file name length is greater than 20 characters
              const displayName =
                fileName.length > 35
                  ? fileName.substring(0, 35) + "..."
                  : fileName;

              // Set the innerHTML of detail element to the displayed name
              detail.innerHTML = displayName;

              remover.classList.remove("hidden");
              uploader.classList.remove("hidden");
            });

            document
              .getElementById(`uploadBtn-${taskIndex}`)
              .addEventListener("click", () => {
                const storageRef = storageRefNominal(
                  getStorage(app),
                  `Completed-Tasks/${id}/${selectedFile.name}`
                );
                try {
                  // Upload the file to Firebase Storage
                  uploadBytes(storageRef, selectedFile)
                    .then((snapshot) => {
                      // Update the database with the task including the file name
                      return update(
                        ref(database, `Task-Manager/Assigned-Tasks/${id}`),
                        {
                          fileNameEmpURL: selectedFile.name,
                        }
                      );
                    })
                    .then(() => {
                      // Update UI or perform other actions after successful database update
                      chooser.classList.add("hidden");
                      alert("File uploaded successfully!");
                      uploader.classList.add("hidden");
                      viewer.classList.remove("hidden");
                    })
                    .catch((error) => {
                      console.error(
                        "Error during file upload or database update:",
                        error
                      );
                    });
                } catch (error) {
                  console.error("Error uploading file:", error);
                  alert("File uploading failed!, Try again later!");
                }
              });

            viewer.addEventListener("click", function () {
              let database = ref(
                db,
                `Task-Manager/Assigned-Tasks/${id}/fileNameEmpURL`
              );
              return get(database)
                .then((snap) => {
                  if (snap.val()) {
                    let storagePath =
                      "Completed-Tasks/" + id + "/" + snap.val();

                    // Create a reference to the file in Firebase Storage
                    let storageRef2 = storageRefNominal(
                      getStorage(app),
                      storagePath
                    );

                    // Get the download URL for the file
                    getDownloadURL(storageRef2)
                      .then(function (url) {
                        // Set the file URL as the href attribute
                        urlFinal2 = url;
                        viewer.href = urlFinal2;
                        viewer.download = snap.val();
                        // Set the download attribute to prompt the user to save the file with the filename
                      })
                      .catch(function (error) {
                        // Handle any errors that occur
                        console.error("Error getting download URL:", error);
                        alert("Error in downloading file");
                      });
                  } else {
                    alert("No file is attached!");
                  }
                })
                .catch((error) => {
                  console.error("error is link attachement", error);
                });
            });

            document
              .getElementById(`remove-file-${taskIndex}`)
              .addEventListener(
                "click",

                function () {
                  var database = ref(
                    db,
                    `Task-Manager/Assigned-Tasks/${id}/fileNameEmpURL`
                  );
                  return get(database)
                    .then((snap) => {
                      if (snap.val()) {
                        let storagePath =
                          "Completed-Tasks/" + id + "/" + snap.val();

                        // Create a reference to the file in Firebase Storage
                        let storageRef = storageRefNominal(
                          getStorage(app),
                          storagePath
                        );

                        // Delete the file
                        deleteObject(storageRef)
                          .then(() => {
                            update(
                              ref(db, `Task-Manager/Assigned-Tasks/${id}`),
                              {
                                fileNameEmpURL: null,
                              }
                            );

                            console.log("File deleted successfully.");
                            alert("File removed successfuly.");
                            remover.classList.add("hidden");
                            viewer.classList.add("hidden");

                            chooser.classList.remove("hidden");
                          })
                          .catch((error) => {
                            console.error("Error deleting file:", error);
                            alert("Error deleting file: Try again later!");
                          });
                      }

                      const fileInput = filesManage;

                      // Get the file span element
                      const fileSpan = fileSpanManage;
                      // Clear the selected file by resetting the value of the file input
                      fileInput.value = "";
                      // Clear the file span content
                      fileSpan.textContent = "";
                    })
                    .catch((error) => {
                      console.error("removing file error:", error);
                    });
                }
              );

            taskIndex++;
          }
        });
        if (counter === 0) {
          contain.innerHTML = `<p class="font-s2-3 ">No tasks assigned</p>`;
        }

        resolve(); // Resolve the promise when iteration completes
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        reject(error);
      });
  });
}

empUpdateTaskManagerTable();
