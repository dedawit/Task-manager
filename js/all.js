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

function generateTable() {
  index = 1;
  // Get the table container
  const tableContainer = document.getElementById("tableContainer");

  // Clear any existing content
  tableContainer.innerHTML = "";

  // Create a new table element
  const table = document.createElement("table");
  table.className =
    "table-auto  w-50 border-collapse  border-manage  dark:border-gray-600 border-solid mobile-manip";

  // Create table header
  const headerRow = table.insertRow();
  const headerCell = headerRow.insertCell();
  headerCell.colSpan = "2";
  headerCell.className =
    "bg-blue-600 text-white px-4 py-2 font-bold text-center  dark:bg-gray-800";
  headerCell.textContent = "Tasks List";

  const tasks = ["Research", "Development", "Teaching"];
  tasks.forEach((task) => {
    const taskRow = table.insertRow();

    // Create cell for checkbox
    const Cell = taskRow.insertCell();
    const taskId = "task" + index;

    Cell.colSpan = "2";

    Cell.innerHTML = `
    <div class= "flex items-center px-4 ">
    <input type="checkbox" id="${taskId}" class="rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white border-blue-500 text-blue-600 focus:ring-blue-400 focus:border-blue-400">
    <label for="${taskId}"> ${task}</label> 

    </div>
    `;

    // Increment index for unique IDs
    index++;
  });

  const Addrow = [
    [
      `<span>Start Date</span><span class="important-marker">*</span>`,
      '<input id="startDate" type="date" class="border border-gray-300 focus:outline-none focus:border-blue-500 dark:text-white dark:border-gray-600 dark:bg-gray-600 px-4 py-2 rounded">',
    ],
    [
      `<span>Completion Date</span><span class="important-marker">*</span>`,

      '<input id="completionDate" type="date" class="border border-gray-300 focus:outline-none focus:border-blue-500 dark:text-white dark:border-gray-600 dark:bg-gray-600 px-4 py-2 rounded">',
    ],

    [
      `<span>File</span>`,

      `<div class="flex items-center" >
      <input type="file" class= "hidden" id="fileInput" >
      <div id="button-file">
      <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded  dark:bg-gray-800" id = "openFileDialogBtn">Choose File</button>
      <span id="file-span"></span>
      <div>
      <button class="bg-red-500 dark:bg-gray-800 hover:bg-red-600 text-white py-2 px-4 rounded mr-4 mt-2 border-red-600 hidden " id="remove-file">Remove File</button>
      </div>
      </div>
    </div>`,
    ],
  ];

  Addrow.forEach((row) => {
    const formRow = table.insertRow();
    const labelCell = formRow.insertCell();
    const inputCell = formRow.insertCell();
    labelCell.innerHTML = row[0];
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
      `<span>Task Name</span><span class="important-marker">*</span>`,

      '<input type="text" class="border task-adder border-gray-300 focus:outline-none focus:border-blue-500 dark:text-white dark:border-gray-600 dark:bg-gray-600 px-4 py-2 rounded w-full">',
    ],

    [
      `<span>Description</span>`,

      '<textarea rows="5" style="resize: none;" class=" task-adder border border-gray-300 focus:outline-none focus:border-blue-500 dark:text-white dark:border-gray-600 dark:bg-gray-600 px-4 py-2 rounded w-full "></textarea>',
    ],
  ];

  formRows.forEach((row) => {
    const formRow = table.insertRow();
    formRow.className = "form-row hidden";
    const labelCell = formRow.insertCell();
    const inputCell = formRow.insertCell();
    labelCell.innerHTML = row[0];
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
  const employees = ["Dawit Girma Firew", "Saron Tewodros", "Henok Kinde"];
  employees.forEach((employee) => {
    const taskRow = table.insertRow();

    // Create cell for checkbox
    const Cell = taskRow.insertCell();
    const empID = "employee" + index2;

    Cell.colSpan = "2";

    Cell.innerHTML = `
    <div class= "flex items-center px-4 ">
    <input type="checkbox" id="${empID}" class="rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white border-blue-500 text-blue-600 focus:ring-blue-400 focus:border-blue-400">
    <label for="${empID}"> ${employee}</label> 

    </div>
    `;

    // Increment index for unique IDs
    index2++;
  });

  // Create a button row
  const buttonRow2 = table.insertRow();
  const buttonCell2 = buttonRow2.insertCell();
  buttonCell2.classList.add("p-6");
  buttonCell2.colSpan = "2";

  buttonCell2.innerHTML = `
  <div class=" w-full border border-black border-thin p-6 h-32 dark:bg-black  rounded bg-blue-200  mb-2 ">
    <p class="w-full font-bold font-s2 text-blue-600 dark:text-white">
    N.B.:- Fill all required fields (fields with red *)
    </p>
  </div>
  
  <div class="flex flex-row mb-2" id="success-message-2">
 
    <button class=" bg-red-500 dark:bg-gray-800  hover:bg-red-600 text-white py-2 px-4 rounded mr-4   border-red-600  ml-auto" id="cancelButton2">Cancel</button>
    <button class=" bg-blue-500  dark:bg-gray-800  hover:bg-blue-600 text-white py-2 px-4 rounded mr-4  border-blue-600 " id="assignTaskButton">Assign</button>
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

    document.getElementById("remove-file").classList.remove("hidden");
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
  const success = `<p id="success-task" class=" hidden form-row text-center dark:bg-black dark:text-white rounded bg-green-100-rounded text-green-800   ml-4 mr-4 mb-4">You have successfully added a task. </p>`;
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
    const table = document.getElementById("tableContainer");
    // Get all checkboxes in the tasks
    const taskCheckboxes = document.querySelectorAll(
      '#tableContainer input[type="checkbox"]'
    );

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
        table.classList.add("hidden");
        table.innerHTML = "";
      }
    } else {
      table.classList.add("hidden");
      table.innerHTML = "";
    }
  }
  document
    .getElementById("cancelButton2")
    .addEventListener("click", cancelButtonClick);

  const success2 = `<p id="success-task2" class="hidden dark:bg-black dark:text-white text-center bg-green-100-rounded text-green-800 ml-4 mr-4 mb-4">You have successfully assigned task(s). </p>`;
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
        "Please choose atleast one task, one employee and fill start and completion dates, and completion date can not be before start date!"
      );
    }
  }

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
  document
    .getElementById("assignTaskButton")
    .addEventListener("click", assignButtonClick);

  // Show the table container
  tableContainer.classList.remove("hidden");
}

// Add event listener to the button
document.getElementById("generateTableButton").addEventListener("click", () => {
  const table = document.getElementById("tableContainer");
  console.log(table.classList);
  if (table.classList.contains("hidden")) {
    generateTable();
  } else {
    const succedded = document.getElementById("success-task2");
    // Get all checkboxes in the tasks
    const taskCheckboxes = document.querySelectorAll(
      '#tableContainer input[type="checkbox"]'
    );

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
        table.classList.add("hidden");
        table.innerHTML = "";
      }
    } else {
      table.classList.add("hidden");
      table.innerHTML = "";
    }
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

const deleteButton = document.querySelector(
  ".table-delete button:nth-of-type(2)"
);
const deleteAllButton = document.querySelector(
  ".table-delete button:nth-of-type(3)"
);
deleteButton.addEventListener("click", function () {
  const checkedRows = document.querySelectorAll(
    ".table-delete input[type='checkbox']:checked"
  );
  if (checkedRows.length === 0) {
    alert("Select at least one task");
  } else {
    const confirmed = confirm("Are you sure you want to delete this item?");

    // If user confirms, delete the row
    if (confirmed) {
      // Get the parent <tr> element and remove it
      checkedRows.forEach(function (row) {
        row.closest("tr").remove();
      });
    }
  }
});

deleteAllButton.addEventListener("click", function () {
  const confirmation = confirm("Are you sure you want to delete all tasks?");
  if (confirmation) {
    const rows = document.querySelectorAll(".table-delete tr");
    rows.forEach(function (row, index) {
      if (index !== 0 && index !== rows.length - 1) {
        // Skip the first and last rows
        row.remove();
      }
    });
  }
});

const checkboxes = document.querySelectorAll(
  ".table-delete input[type='checkbox']"
);
const cancelButton = document.querySelector(
  ".table-delete button:nth-of-type(1)"
);
cancelButton.addEventListener("click", function () {
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });
  document.getElementById("table-for-delete").classList.add("hidden");
});
const table = document.getElementById("table-for-delete");

document.getElementById("delete-delete").addEventListener("click", () => {
  if (table.classList.contains("hidden")) {
    table.classList.remove("hidden");
  } else {
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
    table.classList.add("hidden");
  }
});

document.getElementById("showTaskButton").addEventListener("click", () => {
  const table2 = document.getElementById("table-for-show");
  table2.classList.toggle("hidden");
});

document.querySelectorAll(".emp-event").forEach((element) => {
  element.addEventListener("click", () => {
    document.getElementById("emp").classList.remove("hidden");

    document.getElementById("my-account").classList.add("hidden");
    document.getElementById("detail").classList.add("hidden");
    document.getElementById("main-2").classList.add("hidden");
    document.getElementById("main").classList.add("hidden");
  });
});

//search employee table

const searchInput = document.getElementById("search-emp");
const searchIcon = document.getElementById("search-icon-2");
const reloadIcon = document.getElementById("reload-icon");
const tableRows = document.querySelectorAll("#table-for-emp tr");

searchIcon.addEventListener("click", function () {
  const searchText = searchInput.value.trim().toLowerCase();

  tableRows.forEach(function (row) {
    if (row !== tableRows[0]) {
      const rowData = row.textContent.toLowerCase();
      if (rowData.includes(searchText)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });
});

reloadIcon.addEventListener("click", function () {
  tableRows.forEach(function (row) {
    row.style.display = "";
  });
  searchInput.value = "";
});

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

    console.log("hi");
    if (existingPrivateComments) {
      let justify = existingPrivateComments.querySelector("td");

      if (justify.classList.contains("private-comments-section")) {
        existingPrivateComments.remove();

        exists = false;
      }
      // If the private comments section already exists, remove it
      else {
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

// Get all delete buttons within the table and attach click event listener
var deleteButtons = tableTask
  .querySelector(".delete-button")
  .addEventListener("click", () => {
    const checkedRows = tableTask.querySelectorAll(
      "input[type='checkbox']:checked"
    );
    if (checkedRows.length === 0) {
      alert("Select at least one task");
    } else {
      checkedRows.forEach(function (row) {
        row.closest("tr").remove();
      });
    }
  });

// Get delete all button within the table and attach click event listener
var deleteAllButton2 = tableTask.querySelector(".delete-all-button");
deleteAllButton2.addEventListener("click", function () {
  const confirmation = confirm("Are you sure you want to delete all tasks?");
  if (confirmation) {
    const rows = tableTask.querySelectorAll("tr");
    rows.forEach(function (row, index) {
      if (index !== 0 && index !== rows.length - 1) {
        // Skip the first and last rows
        row.remove();
      }
    });
  }
});

// Get all trash icons within the table and attach click event listener
const deleteIcon2 = tableTask.querySelectorAll(".delete-icon-2");

// Add click event listener to the delete icon
deleteIcon2.forEach((element) => {
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

const checkboxes2 = tableTask.querySelectorAll("input[type='checkbox']");
const cancelButton2 = tableTask.querySelector(".cancel-2");
cancelButton2.addEventListener("click", function () {
  checkboxes2.forEach(function (checkbox) {
    checkbox.checked = false;
  });
});

//serach main
var table2 = document.getElementById("task-manage");

// Get the search input element
var searchInput2 = document.getElementById("search-input");

// Get the search icon element
var searchIcon2 = document.getElementById("search-icon");

// Get the rotate icon element
var rotateIcon = document.getElementById("rotate-icon");

var taskRows = Array.from(table2.querySelectorAll(".task-row")).slice(1, -1);

// Add click event listener to the search icon
searchIcon2.addEventListener("click", function () {
  // Get the search query
  var searchQuery = searchInput2.value.toLowerCase().trim();

  // Get all task rows excluding the first and last

  // Loop through each task row
  taskRows.forEach(function (row) {
    const rowData = row.textContent.toLowerCase();
    if (rowData.includes(searchQuery)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

rotateIcon.addEventListener("click", function () {
  taskRows.forEach(function (row) {
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
  var taskRows2 = Array.from(document.querySelectorAll(".task-row")).slice(
    1,
    -1
  );

  // Loop through each task row
  taskRows2.forEach(function (row) {
    // Get the status from the row
    var status = row
      .querySelector(".status")
      .textContent.toLocaleLowerCase()
      .trim();

    // Show the row if it matches the selected status, hide otherwise
    if (selectedStatus === "status(all)") {
      taskRows.forEach(function (row) {
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

document.querySelectorAll(".my-task").forEach((task) => {
  task.addEventListener("click", () => {
    document.getElementById("emp").classList.add("hidden");

    document.getElementById("my-account").classList.add("hidden");
    document.getElementById("detail").classList.add("hidden");
    document.getElementById("main-2").classList.remove("hidden");
    document.getElementById("main").classList.add("hidden");
  });
});

document.querySelectorAll(".my-account-btn").forEach((task) => {
  task.addEventListener("click", () => {
    document.getElementById("emp").classList.add("hidden");

    document.getElementById("main").classList.add("hidden");
    document.getElementById("main-2").classList.add("hidden");
    document.getElementById("detail").classList.add("hidden");

    document.getElementById("my-account").classList.remove("hidden");
  });
});

document.querySelectorAll(".select-detail").forEach((element) => {
  element.addEventListener("click", () => {
    const manipulateDetail = document.getElementById("detail");
    manipulateDetail.classList.remove("hidden");
    document.getElementById("main-2").classList.add("hidden");
  });
});

document.getElementById("back-arrow").addEventListener("click", () => {
  const manipulateDetail = document.getElementById("detail");
  manipulateDetail.classList.add("hidden");
  document.getElementById("main-2").classList.remove("hidden");
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

document.getElementById("reset-all").addEventListener("click", () => {
  imagePreview.innerHTML = "";
  // Clear the display name
  const detail = document.getElementById("file-span-2");
  detail.innerHTML = "";
});
