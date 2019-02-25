
//Firebase API config details
var config = {
  apiKey: "AIzaSyAaj94j5pp_4s-LLiLw7XuC-Ne7rLE_I9I",
  authDomain: "denim-firebase-demo.firebaseapp.com",
  databaseURL: "https://denim-firebase-demo.firebaseio.com",
  projectId: "denim-firebase-demo",
  storageBucket: "denim-firebase-demo.appspot.com",
  messagingSenderId: "707377714390"
};

//Initialize Firebase based on config details
firebase.initializeApp(config);

// FirebaseUI config.
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: () => false
  },
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);










