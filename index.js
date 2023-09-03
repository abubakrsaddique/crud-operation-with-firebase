var rollV, nameV, genderV, addressV;

  function readFom() {
    rollV = document.getElementById("roll").value;
    nameV = document.getElementById("name").value;
    genderV = document.getElementById("gender").value;
    addressV = document.getElementById("address").value;
    console.log(rollV, nameV, addressV, genderV);
  }

  function signInWithEmailAndPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  function signOut() {
    return firebase.auth().signOut();
  }

  document.getElementById("submit").onclick = function () {
    readFom();

    var user = firebase.auth().currentUser;
    if (user) {
      
      firebase
        .database()
        .ref("student/" + rollV)
        .set({
          rollNo: rollV,
          name: nameV,
          gender: genderV,
          address: addressV,
        });

      alert("Data Submitted");
      document.getElementById("roll").value = "";
      document.getElementById("name").value = "";
      document.getElementById("gender").value = "";
      document.getElementById("address").value = "";
    } else {
      
      alert("Please sign in to submit data.");
    }
  };

document.getElementById("read").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + rollV)
    .on("value", function (snap) {
      document.getElementById("roll").value = snap.val().rollNo;
      document.getElementById("name").value = snap.val().name;
      document.getElementById("gender").value = snap.val().gender;
      document.getElementById("address").value = snap.val().address;
    });
};


document.getElementById("update").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + rollV)
    .update({
      name: nameV,
      gender: genderV,
      address: addressV,
    });
  alert("Data Update");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("address").value = "";
};


document.getElementById("delete").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + rollV)
    .remove();
  alert("Data Deleted");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("address").value = "";
};