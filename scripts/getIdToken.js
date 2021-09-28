const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAAUns0BIU-7f0yUC9WEsiFR5-y7u7GB24',
  authDomain: 'backend-coding-test-bb24f.firebaseapp.com',
  projectId: 'backend-coding-test-bb24f',
  storageBucket: 'backend-coding-test-bb24f.appspot.com',
  messagingSenderId: '125727694551',
  appId: '1:125727694551:web:54cb4b334eac85db0b9a92',
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
signInWithEmailAndPassword(auth, 'string@yopmail.com', 'string')
  .then(userCredential => {
    // Signed in
    const user = userCredential.user;
    const auth = getAuth();
    auth.currentUser
      .getIdToken(/* forceRefresh */ true)
      .then(function(idToken) {
        console.log(
          '🚀 ~ file: getIdToken.js ~ line 52 ~ .then ~ idToken',
          idToken,
        );
      })
      .catch(function(error) {
        console.log('GetIdToken error', error);
      });
  })
  .catch(error => {
    console.log('signInWithEmailAndPassword error', error);
  });
