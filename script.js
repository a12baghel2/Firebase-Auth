
const db = firebase.firestore();

function SignUp(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user.uid);
        var firebaseRef = db.collection("users");
        const userData = {
          name : "demoName",
          email : email,
          password : password
        };
        firebaseRef.doc(user.uid).set(userData);
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
      var firebaseRef = db.collection("users");
      const userData = {
        name: user.displayName,
        email: user.email,
      };
      firebaseRef.doc(user.uid).set(userData);
      console.log(token);
      console.log(user);
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

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user.uid);
    const docRef = db.collection("users").doc(user.uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          document.getElementById('userName').innerHTML = data.name;
          document.getElementById('userEmail').innerHTML = data.email;
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else {
    // No user is signed in.
  }
});