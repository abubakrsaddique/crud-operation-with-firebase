import { getAuth, createUserWithEmailAndPassword as createUser, signInWithEmailAndPassword as signIn  } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js';
import { auth, firestore } from './fireConfig.js'; 
import { doc, setDoc, getDoc , deleteDoc , updateDoc } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js';


const myCollectionName = 'UserInfo'; 
var rollV, nameV, genderV, addressV;
function readForm() {
  rollV = document.getElementById("roll").value;
  nameV = document.getElementById("name").value;
  genderV = document.getElementById("gender").value;
  addressV = document.getElementById("address").value;
  console.log(rollV, nameV, addressV, genderV);
}

function signUpWithEmailAndPassword(email, password) {
  return createUser(auth, email, password);
}
function signInWithEmailAndPassword(email, password) {
  return signIn(auth, email, password);
}
function signOutUser() {
  return signOut(auth);
}
function toggleForms(signupActive) {
  var signupForm = document.getElementById("signup-form");
  var loginForm = document.getElementById("login-form");

  if (signupActive) {
    signupForm.style.display = "block";
    loginForm.style.display = "none";
  } else {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  }
}
toggleForms(true);

document.getElementById("signup-submit").onclick = function (event) {
  event.preventDefault();
  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;
  signUpWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      alert("Sign up successful!");
      var userData = {
        email: email,
      };

      const documentRef = doc(firestore, myCollectionName, user.uid); 
      setDoc(documentRef, userData)
        .then(() => {
          console.log("User data stored successfully in Firestore");
        })
        .catch((error) => {
          console.error("Error storing user data in Firestore:", error);
        });
    })
    .catch((error) => {
      alert(error.message);
    });
};

document.getElementById("login-submit").onclick = function () {
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;
  signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Login successful!");
    })
    .catch((error) => {
      alert(error.message);
    });
};

document.getElementById("submit").onclick = function () {
  readForm();
  var user = auth.currentUser;
  if (user) {
    var userData = {
      rollNo: rollV,
      name: nameV,
      gender: genderV,
      address: addressV,
    };
    const documentRef = doc(firestore, myCollectionName, user.uid); 
    setDoc(documentRef, userData) 
      .then(() => {
        alert("Data Submitted");
        document.getElementById("roll").value = "";
        document.getElementById("name").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("address").value = "";
      })
      .catch((error) => {
        alert("Error submitting data: " + error.message);
      });
  } else {
    alert("Please sign in to submit data.");
  }
};
async function fetchUserData() {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(firestore, myCollectionName, user.uid); 
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        var data = docSnap.data();
        document.getElementById("roll").value = data.rollNo;
        document.getElementById("name").value = data.name;
        document.getElementById("gender").value = data.gender;
        document.getElementById("address").value = data.address;
      } else {
        alert("Data not found for the current user.");
      }
    } catch (error) {
      console.error("Error reading data:", error);
      alert("Error reading data: " + error.message);
    }
  } else {
    alert("Please sign in to read data.");
  }
}
document.getElementById("read").onclick = function () {
  console.log("Fetching data for the current user.");
  fetchUserData();
};
document.getElementById("update").onclick = function () {
  readForm(); 
  var user = auth.currentUser;
  if (user) {
    var userData = {
      rollNo: rollV,
      name: nameV,
      gender: genderV,
      address: addressV,
    };
    const documentRef = doc(firestore, myCollectionName, user.uid); 
    updateDoc(documentRef, userData) 
      .then(() => {
        alert("Data Updated");
        document.getElementById("roll").value = "";
        document.getElementById("name").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("address").value = "";
      })
      .catch((error) => {
        alert("Error updating data: " + error.message);
      });
  } else {
    alert("Please sign in to update data.");
  }
};

document.getElementById("delete").onclick = function () {
  readForm();
  var user = auth.currentUser;
  if (user) {
    const documentRef = doc(firestore, myCollectionName, user.uid); 
    deleteDoc(documentRef) 
      .then(() => {
        alert("Data Deleted");
        document.getElementById("roll").value = "";
        document.getElementById("name").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("address").value = "";
      })
      .catch((error) => {
        alert("Error deleting data: " + error.message);
      });
  } else {
    alert("Please sign in to delete data.");
  }
};

document.getElementById("signup-link").onclick = function () {
  toggleForms(true);
};
document.getElementById("login-link").onclick = function () {
  toggleForms(false);
};