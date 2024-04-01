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
  orderByKey,
  query,
  ref,
  get,
  set,
  child,
  update,
  remove,
  push,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const db = getDatabase();

function insertLoginData(username, password, access) {
  const loginRef = ref(getDatabase(app), "Task-Manager/Login");
  const newLoginRef = push(loginRef); // Generate a unique ID for the new login data
  const newLoginKey = newLoginRef.key;

  const newData = {
    username: username,
    password: password,
    access: access,
  };

  // Set the new data under the generated key
  set(newLoginRef, newData)
    .then(() => {
      console.log("Data inserted successfully");
      localStorage.setItem("callLoadEmployee", "true");
    })
    .catch((error) => {
      console.error("Error inserting data:", error);
    });
}

document.getElementById("create").addEventListener("click", () => {
  let username = document.getElementById("usernameAdd").value;
  let password = document.getElementById("passwordAdd").value;
  let access = document.getElementById("accessAdd").value;

  insertLoginData(username, password, access);
});
