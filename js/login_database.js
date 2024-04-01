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
  orderByChild,
  equalTo,
  get,
  orderByKey,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

function validateLoginForm() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username === "" || password === "") {
    alert(
      "Please fill in both the username and password fields before logging in."
    );
    return false; // Prevent form submission
  }
  return true; // Proceed with form submission
}

function login() {
  if (validateLoginForm()) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginRef = ref(getDatabase(app), "Task-Manager/Login");
    const loginDataQuery = query(loginRef, orderByKey());

    get(loginDataQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const loginData = snapshot.val();
          let userFound = false;

          // Loop through loginData to search for matching username and password
          Object.keys(loginData).forEach((key) => {
            const user = loginData[key];

            if (user.username === username && user.password === password) {
              userFound = true;
              const userAccess = user.access;

              if (userAccess === "Manager") {
                // Open manager page
                sessionStorage.setItem("username", username);
                window.location.href = "admin.html";
              } else if (userAccess === "Employee") {
                // Open employee page
                sessionStorage.setItem("username", username);
                window.location.href = "employee.html";
              } else {
                // Access level not recognized
                alert("Access level not recognized");
              }

              // Add your logic for what to do when the user is found
            }
          });

          if (!userFound) {
            alert("Please check your username and password!");
            // Add your logic for what to do when the user is not found
          }
        } else {
          console.log("No User Data Found!");
        }
      })
      .catch((error) => {
        console.error("Error getting login data:", error);
      });
  }
}

document.getElementById("login").addEventListener("click", login);
document.body.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    document.getElementById("login").click(); // Trigger click event on login button
  }
});
