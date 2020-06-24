import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDGxeo3XTI9bomeiTQXmi1m08ebLmiXWX4",
    authDomain: "advanced-project-task-manager.firebaseapp.com",
    databaseURL: "https://advanced-project-task-manager.firebaseio.com",
    projectId: "advanced-project-task-manager",
    storageBucket: "advanced-project-task-manager.appspot.com",
    messagingSenderId: "531114151710",
    appId: "1:531114151710:web:5a03a52f72df6ad587c30f"
})

export {firebaseConfig as firebase}



// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.15.4/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyDGxeo3XTI9bomeiTQXmi1m08ebLmiXWX4",
//     authDomain: "advanced-project-task-manager.firebaseapp.com",
//     databaseURL: "https://advanced-project-task-manager.firebaseio.com",
//     projectId: "advanced-project-task-manager",
//     storageBucket: "advanced-project-task-manager.appspot.com",
//     messagingSenderId: "531114151710",
//     appId: "1:531114151710:web:5a03a52f72df6ad587c30f"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// </script>