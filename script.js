
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

function SignUp(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById('name').value;
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        const userData = {
          name : name,
          email : email,
          firstLogin : true
        };
        firebaseRef.doc(user.uid).set(userData);
        setTimeout(function () {
          if(userData.firstLogin) {
            window.location.replace("/captureData.html");
          }
        }, 1000);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage)
      });
}


function Login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user.uid);
      
      setTimeout(function () {
        window.location.replace("/Profile.html");
      }, 1000);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert(errorMessage);
    });
}

function GoogleSignIn() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      window.location.replace("/Profile.html");
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.code);
      console.log(error.message);
    });
}

function GoogleSignUp(){
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const token = result.credential.accessToken;
      const user = result.user;
      const firebaseRef = db.collection("users");
      const userData = {
        name: user.displayName,
        email: user.email,
        firstLogin: true,
      };
      firebaseRef.doc(user.uid).set(userData);
      console.log(token);
      console.log(user);
      setTimeout(function () {
        if (userData.firstLogin) {
          window.location.replace("/captureData.html");
        } else {
          window.location.replace("/Profile.html");
        }
      }, 1000);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.code);
      console.log(error.message);
    });
}

function LogOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      setTimeout(function () {
        window.location.replace("/login.html");
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    });
}



function Save(){
  const dateOfBirth = document.getElementById('dob').value;
  const bio = document.getElementById('bio').value;
  const birthplace = document.getElementById("birthplace").value;
  const phoneNo = document.getElementById('phone').value;
  const website = document.getElementById('website').value;
  const user = firebase.auth().currentUser;
  var firebaseRef = db.collection("users");
  const userData = {
    bio : bio,
    birthplace : birthplace,
    dateOfBirth: dateOfBirth,
    phoneNo: phoneNo,
    website: website
  };
  firebaseRef.doc(user.uid).set(userData, {merge : true});
  firebaseRef.doc(user.uid).update({firstLogin: false});
  setTimeout(function () {
    window.location.replace("/Profile.html");
  }, 1000);
}