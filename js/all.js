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

function generateTable() {
  index = 1;
  // Get the table container
  const tableContainer = document.getElementById("tableContainer");

  // Clear any existing content
  tableContainer.innerHTML = "";

  // Create a new table element
  const table = document.createElement("table");
  table.className =
    "table-auto  w-50 border-collapse  border-manage  dark:border-gray-600 border-solid";

  // Create table header
  const headerRow = table.insertRow();
  const headerCell = headerRow.insertCell();
  headerCell.colSpan = "2";
  headerCell.className =
    "bg-blue-600 text-white px-4 py-2 font-bold text-center  dark:bg-gray-800";
  headerCell.textContent = "Tasks List";

  // Create task rows
  const tasks = ["Research", "Development", "Teaching"];
  tasks.forEach((task) => {
    const taskRow = table.insertRow();

    taskRow.classList.add("flex");

    const checkboxCell = taskRow.insertCell();
    const taskCell = taskRow.insertCell();
    const taskId = "task" + index;
    checkboxCell.innerHTML = `<input type="checkbox" id="${taskId}" class="rounded border-blue-500 text-blue-600 focus:ring-blue-400 focus:border-blue-400">`;

    checkboxCell.classList.add("ml-4");
    const label = document.createElement("label");
    label.textContent = task;
    label.htmlFor = taskId;

    // Insert label into task cell

    taskCell.appendChild(label);
    //taskCell.textContent = task;
    index++;
  });

  const Addrow = [
    [
      "Start Date*",
      '<input id="startDate" type="date" class="border border-gray-300 focus:outline-none focus:border-blue-500 dark:text-white dark:border-gray-600 dark:bg-gray-600 px-4 py-2 rounded">',
    ],
    [
      "Completion Date*",
      '<input id="completionDate" type="date" class="border border-gray-300 focus:outline-none focus:border-blue-500 dark:text-white dark:border-gray-600 dark:bg-gray-600 px-4 py-2 rounded">',
    ],

    [
      "File",
      `<div class="flex items-center" >
      <input type="file" class= "hidden" id="fileInput" >
      <div id="button-file">
      <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded  dark:bg-gray-800" id = "openFileDialogBtn">Choose File</button>
      <span id="file-span"></span>
      </div>
    </div>`,
    ],
  ];

  Addrow.forEach((row) => {
    const formRow = table.insertRow();
    const labelCell = formRow.insertCell();
    const inputCell = formRow.insertCell();
    labelCell.textContent = row[0];
    inputCell.innerHTML = row[1];

    labelCell.className = "px-4 py-2  border-row dark:border-gray-600";
    inputCell.className = "px-4 py-2  border-row dark:border-gray-600 ";
  });

  // Create "Add new task" row
  const addTaskRow = table.insertRow();
  const addTaskCell = addTaskRow.insertCell();
  addTaskCell.colSpan = "2";
  addTaskCell.textContent = "Add New Task";
  addTaskCell.className =
    "font-bold bg-blue-600   dark:bg-gray-800 text-white px-4 py-2 font-bold text-center relative";

  // Create icon
  const icon = document.createElement("div");
  icon.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
  icon.className =
    "absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white";
  addTaskCell.appendChild(icon);

  const formRows = [
    [
      "Task Name*",
      '<input type="text" class="border task-adder border-gray-300 focus:outline-none focus:border-blue-500 dark:text-white dark:border-gray-600 dark:bg-gray-600 px-4 py-2 rounded w-full">',
    ],

    [
      "Description",
      '<textarea rows="5" style="resize: none;" class=" task-adder border border-gray-300 focus:outline-none focus:border-blue-500 dark:text-white dark:border-gray-600 dark:bg-gray-600 px-4 py-2 rounded w-full "></textarea>',
    ],
  ];

  formRows.forEach((row) => {
    const formRow = table.insertRow();
    formRow.className = "form-row hidden";
    const labelCell = formRow.insertCell();
    const inputCell = formRow.insertCell();
    labelCell.textContent = row[0];
    inputCell.innerHTML = row[1];
    if (!(row[0] === "Description")) {
      labelCell.className = "px-4 py-2  border-row dark:border-gray-600 ";
      inputCell.className = "px-4 py-2  border-row dark:border-gray-600 ";
    } else {
      labelCell.className = "px-4 py-2  ";
      inputCell.className = "px-4 py-2  ";
    }
  });

  // Create a button row
  const buttonRow = table.insertRow();
  const buttonCell = buttonRow.insertCell();
  buttonCell.colSpan = "2";

  buttonCell.innerHTML = `
  <div class="flex flex-row" id="success-message">
 
    <button class=" hidden  dark:bg-gray-800 form-row bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-4 mb-4  border-red-600  ml-auto" id="cancelButton">Cancel</button>
    <button class="hidden  dark:bg-gray-800 form-row bg-blue-500  hover:bg-blue-600 text-white py-2 px-4 rounded mr-4 mb-4   border-blue-600 " id="addTaskButton">Add</button>
    </div>
    
   `;

  // Create table header
  const footerRow = table.insertRow();
  const footerCell = footerRow.insertCell();
  footerCell.colSpan = "2";
  footerCell.className =
    "bg-blue-600 text-white px-4 py-2 font-bold text-center  dark:bg-gray-800";
  footerCell.textContent = "Employees List";

  // Create task rows
  const employees = ["Dawit Girma", "Saron Tewodros", "Henok Kinde"];
  employees.forEach((employee) => {
    const employeeRow = table.insertRow();
    employeeRow.classList.add("flex");
    const checkboxCell = employeeRow.insertCell();
    const employeeCell = employeeRow.insertCell();
    const empID = "employee" + index2;
    checkboxCell.innerHTML = `<input type="checkbox" id="${empID}">`;
    checkboxCell.classList.add("ml-4");

    const label = document.createElement("label");
    label.textContent = employee;
    label.htmlFor = empID;
    employeeCell.appendChild(label);

    // Insert label into task cell

    index2++;
  });

  // Create a button row
  const buttonRow2 = table.insertRow();
  const buttonCell2 = buttonRow2.insertCell();
  buttonCell2.colSpan = "2";

  buttonCell2.innerHTML = `<div class="flex flex-row" id="success-message-2">
 
    <button class=" bg-red-500 dark:bg-gray-800  hover:bg-red-600 text-white py-2 px-4 rounded mr-4 mb-4  border-red-600  ml-auto" id="cancelButton2">Cancel</button>
    <button class=" bg-blue-500  dark:bg-gray-800  hover:bg-blue-600 text-white py-2 px-4 rounded mr-4 mb-4   border-blue-600 " id="assignTaskButton">Assign</button>
    </div>
    
   `;
  // Append the table to the container
  tableContainer.appendChild(table);
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
      fileName.length > 20 ? fileName.substring(0, 20) + "..." : fileName;

    // Set the innerHTML of detail element to the displayed name
    detail.innerHTML = displayName;
  });

  const formRows2 = table.querySelectorAll("form-row");
  formRows2.forEach((row) => {
    row.classList.add("hidden");
  });

  function toggleRowsVisibility() {
    const succedded = document.getElementById("success-task");
    if (!succedded.classList.contains("hidden")) {
      succedded.classList.add("hidden");
    }

    if (!isNonEmpty) {
      const formRows = document.querySelectorAll(".form-row");
      const iconC = icon.querySelector("i");

      formRows.forEach((row) => {
        if (row.classList.contains("hidden") && row.id !== "success-task") {
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
  }

  // Change cursor to pointer on hover
  icon.addEventListener("mouseenter", () => {
    icon.style.cursor = "pointer";
  });

  // Change cursor back to default on mouse leave
  icon.addEventListener("mouseleave", () => {
    icon.style.cursor = "default";
  });

  let isNonEmpty = false;
  const addButton = document.getElementById("cancelButton");
  addButton.addEventListener("click", showAlert);
  icon.addEventListener("click", showAlert);

  icon.addEventListener("click", toggleRowsVisibility);

  addButton.addEventListener("click", toggleRowsVisibility);

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
      }
    }
  }

  //success message
  const success = `<p id="success-task" class=" hidden form-row text-center bg-green-100-rounded text-green-800 ml-4 mr-4 mb-4">You have successfully added a task. </p>`;
  document
    .getElementById("success-message")
    .insertAdjacentHTML("afterend", success);

  document
    .getElementById("addTaskButton")
    .addEventListener("click", function () {
      const succedded = document.getElementById("success-task");
      const taskNameInput = document.querySelector("input.task-adder");
      const descriptionInput = document.querySelector("textarea.task-adder");

      const task = taskNameInput.value.trim();
      // Validate Task Name is not empty
      if (taskNameInput.value.trim() === "") {
        if (!succedded.classList.contains("hidden")) {
          succedded.classList.add("hidden");
        }
        alert("Task Name is required.");

        return; // Stop the function if Task Name is empty
      }

      const taskRow = table.insertRow(index);
      taskRow.classList.add("flex");

      const checkboxCell = taskRow.insertCell();
      const taskCell = taskRow.insertCell();
      checkboxCell.innerHTML =
        '<input type="checkbox" class="rounded border-blue-500 text-blue-600 focus:ring-blue-400 focus:border-blue-400">';
      checkboxCell.classList.add("ml-4");
      taskCell.textContent = task;
      index++;
      taskNameInput.value = "";
      descriptionInput.value = "";
      if (succedded.classList.contains("hidden")) {
        succedded.classList.remove("hidden");
      }
    });

  function cancelButtonClick() {
    const succedded = document.getElementById("success-task2");
    // Get all checkboxes in the tasks
    const taskCheckboxes = document.querySelectorAll('input[type="checkbox"]');

    // Check if at least one checkbox is checked
    const atLeastOneChecked = [...taskCheckboxes].some(
      (checkbox) => checkbox.checked
    );

    // If at least one checkbox is checked, prompt confirmation
    if (atLeastOneChecked) {
      if (!succedded.classList.contains("hidden")) {
        succedded.classList.add("hidden");
      }
      const confirmed = confirm(
        "Are you sure you want to cancel? All the inserted data will be lost!"
      );

      // If confirmed, perform cancel action
      if (confirmed) {
        tableContainer.innerHTML = "";
      }
    } else {
      tableContainer.innerHTML = "";
    }
  }
  document
    .getElementById("cancelButton2")
    .addEventListener("click", cancelButtonClick);

  const success2 = `<p id="success-task2" class="hidden text-center bg-green-100-rounded text-green-800 ml-4 mr-4 mb-4">You have successfully assigned task(s). </p>`;
  document
    .getElementById("success-message-2")
    .insertAdjacentHTML("afterend", success2);

  function assignButtonClick() {
    const succedded = document.getElementById("success-task2");

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

    // If at least one checkbox is checked, prompt confirmation
    if (atLeastOnetaskChecked && atLeastOneemployeeChecked && datesFilled) {
      if (succedded.classList.contains("hidden")) {
        succedded.classList.remove("hidden");
      }
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
    } else {
      if (!succedded.classList.contains("hidden")) {
        succedded.classList.add("hidden");
      }
      alert(
        "Please choose atleast one task, one employee and fill start and completion dates!"
      );
    }
  }
  document
    .getElementById("assignTaskButton")
    .addEventListener("click", assignButtonClick);

  // Show the table container
  tableContainer.classList.remove("hidden");
}

// Add event listener to the button
document
  .getElementById("generateTableButton")
  .addEventListener("click", generateTable);

const logoutButton = document.getElementById("button-logout");

logoutButton.addEventListener("click", function () {
  window.location.href = "index.html";
});

//
