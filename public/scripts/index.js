  
//Execute site script only after DOM content fully loaded (and after init scripts)
document.addEventListener('DOMContentLoaded', function() {

  //Default variable definitions for greeting and name
  var userName = "World";
  var userEmail = '';
  var greetingMsg = "Hello";
  const greetingElem = document.getElementById("greeting");
  const logoutBtn = document.getElementById("logout");
  const loadMsg = document.getElementById("load");

  //Set logout button to be hidden on intial load (user not logged in)
  logoutBtn.style.visibility = "hidden";


  //Function to update main greeting text based on variables
  function updateGreetingElem(){
    greetingElem.innerHTML=`${greetingMsg}, <b>${userName}</b>!`;
  }

  //Function to update 'loading' / login message according to user email
  function updateLoadMsg(){
    loadMsg.innerHTML=`Logged in as ${userEmail}`;
  }


  //Firebase SDK Features

  //Authentication: Listen for changes to auth user state and update UI accordingly
  firebase.auth().onAuthStateChanged(user => {

    //If a user is logged in
    if (user){

      //Realtime Database: Listen for changes to Firebase Realtime DB and update UI accordingly
      firebase.database().ref('/greeting').on('value', snapshot => {
        greetingMsg = snapshot.val();
        updateGreetingElem();
      });

      //Set userEmail to reflect signed in user
      userEmail = user.email;

      //Format displayName to remove last name and capitalize first name
      userName = user.displayName
        .replace(/\s(.+)/, '')
        .replace(user.displayName[0], user.displayName[0]
        .toUpperCase());

      //Show logout button
      logoutBtn.style.visibility = "visible";

      //Update page text
      updateGreetingElem();
      updateLoadMsg();

    }else{
      //Display default values if no valid user 
      updateGreetingElem();
    }
  });


  //Logout button - signs user out of window and refreshes to load 'defaults'
  logoutBtn.addEventListener('click', function() {
    firebase.auth().signOut().then(function() {
      window.location.reload();
    }).catch(function(error) {
      console.error(error);
    });
  });

});

