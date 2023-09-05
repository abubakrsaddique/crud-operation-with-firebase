var rollV, nameV, genderV, addressV;

function readFom() {
  rollV = document.getElementById("roll").value;
  nameV = document.getElementById("name").value;
  genderV = document.getElementById("gender").value;
  addressV = document.getElementById("address").value;
  console.log(rollV, nameV, addressV, genderV);
}

function signUpWithEmailAndPassword(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function signInWithEmailAndPassword(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function signOut() {
  return firebase.auth().signOut();
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

      firebase
        .database()
        .ref("users/" + user.uid) 
        .set(userData)
        .then(() => {
          console.log("User data stored successfully");
        })
        .catch((error) => {
          console.error("Error storing user data:", error);
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
  readFom();

  var user = firebase.auth().currentUser;
  if (user) {
    var userData = {
      rollNo: rollV,
      name: nameV,
      gender: genderV,
      address: addressV,
    };

    firebase
      .database()
      .ref("users/" + user.uid + "/student/" + rollV) 
      .set(userData)
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

document.getElementById("read").onclick = function () {
  readFom();

  var user = firebase.auth().currentUser;
  if (user) {
    firebase
      .database()
      .ref("users/" + user.uid + "/student/" + rollV) 
      .on("value", function (snap) {
        document.getElementById("roll").value = snap.val().rollNo;
        document.getElementById("name").value = snap.val().name;
        document.getElementById("gender").value = snap.val().gender;
        document.getElementById("address").value = snap.val().address;
      });
  } else {
    alert("Please sign in to read data.");
  }
};

document.getElementById("update").onclick = function () {
  readFom();

  var user = firebase.auth().currentUser;
  if (user) {
    var userData = {
      name: nameV,
      gender: genderV,
      address: addressV,
    };

    firebase
      .database()
      .ref("users/" + user.uid + "/student/" + rollV)
      .update(userData)
      .then(() => {
        alert("Data Update");
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
  readFom();

  var user = firebase.auth().currentUser;
  if (user) {
    firebase
      .database()
      .ref("users/" + user.uid + "/student/" + rollV) 
      .remove()
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
