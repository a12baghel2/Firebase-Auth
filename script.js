
//const db = firebase.firestore();

function SignUp(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user.uid);
        setTimeout(function () {
          window.location.replace("/login.html");
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
      const firebaseref = firebase.database().ref();
      const userData = {
        username : "DemoName",
        userEmail : email,
        userPassword : password
      }
      firebaseref.child(user.uid).set(userData)
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

function GoogleSignIn(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(token);
      console.log(user.displayName);
      setTimeout(function () {
        window.location.replace("/Profile.html");
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